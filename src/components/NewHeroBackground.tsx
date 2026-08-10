import React, { useEffect, useRef } from 'react';
import { WORLD_DATA } from './worldData';

// Ported from the provided standalone hero (index.html + data.js): a canvas
// animation that cycles between a particle-rendered world map and a
// particle-formed SIM card. Mounted the same way ProceduralEngine was
// (fixed, full-viewport, behind all content) so it drops in as the new
// hero background without touching any surrounding markup or copy.
export default function NewHeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let W = 0, H = 0, DPR = 1;

    const MAP_ASPECT = 665.96301 / 1009.6727; // true world.svg height/width ratio
    let particles: any[] = [];
    let cityScaled: any[] = [];
    let mapScale = 0, mapOffX = 0, mapOffY = 0;

    const layoutState: { _simTargets?: any[]; _cardBounds?: any } = {};

    function shuffle(arr: any[]) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = arr[i]; arr[i] = arr[j]; arr[j] = t;
      }
    }

    function layout() {
      const mapWidth = Math.min(W * 0.72, 900);
      const mapHeight = mapWidth * MAP_ASPECT;
      mapScale = mapWidth;
      mapOffX = (W - mapWidth) / 2;
      mapOffY = (H - mapHeight) / 2 - H * 0.01;

      cityScaled = WORLD_DATA.cities.map((c: any) => {
        const ex = mapOffX + (c.nx + 0.5) * mapWidth;
        const ey = mapOffY + (c.ny + 0.5) * mapHeight;
        const cluster: any[] = [];
        if (c.premium) {
          const clusterCount = 5 + Math.floor(Math.random() * 4);
          for (let i = 0; i < clusterCount; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 6;
            cluster.push({
              ox: Math.cos(angle) * radius,
              oy: Math.sin(angle) * radius,
              size: 0.6 + Math.random() * 0.8,
              phase: Math.random() * Math.PI * 2
            });
          }
        }
        return { ex, ey, name: c.name, premium: c.premium, cluster };
      });

      const cardW = Math.min(W, H) * 0.30, cardH = cardW * 1.55;
      const cx0 = W / 2, cy0 = H / 2;
      const left = cx0 - cardW / 2, top = cy0 - cardH / 2;
      const rc = cardW * 0.09, notch = cardW * 0.40;

      function insideRounded(x: number, y: number) {
        if (x > left + cardW - rc && y < top + rc && Math.hypot(x - (left + cardW - rc), y - (top + rc)) > rc) return false;
        if (x < left + rc && y > top + cardH - rc && Math.hypot(x - (left + rc), y - (top + cardH - rc)) > rc) return false;
        if (x > left + cardW - rc && y > top + cardH - rc && Math.hypot(x - (left + cardW - rc), y - (top + cardH - rc)) > rc) return false;
        return true;
      }

      const simBody: any[] = [];
      let placed = 0, tries = 0;
      const bodyDensity = 1900;
      while (placed < bodyDensity && tries < bodyDensity * 8) {
        tries++;
        const x = left + Math.random() * cardW;
        const y = top + Math.random() * cardH;
        if ((x - left) + (y - top) < notch * 0.62) continue;
        if (!insideRounded(x, y)) continue;
        simBody.push([x, y, false]);
        placed++;
      }
      const chipW = cardW * 0.66, chipH = cardH * 0.62;
      const chipX = left + (cardW - chipW) / 2, chipY = top + cardH - chipH - cardH * 0.06;
      const chipDensity = 520;
      const padCols = 2, padRows = 3, gap = 0.11;
      for (let i = 0; i < chipDensity; i++) {
        const u = Math.random(), v = Math.random();
        const col = Math.floor(u * padCols), row = Math.floor(v * padRows);
        const fu = u * padCols - col, fv = v * padRows - row;
        if (fu < gap || fu > 1 - gap || fv < gap || fv > 1 - gap) continue;
        simBody.push([chipX + u * chipW, chipY + v * chipH, true]);
      }
      shuffle(simBody);
      layoutState._simTargets = simBody;
      layoutState._cardBounds = { left, top, cardW, cardH, rc };
    }

    function insideCardBounds(x: number, y: number) {
      const cb = layoutState._cardBounds;
      if (!cb) return true;
      const { left, top, cardW, cardH, rc } = cb;
      if (x < left || x > left + cardW || y < top || y > top + cardH) return false;
      if (x > left + cardW - rc && y < top + rc && Math.hypot(x - (left + cardW - rc), y - (top + rc)) > rc) return false;
      if (x < left + rc && y > top + cardH - rc && Math.hypot(x - (left + rc), y - (top + cardH - rc)) > rc) return false;
      if (x > left + cardW - rc && y > top + cardH - rc && Math.hypot(x - (left + cardW - rc), y - (top + cardH - rc)) > rc) return false;
      return true;
    }

    const N = 2600;
    function buildParticles() {
      layout();
      const mw = mapScale, mh = mapScale * MAP_ASPECT;
      const land = WORLD_DATA.landPoints;
      const simTargets = layoutState._simTargets!;

      particles = [];
      for (let i = 0; i < N; i++) {
        const lp = land[i % land.length];
        const ex = mapOffX + (lp[0] + 0.5) * mw + (Math.random() - 0.5) * 1.2;
        const ey = mapOffY + (lp[1] + 0.5) * mh + (Math.random() - 0.5) * 1.2;
        const isCoast = lp[2];
        const st = simTargets[i % simTargets.length];

        particles.push({
          x: ex, y: ey,
          ex, ey, sx: st[0], sy: st[1],
          fromX: ex, fromY: ey,
          coast: isCoast, chip: st[2],
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 0.7,
          delay: Math.random() * 0.35
        });
      }
    }

    function resize() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas!.clientWidth; H = canvas!.clientHeight;
      canvas!.width = W * DPR; canvas!.height = H * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildParticles();
    }

    let streams: any[] = [];
    const MAX_STREAMS = 2;
    let lastSpawn = -99999;

    function spawnStream(now: number) {
      const premium = cityScaled.filter((c) => c.premium);
      if (premium.length < 2) return;
      let a = Math.floor(Math.random() * premium.length);
      let b = Math.floor(Math.random() * premium.length);
      let tries = 0;
      while (a === b && tries < 5) { b = Math.floor(Math.random() * premium.length); tries++; }
      if (a === b) return;
      streams.push({ a: premium[a], b: premium[b], born: now, dur: 3600 + Math.random() * 1400 });
    }

    function drawStreams(now: number) {
      streams = streams.filter((s) => now - s.born < s.dur);
      ctx!.globalCompositeOperation = 'lighter';
      for (const s of streams) {
        const p = Math.min(1, (now - s.born) / s.dur);
        const a = s.a, b = s.b;
        const dx = b.ex - a.ex, dy = b.ey - a.ey;
        const dist = Math.hypot(dx, dy);
        if (dist < 1) continue;
        const nx = -dy / dist, ny = dx / dist;
        const bow = -dist * 0.12;
        const cx = (a.ex + b.ex) / 2 + nx * bow, cy = (a.ey + b.ey) / 2 + ny * bow;

        function pointAt(t: number) {
          const it = 1 - t;
          return [
            it * it * a.ex + 2 * it * t * cx + t * t * b.ex,
            it * it * a.ey + 2 * it * t * cy + t * t * b.ey
          ];
        }

        const tailLen = 0.14;
        const steps = 18;
        for (let i = 0; i < steps; i++) {
          const t1 = Math.max(0, p - tailLen * (i / steps));
          const t2 = Math.max(0, p - tailLen * ((i + 1) / steps));
          if (t1 <= 0 && t2 <= 0) continue;
          const [x1, y1] = pointAt(t1);
          const [x2, y2] = pointAt(t2);
          const segFade = (1 - i / steps) * Math.sin(p * Math.PI);

          ctx!.beginPath();
          ctx!.moveTo(x1, y1);
          ctx!.lineTo(x2, y2);
          ctx!.strokeStyle = `rgba(220,225,232,${0.22 * segFade})`;
          ctx!.lineWidth = 0.75;
          ctx!.stroke();
        }

        const [px, py] = pointAt(p);
        const fade = Math.sin(p * Math.PI);

        ctx!.beginPath();
        ctx!.fillStyle = `rgba(255,225,120,${0.55 * fade})`;
        ctx!.arc(px, py, 4 * fade + 1.2, 0, Math.PI * 2);
        ctx!.fill();

        ctx!.beginPath();
        ctx!.fillStyle = `rgba(255,240,170,${0.95 * fade})`;
        ctx!.arc(px, py, 2 * fade + 0.7, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalCompositeOperation = 'source-over';
    }

    const CYCLE = [
      { name: 'earth', dur: 20000 },
      { name: 'toSim', dur: 3500 },
      { name: 'sim', dur: 4000 },
      { name: 'toEarth', dur: 3500 },
    ];
    let stateIdx = 0, stateStart = 0;

    function ease(t: number) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

    function enterState(now: number) {
      stateStart = now;
      const s = CYCLE[stateIdx].name;
      if (s === 'toSim' || s === 'toEarth') {
        for (const p of particles) { p.fromX = p.x; p.fromY = p.y; }
      }
    }

    function render(now: number) {
      ctx!.fillStyle = '#000000';
      ctx!.fillRect(0, 0, W, H);

      const s = CYCLE[stateIdx];
      let t = (now - stateStart);
      if (t >= s.dur) {
        stateIdx = (stateIdx + 1) % CYCLE.length;
        enterState(now);
        t = 0;
      }

      const name = s.name;
      const showMap = (name === 'earth' || name === 'toSim' || name === 'toEarth');
      const mapAlpha = name === 'earth' ? 1 : name === 'toSim' ? 1 - ease(Math.min(1, t / s.dur)) : name === 'toEarth' ? ease(Math.min(1, t / s.dur)) : 0;

      if (showMap && mapAlpha > 0.02) drawStreams(now);

      if (name === 'earth' && streams.length < MAX_STREAMS && now - lastSpawn > 2600) {
        if (Math.random() < 0.55) spawnStream(now);
        lastSpawn = now;
      }

      ctx!.globalCompositeOperation = 'lighter';
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        let px, py, alpha, size, color;

        if (name === 'earth') {
          px = p.ex; py = p.ey;
          const tw = 0.85 + 0.15 * Math.sin(now * 0.0006 * p.speed + p.phase);
          alpha = tw;
          size = p.coast ? 1.6 : 1.15;
          color = p.chip
            ? `rgba(244,201,62,${0.75 * tw})`
            : (p.coast ? `rgba(205,210,216,${0.7 * tw})` : `rgba(115,121,130,${0.6 * tw})`);
        } else if (name === 'toSim' || name === 'toEarth') {
          const localT = Math.max(0, Math.min(1, (t - p.delay * s.dur * 0.25) / (s.dur * (1 - 0.2))));
          const pr = ease(localT);
          const toX = name === 'toSim' ? p.sx : p.ex;
          const toY = name === 'toSim' ? p.sy : p.ey;
          const bulge = Math.sin(pr * Math.PI) * 10;
          px = p.fromX + (toX - p.fromX) * pr;
          py = p.fromY + (toY - p.fromY) * pr - bulge;

          const earthAlpha = 0.85 + 0.15 * Math.sin(now * 0.0006 * p.speed + p.phase);
          alpha = earthAlpha + (0.95 - earthAlpha) * pr;

          const earthSize = p.coast ? 1.6 : 1.15;
          const targetSize = p.coast || p.chip ? 1.4 : 1.05;
          size = earthSize + (targetSize - earthSize) * pr;

          const earthColor = p.chip ? [244, 201, 62, 0.75] : (p.coast ? [205, 210, 216, 0.7] : [115, 121, 130, 0.6]);
          const targetColor = p.chip ? [244, 201, 62, 0.9] : [200, 205, 212, 0.7];
          const cr = earthColor[0] + (targetColor[0] - earthColor[0]) * pr;
          const cg = earthColor[1] + (targetColor[1] - earthColor[1]) * pr;
          const cb = earthColor[2] + (targetColor[2] - earthColor[2]) * pr;
          const ca = earthColor[3] + (targetColor[3] - earthColor[3]) * pr;
          color = `rgba(${cr.toFixed(1)},${cg.toFixed(1)},${cb.toFixed(1)},${ca.toFixed(2)})`;

          if (name === 'toSim' && !insideCardBounds(px, py)) {
            alpha = 0;
          }
        } else {
          px = p.sx; py = p.sy;
          const shimmer = p.chip ? (0.7 + 0.3 * Math.sin(now * 0.003 + p.phase)) : 1;
          alpha = shimmer;
          size = p.chip ? 1.4 : 1.1;
          color = p.chip ? `rgba(244,201,62,${0.95 * shimmer})` : `rgba(110,115,124,0.85)`;
        }

        ctx!.fillStyle = color as string;
        ctx!.globalAlpha = alpha as number;
        ctx!.fillRect(px - (size as number) / 2, py - (size as number) / 2, size as number, size as number);
        p.x = px; p.y = py;
      }
      ctx!.globalAlpha = 1;
      ctx!.globalCompositeOperation = 'source-over';

      if (showMap && mapAlpha > 0.02) {
        ctx!.save();
        ctx!.globalAlpha = mapAlpha;
        ctx!.globalCompositeOperation = 'lighter';
        for (const c of cityScaled) {
          if (!c.premium) continue;
          const twBase = 0.85 + 0.15 * Math.sin(now * 0.0009 + c.ex * 0.01);

          ctx!.beginPath();
          ctx!.fillStyle = `rgba(244,201,62,${0.10 * twBase})`;
          ctx!.arc(c.ex, c.ey, 12 * twBase, 0, Math.PI * 2);
          ctx!.fill();

          for (const pt of c.cluster) {
            const tw = 0.6 + 0.4 * Math.sin(now * 0.0012 + pt.phase);
            const px = c.ex + pt.ox;
            const py = c.ey + pt.oy;

            ctx!.beginPath();
            ctx!.fillStyle = `rgba(244,201,62,${0.18 * tw})`;
            ctx!.arc(px, py, pt.size * 2.2, 0, Math.PI * 2);
            ctx!.fill();

            ctx!.beginPath();
            ctx!.fillStyle = `rgba(255,235,150,${0.5 * tw})`;
            ctx!.arc(px, py, pt.size, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
        ctx!.restore();
        ctx!.globalCompositeOperation = 'source-over';
      }

      rafRef.current = requestAnimationFrame(render);
    }

    enterState(0);
    window.addEventListener('resize', resize);
    resize();
    rafRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
