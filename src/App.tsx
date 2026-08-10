/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import HeroCarousel from './components/HeroCarousel';
import SimSystem from './components/SimSystem';
import Reasons from './components/Reasons';
import AboutUs from './components/AboutUs';
import Industries from './components/Industries';
import Coverage from './components/Coverage';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import NewHeroBackground from './components/NewHeroBackground';
import SEO from './components/SEO';

// ScrollToTop component to reset scroll position on route changes
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

// Home/Landing page component
function HomePage({ onQuotePrefill }: { onQuotePrefill: (text: string) => void }) {
  const navigate = useNavigate();

  const homeSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://iotconnectglobal.com/#website',
        'url': 'https://iotconnectglobal.com',
        'name': 'IoTConnect Global',
        'description': 'Premier Global M2M & IoT Cellular Connectivity MVNO Platform'
      },
      {
        '@type': 'Service',
        '@id': 'https://iotconnectglobal.com/#service',
        'name': 'Global M2M & IoT Cellular Connectivity',
        'serviceType': 'Cellular M2M MVNO & IoT Data Roaming',
        'provider': {
          '@type': 'Organization',
          'name': 'IoTConnect Global',
          'url': 'https://iotconnectglobal.com'
        },
        'areaServed': 'Worldwide (195 Sovereign Countries)',
        'description': 'Turnkey enterprise M2M cellular data connectivity featuring automated network failover across 785 carrier partners, custom private APNs, and encrypted IPsec VPN tunnels.'
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://iotconnectglobal.com/#faq',
        'mainEntity': [
          {
            '@type': 'Question',
            'name': 'How does IoTConnect Global handle multi-network roaming?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'IoTConnect Global SIM boards feature automated network switching across 785 global carriers, dynamically connecting to the strongest local signal without manual reconfiguration.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What SIM form factors are supported for industrial M2M devices?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'We offer Standard (2FF), Micro (3FF), Nano (4FF), and solderable embedded eSIM (MFF2) form factors optimized for harsh automotive and industrial IoT environments.'
            }
          },
          {
            '@type': 'Question',
            'name': 'Can I request custom APN and private VPN routing?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'Yes, IoTConnect Global designs custom private APNs and encrypted IPsec VPN tunnels back to your enterprise cloud infrastructure for high-security M2M connectivity.'
            }
          },
          {
            '@type': 'Question',
            'name': 'What coverage is available in Sub-Saharan Africa and SADC regions?',
            'acceptedAnswer': {
              '@type': 'Answer',
              'text': 'IoTConnect Global provides primary multi-carrier roaming across all major Tier-1 networks in South Africa and SADC, including Vodacom, MTN, Telkom, and Cell C.'
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <SEO 
        title="IoTConnect Global — Premier M2M & IoT Connectivity MVNO | 195 Countries"
        description="Turnkey global M2M and IoT connectivity. Multi-network SIM cards, custom APN setups, private IPsec VPN routes, and GSMA eSIM across 195 countries and 785 carrier networks."
        keywords="M2M SIM, IoT connectivity, global cellular MVNO, eSIM IoT, telematics connectivity, multi-network roaming, Vodacom MTN Telkom Cell C, custom APN, private VPN IoT, SADC M2M data"
        schema={homeSchema}
      />

      {/* Hero Slider Section */}
      <HeroCarousel 
        onCtaClick={() => {
          const el = document.getElementById('contact');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }} 
      />

      {/* Main subsequent sections with solid white background */}
      <div className="relative z-10 bg-white text-gray-900">
        <SimSystem />
        <Reasons />
      </div>
    </>
  );
}

// Standalone About Us Page
function AboutPage() {
  const aboutSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://iotconnectglobal.com/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'About Us', 'item': 'https://iotconnectglobal.com/#/about' }
        ]
      },
      {
        '@type': 'AboutPage',
        'name': 'About IoTConnect Global',
        'description': 'Premier GSM MVNO with over 25 years of telecommunications excellence, providing secure M2M data connectivity, custom private APNs, and 24/7 technical NOC support globally.'
      },
      {
        '@type': 'Organization',
        'name': 'IoTConnect Global',
        'url': 'https://iotconnectglobal.com',
        'foundingDate': '2000',
        'knowsAbout': ['M2M Cellular Connectivity', 'eSIM GSMA Provisioning', 'Private APN Design', 'IPsec VPN Tunnels', 'Telematics SIM Management']
      }
    ]
  };

  return (
    <div className="relative z-10 bg-white text-gray-900 pt-20">
      <SEO 
        title="About Us — Tier-1 Global M2M Connectivity & MVNO | IoTConnect Global"
        description="Discover IoTConnect Global's 25+ years of telecommunications expertise. Premier GSM MVNO delivering secure M2M data connectivity, custom APNs, and 24/7 NOC support globally."
        keywords="About IoTConnect Global, GSM MVNO partner, M2M network provider, enterprise cellular IoT, telematics partner, 785 carrier networks, SADC cellular connectivity, M2M architects"
        schema={aboutSchema}
      />
      <AboutUs />
    </div>
  );
}

