import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, ArrowUp, Send, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterProps {
  prefilledMessage: string;
  onClearPrefill: () => void;
}

export default function Footer({ prefilledMessage, onClearPrefill }: FooterProps) {
  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Contact Us Form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const [showScroll, setShowScroll] = useState(false);

  // Sync prefilled message from pricing tool to contact form message
  useEffect(() => {
    if (prefilledMessage) {
      setContactForm(prev => ({ 
        ...prev, 
        message: prefilledMessage 
      }));
      // Scroll smoothly to contact form section
      const contactElem = document.getElementById('contact-form-section');
      if (contactElem) {
        contactElem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [prefilledMessage]);

  // Track scroll position to show back to top button
  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    setNewsletterEmail('');
    setTimeout(() => {
      setNewsletterSubscribed(false);
    }, 5000);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.phone) return;
    setContactSubmitted(true);
    setContactForm({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
    onClearPrefill();
    setTimeout(() => {
      setContactSubmitted(false);
    }, 6000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="contact" 
      className="bg-[#050505] text-[#A8A8A8] py-12 sm:py-16 relative border-t border-white/10 scroll-mt-16 overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-x-0 bottom-0 h-96 bg-radial from-brand/5 via-transparent to-transparent pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-white/10">
          
          {/* COLUMN 1: Logo & Newsletter */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-8">
            <div>
              {/* Footer Logo */}
              <div 
                className="inline-flex flex-col items-start cursor-pointer group mb-6" 
                onClick={scrollToTop}
              >
                <div className="bg-white px-3 py-1.5 rounded-xl border border-gray-200/80 shadow-xs flex flex-col items-center gap-0.5 transition-transform duration-300 group-hover:scale-105">
                  <div className="flex items-center gap-1">
                    <span className="bg-black border border-brand/40 text-white font-bold font-display px-1.5 py-0.5 text-base sm:text-lg rounded tracking-tight flex items-center justify-center leading-none">
                      IO
                    </span>
                    <span className="text-gray-950 font-bold font-display text-base sm:text-lg tracking-tight leading-none">
                      t Connect
                    </span>
                  </div>
                  <span className="text-[6.5px] sm:text-[7px] uppercase tracking-[0.09em] font-bold font-tagline leading-none text-black block text-center whitespace-nowrap">
                    global | iot | connectivity
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed max-w-sm mb-6">
                Enterprise-grade M2M connectivity solutions, low-latency SIM infrastructure, and multi-network cellular coverage across SADC and global markets.
              </p>
            </div>

            {/* Newsletter Section */}
            <div className="bg-neutral-900/60 p-5 rounded-2xl border border-white/5 space-y-3">
              <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
                Subscribe our newsletter
              </h3>
              <p className="text-[11px] text-gray-400">
                Get network coverage updates and enterprise IoT insights directly to your inbox.
              </p>

              {newsletterSubscribed ? (
                <div className="bg-brand/10 border border-brand/30 text-brand rounded-xl p-3 text-xs flex items-center gap-2 animate-fade-in">
                  <CheckCircle size={16} className="shrink-0" />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-neutral-950 border border-white/10 text-white placeholder-neutral-500 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-brand flex-1 transition-colors"
                  />
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-brand hover:bg-[#E7C95B] text-[#050505] font-semibold text-xs px-4 py-2.5 rounded-xl transition-all duration-300 shrink-0 cursor-pointer uppercase tracking-wider"
                  >
                    Subscribe
                  </motion.button>
                </form>
              )}
            </div>
          </div>

          {/* COLUMN 2: Find us at */}
          <div className="lg:col-span-4 flex flex-col space-y-6">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white tracking-tight uppercase font-display flex items-center gap-2">
                <MapPin size={18} className="text-brand" />
                Find us at
              </h3>
            </div>

            <div className="space-y-4 text-xs text-gray-300">
              <div className="space-y-1.5">
                <span className="text-brand font-bold text-[11px] uppercase tracking-wider block">
                  MAIN OFFICE:
                </span>
                <p className="text-gray-300 leading-relaxed font-sans text-xs">
                  First Floor, Meridian Park, 39 Meridian Drive,<br />
                  Umhlanga, Durban, South Africa
                </p>
              </div>

              <div className="pt-2 space-y-3 border-t border-white/5">
                <div className="flex items-start gap-3">
                  <Phone size={15} className="text-brand shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <a href="tel:+27832122307" className="hover:text-brand transition-colors text-white font-mono text-xs block">
                      +27 83 212 2307
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={15} className="text-brand shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <a href="mailto:info@iotconnect.africa" className="hover:text-brand transition-colors text-gray-300 text-xs block">
                      info@iotconnect.africa
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 pt-1">
                  <Phone size={15} className="text-brand shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <a href="tel:+27716967818" className="hover:text-brand transition-colors text-white font-mono text-xs block">
                      +27 71 696 7818
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail size={15} className="text-brand shrink-0 mt-0.5" />
                  <div className="space-y-0.5">
                    <a href="mailto:sales@iotconnect.africa" className="hover:text-brand transition-colors text-gray-300 text-xs block">
                      sales@iotconnect.africa
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 3: Contact Us Form */}
          <div id="contact-form-section" className="lg:col-span-4 flex flex-col space-y-4">
            <div className="border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white tracking-tight uppercase font-display flex items-center gap-2">
                <Send size={18} className="text-brand" />
                Contact Us
              </h3>
            </div>

            {contactSubmitted ? (
              <div className="bg-neutral-900 border border-brand/30 rounded-2xl p-6 text-center space-y-3 animate-fade-in my-auto">
                <div className="w-12 h-12 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto border border-brand/30">
                  <CheckCircle size={28} />
                </div>
                <h4 className="text-white font-bold text-sm">Message Sent Successfully</h4>
                <p className="text-xs text-gray-400">
                  Thank you for reaching out. Our team in Durban will respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3">
                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-500 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-brand transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="Your Email"
                    value={contactForm.email}
                    onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-500 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-brand transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone Number"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-500 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-brand transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1">
                    Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="How can we help you?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-neutral-900/80 border border-white/10 text-white placeholder-neutral-500 rounded-xl px-3.5 py-2 text-xs focus:outline-none focus:border-brand transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand hover:bg-[#E7C95B] text-[#050505] font-bold text-xs py-2.5 rounded-xl uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Send size={13} />
                  Send message
                </motion.button>
              </form>
            )}
          </div>

        </div>

        {/* Corporate Legal bottom section */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center text-[11px] text-gray-500 font-mono gap-4">
          <span>&copy; {new Date().getFullYear()} IoTConnect Global GSM MVNO. All Rights Reserved.</span>
          <div className="flex gap-4">
            <a href="#sim-system" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#sim-system" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#sim-system" className="hover:text-white transition-colors">SADC SLA Map</a>
          </div>
        </div>

      </div>

      {/* Floating scroll to top button */}
      {showScroll && (
        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 bg-brand text-[#050505] hover:bg-[#E7C95B] p-3.5 rounded-full shadow-[0_0_20px_rgba(217,179,63,0.35)] transition-all duration-300 transform hover:scale-110 active:scale-95 border border-brand/40 cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp size={18} className="stroke-[2.5]" />
        </button>
      )}

    </footer>
  );
}

