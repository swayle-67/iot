import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Globe, Search, ShieldCheck, Cpu, RefreshCw, Radio, MapPin, CheckCircle2, ChevronRight, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from './SEO';

interface RegionCoverage {
  region: string;
  code: string;
  iconBg: string;
  countries: string[];
}

const COVERAGE_DATA: RegionCoverage[] = [
  {
    region: 'Europe',
    code: 'EU',
    iconBg: 'from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30',
    countries: [
      'Alands Islands', 'Albania', 'Austria', 'Belarus', 'Belgium',
      'Bosnia & Herzegovenia', 'Bulgaria', 'Croatia', 'Czech Republic', 'Denmark',
      'Estonia', 'Faroe Islands', 'Finland', 'France', 'Germany',
      'Gibraltar', 'Greece', 'Hungary', 'Iceland', 'Ireland',
      'Isle of Man', 'Italy', 'Jersey', 'Kosovo', 'Latvia',
      'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta',
      'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'Norway',
      'Poland', 'Portugal', 'Romania', 'Russia', 'Serbia',
      'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland',
      'Ukraine', 'United Kingdom'
    ]
  },
  {
    region: 'Africa',
    code: 'AF',
    iconBg: 'from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30',
    countries: [
      'Algeria', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi',
      'Cameroon', 'Cape Verde', 'Chad', 'Congo', 'Egypt',
      'Equatorial Guinea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia',
      'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Kenya',
      'Lesotho', 'Madagascar', 'Malawi', 'Mali', 'Mauritius',
      'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria',
      'Senegal', 'Sierra Leone', 'South Africa', 'South Sudan', 'Tanzania',
      'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
    ]
  },
  {
    region: 'North America',
    code: 'NA',
    iconBg: 'from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30',
    countries: [
      'United States of America', 'Anguilla', 'Antigua & Barbuda', 'Bahamas', 'Barbados',
      'Belize', 'Bermuda', 'British Virgin Islands', 'Canada', 'Cayman Islands',
      'Costa Rica', 'Dominica', 'El Salvador', 'French West Indies', 'Greenland',
      'Grenada', 'Haiti', 'Honduras', 'Jamaica', 'Martinique',
      'Mexico', 'Montserrat', 'Nicaragua', 'Panama', 'St Maarten',
      'St. Kitts & Nevis', 'St. Lucia', 'St. Vincent & the Grenadines', 'Turks & Caicos'
    ]
  },
  {
    region: 'South America',
    code: 'SA',
    iconBg: 'from-purple-500/20 to-pink-500/10 text-purple-400 border-purple-500/30',
    countries: [
      'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia',
      'Ecuador', 'French Guiana', 'Paraguay', 'Peru', 'Surinam',
      'Uruguay', 'Venezuela'
    ]
  },
  {
    region: 'Asia',
    code: 'AS',
    iconBg: 'from-cyan-500/20 to-blue-500/10 text-cyan-400 border-cyan-500/30',
    countries: [
      'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Brunei',
      'Cambodia', 'China', 'Cyprus', 'Georgia', 'Hong Kong',
      'Indonesia', 'Iraq', 'Israel', 'Japan', 'Jordan',
      'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Macau',
      'Malaysia', 'Mongolia', 'Nepal', 'Oman', 'Pakistan',
      'Palestine', 'Philippines', 'Qatar', 'Saudi Arabia', 'Singapore',
      'South Korea', 'Sri Lanka', 'Taiwan', 'Tajikistan', 'Thailand',
      'Uzbekistan', 'Vietnam'
    ]
  },
  {
    region: 'Oceania',
    code: 'OC',
    iconBg: 'from-rose-500/20 to-red-500/10 text-rose-400 border-rose-500/30',
    countries: [
      'Australia', 'Fiji', 'Guam', 'Kiribati', 'New Zealand',
      'Papua New Guinea', 'Solomon Islands'
    ]
  }
];

