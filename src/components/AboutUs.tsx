import React from 'react';
import { Globe2, ShieldCheck, Cpu, ArrowRight, Network, CheckCircle2, Award } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-white scroll-mt-16 text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20 lg:space-y-28">
        
        {/* SECTION 1: Intro & BEE Level 1 / Network Overview */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Text */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <span className="text-brand font-semibold tracking-[0.10em] text-xs sm:text-sm uppercase font-mono bg-brand/10 px-3 py-1 rounded-full border border-brand/20 mb-3">
              the IOtConnect network is your key to global connectivity
            </span>
            
            <h2 className="text-gray-950 font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight mt-1">
              Let’s talk connectivity!
            </h2>

            {/* Accent divider line */}
            <div className="flex flex-col gap-0.5 mt-3 mb-6">
              <div className="w-20 h-[3px] bg-brand" />
              <div className="w-12 h-[2px] bg-gray-200" />
            </div>

            <p className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              <strong className="text-gray-950 font-semibold">IOtConnect Global</strong> is a pioneering IOT connectivity provider headquartered in South Africa. As a <strong className="text-gray-950 font-semibold">Black Economic Empowerment (BEE) Level 1</strong> company, it is committed to promoting diversity and inclusivity in the tech industry.
            </p>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
              IOtConnect Global is renowned for its cutting-edge technology and its ability to offer a single GSM SIM solution that provides coverage across approximately 785 networks in 195 countries worldwide. This comprehensive network coverage is one of the many reasons why IOtConnect Global is a preferred partner for businesses that require reliable and efficient global connectivity solutions. With its focus on innovation, quality, and customer satisfaction, IOtConnect Global is rapidly emerging as a key player in the IOT ecosystem. Whether you are looking to deploy IOT solutions on a small or large scale, IOtConnect Global has the expertise and technology to support your needs and help you achieve your business objectives.
            </p>

            {/* Quick Badges / Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 w-full pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-200/80">
                <Award className="w-5 h-5 text-brand shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-gray-900 uppercase tracking-wider font-mono">BEE Level 1</span>
                  <span className="block text-[11px] text-gray-500">100% Compliant</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-200/80">
                <Globe2 className="w-5 h-5 text-brand shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-gray-900 uppercase tracking-wider font-mono">195 Countries</span>
                  <span className="block text-[11px] text-gray-500">Global Reach</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 bg-gray-50 p-3 rounded-xl border border-gray-200/80 col-span-2 sm:col-span-1">
                <Network className="w-5 h-5 text-brand shrink-0" />
                <div>
                  <span className="block text-xs font-bold text-gray-900 uppercase tracking-wider font-mono">785 Networks</span>
                  <span className="block text-[11px] text-gray-500">Multi-Carrier</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Image with Accent frame */}
          <div className="lg:col-span-5">
            <div className="relative inline-block w-full">
              <div className="absolute top-[-12px] right-[-12px] w-[90%] h-[90%] border-t-[3px] border-r-[3px] border-brand rounded-tr-2xl z-0" />
              <div className="relative z-10 bg-gray-900 p-2 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <img
                  src="/src/assets/images/iot_city_network_1784461693206.jpg"
                  alt="IoT Connect Global Network Infrastructure"
                  className="rounded-xl w-full h-auto object-cover max-h-[420px]"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 absolute bottom-2 inset-x-2 rounded-b-xl text-white">
                  <span className="text-brand font-bold text-xs uppercase tracking-widest font-mono">South Africa HQ</span>
                  <p className="text-xs text-gray-200 font-medium mt-0.5">Global IoT GSM MVNO Architecture</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


        {/* CALLOUT BANNER: Built for IoT Deployments */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-10 lg:p-12 border border-white/10 relative overflow-hidden shadow-2xl"
        >
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl mx-auto text-center space-y-4">
            <span className="text-brand font-bold text-xs uppercase tracking-widest font-mono bg-brand/10 border border-brand/30 px-3 py-1 rounded-full inline-block">
              Built From The Ground Up
            </span>
            <p className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-100 leading-relaxed font-display">
              "The IOtConnect global mobile network, built for IOT deployments from the ground up, has the coverage and performance to provide reliable communications in any corner of the world for your connected devices. Partner with us and transform your business into globally connected one."
            </p>
          </div>
        </motion.div>


        {/* SECTION 2: Extensive Capabilities & Flexible Business Model */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
        >
          {/* Left Column: Image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative inline-block w-full">
              <div className="absolute bottom-[-12px] left-[-12px] w-[90%] h-[90%] border-b-[3px] border-l-[3px] border-brand rounded-bl-2xl z-0" />
              <div className="relative z-10 bg-gray-50 p-2 rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
                <img
                  src="/src/assets/images/iot_tablet_map_1784461673313.jpg"
                  alt="IoT Connect Capabilities and Telecommunications Experience"
                  className="rounded-xl w-full h-auto object-cover max-h-[420px]"
                  referrerPolicy="no-referrer"
                />
                <div className="bg-white p-4 border-t border-gray-200 rounded-b-xl flex items-center justify-between">
                  <div>
                    <span className="text-brand font-bold text-2xl font-display">25+ Years</span>
                    <span className="block text-[11px] uppercase tracking-wider text-gray-500 font-semibold font-mono">Telecom Heritage</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-900 font-bold text-sm block">Managed & Self-Managed</span>
                    <span className="text-xs text-gray-500 block">Flexible Deployment Models</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:col-span-7 flex flex-col items-start order-1 lg:order-2">
            <span className="text-brand font-semibold tracking-[0.10em] text-xs sm:text-sm uppercase font-mono bg-brand/10 px-3 py-1 rounded-full border border-brand/20 mb-3">
              Capabilities & Heritage
            </span>

            <h2 className="text-gray-950 font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight leading-tight mt-1">
              Extensive capabilities. Flexible business model.
            </h2>

            {/* Accent divider line */}
            <div className="flex flex-col gap-0.5 mt-3 mb-6">
              <div className="w-20 h-[3px] bg-brand" />
              <div className="w-12 h-[2px] bg-gray-200" />
            </div>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
              With over 25 years of experience in the IOT telecommunications industry, IOtConnect Global is a trusted partner for businesses seeking to deploy IOT solutions. Our team of experts has extensive knowledge and experience in designing, implementing, and managing IOT solutions across a wide range of industries. We work closely with our clients to understand their unique needs and challenges, and we offer guidance and information to help them build the right solution for their specific requirements. Our deep expertise in IOT, combined with our commitment to customer satisfaction, has helped us earn a reputation as a leading IOT connectivity provider. With IOtConnect Global, businesses can rely on our experience and expertise to help them navigate the complexities of IOT and achieve their strategic objectives.
            </p>

            <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-8">
              Our flexible business model allows you to deploy your IOT service in the style best suited to your needs. Available as a fully managed or self-managed service. Scale-as-you-grow implementation models help minimize upfront costs and improve time to ROI. Based on our heritage in telecoms, we offer an optimized wholesale business model that allows flexible pricing options – by the number of connected devices, amount of data used, low-cost, high QoS, usage quotas per device, selection of specific countries or networks and more.
            </p>

            {/* Closing banner */}
            <div className="w-full bg-brand/10 border-l-4 border-brand p-5 rounded-r-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-gray-950 font-bold text-base sm:text-lg font-display">
                  An exciting IOT world is waiting. Are you on the move?
                </h4>
                <p className="text-xs text-gray-600 mt-0.5">
                  Talk to our connectivity specialists in Durban to start your deployment today.
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-brand hover:bg-[#E7C95B] text-black font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all shrink-0 shadow-md"
              >
                Get Started <ArrowRight size={14} />
              </a>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}