// Standalone Industries Page
function IndustriesPage() {
  const industriesSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://iotconnectglobal.com/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Industry Solutions', 'item': 'https://iotconnectglobal.com/#/industries' }
        ]
      },
      {
        '@type': 'ItemPage',
        'name': 'M2M & IoT Cellular Industry Solutions',
        'description': 'Tailored M2M cellular connectivity for fleet tracking, retail POS terminals, heavy mining equipment, smart energy utilities, and digital healthcare.'
      },
      {
        '@type': 'OfferCatalog',
        'name': 'IoT Industry Vertical Solutions',
        'itemListElement': [
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Fleet & Logistics Telematics Connectivity' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Industrial & Retail Point-of-Sale (POS) Connectivity' } },
          { '@type': 'Offer', 'itemOffered': { '@type': 'Service', 'name': 'Smart Energy Metering & Health Monitoring' } }
        ]
      }
    ]
  };

  return (
    <div className="relative z-10 bg-white text-gray-900 pt-20">
      <SEO 
        title="IoT Industry Solutions — Telematics, Smart Metering, POS & Mining Connectivity"
        description="Enterprise M2M IoT cellular connectivity for telematics, smart energy metering, POS terminals, healthcare monitors, mining telemetry, and industrial automation."
        keywords="Fleet tracking SIM, smart metering cellular, IoT POS connectivity, agricultural IoT, mining equipment telemetry, industrial automation SIM, telematics connectivity"
        schema={industriesSchema}
      />
      <Industries />
    </div>
  );
}

// Standalone Contact Page
function ContactPage() {
  const contactSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://iotconnectglobal.com/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Contact Us', 'item': 'https://iotconnectglobal.com/#/contact' }
        ]
      },
      {
        '@type': 'ContactPage',
        'name': 'Contact IoTConnect Global M2M Architects',
        'description': 'Direct engineering line for custom private APN setups, IPsec VPN tunnels, enterprise pooled data plan proposals, and 24/7 technical NOC tickets.'
      },
      {
        '@type': 'ContactPoint',
        'contactType': 'Technical Support & NOC',
        'email': 'support@iotconnectglobal.com',
        'availableLanguage': ['English']
      }
    ]
  };

  return (
    <div className="relative z-10 bg-white text-gray-900 pt-24 pb-12">
      <SEO 
        title="Contact Us — Expert IoT Architecture & Network Support | IoTConnect Global"
        description="Connect with IoTConnect Global M2M architects for custom private APNs, IPsec VPN tunnels, pooled data plan quotes, and 24/7 technical support."
        keywords="Contact IoTConnect, IoT architect consultation, custom APN quote, private VPN M2M, enterprise IoT support, NOC technical support ticket"
        schema={contactSchema}
      />
      <div className="max-w-4xl mx-auto px-4 text-center">
        {/* Section Label */}
        <span className="text-brand font-medium tracking-[0.12em] text-caption uppercase">
          Direct line
        </span>
        <h1 className="text-gray-900 font-bold text-3xl sm:text-4xl tracking-[-0.03em] leading-tight mt-4">
          Free expert IoT consultation
        </h1>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto text-base leading-relaxed font-sans font-normal">
          Discuss your custom APN setups, private VPN routes, pooled data cap models, or international SADC multi-carrier roaming with our design architects below.
        </p>
      </div>
    </div>
  );
}

function CoveragePage() {
  return <Coverage />;
}

// Layout and State Coordinator wrapper
function AppContent() {
  const [prefilledMessage, setPrefilledMessage] = useState<string>('');
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#020202] text-gray-900 font-sans antialiased overflow-x-hidden selection:bg-brand/30 selection:text-gray-950">
      
      {/* 3D Procedural Simulation viewport - Stays solid, hidden on other pages */}
      {isHome && (
        <div className="fixed inset-0 w-full h-full pointer-events-none z-0">
          <NewHeroBackground />
        </div>
      )}

      {/* Global Navigation Header */}
      <Header />

      {/* Primary Page Route Switcher */}
      <main className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage onQuotePrefill={(msg) => setPrefilledMessage(msg)} />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/coverage" element={<CoveragePage />} />
          <Route path="/pricing" element={<Pricing onQuoteRequest={(_plan, msg) => setPrefilledMessage(msg)} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>

      {/* Global Information Footer & Contact coordinate */}
      <Footer 
        prefilledMessage={prefilledMessage} 
        onClearPrefill={() => setPrefilledMessage('')} 
      />

    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppContent />
    </Router>
  );
}