export default function Coverage() {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const totalCountriesCount = useMemo(() => {
    return COVERAGE_DATA.reduce((acc, curr) => acc + curr.countries.length, 0);
  }, []);

  const filteredRegions = useMemo(() => {
    return COVERAGE_DATA.map(r => {
      if (selectedRegion !== 'All' && r.region !== selectedRegion) {
        return null;
      }
      if (!searchQuery.trim()) {
        return r;
      }
      const matchingCountries = r.countries.filter(c =>
        c.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
      if (matchingCountries.length === 0) return null;
      return {
        ...r,
        countries: matchingCountries
      };
    }).filter(Boolean) as RegionCoverage[];
  }, [selectedRegion, searchQuery]);

  const valueProps = [
    {
      title: 'Seamless Cross-Border Mobility',
      desc: 'Seamless cross-border movement of IOT-enabled devices through embedded SIM cards',
      icon: Cpu,
      accent: 'text-brand bg-brand/10 border-brand/20'
    },
    {
      title: 'Multi-Operator Redundancy',
      desc: 'Coverage in more than 195 countries with at least 2 operators per country',
      icon: Globe,
      accent: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'Carrier-Grade Reliability',
      desc: 'Reliable, high-quality connectivity through a carrier-grade mobile network',
      icon: ShieldCheck,
      accent: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      title: 'Automated Multi-Network Switching',
      desc: 'Automatic connectivity on multiple networks in every country that we cover',
      icon: RefreshCw,
      accent: 'text-amber-400 bg-amber-500/10 border-amber-500/20'
    }
  ];

  const coverageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://iotconnectglobal.com/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Coverage', 'item': 'https://iotconnectglobal.com/#/coverage' }
        ]
      },
      {
        '@type': 'Service',
        'name': 'IoTConnect Global M2M Cellular Network Coverage',
        'provider': {
          '@type': 'Organization',
          'name': 'IoTConnect Global'
        },
        'description': 'Global M2M cellular data coverage across 195+ countries with at least 2 Tier-1 operators per country for seamless IoT cross-border connectivity.',
        'areaServed': COVERAGE_DATA.flatMap(r => r.countries)
      }
    ]
  };

  return (
    <div className="relative z-10 bg-white text-gray-900 pt-24 pb-16">
      <SEO 
        title="Global M2M Coverage — 195+ Countries & Multi-Operator Networks | IoTConnect Global"
        description="Explore IoTConnect Global cellular network coverage. Over 195 countries supported with at least 2 Tier-1 mobile network operators per country for seamless M2M roaming."
        keywords="IoT global coverage, M2M coverage map, cellular IoT countries, multi-network SIM roaming, Tier 1 M2M network, SADC cellular coverage, eSIM global coverage"
        schema={coverageSchema}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-brand font-medium tracking-[0.12em] text-xs uppercase font-mono bg-brand/10 border border-brand/20 px-3.5 py-1 rounded-full inline-block mb-3">
            Global Footprint & Roaming Map
          </span>
          <h1 className="text-gray-950 font-bold text-3xl sm:text-5xl lg:text-6xl tracking-[-0.03em] leading-tight mb-4 font-display">
            An exciting IOT world is waiting
          </h1>
          <p className="text-gray-600 text-base sm:text-lg leading-relaxed font-sans max-w-2xl mx-auto">
            Connect devices anywhere on Earth. Our multi-carrier M2M SIMs automatically anchor to the strongest network in every country, guaranteeing uninterrupted uptime.
          </p>

          {/* Quick Stats Banner */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-neutral-950 text-white p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-black text-brand font-mono block">195+</span>
              <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Countries Covered</span>
            </div>
            <div className="bg-neutral-950 text-white p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-black text-brand font-mono block">2+</span>
              <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Carriers / Country</span>
            </div>
            <div className="bg-neutral-950 text-white p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-black text-brand font-mono block">785+</span>
              <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Global Partner Networks</span>
            </div>
            <div className="bg-neutral-950 text-white p-4 rounded-2xl border border-white/10 text-center">
              <span className="text-2xl sm:text-3xl font-black text-brand font-mono block">99.99%</span>
              <span className="text-[10px] text-neutral-400 font-mono uppercase tracking-wider">Core Network Uptime</span>
            </div>
          </div>
        </div>

        {/* 4 Key Pillars of Global Connectivity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-neutral-950 text-white rounded-2xl p-6 border border-white/10 flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-brand/5 rounded-full blur-xl pointer-events-none" />
                <div>
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center mb-4 ${prop.accent}`}>
                    <Icon size={20} />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                    {prop.title}
                  </h3>
                  <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                    {prop.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-[11px] font-mono text-brand">
                  <CheckCircle2 size={12} />
                  <span>Enterprise SLA Included</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Country Explorer & Search Bar */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-10 border border-white/10 shadow-2xl mb-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 border-b border-white/10 pb-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Globe className="text-brand" size={18} />
                <span className="text-brand font-mono text-xs uppercase tracking-widest font-semibold">
                  Interactive Country Directory
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Explore Supported Destinations
              </h2>
              <p className="text-xs text-neutral-400 mt-1">
                Select a continent or type a country name to check M2M coverage availability.
              </p>
            </div>

            {/* Search Input Box */}
            <div className="relative w-full md:w-80">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search country (e.g. Germany, Kenya)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-white/10 focus:border-brand rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar border-b border-white/5">
            <button
              onClick={() => setSelectedRegion('All')}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer font-mono ${
                selectedRegion === 'All'
                  ? 'bg-brand text-gray-950 font-bold shadow-md'
                  : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
              }`}
            >
              All Regions ({totalCountriesCount})
            </button>
            {COVERAGE_DATA.map((r) => (
              <button
                key={r.region}
                onClick={() => setSelectedRegion(r.region)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer font-mono flex items-center gap-2 ${
                  selectedRegion === r.region
                    ? 'bg-brand text-gray-950 font-bold shadow-md'
                    : 'bg-neutral-900 text-neutral-300 hover:bg-neutral-800'
                }`}
              >
                <span>{r.region}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                  selectedRegion === r.region ? 'bg-gray-950/20 text-gray-950' : 'bg-white/10 text-neutral-400'
                }`}>
                  {r.countries.length}
                </span>
              </button>
            ))}
          </div>

          {/* Region & Country Grids */}
          {filteredRegions.length === 0 ? (
            <div className="py-12 text-center text-neutral-400 font-mono text-xs">
              No matching countries found for "{searchQuery}". Contact our team to check specific carrier profiles.
            </div>
          ) : (
            <div className="space-y-12">
              {filteredRegions.map((r) => (
                <div key={r.region} className="bg-neutral-900/60 rounded-2xl p-6 border border-white/5">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/5">
                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold border bg-gradient-to-r ${r.iconBg}`}>
                        {r.code}
                      </span>
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {r.region}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      {r.countries.length} {r.countries.length === 1 ? 'Country' : 'Countries'}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2.5">
                    {r.countries.map((country) => (
                      <div
                        key={country}
                        className="bg-neutral-950/80 hover:bg-neutral-800/80 border border-white/5 hover:border-brand/40 px-3 py-2 rounded-xl text-xs text-neutral-200 transition-all flex items-center gap-2 group"
                      >
                        <MapPin size={12} className="text-brand shrink-0 group-hover:scale-110 transition-transform" />
                        <span className="truncate">{country}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA Banner */}
        <div className="bg-neutral-950 text-white rounded-3xl p-8 sm:p-12 border border-brand/30 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute -left-10 -bottom-10 w-64 h-64 bg-brand/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-xl text-center md:text-left">
            <span className="text-brand font-mono text-xs uppercase tracking-widest block mb-2 font-semibold">
              Ready to Deploy Global IoT?
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Need Multi-Carrier Testing SIMs?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
              Request a sample test SIM batch with multi-carrier coverage across SADC and 195+ countries to evaluate signal strength in your hardware.
            </p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <button
              onClick={() => navigate('/contact')}
              className="bg-brand hover:bg-[#E7C95B] text-gray-950 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-brand/20"
            >
              <span>Contact Network Team</span>
              <ArrowRight size={14} />
            </button>
            <button
              onClick={() => navigate('/pricing')}
              className="bg-neutral-900 hover:bg-neutral-800 text-white border border-white/10 font-semibold text-xs uppercase tracking-wider px-6 py-3.5 rounded-xl transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View Pricing Request</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
