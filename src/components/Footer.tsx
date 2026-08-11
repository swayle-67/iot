import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, ArrowUp, Send, CheckCircle, Linkedin, Facebook } from 'lucide-react';
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
      className="bg-[#050505] text-[#A8A8A8] py-8 sm:py-10 relative border-t border-white/10 scroll-mt-16 overflow-hidden"
    >
      {/* Background ambient radial glow */}
      <div className="absolute inset-x-0 top-0 h-64 bg-radial from-brand/10 via-transparent to-transparent pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6 sm:space-y-8">
        
        {/* ================= TOP SECTION: Centralized Logo, Branding & Socials ================= */}
        <div className="flex flex-col items-center justify-center text-center space-y-2.5">
          <div 
            className="inline-flex flex-col items-center cursor-pointer group" 
            onClick={scrollToTop}
          >
            <div className="bg-white px-3.5 py-1.5 rounded-xl border border-gray-200/80 shadow-sm flex flex-col items-center gap-0.5 transition-transform duration-300 group-hover:scale-105">
              <div className="flex items-center gap-1">
                <span className="bg-black border border-brand/40 text-white font-bold font-display px-1.5 py-0.5 text-base sm:text-lg rounded tracking-tight flex items-center justify-center leading-none">
                  IO
                </span>
                <span className="text-gray-950 font-bold font-display text-base sm:text-lg tracking-tight leading-none">
                  t Connect
                </span>
              </div>
              <span className="text-[6.5px] sm:text-[7.5px] uppercase tracking-[0.12em] font-bold font-tagline leading-none text-black block text-center whitespace-nowrap">
                global | iot | connectivity
              </span>
            </div>
          </div>

          <p className="text-xs text-gray-400 leading-relaxed max-w-md text-center">
            Global M2M connectivity solutions, low-latency SIM infrastructure, and multi-network cellular coverage across SADC and global markets.
          </p>

          {/* Social Media Buttons */}
          <div className="flex items-center justify-center gap-2 pt-0.5">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              id="footer-social-linkedin"
              className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 hover:border-brand hover:bg-brand/10 text-gray-400 hover:text-brand flex items-center justify-center transition-all duration-300 group"
              title="Follow us on LinkedIn"
            >
              <Linkedin size={15} className="transition-transform duration-300 group-hover:scale-110" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              id="footer-social-facebook"
              className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 hover:border-brand hover:bg-brand/10 text-gray-400 hover:text-brand flex items-center justify-center transition-all duration-300 group"
              title="Follow us on Facebook"
            >
              <Facebook size={15} className="transition-transform duration-300 group-hover:scale-110" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (formerly Twitter)"
              id="footer-social-x"
              className="w-8 h-8 rounded-lg bg-neutral-900 border border-white/10 hover:border-brand hover:bg-brand/10 text-gray-400 hover:text-brand flex items-center justify-center transition-all duration-300 group"
              title="Follow us on X"
            >
              <svg className="w-3.5 h-3.5 fill-current transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>

        {/* ================= FADING SEPARATOR LINE ================= */}
        {/* Solid in the center, fading out to the edges, matching theme gold brand colors */}
        <div className="relative w-full py-0.5">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand/80 to-transparent" />
        </div>

        {/* ================= MIDDLE SECTION: Contact Info (Left) & Contact Us Form (Right) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* LEFT COLUMN: Contact Information */}
          <div className="lg:col-span-5 flex flex-col space-y-3.5">
            <div className="border-b border-white/10 pb-2">
              <h3 className="text-sm font-bold text-white tracking-tight uppercase font-display flex items-center gap-2">
                <MapPin size={16} className="text-brand" />
                Find Us
              </h3>
            </div>

            <div className="space-y-3 text-xs text-gray-300">
              {/* Office Address */}
              <div className="bg-neutral-900/50 p-3.5 rounded-xl border border-white/5 space-y-1">
                <span className="text-brand font-bold text-[11px] uppercase tracking-wider block font-mono">
                  Main Office:
                </span>
                <p className="text-gray-200 leading-relaxed font-sans text-xs">
                  First Floor, Meridian Park, 39 Meridian Drive,<br />
                  Umhlanga, Durban, South Africa
                </p>
              </div>

              {/* Inquiries & Sales Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-neutral-900/50 p-3 rounded-xl border border-white/5 space-y-1.5">
                  <span className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider block font-mono">
                    General Inquiries
                  </span>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-brand shrink-0" />
                    <a href="tel:+27832122307" className="hover:text-brand transition-colors text-white font-mono text-[11px] font-medium">
                      +27 83 212 2307
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-brand shrink-0" />
                    <a href="mailto:info@iotconnect.africa" className="hover:text-brand transition-colors text-gray-300 text-[11px] truncate">
                      info@iotconnect.africa
                    </a>
                  </div>
                </div>

                <div className="bg-neutral-900/50 p-3 rounded-xl border border-white/5 space-y-1.5">
                  <span className="text-gray-400 font-semibold text-[10px] uppercase tracking-wider block font-mono">
                    Enterprise Sales
                  </span>
                  <div className="flex items-center gap-2">
                    <Phone size={13} className="text-brand shrink-0" />
                    <a href="tel:+27716967818" className="hover:text-brand transition-colors text-white font-mono text-[11px] font-medium">
                      +27 71 696 7818
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={13} className="text-brand shrink-0" />
                    <a href="mailto:sales@iotconnect.africa" className="hover:text-brand transition-colors text-gray-300 text-[11px] truncate">
                      sales@iotconnect.africa
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Us Form */}
          <div id="contact-form-section" className="lg:col-span-7 flex flex-col space-y-3.5">
            <div className="border-b border-white/10 pb-2">
              <h3 className="text-sm font-bold text-white tracking-tight uppercase font-display flex items-center gap-2">
                <Send size={16} className="text-brand" />
                Contact Us
              </h3>
            </div>

            {contactSubmitted ? (
              <div className="bg-neutral-900 border border-brand/30 rounded-xl p-6 text-center space-y-2 animate-fade-in my-auto">
                <div className="w-10 h-10 bg-brand/10 text-brand rounded-full flex items-center justify-center mx-auto border border-brand/30">
                  <CheckCircle size={22} />
                </div>
                <h4 className="text-white font-bold text-sm">Message Sent Successfully</h4>
                <p className="text-xs text-gray-400 max-w-xs mx-auto">
                  Thank you for reaching out. Our team will respond to your inquiry shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-2.5 bg-neutral-900/40 p-4 sm:p-5 rounded-xl border border-white/5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1 font-mono">
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-neutral-950 border border-white/10 text-white placeholder-neutral-500 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1 font-mono">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-neutral-950 border border-white/10 text-white placeholder-neutral-500 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1 font-mono">
                    Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="Your Phone Number"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full bg-neutral-950 border border-white/10 text-white placeholder-neutral-500 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1 font-mono">
                    Message
                  </label>
                  <textarea
                    rows={2}
                    placeholder="How can we help you?"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    className="w-full bg-neutral-950 border border-white/10 text-white placeholder-neutral-500 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-brand transition-colors resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-brand hover:bg-[#E7C95B] text-[#050505] font-bold text-xs py-2.5 rounded-lg uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-md mt-0.5"
                >
                  <Send size={12} />
                  Send message
                </motion.button>
              </form>
            )}
          </div>

        </div>

        {/* ================= SECOND FADING SEPARATOR LINE ================= */}
        <div className="relative w-full py-0.5">
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        </div>

        {/* ================= BOTTOM SECTION: Centered Newsletter Portion ================= */}
        <div className="max-w-xl mx-auto text-center space-y-2.5 bg-neutral-900/50 p-4 sm:p-5 rounded-2xl border border-white/5">
          <div className="space-y-0.5">
            <h3 className="text-sm font-bold text-white tracking-tight uppercase font-display">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-[11px] text-gray-400 max-w-sm mx-auto">
              Get coverage updates and enterprise IoT insights directly to your inbox.
            </p>
          </div>

          {newsletterSubscribed ? (
            <div className="bg-brand/10 border border-brand/30 text-brand rounded-lg p-2.5 text-xs flex items-center justify-center gap-2 animate-fade-in max-w-md mx-auto">
              <CheckCircle size={15} className="shrink-0" />
              <span>Thank you for subscribing!</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-0.5">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-neutral-950 border border-white/10 text-white placeholder-neutral-500 rounded-lg px-3.5 py-2 text-xs focus:outline-none focus:border-brand flex-1 transition-colors"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-brand hover:bg-[#E7C95B] text-[#050505] font-bold text-xs px-5 py-2 rounded-lg transition-all duration-300 shrink-0 cursor-pointer uppercase tracking-wider"
              >
                Subscribe
              </motion.button>
            </form>
          )}
        </div>

        {/* ================= CORPORATE LEGAL BOTTOM BAR ================= */}
        <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-[10px] sm:text-[11px] text-gray-500 font-mono gap-3 text-center sm:text-left">
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
          className="fixed bottom-6 right-6 z-40 bg-brand text-[#050505] hover:bg-[#E7C95B] p-3 rounded-full shadow-[0_0_20px_rgba(217,179,63,0.35)] transition-all duration-300 transform hover:scale-110 active:scale-95 border border-brand/40 cursor-pointer"
          title="Scroll to Top"
        >
          <ArrowUp size={16} className="stroke-[2.5]" />
        </button>
      )}

    </footer>
  );
}