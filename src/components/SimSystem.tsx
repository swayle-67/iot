import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, RefreshCw, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function SimSystem() {
  const navigate = useNavigate();
  return (
    <section id="sim-system" className="py-20 sm:py-24 bg-white overflow-hidden text-left border-b border-gray-100">
      <motion.div 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Copy and Info */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Section Label: 14px, Medium (500), Metallic Gold, Uppercase, tracking 0.12em */}
            <span className="text-brand font-medium tracking-[0.12em] text-caption uppercase">
              Comprehensive IoT Solutions
            </span>
            {/* Heading XL: 48px, SemiBold (600), Line Height 56px, tracking -0.03em */}
            <h2 className="text-gray-900 font-semibold text-heading-xl tracking-[-0.03em] leading-[1.1] mt-2">
              Multi-network single SIM system
            </h2>
            
            {/* Custom Double Underline matching theme */}
            <div className="flex flex-col gap-0.5 mt-2.5 mb-8">
              <div className="w-16 h-[3px] bg-brand" />
              <div className="w-10 h-[2px] bg-gray-300" />
            </div>

            <p className="text-gray-600 text-body leading-relaxed mb-6">
              <strong className="text-gray-900 font-semibold">IoTConnect Global</strong> is a leading multi-network GSM MVNO based in South Africa, specializing in providing comprehensive IoT solutions with our managed multi-network single SIM system. We help businesses like yours streamline and secure their IoT connectivity across the globe.
            </p>
            
            <p className="text-gray-600 text-body-small leading-relaxed mb-6">
              Understanding the need for reliable connectivity, our solution ensures seamless switching between networks globally without the hassle of managing multiple contracts or SIMs. We proactively monitor network quality to ensure your devices remain locked onto the strongest signal.
            </p>

            <p className="text-gray-500 text-body-small leading-relaxed mb-6">
              We work closely with our clients to understand their unique needs and challenges, and we offer guidance and information to help them build the right solution for their specific requirements. Our deep expertise in IOT, combined with our commitment to customer satisfaction, has helped us earn a reputation as a leading IOT connectivity provider.
            </p>

            <motion.button
              id="sim-read-more-btn"
              onClick={() => {
                navigate('/about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="mb-8 inline-flex items-center gap-2 text-brand font-semibold text-xs uppercase tracking-wider hover:text-brand-dark transition-colors duration-300 group cursor-pointer"
            >
              <span>Read more about us</span>
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>

            {/* Interactive Feature Cards inside Single SIM */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="bg-brand/10 text-brand p-2 rounded-md shrink-0">
                  <Shield size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-base">Industrial grade</h4>
                  <p className="text-gray-600 text-xs mt-1">High-resistance silicon chips built to withstand extreme temperatures and vibration.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="bg-brand/10 text-brand p-2 rounded-md shrink-0">
                  <RefreshCw size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-base">Seamless roaming</h4>
                  <p className="text-gray-600 text-xs mt-1">Automated network-to-network switching with single data pool consolidation.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - SIM Image & Form Factor Explorer */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="relative group rounded-2xl overflow-hidden shadow-2xl border border-gray-200 bg-white">
              <img
                src="/src/assets/images/iot_sim_cards_1784461642170.jpg"
                alt="IoTConnect Premium Single SIM cards stacked"
                className="w-full h-auto object-cover transform group-hover:scale-102 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 bg-gray-900/90 text-white border border-gray-800 font-mono text-[10px] uppercase font-bold py-1 px-3.5 tracking-wider rounded-full backdrop-blur-xs">
                GSM MVNO South Africa
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}
