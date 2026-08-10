import React, { useEffect, useRef } from 'react';
import landGeoJSON from './ne_110m_land.json';

interface Particle {
  // Current 3D state
  x: number;
  y: number;
  z: number;
  alpha: number;
  size: number;
  color: string;
  glow: boolean;

  // Normalized Earth mode coordinates (-0.5 to 0.5)
  earthNX: number;
  earthNY: number;
  earthNZ: number;
  earthColor: string;
  earthSize: number;
  earthLon: number;
  earthLat: number;

  // Normalized SIM mode coordinates (-0.5 to 0.5)
  simNX: number;
  simNY: number;
  simNZ: number;
  simColor: string;
  simSize: number;

  // Animation helper
  staggerDelay: number;
  phaseOffset: number;
  speedMultiplier: number;
}

export default function ProceduralEngine() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);

  // Simulation states
  // 'startup' -> 'earth' -> 'morphing_to_sim' -> 'sim' -> 'morphing_to_earth'
  const stateRef = useRef<'startup' | 'earth' | 'morphing_to_sim' | 'sim' | 'morphing_to_earth'>('startup');
  const timerRef = useRef<number>(0);
  const globalTimeRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  // Sequences configuration
  const STARTUP_DURATION = 180; // 3 seconds at 60 FPS
  const EARTH_IDLE_DURATION = 40 * 60; // 40 seconds at 60 FPS
  const SIM_IDLE_DURATION = 5 * 60; // 5 seconds at 60 FPS (user requested approximately five seconds)
  const MORPH_DURATION = 4 * 60; // 4 seconds morphing at 60 FPS

  // Network activity arcs
  interface NetworkArc {
    nodeAIdx: number;
    nodeBIdx: number;
    progress: number;
    life: number;
    maxLife: number;
    color: string;
  }
  const networkArcsRef = useRef<NetworkArc[]>([]);
  const coverageNodesIdxsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Handle canvas size resizing dynamically
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Highly Detailed Continent Polygons parsed from Natural Earth GeoJSON data
    interface PolygonPoint {
      lon: number;
      lat: number;
    }
    interface PolygonWithBBox {
      points: PolygonPoint[];
      minLon: number;
      maxLon: number;
      minLat: number;
      maxLat: number;
    }

    const parsedPolygons: PolygonWithBBox[] = [];

    if (landGeoJSON && landGeoJSON.features) {
      landGeoJSON.features.forEach((feature: any) => {
        if (!feature.geometry) return;
        const { type, coordinates } = feature.geometry;
        if (type === 'Polygon') {
          if (coordinates && coordinates[0]) {
            const polyPoints: PolygonPoint[] = coordinates[0].map((coord: any) => ({
              lon: coord[0],
              lat: coord[1],
            }));
            if (polyPoints.length > 0) {
              let minLon = Infinity;
              let maxLon = -Infinity;
              let minLat = Infinity;
              let maxLat = -Infinity;
              polyPoints.forEach(pt => {
                if (pt.lon < minLon) minLon = pt.lon;
                if (pt.lon > maxLon) maxLon = pt.lon;
                if (pt.lat < minLat) minLat = pt.lat;
                if (pt.lat > maxLat) maxLat = pt.lat;
              });
              parsedPolygons.push({
                points: polyPoints,
                minLon,
                maxLon,
                minLat,
                maxLat
              });
            }
          }
        } else if (type === 'MultiPolygon') {
          if (coordinates) {
            coordinates.forEach((polygonCoords: any) => {
              if (polygonCoords && polygonCoords[0]) {
                const polyPoints: PolygonPoint[] = polygonCoords[0].map((coord: any) => ({
                  lon: coord[0],
                  lat: coord[1],
                }));
                if (polyPoints.length > 0) {
                  let minLon = Infinity;
                  let maxLon = -Infinity;
                  let minLat = Infinity;
                  let maxLat = -Infinity;
                  polyPoints.forEach(pt => {
                    if (pt.lon < minLon) minLon = pt.lon;
                    if (pt.lon > maxLon) maxLon = pt.lon;
                    if (pt.lat < minLat) minLat = pt.lat;
                    if (pt.lat > maxLat) maxLat = pt.lat;
                  });
                  parsedPolygons.push({
                    points: polyPoints,
                    minLon,
                    maxLon,
                    minLat,
                    maxLat
                  });
                }
              }
            });
          }
        }
      });
    }

    // Fast Point-In-Polygon containment check (ray casting algorithm)
    const pointInPolygon = (lon: number, lat: number, points: PolygonPoint[]) => {
      let inside = false;
      for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
        const xi = points[i].lon, yi = points[i].lat;
        const xj = points[j].lon, yj = points[j].lat;
        const intersect = ((yi > lat) !== (yj > lat))
            && (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };

    const isLand = (lon: number, lat: number) => {
      for (const poly of parsedPolygons) {
        if (lon < poly.minLon || lon > poly.maxLon || lat < poly.minLat || lat > poly.maxLat) {
          continue;
        }
        if (pointInPolygon(lon, lat, poly.points)) {
          return true;
        }
      }
      return false;
    };

    // Precompute outline points for extremely fast distance calculations
    const outlinePoints: PolygonPoint[] = [];
    parsedPolygons.forEach(poly => {
      // Downsample outline points to balance detail and performance
      for (let i = 0; i < poly.points.length; i += 2) {
        outlinePoints.push(poly.points[i]);
      }
    });

    // Collect all actual polygon vertices for 100% accurate fallback positioning
    const allLandVertices: PolygonPoint[] = [];
    parsedPolygons.forEach(poly => {
      poly.points.forEach(pt => {
        allLandVertices.push(pt);
      });
    });

    const getMinDistToOutline = (lon: number, lat: number) => {
      let minDistToOutline = Infinity;
      for (const pt of outlinePoints) {
        const dx = lon - pt.lon;
        const dy = lat - pt.lat;
        // Fast Manhattan distance pre-filter to reject 99% of points instantly
        if (Math.abs(dx) > 3 || Math.abs(dy) > 3) continue;
        const d = Math.sqrt(dx * dx + dy * dy);
        if (d < minDistToOutline) {
          minDistToOutline = d;
        }
      }
      return minDistToOutline;
    };

    const premiumLocations = [
      { name: "Johannesburg", lon: 28.0, lat: -26.2 },
      { name: "Cape Town", lon: 18.4, lat: -33.9 },
      { name: "Durban", lon: 31.0, lat: -29.8 },
      { name: "London", lon: -0.1, lat: 51.5 },
      { name: "Paris", lon: 2.3, lat: 48.8 },
      { name: "Dubai", lon: 55.3, lat: 25.2 },
      { name: "Singapore", lon: 103.8, lat: 1.3 },
      { name: "Tokyo", lon: 139.6, lat: 35.6 },
      { name: "New York", lon: -74.0, lat: 40.7 },
      { name: "Los Angeles", lon: -118.2, lat: 34.0 },
      { name: "Sydney", lon: 151.2, lat: -33.8 },
      { name: "São Paulo", lon: -46.6, lat: -23.5 }
    ];

    const majorCities = [
      ...premiumLocations,
      { lon: 31.2, lat: 30.0 }, // Cairo
      { lon: 3.4, lat: 6.5 },   // Lagos
      { lon: 36.8, lat: -1.3 },  // Nairobi
      { lon: 72.8, lat: 19.0 },  // Mumbai
      { lon: 121.5, lat: 31.2 }, // Shanghai
      { lon: -43.2, lat: -22.9 }, // Rio de Janeiro
      { lon: 37.6, lat: 55.8 },  // Moscow
      { lon: -3.7, lat: 40.4 },  // Madrid
      { lon: 12.5, lat: 41.9 },  // Rome
      { lon: -122.3, lat: 47.6 }, // Seattle
      { lon: -87.6, lat: 41.9 },  // Chicago
      { lon: -80.2, lat: 25.8 },  // Miami
      { lon: -58.4, lat: -34.6 }  // Buenos Aires
    ];

    // Country border simplified grids (navigator lines) for scientific abstract aesthetic
    const borderGrids: { lonA: number; latA: number; lonB: number; latB: number }[] = [];
    for (let lon = -150; lon <= 150; lon += 30) {
      borderGrids.push({ lonA: lon, latA: -50, lonB: lon, latB: 65 });
    }
    for (let lat = -40; lat <= 60; lat += 20) {
      borderGrids.push({ lonA: -160, latA: lat, lonB: 160, latB: lat });
    }

    // Initialize 5500 Particles with 100% precision directly from high-resolution GeoJSON datasets
    const initParticles = () => {
      const randomRange = (min: number, max: number) => Math.random() * (max - min) + min;

      coverageNodesIdxsRef.current = [];
      networkArcsRef.current = [];
      const particles: Particle[] = [];
      const totalParticles = 5500;

      for (let i = 0; i < totalParticles; i++) {
        // --- 1. Earth Coordinates (normalized from -0.5 to 0.5) ---
        let lon = 0;
        let lat = 0;
        let eColor = '#141618'; // Elegant dark background detail
        let eSize = 0.35;
        let eGlow = false;

        // Group allocations:
        // i: 0 - 3800 -> Standard land & city light clusters (mix of outline and interior points)
        // i: 3800 - 3812 -> The 12 active premium IoT coverage nodes
        // i: 3812 - 4100 -> Subtle drifting cosmic background stars
        // i: 4100 - 5500 -> Extra dense land coordinates for high fidelity (mix of outline and interior)

        const isLandGroup = i < 3800 || (i >= 4100 && i < 5500);

        if (isLandGroup) {
          // 75% of land particles trace coastlines and borders for absolute edge clarity
          const isOutline = Math.random() < 0.75;

          if (isOutline && outlinePoints.length > 0) {
            // Select a random point from the high-resolution GeoJSON outline points
            const pt = outlinePoints[Math.floor(Math.random() * outlinePoints.length)];
            lon = pt.lon + randomRange(-0.10, 0.10); // super tight coordinate spread for crisp, non-blobby lines
            lat = pt.lat + randomRange(-0.10, 0.10);

            // Coastal colors: pristine premium light grey & bright silver palette to outline the continents
            const rnd = Math.random();
            if (rnd > 0.85) {
              eColor = '#F3F4F6'; // Bright silver/platinum light grey
              eSize = randomRange(0.40, 0.55);
            } else if (rnd > 0.40) {
              eColor = '#E5E7EB'; // Crisp slate light grey
              eSize = randomRange(0.30, 0.40);
            } else {
              eColor = '#CBD5E1'; // Medium light grey for high-fidelity border definition
              eSize = randomRange(0.22, 0.30);
            }
          } else {
            // Interior landmass points: distribute inside bounding boxes & filter with isLand
            lon = randomRange(-180, 180);
            lat = randomRange(-50, 70); // Avoid polar water regions
            let attempts = 0;
            let found = false;
            while (!found && attempts < 20) {
              lon = randomRange(-180, 180);
              lat = randomRange(-50, 70);
              if (isLand(lon, lat)) {
                found = true;
              }
              attempts++;
            }
            if (!found && allLandVertices.length > 0) {
              const pt = allLandVertices[Math.floor(Math.random() * allLandVertices.length)];
              lon = pt.lon + randomRange(-0.12, 0.12);
              lat = pt.lat + randomRange(-0.12, 0.12);
            }

            // Standard interior color: deep luxurious matte dark grays/charcoals to let the light grey outlines pop!
            const rnd = Math.random();
            if (rnd > 0.75) {
              eColor = '#374151'; // slate dark grey
              eSize = randomRange(0.18, 0.28);
            } else {
              eColor = '#1F2937'; // deep matte grey
              eSize = randomRange(0.12, 0.20);
            }
          }

          // Check proximity to major metropolitan areas to cluster glowing gold lights
          let nearestCityDist = Infinity;
          for (const city of majorCities) {
            const dx = lon - city.lon;
            const dy = lat - city.lat;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < nearestCityDist) {
              nearestCityDist = dist;
            }
          }

          // Keep cities as tight glowing beacons so they do not bleed or create blobby shapes on the coast
          if (nearestCityDist < 6.0) {
            const goldRnd = Math.random();
            if (goldRnd > 0.80) {
              eColor = '#FFFFFF'; // bright white star beacon
              eSize = 0.9;
              eGlow = true;
            } else if (goldRnd > 0.3) {
              eColor = '#D4AF37'; // premium metallic gold
              eSize = 0.65;
              eGlow = true;
            } else {
              eColor = '#B8901C'; // soft warm amber glow
              eSize = 0.45;
              eGlow = true;
            }
          }
        } 
        else if (i >= 3800 && i < 3812) {
          // Exact coordinates of premium IoT coverage nodes
          const loc = premiumLocations[i - 3800];
          lon = loc.lon;
          lat = loc.lat;
          eColor = '#D4AF37'; // bright metallic gold node core
          eSize = 2.2;
          eGlow = true;
          coverageNodesIdxsRef.current.push(i);
        } 
        else if (i >= 3812 && i < 4100) {
          // Deep space sparse drifting cosmic particles
          lon = randomRange(-180, 180);
          lat = randomRange(-90, 90);
          eColor = Math.random() > 0.9 ? '#D4AF37' : '#334155'; // extremely faint gold/slate stars
          eSize = Math.random() * 0.3 + 0.1;
        }

        // Normalize Earth coordinates (-0.5 to 0.5 range)
        const earthNX = lon / 360;
        const earthNY = lat / 180;
        const earthNZ = (Math.random() - 0.5) * 0.01; // subtle initial flat-plane jitter

        // --- 2. SIM Mode Targets (Proportional SIM Structure) ---
        let sx = 0;
        let sy = 0;
        let sz = (Math.random() - 0.5) * 1.5;
        let sColor = '#141619'; // dark luxurious obsidian black body
        let sSize = 0.8;

        if (i <= 3000) {
          // Charcoal SIM card body (Grid distribution)
          const colCount = 60;
          const idx = i;
          const col = idx % colCount;
          const row = Math.floor(idx / colCount);
          let nx = (col / colCount) - 0.5;
          let ny = (row / 50) - 0.5;

          // Crisp, laser-cut corner bevel cut on the top-right corner of the SIM card
          if (nx - ny > 0.82) {
            while (nx - ny > 0.82) {
              nx = randomRange(-0.48, 0.48);
              ny = randomRange(-0.48, 0.48);
            }
          }

          sx = nx * 320;
          sy = ny * 200;
          sColor = '#111214'; // premium matte black body
          sSize = 0.75;
        } 
        else if (i <= 4300) {
          // SIM Contact Pads - Bright metallic gold contact terminals (6 chip blocks)
          const padIdx = (i - 3001) % 6;
          const col = padIdx % 2;
          const row = Math.floor(padIdx / 2);

          const padWidth = 35;
          const padHeight = 28;
          const gapX = 14;
          const gapY = 10;
          const chipCenterX = -40;
          const chipCenterY = 0;

          const padOffsetX = chipCenterX + (col - 0.5) * (padWidth + gapX);
          const padOffsetY = chipCenterY + (row - 1) * (padHeight + gapY);

          // Sub-grid inside the individual pad
          const subIdx = Math.floor((i - 3001) / 6);
          const subCol = subIdx % 15;
          const subRow = Math.floor(subIdx / 15);

          sx = padOffsetX + (subCol / 15 - 0.5) * padWidth + randomRange(-0.8, 0.8);
          sy = padOffsetY + (subRow / 15 - 0.5) * padHeight + randomRange(-0.8, 0.8);
          sz = 1.2;
          sColor = '#D4AF37'; // Premium metallic gold contacts
          sSize = 0.95;
        } 
        else if (i <= 4900) {
          // White clean logo typography "IoT" on the right side
          const charIdx = i - 4301;
          const rightAlignX = 65;
          const rightAlignY = 0;
          const letter = charIdx % 4;
          const letterStep = Math.floor(charIdx / 4);

          if (letter === 0) {
            // 'I'
            sx = rightAlignX - 35;
            sy = rightAlignY + (letterStep / 38 - 0.5) * 40;
          } else if (letter === 1) {
            // 'O'
            const angle = (letterStep / 38) * Math.PI * 2;
            sx = rightAlignX - 10 + Math.cos(angle) * 16;
            sy = rightAlignY + Math.sin(angle) * 16;
          } else if (letter === 2) {
            // 'T'
            if (letterStep < 19) {
              sx = rightAlignX + 10 + (letterStep / 18 - 0.5) * 25;
              sy = rightAlignY - 20;
            } else {
              sx = rightAlignX + 10;
              sy = rightAlignY - 20 + ((letterStep - 19) / 19) * 40;
            }
          } else {
            // 'C'
            const angle = Math.PI * 0.5 + (letterStep / 38) * Math.PI * 1.0;
            sx = rightAlignX + 45 + Math.cos(angle) * 14;
            sy = rightAlignY + Math.sin(angle) * 16;
          }
          sz = 1.0;
          sColor = '#FFFFFF'; // clean secondary white
          sSize = 1.05;
        } 
        else {
          // Futuristic motherboard layout circuit traces with branching lines and parallel buses
          const traceIdx = i - 4901;
          const lane = traceIdx % 5;
          const step = Math.floor(traceIdx / 5);
          const t = step / 24; // 0 to 1

          if (lane < 2) {
            // Concentric chip power loops
            const r = 52 + lane * 12;
            const theta = t * Math.PI * 2;
            sx = -40 + Math.cos(theta) * r;
            sy = Math.sin(theta) * r;
          } else if (lane === 2) {
            // Horizontal bus channels flowing rightwards across the SIM body
            sx = -40 + 50 + t * 90;
            sy = -30 + (traceIdx % 3) * 30;
          } else if (lane === 3) {
            // Vertical high-density trace bars
            sx = -80 + (traceIdx % 4) * 25;
            sy = -90 + t * 180;
          } else {
            // Elegant 45-degree corner trace routes
            const length = t * 60;
            if (traceIdx % 2 === 0) {
              sx = -100 + length;
              sy = -70 + length;
            } else {
              sx = 20 - length;
              sy = 70 - length;
            }
          }
          sz = 0.5;
          sColor = '#D4AF37'; // premium metallic gold circuit traces
          sSize = 0.9;
        }

        // Normalize SIM coordinates relative to base size of 320x200
        const simNX = sx / 320;
        const simNY = sy / 200;
        const simNZ = sz / 10;

        // Startup: spawn scattered organically in deep landscape space
        const spawnX = (Math.random() - 0.5) * window.innerWidth * 1.8;
        const spawnY = (Math.random() - 0.5) * window.innerHeight * 1.8;
        const spawnZ = randomRange(400, 1000);

        const staggerDelay = randomRange(0, 100);
        const phaseOffset = randomRange(0, Math.PI * 2);
        const speedMultiplier = randomRange(0.012, 0.022);

        particles.push({
          x: spawnX,
          y: spawnY,
          z: spawnZ,
          alpha: 0,
          size: eSize,
          color: eColor,
          glow: eGlow,

          earthNX,
          earthNY,
          earthNZ,
          earthColor: eColor,
          earthSize: eSize,
          earthLon: lon,
          earthLat: lat,

          simNX,
          simNY,
          simNZ,
          simColor: sColor,
          simSize: sSize,

          staggerDelay,
          phaseOffset,
          speedMultiplier
        });
      }

      particlesRef.current = particles;
    };

    // Initialize 5500 Particles with 100% GeoJSON precision instantly
    initParticles();

    // 3. Main Animation Loop
    const tick = () => {
      timerRef.current++;
      globalTimeRef.current++;
      const frames = timerRef.current;
      const gTime = globalTimeRef.current;
      const state = stateRef.current;

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Pure matte black background clears
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Transition State Manager logic
      if (state === 'startup') {
        if (frames >= STARTUP_DURATION) {
          stateRef.current = 'earth';
          timerRef.current = 0;
        }
      } else if (state === 'earth') {
        if (frames >= EARTH_IDLE_DURATION) {
          stateRef.current = 'morphing_to_sim';
          timerRef.current = 0;
        }

        // Spawn communication network traffic arcs occasionally
        if (frames % 140 === 0 && networkArcsRef.current.length < 4 && Math.random() > 0.4) {
          const nodeIdxs = coverageNodesIdxsRef.current;
          if (nodeIdxs.length >= 2) {
            const nodeA = Math.floor(Math.random() * nodeIdxs.length);
            let nodeB = Math.floor(Math.random() * nodeIdxs.length);
            while (nodeA === nodeB) {
              nodeB = Math.floor(Math.random() * nodeIdxs.length);
            }
            networkArcsRef.current.push({
              nodeAIdx: nodeIdxs[nodeA],
              nodeBIdx: nodeIdxs[nodeB],
              progress: 0,
              life: 0,
              maxLife: 140 + Math.random() * 60,
              color: '#D4AF37'
            });
          }
        }
      } else if (state === 'morphing_to_sim') {
        if (frames >= MORPH_DURATION) {
          stateRef.current = 'sim';
          timerRef.current = 0;
        }
      } else if (state === 'sim') {
        if (frames >= SIM_IDLE_DURATION) {
          stateRef.current = 'morphing_to_earth';
          timerRef.current = 0;
        }
      } else if (state === 'morphing_to_earth') {
        if (frames >= MORPH_DURATION) {
          stateRef.current = 'earth';
          timerRef.current = 0;
        }
      }

      // Update Network traffic arc progressions
      networkArcsRef.current = networkArcsRef.current.filter(arc => {
        arc.life++;
        arc.progress = arc.life / arc.maxLife;
        return arc.life < arc.maxLife;
      });

      // Continuous, seamless 3D rotation angles (Map and SIM)
      const mapAngleY = Math.sin(gTime * 0.0006) * 0.08; // slow horizontal float
      const mapAngleX = 0.32 + Math.cos(gTime * 0.0004) * 0.04; // stable vertical tilt projection

      const simAngleY = Math.sin(gTime * 0.002) * 0.12;
      const simAngleX = Math.cos(gTime * 0.0015) * 0.05;

      // Calculate rotation interpolation factor tRot based on state
      let tRot = 0;
      if (state === 'sim') {
        tRot = 1;
      } else if (state === 'morphing_to_sim') {
        const progress = Math.max(0, Math.min(1, frames / MORPH_DURATION));
        tRot = easeInOutCubic(progress);
      } else if (state === 'morphing_to_earth') {
        const progress = Math.max(0, Math.min(1, frames / MORPH_DURATION));
        tRot = 1 - easeInOutCubic(progress);
      }

      const transitionSweep = Math.sin(tRot * Math.PI) * 0.45;
      const angleX = mapAngleX * (1 - tRot) + simAngleX * tRot;
      const angleY = mapAngleY * (1 - tRot) + simAngleY * tRot + transitionSweep;

      // Centralised projection coordinate mapping helper
      const getScreenCoords = (flatX: number, flatY: number, flatZ = 0) => {
        let rx = flatX;
        let ry = flatY;
        let rz = flatZ;

        // Rotate Y
        const cosY = Math.cos(angleY);
        const sinY = Math.sin(angleY);
        const rxTY = rx * cosY - rz * sinY;
        const rzTY = rx * sinY + rz * cosY;
        rx = rxTY; rz = rzTY;

        // Rotate X
        const cosX = Math.cos(angleX);
        const sinX = Math.sin(angleX);
        const ryTX = ry * cosX - rz * sinX;
        const rzTX = ry * sinX + rz * cosX;
        ry = ryTX; rz = rzTX;

        // Zoom in closer to the SIM card to emphasize its gold micro-traces
        const camDistance = 880 * (1 - tRot) + 640 * tRot;
        const scale = camDistance / (camDistance + rz);
        return {
          x: centerX + rx * scale,
          y: centerY + ry * scale,
          z: rz,
          scale
        };
      };

      // Faint country outline rendering on map plane
      if (state === 'earth' || state === 'startup' || state === 'morphing_to_sim' || state === 'morphing_to_earth') {
        let borderAlpha = 0.04;
        if (state === 'startup') {
          borderAlpha = Math.max(0, Math.min(0.04, ((frames - 60) / 120) * 0.04));
        } else if (state === 'morphing_to_sim') {
          const progress = Math.max(0, Math.min(1, frames / MORPH_DURATION));
          borderAlpha = 0.04 * (1 - easeInOutCubic(progress));
        } else if (state === 'morphing_to_earth') {
          const progress = Math.max(0, Math.min(1, frames / MORPH_DURATION));
          borderAlpha = 0.04 * easeInOutCubic(progress);
        }

        if (borderAlpha > 0) {
          ctx.strokeStyle = '#323740'; // Low-opacity refined charcoal grey for hair-thin administration lines
          ctx.lineWidth = 0.35;
          ctx.globalAlpha = borderAlpha * 0.8;

          // 1. Draw hairline administrative grid lines (Navigator aesthetics)
          borderGrids.forEach(line => {
            const mapWidth = Math.min(canvas.width * 0.88, 1050);
            const mapHeight = mapWidth * 0.45;

            const ax = (line.lonA / 360) * mapWidth;
            const ay = (line.latA / 180) * mapHeight;
            const bx = (line.lonB / 360) * mapWidth;
            const by = (line.latB / 180) * mapHeight;

            const sPtA = getScreenCoords(ax, ay);
            const sPtB = getScreenCoords(bx, by);

            ctx.beginPath();
            ctx.moveTo(sPtA.x, sPtA.y);
            ctx.lineTo(sPtB.x, sPtB.y);
            ctx.stroke();
          });

          // 2. Draw hairline continent outlines
          ctx.strokeStyle = '#475569'; // Fine grey coastline trace matching high-fidelity particles
          ctx.globalAlpha = borderAlpha * 0.45;
          parsedPolygons.forEach(outline => {
            const mapWidth = Math.min(canvas.width * 0.88, 1050);
            const mapHeight = mapWidth * 0.45;

            ctx.beginPath();
            outline.points.forEach((pt, index) => {
              const x = (pt.lon / 360) * mapWidth;
              const y = (pt.lat / 180) * mapHeight;
              const sPt = getScreenCoords(x, y);

              if (index === 0) {
                ctx.moveTo(sPt.x, sPt.y);
              } else {
                ctx.lineTo(sPt.x, sPt.y);
              }
            });
            ctx.stroke();
          });
        }
      }
      // Coverage items fade factor
      let coverageAlpha = 0;
      if (state === 'earth') {
        coverageAlpha = 1;
      } else if (state === 'startup') {
        coverageAlpha = Math.max(0, Math.min(1, (frames - 100) / 80));
      } else if (state === 'morphing_to_sim') {
        const progress = Math.max(0, Math.min(1, frames / MORPH_DURATION));
        coverageAlpha = 1 - easeInOutCubic(progress);
      } else if (state === 'morphing_to_earth') {
        const progress = Math.max(0, Math.min(1, frames / MORPH_DURATION));
        coverageAlpha = easeInOutCubic(progress);
      }

      // Stagger and Interpolate Particle placements
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        let tx = 0, ty = 0, tz = 0;
        let targetColor = '#FFFFFF';
        let targetSize = 1;

        const mapWidth = Math.min(canvas.width * 0.88, 1050);
        const mapHeight = mapWidth * 0.45;

        // Base coordinates for current frame
        const ex = p.earthNX * mapWidth;
        const ey = p.earthNY * mapHeight;
        const ez = p.earthNZ * mapWidth;

        const baseSimWidth = Math.min(canvas.width * 0.28, 280);
        const baseSimHeight = baseSimWidth * 0.625;

        const sx = p.simNX * baseSimWidth;
        const sy = p.simNY * baseSimHeight;
        const sz = p.simNZ * baseSimWidth;

        // Perform animation sequence interpolations
        if (state === 'startup') {
          const t = Math.min(1, frames / STARTUP_DURATION);
          const ease = 1 - Math.pow(1 - t, 3); // cubic ease out
          tx = ex;
          ty = ey;
          tz = ez;
          targetColor = p.earthColor;
          targetSize = p.earthSize;

          // Linear flying-in assembling coordinates
          p.x += (tx - p.x) * p.speedMultiplier * ease * 4.5;
          p.y += (ty - p.y) * p.speedMultiplier * ease * 4.5;
          p.z += (tz - p.z) * p.speedMultiplier * ease * 4.5;

          // City lights and coverage nodes fade in gradually last
          if (p.glow) {
            const glowProgress = Math.max(0, Math.min(1, (frames - 100) / 80));
            p.alpha = ease * glowProgress;
          } else {
            p.alpha = ease * 0.75;
          }
        } 
        else if (state === 'earth') {
          tx = ex;
          ty = ey;
          tz = ez;
          targetColor = p.earthColor;
          targetSize = p.earthSize;

          // Drift subtle cosmic background stars slowly
          if (i >= 3812 && i < 4100) {
            p.earthNX += 0.00004;
            if (p.earthNX > 0.5) p.earthNX = -0.5;
          }

          p.x += (tx - p.x) * 0.18;
          p.y += (ty - p.y) * 0.18;
          p.z += (tz - p.z) * 0.18;

          // Elegant organic star & city shimmers
          if (p.glow) {
            const shimmer = Math.sin(gTime * 0.08 + p.phaseOffset) * 0.15 + Math.cos(gTime * 0.03 + p.phaseOffset * 1.5) * 0.1;
            p.alpha = 0.75 + shimmer;
          } else {
            const breathe = Math.sin(gTime * 0.02 + p.phaseOffset) * 0.06;
            p.alpha = 0.82 + breathe;
          }
        } 
        else if (state === 'morphing_to_sim') {
          const progress = Math.max(0, Math.min(1, (frames - p.staggerDelay * 0.5) / (MORPH_DURATION - 50)));
          const ease = easeInOutCubic(progress);

          tx = ex + (sx - ex) * ease;
          ty = ey + (sy - ey) * ease;
          tz = ez + (sz - ez) * ease;

          targetColor = blendColors(p.earthColor, p.simColor, ease);
          targetSize = p.earthSize + (p.simSize - p.earthSize) * ease;

          p.x += (tx - p.x) * 0.25;
          p.y += (ty - p.y) * 0.25;
          p.z += (tz - p.z) * 0.25;
          p.alpha = 0.9;
        } 
        else if (state === 'sim') {
          tx = sx;
          ty = sy;
          tz = sz;
          targetColor = p.simColor;
          targetSize = p.simSize;

          // Gentle spatial hovering float for the SIM card
          const wobbleX = Math.sin(gTime * 0.015 + p.phaseOffset) * 1.2;
          const wobbleY = Math.cos(gTime * 0.02 + p.phaseOffset) * 1.2;

          p.x += (tx + wobbleX - p.x) * 0.18;
          p.y += (ty + wobbleY - p.y) * 0.18;
          p.z += (tz - p.z) * 0.18;

          // Stream flow telemetry animation inside active circuit traces
          if (i > 4900) {
            const traceIdx = i - 4901;
            const flowProgress = (gTime * 0.008 + traceIdx * 0.03) % 1.0;
            p.alpha = Math.sin(flowProgress * Math.PI) * 0.85;
            targetColor = '#D4AF37'; // Golden streaming packets
            targetSize = 1.15;
          } else if (i > 3000 && i <= 4300 && Math.random() > 0.985) {
            // Flash random sparkles over contacts to suggest electronic life
            p.alpha = 1.0;
            targetColor = '#FFFFFF';
          } else {
            p.alpha = 0.85;
          }
        } 
        else if (state === 'morphing_to_earth') {
          const progress = Math.max(0, Math.min(1, (frames - p.staggerDelay * 0.5) / (MORPH_DURATION - 50)));
          const ease = easeInOutCubic(progress);

          tx = sx + (ex - sx) * ease;
          ty = sy + (ey - sy) * ease;
          tz = sz + (ez - sz) * ease;

          targetColor = blendColors(p.simColor, p.earthColor, ease);
          targetSize = p.simSize + (p.earthSize - p.simSize) * ease;

          p.x += (tx - p.x) * 0.25;
          p.y += (ty - p.y) * 0.25;
          p.z += (tz - p.z) * 0.25;
          p.alpha = 0.85;
        }

        p.color = targetColor;
        p.size = targetSize;

        // Projection mapping calculations
        const screenPt = getScreenCoords(p.x, p.y, p.z);
        const screenX = screenPt.x;
        const screenY = screenPt.y;
        const scale = screenPt.scale;

        // Skip render if out of viewport bounds
        if (screenX < 0 || screenX > canvas.width || screenY < 0 || screenY > canvas.height) {
          continue;
        }

        // Draw particle coordinates onto context
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;

        if (p.glow) {
          // Glow effects for metropolitan lights & coverage nodes
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 8 * scale;
          ctx.beginPath();
          ctx.arc(screenX, screenY, p.size * scale * 1.3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        } else {
          ctx.fillRect(screenX - (p.size * scale) / 2, screenY - (p.size * scale) / 2, p.size * scale, p.size * scale);
        }

        // Render coverage halos, pulses, and ripples
        if (i >= 3800 && i < 3812 && coverageAlpha > 0) {
          // 1. Core glowing halo & pulse
          const pulse = 1 + Math.sin(gTime * 0.045 + p.phaseOffset) * 0.18;
          ctx.fillStyle = '#D4AF37';
          ctx.globalAlpha = 0.07 * pulse * coverageAlpha;
          ctx.beginPath();
          ctx.arc(screenX, screenY, p.size * scale * 2.2 * pulse, 0, Math.PI * 2);
          ctx.fill();

          // 2. Expanding soft ripple every 3 seconds
          const rippleProgress = ((gTime + p.staggerDelay) % 180) / 180;
          const rippleRadius = rippleProgress * 25 * scale;
          const rippleAlpha = (1 - rippleProgress) * 0.35 * coverageAlpha;

          ctx.strokeStyle = '#D4AF37';
          ctx.lineWidth = 0.8;
          ctx.globalAlpha = rippleAlpha;
          ctx.beginPath();
          ctx.arc(screenX, screenY, rippleRadius, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      ctx.globalAlpha = 1.0;

      // Draw communication network routes between coverage nodes
      if (coverageAlpha > 0 && networkArcsRef.current.length > 0) {
        networkArcsRef.current.forEach(arc => {
          const nodeA = particles[arc.nodeAIdx];
          const nodeB = particles[arc.nodeBIdx];
          if (!nodeA || !nodeB) return;

          const mapWidth = Math.min(canvas.width * 0.88, 1050);
          const mapHeight = mapWidth * 0.45;

          const ptA = getScreenCoords(nodeA.earthNX * mapWidth, nodeA.earthNY * mapHeight, nodeA.earthNZ * mapWidth);
          const ptB = getScreenCoords(nodeB.earthNX * mapWidth, nodeB.earthNY * mapHeight, nodeB.earthNZ * mapWidth);

          const xA = ptA.x;
          const yA = ptA.y;
          const xB = ptB.x;
          const yB = ptB.y;

          const dx = xB - xA;
          const dy = yB - yA;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 1) return;

          // Pull curves outward proportionally to distance
          const midX = (xA + xB) / 2;
          const midY = (yA + yB) / 2;
          const normalX = -dy / dist;
          const normalY = dx / dist;

          const archHeight = dist * 0.22;
          const ctrlX = midX + normalX * archHeight;
          const ctrlY = midY + normalY * archHeight;

          // Draw the faint communication routing arc line
          ctx.strokeStyle = '#D4AF37';
          ctx.lineWidth = 0.5;
          ctx.globalAlpha = Math.sin(arc.progress * Math.PI) * 0.12 * coverageAlpha; // soft curve fade
          ctx.beginPath();
          ctx.moveTo(xA, yA);
          ctx.quadraticCurveTo(ctrlX, ctrlY, xB, yB);
          ctx.stroke();

          // Draw the single travelling golden communication packet
          const t = arc.progress;
          const sparkX = (1 - t) * (1 - t) * xA + 2 * (1 - t) * t * ctrlX + t * t * xB;
          const sparkY = (1 - t) * (1 - t) * yA + 2 * (1 - t) * t * ctrlY + t * t * yB;
          const scale = ptA.scale + (ptB.scale - ptA.scale) * t;

          ctx.shadowColor = '#D4AF37';
          ctx.shadowBlur = 6 * scale;
          ctx.fillStyle = '#D4AF37';
          ctx.globalAlpha = Math.sin(arc.progress * Math.PI) * 0.95 * coverageAlpha;
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 1.8 * scale, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#FFFFFF';
          ctx.globalAlpha = Math.sin(arc.progress * Math.PI) * 1.0 * coverageAlpha;
          ctx.beginPath();
          ctx.arc(sparkX, sparkY, 0.8 * scale, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        });
      }

      ctx.globalAlpha = 1.0;

      // Queue next frame
      animationRef.current = requestAnimationFrame(tick);
    };

    // Stagger / Easing Helpers
    const easeInOutCubic = (x: number): number => {
      return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    };

    const blendColors = (color1: string, color2: string, ratio: number): string => {
      const hex = (x: string) => {
        if (x.startsWith('#')) x = x.slice(1);
        if (x.length === 3) x = x.split('').map(char => char + char).join('');
        return {
          r: parseInt(x.slice(0, 2), 16),
          g: parseInt(x.slice(2, 4), 16),
          b: parseInt(x.slice(4, 6), 16)
        };
      };
      const r1 = hex(color1);
      const r2 = hex(color2);

      const r = Math.round(r1.r + (r2.r - r1.r) * ratio);
      const g = Math.round(r1.g + (r2.g - r1.g) * ratio);
      const b = Math.round(r1.b + (r2.b - r1.b) * ratio);

      return `rgb(${r},${g},${b})`;
    };

    tick();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="procedural-animation-viewport"
      className="fixed inset-0 w-full h-full -z-50 bg-[#000000] pointer-events-none"
    />
  );
}
