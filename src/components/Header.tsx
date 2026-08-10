import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Smartphone, Download, QrCode } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { SEARCH_INDEX } from '../searchIndex';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [appModalOpen, setAppModalOpen] = useState(false);
  const [downloadState, setDownloadState] = useState<'idle' | 'iOS' | 'Android'>('idle');

  const filteredResults = searchQuery.trim()
  ? SEARCH_INDEX.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.keywords.some(k => k.includes(searchQuery.toLowerCase()))
    )
  : [];

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About us', path: '/about' },
    { label: 'Industries', path: '/industries' },
    { label: 'Coverage', path: '/coverage' },
    { label: 'Pricing', path: '/pricing' },
    { label: 'Contact us', path: '/contact' },
  ];

  // Header is consistently dark to match the global #050505 background theme
  const isDarkHeader = true;

  const handleNavClick = (path: string) => {
    setIsOpen(false);
    if (path === '/contact') {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById('contact');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 150);
      } else {
        const el = document.getElementById('contact');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    } else {
      navigate(path);
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  };

  const handleSearchSelect = (path: string) => {
    navigate(path);
    setSearchQuery('');
    setSearchOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header 
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md ${
        isScrolled 
          ? 'py-2 shadow-md bg-white/95 border-b border-gray-200/80 text-gray-950' 
          : 'py-3 bg-black/85 border-b border-white/10 text-[#F5F5F5]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between transition-all duration-300 h-12 sm:h-14">
          
          {/* Logo Column - Aligned to Left */}
          <div className="flex items-center shrink-0 min-w-[170px] lg:min-w-[210px] justify-start">
            <motion.button 
              id="logo-button"
              onClick={() => handleNavClick('/')} 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex flex-col items-start focus:outline-none cursor-pointer group text-left"
            >
              {isScrolled ? (
                /* Original Logo Colors when scrolled (Light Navbar theme) */
                <div className="bg-white px-2.5 py-1 rounded-xl border border-gray-200/80 shadow-xs flex flex-col items-center gap-0.5 transition-all duration-300">
                  <div className="flex items-center gap-1">
                    <span className="bg-black border border-brand/40 text-white font-bold font-display px-1.5 py-0.5 text-base sm:text-lg rounded tracking-tight transition-all duration-300 flex items-center justify-center leading-none">
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
              ) : (
                /* Inverted Logo Colors when on Landing Page / top (Dark Navbar theme) */
                <div className="bg-black/90 px-2.5 py-1 rounded-xl border border-white/20 shadow-sm flex flex-col items-center gap-0.5 transition-all duration-300">
                  <div className="flex items-center gap-1">
                    <span className="bg-white border border-brand/40 text-black font-bold font-display px-1.5 py-0.5 text-base sm:text-lg rounded tracking-tight transition-all duration-300 flex items-center justify-center leading-none">
                      IO
                    </span>
                    <span className="text-white font-bold font-display text-base sm:text-lg tracking-tight leading-none">
                      t Connect
                    </span>
                  </div>
                  <span className="text-[6.5px] sm:text-[7px] uppercase tracking-[0.09em] font-bold font-tagline leading-none text-white/90 block text-center whitespace-nowrap">
                    global | iot | connectivity
                  </span>
                </div>
              )}
            </motion.button>
          </div>
 
          {/* Desktop Navigation Column - Strictly Centralized */}
          <div className="hidden md:flex flex-1 items-center justify-center px-2">
            <nav 
              id="desktop-nav" 
              className={`relative flex items-center gap-1 lg:gap-1.5 rounded-full p-1 lg:p-1.5 backdrop-blur-md transition-all duration-300 ${
                isScrolled
                  ? 'bg-black/[0.04] border border-black/10 shadow-sm'
                  : 'bg-white/[0.04] border border-white/10 shadow-lg shadow-black/40'
              }`}
            >
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <button
                    key={item.path}
                    id={`nav-item-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    onClick={() => handleNavClick(item.path)}
                    className={`relative text-xs lg:text-sm font-medium tracking-[0.02em] whitespace-nowrap px-3.5 lg:px-4 py-1.5 rounded-full cursor-pointer transition-colors duration-200 focus:outline-none ${
                      isActive 
                        ? 'text-brand font-semibold'
                        : isScrolled
                          ? 'text-gray-600 hover:text-black'
                          : 'text-[#A8A8A8] hover:text-[#F5F5F5]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeNavPill"
                        className="absolute inset-0 bg-brand/10 border border-brand/30 rounded-full shadow-[0_0_12px_rgba(217,179,63,0.15)]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Block - Search & Get the App aligned to right end */}
          <div className="hidden md:flex items-center justify-end shrink-0 min-w-[170px] lg:min-w-[210px] gap-2.5 lg:gap-3.5">
            {/* Search Box / Toggle */}
            <div className="relative flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.input
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 150, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`border rounded-full py-1.5 px-3.5 text-xs lg:text-sm mr-2 focus:outline-none font-normal shadow-inner transition-colors duration-300 ${
                      isScrolled
                        ? 'bg-white border-gray-300 text-gray-900 focus:border-brand'
                        : 'bg-[#050505] border-white/20 text-[#F5F5F5] focus:border-brand'
                    }`}
                  />
                )}
              </AnimatePresence>
              <motion.button
                id="search-toggle-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`rounded-full border transition-all duration-300 focus:outline-none cursor-pointer hover:text-brand shadow-xs h-9 w-9 flex items-center justify-center shrink-0 ${
                  isScrolled
                    ? 'border-black/10 bg-black/5 hover:bg-black/10 text-gray-700'
                    : 'border-white/10 bg-white/5 hover:bg-white/10 text-[#A8A8A8]'
                }`}
                title="Search"
              >
                <Search size={15} />
              </motion.button>

              {/* Desktop search results dropdown */}
              {searchOpen && filteredResults.length > 0 && (
                <div className="absolute top-full mt-2 left-0 w-56 bg-[#0D0D0D] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                  {filteredResults.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleSearchSelect(item.path)}
                      className="w-full text-left px-4 py-2 text-sm text-[#F5F5F5] hover:bg-white/10 transition-colors cursor-pointer"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* "Get the App" solid styled brand button */}
            <motion.button
              id="get-app-btn"
              onClick={() => setAppModalOpen(true)}
              whileHover={{ scale: 1.03, boxShadow: '0 0 20px rgba(217,179,63,0.35)' }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 350, damping: 20 }}
              className="bg-brand text-[#050505] hover:bg-[#E7C95B] px-5 py-2 rounded-full text-xs lg:text-sm font-semibold tracking-[0.02em] transition-colors duration-300 cursor-pointer focus:outline-none shrink-0 shadow-md border border-brand/30 whitespace-nowrap h-9 flex items-center justify-center"
            >
              Get the App
            </motion.button>
          </div>
 
          {/* Mobile controls - Hamburger for mobile viewports */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              id="search-toggle-mobile"
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                isScrolled
                  ? 'border-black/10 bg-black/5 hover:bg-black/10 text-gray-700 hover:text-brand'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 text-[#A8A8A8] hover:text-brand'
              }`}
            >
              <Search size={18} />
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg border transition-all active:scale-95 focus:outline-none cursor-pointer ${
                isScrolled
                  ? 'border-black/10 bg-black/5 hover:bg-black/10 text-gray-700 hover:text-brand'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 text-[#A8A8A8] hover:text-brand'
              }`}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>
 
      {/* Mobile Search input block */}
      {searchOpen && (
        <div className={`border-b px-4 py-2.5 animate-slide-down md:hidden ${
          isScrolled ? 'bg-white border-gray-200' : 'bg-slate-950 border-white/5'
        }`}>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search services, SIMs, industries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`flex-1 border rounded-md py-2 px-3 text-base focus:outline-none ${
                isScrolled
                  ? 'bg-gray-100 border-gray-300 text-gray-900 focus:border-brand'
                  : 'bg-slate-900 border-white/10 text-white focus:border-brand'
              }`}
            />
            <button
              id="mobile-search-btn"
              onClick={() => {
                if (filteredResults[0]) handleSearchSelect(filteredResults[0].path);
              }}
              className="bg-brand text-[#050505] px-4 py-2 rounded font-medium text-base cursor-pointer"
            >
              Go
            </button>
          </div>

          {/* Mobile search results dropdown */}
          {filteredResults.length > 0 && (
            <div className="mt-2 bg-slate-900 border border-white/10 rounded-md overflow-hidden">
              {filteredResults.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleSearchSelect(item.path)}
                  className="w-full text-left px-4 py-3 text-sm text-white hover:bg-white/10"
                >
                  {item.title}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
 
      {/* Mobile Drawer Navigation */}
      {isOpen && (
        <div id="mobile-drawer" className={`shadow-2xl border-t absolute w-full left-0 right-0 animate-slide-down md:hidden backdrop-blur-lg ${
          isScrolled ? 'bg-white/95 border-gray-200 text-gray-900' : 'bg-black/95 border-white/10 text-white'
        }`}>
          <div className="px-2 pt-2 pb-6 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  id={`mobile-nav-${item.label.toLowerCase().replace(' ', '-')}`}
                  onClick={() => handleNavClick(item.path)}
                  className={`block w-full text-left px-4 py-3 rounded-md text-base font-medium tracking-[0.01em] transition-colors ${
                    isActive
                      ? 'bg-brand/10 text-brand'
                      : isScrolled
                        ? 'text-gray-700 hover:bg-gray-100'
                        : 'text-[#A8A8A8] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Mobile "Get the App" block */}
            <div className={`px-4 pt-4 border-t ${isScrolled ? 'border-gray-200' : 'border-white/5'}`}>
              <button
                id="get-app-mobile-btn"
                onClick={() => {
                  setIsOpen(false);
                  setAppModalOpen(true);
                }}
                className="w-full bg-brand text-[#050505] hover:bg-[#E7C95B] py-3 px-4 rounded font-semibold text-sm tracking-[0.02em] transition-all text-center block cursor-pointer"
              >
                Get the App
              </button>
            </div>
          </div>
        </div>
      )}

      {/* "Get the App" Modal Overlay */}
      <AnimatePresence>
        {appModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAppModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5, bounce: 0.15 }}
              className="relative w-full max-w-md bg-[#0D0D0D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl z-10 text-center overflow-hidden"
            >
              {/* Gold light ring effect */}
              <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

              {/* Close Button */}
              <button
                id="close-app-modal-btn"
                onClick={() => setAppModalOpen(false)}
                className="absolute top-4 right-4 p-1.5 rounded-full text-[#A8A8A8] hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex flex-col items-center">
                {/* Logo Badge */}
                <div className="flex items-center mb-6">
                  <span className="bg-brand text-gray-950 font-bold font-display px-2 py-0.5 text-sm rounded-sm tracking-tight">
                    IoT
                  </span>
                  <span className="font-bold font-display text-sm tracking-tight ml-1 text-[#F5F5F5]">
                    Connect
                  </span>
                </div>

                <div className="w-12 h-12 rounded-full bg-brand/10 flex items-center justify-center mb-4">
                  <Smartphone className="text-brand" size={24} />
                </div>

                <h3 className="text-xl font-bold text-[#F5F5F5] tracking-tight mb-2">
                  Download IoTConnect Companion
                </h3>
                
                <p className="text-sm text-[#A8A8A8] leading-relaxed mb-6">
                  Monitor telemetry streams, configure eSIM bandwidth profiles, and view worldwide coverage maps directly from your iOS or Android device.
                </p>

                {/* QR Code Segment */}
                <div className="bg-white p-3 rounded-xl mb-6 relative group border border-white/5 shadow-inner">
                  <QrCode size={140} className="text-gray-950" />
                  <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl cursor-default">
                    <span className="text-xs font-semibold text-gray-900 mb-1">Live Simulator QR</span>
                    <span className="text-[10px] text-gray-500">Scan to launch sandbox</span>
                  </div>
                </div>

                <p className="text-xs text-[#A8A8A8] mb-6">
                  Scan the QR code with your phone camera or select store below
                </p>

                {/* Store Links Mockups */}
                <div className="grid grid-cols-2 gap-3 w-full">
                  <button
                    onClick={() => {
                      setDownloadState('iOS');
                      setTimeout(() => setDownloadState('idle'), 3000);
                    }}
                    className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand/40 rounded-xl py-3 px-4 text-xs font-semibold text-[#F5F5F5] transition-all duration-300 cursor-pointer active:scale-95 shadow-sm hover:shadow-brand/5"
                  >
                    <Download size={14} className="text-brand" />
                    <span>App Store</span>
                  </button>
                  <button
                    onClick={() => {
                      setDownloadState('Android');
                      setTimeout(() => setDownloadState('idle'), 3000);
                    }}
                    className="flex items-center justify-center space-x-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand/40 rounded-xl py-3 px-4 text-xs font-semibold text-[#F5F5F5] transition-all duration-300 cursor-pointer active:scale-95 shadow-sm hover:shadow-brand/5"
                  >
                    <Download size={14} className="text-brand" />
                    <span>Google Play</span>
                  </button>
                </div>

                {downloadState !== 'idle' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-xs text-brand font-medium"
                  >
                    Opening {downloadState === 'iOS' ? 'Apple App Store' : 'Google Play Store'} download preview...
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
}
