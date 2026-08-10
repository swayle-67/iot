import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Globe, Cpu, Radio } from 'lucide-react';

interface HeroCarouselProps {
  onCtaClick: () => void;
}

const HERO_PHRASES = [
  "ONE SIM for a global business",
  "Turnkey Solutions",
  "Multi-Network Connectivity"
];

export default function HeroCarousel({ onCtaClick }: HeroCarouselProps) {
  const [latLon, setLatLon] = useState({ lat: -26.2041, lon: 28.0473 });
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [hudState, setHudState] = useState({
    mode: 'GLOBAL EARTH MESH',
    nodes: '12/12 ONLINE',
    signal: 98,
    packetRate: '124 p/s',
    activeRoute: 'CAPE TOWN ⇄ LONDON'
  });

  useEffect(() => {
    const phraseTimer = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % HERO_PHRASES.length);
    }, 3500);
    return () => clearInterval(phraseTimer);
  }, []);

  useEffect(() => {
    const routes = [
      'CAPE TOWN ⇄ LONDON',
      'JOHANNESBURG ⇄ DUBAI',
      'NEW YORK ⇄ TOKYO',
      'SINGAPORE ⇄ SYDNEY',
      'DURBAN ⇄ PARIS'
    ];
    let routeIdx = 0;
    const interval = setInterval(() => {
      const modeTimer = (Date.now() / 1000) % 56; // Syncs roughly with ProceduralEngine timeline!
      const isSim = modeTimer > 40 && modeTimer < 49;
      setHudState({
        mode: isSim ? 'INTEGRATED eSIM PROFILE' : 'GLOBAL EARTH MESH',
        nodes: isSim ? 'SECURE PRIVATE CHIP' : '12/12 NODES ACTIVE',
        signal: Math.floor(92 + Math.random() * 8),
        packetRate: Math.floor(115 + Math.random() * 45) + ' p/s',
        activeRoute: routes[routeIdx % routes.length]
      });

      // Shift coordinate systems slightly near actual corporate IoT endpoints
      const corporateCoords = [
        { lat: -26.2041, lon: 28.0473 }, // Joburg
        { lat: 51.5074, lon: -0.1278 },  // London
        { lat: 25.2048, lon: 55.2708 },  // Dubai
        { lat: 1.3521, lon: 103.8198 },  // Singapore
        { lat: -33.8688, lon: 151.2093 } // Sydney
      ];
      const selectedHub = corporateCoords[Math.floor(Math.random() * corporateCoords.length)];
      setLatLon({
        lat: Number((selectedHub.lat + (Math.random() - 0.5) * 1.5).toFixed(4)),
        lon: Number((selectedHub.lon + (Math.random() - 0.5) * 1.5).toFixed(4))
      });

      routeIdx++;
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative w-full h-[140vh] bg-transparent overflow-hidden select-none">
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {/* Soft atmospheric radial glow to enhance readability and depth - dynamic pulse animation */}
        <motion.div 
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.6, 0.85, 0.6],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand/5 rounded-full blur-[160px]" 
        />
      </div>

      {/* Screen Viewport wrapper for centered content */}
      <div className="absolute top-0 left-0 w-full h-screen z-20 flex flex-col justify-between pt-20">
        
        {/* Main Content Area */}
        <div className="flex-1 flex items-center justify-center bg-transparent z-20">
          <div className="absolute inset-0 flex flex-col justify-center z-20 text-left px-4 sm:px-6 lg:px-8 bg-transparent pt-12">
            <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Core Hero Text and CTAs */}
              <div className="lg:col-span-7 flex flex-col items-start">
                {/* Animated Dynamic Title - Clean typography with rotating phrases */}
                <div className="overflow-hidden py-1 w-full text-left min-h-[110px] sm:min-h-[140px] md:min-h-[160px] flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.h1
                      key={phraseIndex}
                      initial={{ opacity: 0, y: 25, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -25, filter: "blur(6px)" }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="text-[#F5F5F5] font-bold text-4xl sm:text-5xl md:text-6xl tracking-[-0.03em] leading-[1.1] filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] text-left font-display"
                    >
                      {HERO_PHRASES[phraseIndex]}
                    </motion.h1>
                  </AnimatePresence>
                </div>

                {/* Animated Subtext - Luxurious clip-path vertical mask reveal with custom bezier curve */}
                <div className="overflow-hidden py-1 w-full text-left mt-6">
                  <motion.p
                    initial={{ opacity: 0, y: "40%", clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)", filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", filter: "blur(0px)" }}
                    transition={{ delay: 0.45, duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
                    className="text-[#A8A8A8] text-body-large text-left max-w-[560px]"
                  >
                    Connecting devices and streams worldwide with a single multi-network SIM offering reliable coverage in 195 countries across 785 networks.
                  </motion.p>
                </div>

                {/* Animated Button - Soft slide and scale reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.98, filter: "blur(3px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.6, duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
                  className="mt-8 text-left"
                >
                  <motion.button
                    id="hero-cta-btn"
                    onClick={onCtaClick}
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 35px -8px rgba(212, 175, 55, 0.4)" }}
                    whileTap={{ scale: 0.96 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                    className="relative group bg-brand text-[#050505] hover:bg-[#E7C95B] font-semibold tracking-[0.02em] text-base py-4 px-10 sm:px-14 rounded-xl shadow-2xl transition-colors duration-300 cursor-pointer overflow-hidden border border-brand/30"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      Free consultation
                    </span>
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out" />
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Column: Glassmorphic Telemetry HUD Dashboard Overlay */}
              <motion.div 
                initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                transition={{ delay: 0.5, duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
                className="hidden lg:col-span-5 lg:flex flex-col relative z-30"
              >
              </motion.div>

            </div>
          </div>
        </div>
      </div>

      {/* Deep cinematic fade-out transitions to white background at bottom of viewport */}
      <div className="absolute bottom-0 left-0 right-0 h-[65vh] bg-gradient-to-b from-transparent via-[#000000]/40 to-[#000000] pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-[45vh] bg-gradient-to-b from-[#000000]/0 via-[#000000] via-white/10 to-white pointer-events-none z-15" />
    </section>
  );
}
