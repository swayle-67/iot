import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeartPulse, Boxes, Zap, Headset, X, ShieldCheck, Award, Briefcase, Smile } from 'lucide-react';
import { ReasonItem } from '../types';
import { motion } from 'motion/react';

export default function Reasons() {
  const navigate = useNavigate();
  const [selectedReason, setSelectedReason] = useState<ReasonItem | null>(null);

  const reasons: ReasonItem[] = [
    {
      id: 1,
      badge: "We always do",
      title: "Quality work",
      description: "Our team of experts has extensive knowledge and experience in designing, implementing, and managing IOT solutions across a wide range of industries.",
      icon: "pulse"
    },
    {
      id: 2,
      badge: "We deal with",
      title: "Multi projects",
      description: "Whether you are looking to deploy IOT solutions on a small or large scale, we have the expertise and technology to support your needs and help you achieve your objectives.",
      icon: "boxes"
    },
    {
      id: 3,
      badge: "We always use",
      title: "Updated tech",
      description: "IoTConnect Global is renowned for its cutting-edge technology and its ability to offer a single GSM SIM solution that provides coverage across approximately 785 networks in 195 countries worldwide.",
      icon: "tech"
    },
    {
      id: 4,
      badge: "Client happy with",
      title: "Client support",
      description: "With its focus on innovation, quality, and customer satisfaction, IoTConnect Global is rapidly emerging as a key player in the IOT telecommunications space, backed by 24/7 technical assistance and dedicated service delivery.",
      icon: "support"
    }
  ];

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'pulse': return <HeartPulse className="text-brand w-8 h-8" />;
      case 'boxes': return <Boxes className="text-brand w-8 h-8" />;
      case 'tech': return <Zap className="text-brand w-8 h-8" />;
      case 'support': return <Headset className="text-brand w-8 h-8" />;
      default: return <HeartPulse className="text-brand w-8 h-8" />;
    }
  };

  return (
    <section id="reasons" className="relative bg-white border-y border-gray-100 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
        
        {/* Left Side: Amber Highlight block with scroll slide-in */}
        <motion.div 
          className="lg:col-span-5 relative min-h-[380px] sm:min-h-[440px] lg:min-h-full flex flex-col justify-center px-6 sm:px-12 py-16 text-white overflow-hidden bg-transparent"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          
          {/* Background image overlay with golden/amber tint */}
          <div className="absolute inset-0 z-0 bg-gradient-to-br from-brand/90 to-[#050505]/95 mix-blend-multiply opacity-90" />
          <img
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
            alt="Reasons to connect with IoTConnect"
            className="absolute inset-0 w-full h-full object-cover z-0 filter saturate-50 brightness-50 opacity-20"
            referrerPolicy="no-referrer"
          />

          <div className="relative z-10 flex flex-col items-start max-w-md">
            {/* Headline is Display L size */}
            <h2 className="text-[#F5F5F5] font-bold text-3xl sm:text-4xl tracking-[-0.03em] leading-tight">
              Reasons to work with us
            </h2>
            
            {/* Double Underline matching theme */}
            <div className="flex flex-col gap-0.5 mt-2.5 mb-6">
              <div className="w-16 h-[3px] bg-white" />
              <div className="w-10 h-[2px] bg-brand" />
            </div>

            <p className="text-[#F5F5F5]/90 text-base leading-relaxed mb-8">
              With over 25 years of experience in the IOT telecommunications industry, IoTConnect Global is a trusted partner for businesses seeking IOT solutions.
            </p>

            <motion.button
              id="reasons-read-more-btn"
              onClick={() => {
                navigate('/about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="border-2 border-white hover:bg-white hover:text-[#050505] text-[#F5F5F5] font-medium tracking-[0.02em] text-base py-3 px-8 rounded transition-colors duration-300 cursor-pointer"
            >
              Read more
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side: Features Grid - Consistently white layout with fade in */}
        <motion.div 
          className="lg:col-span-7 bg-white px-6 sm:px-12 py-16 lg:py-20 flex items-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 w-full max-w-4xl mx-auto">
            {reasons.map((item) => (
              <div 
                key={item.id} 
                id={`reason-card-${item.id}`}
                className="flex flex-col items-start text-left p-6 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 hover:border-brand/20 transition-all duration-300 group cursor-pointer shadow-sm"
                onClick={() => setSelectedReason(item)}
              >
                {/* Header Icon + Badge Label */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gray-200/50 rounded-lg group-hover:bg-brand/10 transition-colors duration-300">
                    {getIconComponent(item.icon)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-gray-500 font-medium text-[10px] sm:text-xs tracking-wider uppercase leading-none">
                      {item.badge}
                    </span>
                    <h3 className="text-gray-900 font-semibold text-base sm:text-lg tracking-tight mt-1 leading-none group-hover:text-brand transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                  {item.description}
                </p>
                
                <span className="text-brand font-medium text-xs mt-3 inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Read detail →
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Detail overlay Modal for Reasons - Polished UI extension in light mode */}
      {selectedReason && (
        <div id="reason-modal" className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-gray-200 text-gray-900">
            {/* Modal header branding banner */}
            <div className="bg-gray-50 p-6 text-gray-900 flex justify-between items-start border-b border-gray-200">
              <div>
                <span className="text-brand font-medium text-xs tracking-widest uppercase font-mono block mb-1">
                  {selectedReason.badge}
                </span>
                <h3 className="font-semibold text-xl tracking-tight text-gray-900">
                  {selectedReason.title}
                </h3>
              </div>
              <button 
                id="close-modal-btn"
                onClick={() => setSelectedReason(null)}
                className="text-gray-500 hover:text-gray-900 p-1.5 hover:bg-gray-200 rounded-full transition-all cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200">
                <div className="p-4 bg-brand/10 text-brand rounded-xl">
                  {getIconComponent(selectedReason.icon)}
                </div>
                <div>
                  <span className="text-gray-500 font-medium text-xs">IoTConnect Global advantage</span>
                  <div className="flex items-center gap-1.5 text-gray-900 font-semibold text-sm mt-0.5">
                    <ShieldCheck size={16} className="text-brand" />
                    Verified Telecommunications Partner
                  </div>
                </div>
              </div>

              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                {selectedReason.description}
              </p>

              {/* Grid of details */}
              <div className="grid grid-cols-2 gap-3 mb-6 bg-gray-50 p-4 rounded-xl border border-gray-200 text-left">
                <div className="flex items-center gap-2">
                  <Award className="text-brand shrink-0" size={16} />
                  <span className="text-gray-600 text-xs font-medium">ISO Certified Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="text-brand shrink-0" size={16} />
                  <span className="text-gray-600 text-xs font-medium">25+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="text-brand shrink-0" size={16} />
                  <span className="text-gray-600 text-xs font-medium">Automated Fallback</span>
                </div>
                <div className="flex items-center gap-2">
                  <Smile className="text-brand shrink-0" size={16} />
                  <span className="text-gray-600 text-xs font-medium">24/7 Client Desk</span>
                </div>
              </div>

              <button
                id="reason-modal-cta"
                onClick={() => setSelectedReason(null)}
                className="w-full bg-brand hover:bg-[#E7C95B] text-[#050505] font-medium tracking-wider py-3.5 rounded-lg text-base shadow-md transition-all cursor-pointer"
              >
                Request free consultation
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
