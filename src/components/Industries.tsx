import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ShoppingCart, Settings, Zap, Truck, HardHat, Sprout, ShieldAlert, Heart, Activity } from 'lucide-react';
import { IndustryItem } from '../types';

export default function Industries() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fleet-logistics' | 'industrial-retail' | 'utilities-health'>('all');
  const [selectedIndustry, setSelectedIndustry] = useState<IndustryItem | null>(null);

  const industries: IndustryItem[] = [
    // POS, Manufacturing, Energy (Screenshot 1)
    {
      id: "pos",
      title: "Point of Sale (POS)",
      category: "industrial-retail",
      description: "Our IOT solutions for POS include real-time inventory tracking, customer behavior analytics, and mobile payments to help retailers streamline their operations and enhance the customer experience.",
      iconName: "shopping",
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      category: "industrial-retail",
      description: "Our IOT solutions for manufacturing include asset tracking, predictive maintenance, and quality control to help manufacturers improve production efficiency and reduce waste.",
      iconName: "settings",
      imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "energy",
      title: "Energy",
      category: "utilities-health",
      description: "Our IOT solutions for energy include smart metering, asset monitoring, and predictive maintenance to help energy companies optimize their operations and reduce downtime.",
      iconName: "zap",
      imageUrl: "https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=600&q=80"
    },
    // Vehicle Tracking, Mining, Agriculture (Screenshot 8)
    {
      id: "vehicle-tracking",
      title: "Vehicle Tracking",
      category: "fleet-logistics",
      description: "Our IOT solutions for vehicle tracking is a complete fleet monitoring, vehicle tracking and security tool that uses sensors and GPS to monitor and manage vehicles. A reliable solution accessible from anywhere in the world.",
      iconName: "truck",
      imageUrl: "https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "mining",
      title: "Mining",
      category: "industrial-retail",
      description: "Our IOT solutions for mining include equipment monitoring, personnel tracking, and safety monitoring to help mining companies improve operational efficiency and worker safety.",
      iconName: "hardhat",
      imageUrl: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "agriculture",
      title: "Agriculture",
      category: "fleet-logistics",
      description: "Our IOT solutions for agriculture include smart irrigation, soil monitoring, and livestock tracking to help farmers optimize crop yields and reduce waste.",
      iconName: "sprout",
      imageUrl: "https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=600&q=80"
    },
    // Healthcare, Logistics, Retail (Screenshot 9)
    {
      id: "healthcare",
      title: "Healthcare",
      category: "utilities-health",
      description: "Our IOT solutions for healthcare include remote patient monitoring, asset tracking, and real-time location services to help healthcare providers improve patient outcomes and streamline operations.",
      iconName: "heart",
      imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "logistics",
      title: "Logistics",
      category: "fleet-logistics",
      description: "Our IOT solutions for logistics include fleet management, supply chain optimization, and cargo tracking to help logistics providers improve efficiency and reduce costs.",
      iconName: "activity",
      imageUrl: "https://images.unsplash.com/photo-1494412519320-aa613dfb7738?auto=format&fit=crop&w=600&q=80"
    },
    {
      id: "retail",
      title: "Retail",
      category: "industrial-retail",
      description: "Our IOT solutions for retail include inventory management, customer tracking, and personalized marketing to help retailers improve customer engagement and drive sales.",
      iconName: "shopping",
      imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const getIcon = (name: string) => {
    switch (name) {
      case 'shopping': return <ShoppingCart size={18} />;
      case 'settings': return <Settings size={18} />;
      case 'zap': return <Zap size={18} />;
      case 'truck': return <Truck size={18} />;
      case 'hardhat': return <HardHat size={18} />;
      case 'sprout': return <Sprout size={18} />;
      case 'heart': return <Heart size={18} />;
      case 'activity': return <Activity size={18} />;
      default: return <Settings size={18} />;
    }
  };

  const getSpecsForIndustry = (id: string) => {
    switch (id) {
      case 'pos': return { data: '50MB - 100MB/mo', latency: '< 150ms', security: 'IPSec VPN Tunneling', roaming: 'Instant switching on fail' };
      case 'manufacturing': return { data: '500MB - 2GB/mo', latency: '< 50ms (Ultra-Low)', security: 'Private APN Network', roaming: 'Fixed Core Network' };
      case 'energy': return { data: '10MB - 30MB/mo', latency: '< 200ms', security: 'Encrypted payload keys', roaming: 'Multi-network South Africa' };
      case 'vehicle-tracking': return { data: '20MB - 50MB/mo', latency: '< 300ms', security: 'IMEI-SIM Locking', roaming: 'Seamless Cross-Border' };
      case 'mining': return { data: '1GB - 5GB/mo', latency: '< 80ms', security: 'Closed Private LAN', roaming: 'Deep-underground repeaters' };
      case 'agriculture': return { data: '5MB - 15MB/mo', latency: '< 1000ms (Delay Tolerant)', security: 'AES-128 Encryption', roaming: 'Rural satellite gateways' };
      case 'healthcare': return { data: '100MB - 500MB/mo', latency: '< 100ms', security: 'HIPAA compliant tunneling', roaming: 'Multi-carrier redundancy' };
      case 'logistics': return { data: '50MB - 200MB/mo', latency: '< 200ms', security: 'Hardware-level encryption', roaming: '785 Carrier handoffs' };
      case 'retail': return { data: '200MB - 1GB/mo', latency: '< 150ms', security: 'Standard SSL VPNs', roaming: 'Local dual-network' };
      default: return { data: '50MB/mo', latency: '< 200ms', security: 'Secure APN', roaming: 'Global switching' };
    }
  };

  const filteredIndustries = activeCategory === 'all' 
    ? industries 
    : industries.filter(item => item.category === activeCategory);

  return (
    <section id="industries" className="py-20 sm:py-24 bg-white scroll-mt-16 text-center border-b border-gray-100">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        
        {/* Header Block */}
        <span className="text-brand font-medium tracking-[0.12em] text-caption uppercase">
          Let's see our target
        </span>
        <h2 className="text-gray-900 font-semibold text-heading-xl tracking-[-0.03em] leading-tight mt-2">
          Our industry target
        </h2>

        {/* Double Underline */}
        <div className="flex flex-col items-center gap-0.5 mt-3 mb-10">
          <div className="w-16 h-[3px] bg-brand" />
          <div className="w-10 h-[2px] bg-gray-300" />
        </div>

        {/* Category Tabs filter bar */}
        <div id="industry-tabs" className="flex flex-wrap justify-center gap-2 mb-12 max-w-2xl mx-auto">
          <motion.button
            id="tab-all"
            onClick={() => setActiveCategory('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`py-2 px-5 text-xs font-medium tracking-[0.02em] rounded-md uppercase transition-colors cursor-pointer ${
              activeCategory === 'all' 
                ? 'bg-brand text-gray-950 font-semibold shadow-md' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-950 border border-gray-200'
            }`}
          >
            All Industries
          </motion.button>
          <motion.button
            id="tab-fleet"
            onClick={() => setActiveCategory('fleet-logistics')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`py-2 px-5 text-xs font-medium tracking-[0.02em] rounded-md uppercase transition-colors cursor-pointer ${
              activeCategory === 'fleet-logistics' 
                ? 'bg-brand text-gray-950 font-semibold shadow-md' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-950 border border-gray-200'
            }`}
          >
            Fleet & Logistics
          </motion.button>
          <motion.button
            id="tab-industrial"
            onClick={() => setActiveCategory('industrial-retail')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`py-2 px-5 text-xs font-medium tracking-[0.02em] rounded-md uppercase transition-colors cursor-pointer ${
              activeCategory === 'industrial-retail' 
                ? 'bg-brand text-gray-950 font-semibold shadow-md' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-950 border border-gray-200'
            }`}
          >
            Industrial & Retail
          </motion.button>
          <motion.button
            id="tab-utilities"
            onClick={() => setActiveCategory('utilities-health')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className={`py-2 px-5 text-xs font-medium tracking-[0.02em] rounded-md uppercase transition-colors cursor-pointer ${
              activeCategory === 'utilities-health' 
                ? 'bg-brand text-gray-950 font-semibold shadow-md' 
                : 'bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-950 border border-gray-200'
            }`}
          >
            Utilities & Health
          </motion.button>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <AnimatePresence mode="popLayout">
            {filteredIndustries.map((item) => (
              <motion.div
                key={item.id}
                id={`industry-card-${item.id}`}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 12 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -12 }}
                transition={{ type: "spring", stiffness: 320, damping: 28 }}
                className="bg-gray-50 border border-gray-200 hover:border-brand/30 rounded-xl overflow-hidden shadow-md flex flex-col group transition-all duration-300"
              >
                {/* Visual Thumbnail */}
                <div className="relative aspect-video overflow-hidden bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    referrerPolicy="no-referrer"
                  />
                  {/* Category icon tag overlay */}
                  <div className="absolute bottom-3 left-3 bg-white/95 text-brand p-2 rounded-lg border border-gray-250 flex items-center justify-center shadow-xs">
                    {getIcon(item.iconName)}
                  </div>
                </div>

                {/* Content block */}
                <div className="p-6 flex-1 flex flex-col items-start justify-between">
                  <div className="w-full">
                    <h3 className="font-semibold text-gray-900 text-lg tracking-tight leading-snug group-hover:text-brand transition-colors">
                      {item.title}
                    </h3>
                    
                    {/* Double Underline Accent under title */}
                    <div className="flex flex-col gap-0.5 mt-1.5 mb-4">
                      <div className="w-8 h-[2px] bg-brand" />
                      <div className="w-5 h-[1px] bg-gray-300" />
                    </div>

                    <p className="text-gray-650 text-xs sm:text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  {/* Read More Orange button */}
                  <button
                    id={`industry-readmore-${item.id}`}
                    onClick={() => setSelectedIndustry(item)}
                    className="w-full sm:w-auto bg-brand hover:bg-[#E7C95B] text-[#050505] font-medium text-xs py-2.5 px-6 rounded tracking-wider transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer shadow-md self-start"
                  >
                    Read more
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Dynamic Detail Overlay drawer modal - logical extension */}
      <AnimatePresence>
        {selectedIndustry && (
          <motion.div 
            id="industry-modal" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200 text-left"
            >
            {/* Header */}
            <div className="bg-gray-50 p-6 text-gray-900 flex justify-between items-start border-b border-gray-200">
              <div>
                <span className="text-brand font-medium text-xs tracking-widest uppercase font-mono block mb-1">
                  Target Specifications
                </span>
                <h3 className="font-semibold text-xl tracking-tight text-gray-900">
                  {selectedIndustry.title}
                </h3>
              </div>
              <button 
                id="close-ind-modal-btn"
                onClick={() => setSelectedIndustry(null)}
                className="text-gray-500 hover:text-gray-900 font-medium text-xs border border-gray-200 px-3 py-1.5 rounded-md hover:bg-gray-100 transition-all cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-gray-650 text-xs sm:text-sm leading-relaxed mb-6">
                {selectedIndustry.description}
              </p>

              <h4 className="font-semibold text-xs text-gray-900 uppercase tracking-widest mb-3">
                IoT Telemetry Benchmarks
              </h4>

              {/* Specs grid */}
              <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-200 mb-6">
                <div>
                  <span className="text-[10px] uppercase font-medium text-gray-500 block tracking-wide">Average Data Profile</span>
                  <span className="text-gray-900 font-semibold text-sm block mt-0.5">{getSpecsForIndustry(selectedIndustry.id).data}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-medium text-gray-500 block tracking-wide">Standard Device Latency</span>
                  <span className="text-gray-900 font-semibold text-sm block mt-0.5">{getSpecsForIndustry(selectedIndustry.id).latency}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-medium text-gray-500 block tracking-wide">Encryption Channel</span>
                  <span className="text-gray-900 font-semibold text-sm block mt-0.5">{getSpecsForIndustry(selectedIndustry.id).security}</span>
                </div>
                <div>
                  <span className="text-[10px] uppercase font-medium text-gray-500 block tracking-wide">Roaming Redundancy</span>
                  <span className="text-gray-900 font-semibold text-sm block mt-0.5">{getSpecsForIndustry(selectedIndustry.id).roaming}</span>
                </div>
              </div>

              {/* Quick action button inside */}
              <button
                id="ind-enquire-btn"
                onClick={() => setSelectedIndustry(null)}
                className="w-full bg-brand hover:bg-[#E7C95B] text-[#050505] font-medium tracking-wider py-3.5 rounded-lg text-sm text-center transition-all cursor-pointer shadow-md"
              >
                Enquire about {selectedIndustry.title}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>

    </section>
  );
}
