import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Shield, Globe, Cpu, Server, User, Briefcase, Layers, CheckCircle2 } from 'lucide-react';
import SEO from './SEO';

interface PricingProps {
  onQuoteRequest?: (planName: string, details: string) => void;
}

export default function Pricing({ onQuoteRequest }: PricingProps) {
  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    titlePosition: '',
    email: '',
    phone: '',
    companyName: '',
    industry: 'Mining',
    simsRequired: '',
    dataPerSim: '',
    simsInUse: '',
    countriesRequired: '',
    preferredModel: '',
    businessNeeds: '',
    preferredContactMethod: 'Email'
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.titlePosition.trim()) newErrors.titlePosition = 'Title / Position is required';
    if (!formData.email.trim()) newErrors.email = 'Email Address is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.phone.trim()) newErrors.phone = 'Phone Number is required';
    if (!formData.companyName.trim()) newErrors.companyName = 'Company Name is required';
    if (!formData.industry) newErrors.industry = 'Industry selection is required';
    if (!formData.simsRequired.trim()) newErrors.simsRequired = 'Number of SIMs Required is required';
    if (!formData.dataPerSim.trim()) newErrors.dataPerSim = 'Amount of Data per SIM is required';
    if (!formData.simsInUse.trim()) newErrors.simsInUse = 'Current Number of SIMs in Use is required';
    if (!formData.countriesRequired.trim()) newErrors.countriesRequired = 'Countries Required is required';
    if (!formData.preferredModel.trim()) newErrors.preferredModel = 'Preferred Commercial Model is required';
    if (!formData.businessNeeds.trim()) newErrors.businessNeeds = 'Please describe your business needs or challenges';
    if (!formData.preferredContactMethod) newErrors.preferredContactMethod = 'Preferred Contact Method is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (onQuoteRequest) {
        onQuoteRequest(
          `Pricing Request Form - ${formData.companyName}`,
          `Full Name: ${formData.fullName}\nTitle: ${formData.titlePosition}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCompany: ${formData.companyName}\nIndustry: ${formData.industry}\nSIMs Required: ${formData.simsRequired}\nData/SIM: ${formData.dataPerSim}\nSIMs in Use: ${formData.simsInUse}\nCountries: ${formData.countriesRequired}\nPreferred Model: ${formData.preferredModel}\nNeeds: ${formData.businessNeeds}\nContact Method: ${formData.preferredContactMethod}`
        );
      }
      setSubmitted(true);
    }
  };

  const pricingSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': 'https://iotconnectglobal.com/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Pricing', 'item': 'https://iotconnectglobal.com/#/pricing' }
        ]
      },
      {
        '@type': 'ContactPage',
        'name': 'IoTConnect Global Pricing Request Form',
        'description': 'Tailored commercial pricing models for M2M cellular data connectivity across 195 countries.'
      }
    ]
  };

  return (
    <div className="relative z-10 bg-white text-gray-900 pt-24 pb-16">
      <SEO 
        title="Pricing Request Form — Tailored M2M Commercial Models | IoTConnect Global"
        description="At IoTConnect Global, we create bespoke commercial pricing models tailored to your exact M2M SIM volume, data requirements, and regional deployment needs."
        keywords="IoT SIM pricing form, M2M custom quote, cellular IoT commercial model, SADC M2M pricing, custom APN quote, telematics SIM quote, mining IoT pricing"
        schema={pricingSchema}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Header / Intro Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-brand font-medium tracking-[0.12em] text-xs uppercase font-mono bg-brand/10 border border-brand/20 px-3.5 py-1 rounded-full inline-block mb-3">
            Bespoke Commercial Models
          </span>
          <h1 className="text-gray-950 font-bold text-3xl sm:text-5xl tracking-[-0.03em] leading-tight">
            Tailored Solutions for Your Unique Business Needs
          </h1>
          <p className="text-gray-600 mt-5 text-base sm:text-lg leading-relaxed font-sans font-normal">
            At <strong className="text-gray-900 font-semibold">IoTConnect Global</strong>, we understand that every business is unique, with its own set of challenges and opportunities. We believe in creating value propositions that align seamlessly with your business goals. Our approach ensures that no two clients are treated the same; instead, we tailor-make a commercial model that suits your specific needs.
          </p>
          <p className="text-gray-500 mt-3 text-sm leading-relaxed font-sans">
            To help us craft the best solution for you, please provide some details about your business requirements below:
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-neutral-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-white/10 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-brand/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10">
            <div className="border-b border-white/10 pb-6 mb-8 flex items-center justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-3">
                  <span className="text-brand">Pricing Request Form</span>
                </h2>
                <p className="text-xs text-neutral-400 mt-1 font-mono">
                  All fields marked with an asterisk (*) are required
                </p>
              </div>
              <span className="hidden sm:inline-block bg-brand/10 border border-brand/20 text-brand text-[10px] uppercase font-mono tracking-widest px-3 py-1 rounded-full">
                Fast SLA Response
              </span>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-neutral-900 border border-brand/30 rounded-2xl p-8 sm:p-12 text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-brand/20 border border-brand/40 text-brand rounded-full flex items-center justify-center mx-auto shadow-lg shadow-brand/10">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">
                    Thank You for Submitting Your Request!
                  </h3>
                  <p className="text-neutral-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
                    We look forward to collaborating with you to design a pricing model that truly aligns with your business needs and helps you achieve your goals. An IoTConnect Global commercial architect will review your details and reach out shortly via your preferred contact method.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        fullName: '',
                        titlePosition: '',
                        email: '',
                        phone: '',
                        companyName: '',
                        industry: 'Mining',
                        simsRequired: '',
                        dataPerSim: '',
                        simsInUse: '',
                        countriesRequired: '',
                        preferredModel: '',
                        businessNeeds: '',
                        preferredContactMethod: 'Email'
                      });
                    }}
                    className="inline-flex items-center gap-2 bg-brand text-gray-950 font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-xl hover:bg-[#E7C95B] transition-colors cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-10">
                  
                  {/* Section 1: Contact Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-brand font-mono text-xs uppercase tracking-wider font-semibold border-b border-white/5 pb-2">
                      <User size={16} />
                      <span>1. Contact Information</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Full Name */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-200 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Enter your full name"
                          className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                            errors.fullName ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                          }`}
                        />
                        {errors.fullName && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.fullName}</p>}
                      </div>

                      {/* Title / Position */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-200 mb-2">
                          Title / Position *
                        </label>
                        <input
                          type="text"
                          name="titlePosition"
                          value={formData.titlePosition}
                          onChange={handleInputChange}
                          placeholder="Enter your job title or position"
                          className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                            errors.titlePosition ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                          }`}
                        />
                        {errors.titlePosition && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.titlePosition}</p>}
                      </div>

                      {/* Email Address */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-200 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Enter your email address"
                          className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                            errors.email ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                          }`}
                        />
                        {errors.email && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.email}</p>}
                      </div>

                      {/* Phone Number */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-200 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="Enter your phone number"
                          className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                            errors.phone ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                          }`}
                        />
                        {errors.phone && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.phone}</p>}
                      </div>

                      {/* Company Name */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-200 mb-2">
                          Company Name *
                        </label>
                        <input
                          type="text"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleInputChange}
                          placeholder="Enter your company name"
                          className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                            errors.companyName ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                          }`}
                        />
                        {errors.companyName && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.companyName}</p>}
                      </div>

                      {/* Industry */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-200 mb-2">
                          Industry *
                        </label>
                        <select
                          name="industry"
                          value={formData.industry}
                          onChange={handleInputChange}
                          className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors cursor-pointer ${
                            errors.industry ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                          }`}
                        >
                          <option value="Mining">Mining</option>
                          <option value="Fleet & Telematics">Fleet & Telematics</option>
                          <option value="Smart Metering & Utilities">Smart Metering & Utilities</option>
                          <option value="Point of Sale (POS) & Retail">Point of Sale (POS) & Retail</option>
                          <option value="Healthcare & Medical Monitoring">Healthcare & Medical Monitoring</option>
                          <option value="Agriculture & Smart Farming">Agriculture & Smart Farming</option>
                          <option value="Industrial Automation & Heavy Machinery">Industrial Automation & Heavy Machinery</option>
                          <option value="Security & Surveillance">Security & Surveillance</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.industry && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.industry}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Business Requirements */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-brand font-mono text-xs uppercase tracking-wider font-semibold border-b border-white/5 pb-2">
                      <Briefcase size={16} />
                      <span>2. Business Requirements</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Number of SIMs Required */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-200 mb-2">
                          Number of SIMs Required *
                        </label>
                        <input
                          type="text"
                          name="simsRequired"
                          value={formData.simsRequired}
                          onChange={handleInputChange}
                          placeholder="Enter the number of SIMs you need"
                          className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                            errors.simsRequired ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                          }`}
                        />
                        {errors.simsRequired && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.simsRequired}</p>}
                      </div>

                      {/* Amount of Data per SIM */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-200 mb-2">
                          Amount of Data per SIM *
                        </label>
                        <input
                          type="text"
                          name="dataPerSim"
                          value={formData.dataPerSim}
                          onChange={handleInputChange}
                          placeholder="Enter the data requirement per SIM (e.g., 1GB, 5GB)"
                          className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                            errors.dataPerSim ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                          }`}
                        />
                        {errors.dataPerSim && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.dataPerSim}</p>}
                      </div>

                      {/* Current Number of SIMs in Use */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-200 mb-2">
                          Current Number of SIMs in Use *
                        </label>
                        <input
                          type="text"
                          name="simsInUse"
                          value={formData.simsInUse}
                          onChange={handleInputChange}
                          placeholder="Enter the number of SIMs currently in use"
                          className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                            errors.simsInUse ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                          }`}
                        />
                        {errors.simsInUse && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.simsInUse}</p>}
                      </div>

                      {/* Countries Required */}
                      <div>
                        <label className="block text-xs font-semibold text-neutral-200 mb-2">
                          Countries Required *
                        </label>
                        <input
                          type="text"
                          name="countriesRequired"
                          value={formData.countriesRequired}
                          onChange={handleInputChange}
                          placeholder="List the countries where you need SIMs"
                          className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                            errors.countriesRequired ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                          }`}
                        />
                        {errors.countriesRequired && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.countriesRequired}</p>}
                      </div>

                      {/* Preferred Commercial Model */}
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-neutral-200 mb-2">
                          Preferred Commercial Model *
                        </label>
                        <input
                          type="text"
                          name="preferredModel"
                          value={formData.preferredModel}
                          onChange={handleInputChange}
                          placeholder="Share any specific pricing preferences or models (e.g., Pooled Data, Fixed Monthly, Pay-As-You-Go)"
                          className={`w-full bg-neutral-900 border rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                            errors.preferredModel ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                          }`}
                        />
                        {errors.preferredModel && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.preferredModel}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Additional Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-2 text-brand font-mono text-xs uppercase tracking-wider font-semibold border-b border-white/5 pb-2">
                      <Layers size={16} />
                      <span>3. Additional Information</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-200 mb-2">
                        Tell us more about your business needs or any specific challenges you are facing *
                      </label>
                      <textarea
                        rows={4}
                        name="businessNeeds"
                        value={formData.businessNeeds}
                        onChange={handleInputChange}
                        placeholder="Tell us more about your business needs or any specific challenges you are facing..."
                        className={`w-full bg-neutral-900 border rounded-xl p-4 text-sm text-white placeholder-neutral-500 focus:outline-none transition-colors ${
                          errors.businessNeeds ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-brand'
                        }`}
                      />
                      {errors.businessNeeds && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.businessNeeds}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-200 mb-2">
                        Preferred Contact Method *
                      </label>
                      <div className="grid grid-cols-2 gap-3 max-w-xs">
                        {['Email', 'Phone'].map((method) => (
                          <button
                            key={method}
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({ ...prev, preferredContactMethod: method }));
                              if (errors.preferredContactMethod) setErrors(prev => ({ ...prev, preferredContactMethod: '' }));
                            }}
                            className={`py-3 px-4 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                              formData.preferredContactMethod === method
                                ? 'bg-brand text-gray-950 border-brand shadow-md font-bold'
                                : 'bg-neutral-900 text-neutral-300 border-white/10 hover:border-white/30'
                            }`}
                          >
                            <span>{method}</span>
                          </button>
                        ))}
                      </div>
                      {errors.preferredContactMethod && <p className="text-red-400 text-[11px] mt-1 font-mono">{errors.preferredContactMethod}</p>}
                    </div>
                  </div>

                  {/* Closing Statement & Submit Action */}
                  <div className="pt-6 border-t border-white/10 space-y-6 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
                    <p className="text-xs sm:text-sm text-neutral-300 max-w-lg leading-relaxed">
                      We look forward to collaborating with you to design a pricing model that truly aligns with your business needs and helps you achieve your goals.
                    </p>

                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-brand hover:bg-[#E7C95B] text-gray-950 font-extrabold text-sm px-8 py-4 rounded-xl uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-brand/20 shrink-0"
                    >
                      <span>Submit Your Request</span>
                      <Send size={16} />
                    </button>
                  </div>

                </form>
              )}
            </AnimatePresence>

          </div>
        </div>

        {/* Feature Comparison Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-neutral-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
            <div className="bg-brand/10 text-brand p-2.5 rounded-xl border border-brand/20 shrink-0">
              <Globe size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-950 mb-1">Global & SADC Roaming</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Automatic Tier-1 multi-carrier switching without expensive roaming fees.</p>
            </div>
          </div>

          <div className="bg-neutral-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
            <div className="bg-brand/10 text-brand p-2.5 rounded-xl border border-brand/20 shrink-0">
              <Shield size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-950 mb-1">Private APN & VPN</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Isolate device traffic away from the public internet straight to your cloud.</p>
            </div>
          </div>

          <div className="bg-neutral-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
            <div className="bg-brand/10 text-brand p-2.5 rounded-xl border border-brand/20 shrink-0">
              <Cpu size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-950 mb-1">All SIM Form Factors</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Standard 2FF, Micro 3FF, Nano 4FF, and solderable industrial MFF2 eSIMs.</p>
            </div>
          </div>

          <div className="bg-neutral-50 p-6 rounded-2xl border border-gray-100 flex items-start gap-4">
            <div className="bg-brand/10 text-brand p-2.5 rounded-xl border border-brand/20 shrink-0">
              <Server size={20} />
            </div>
            <div>
              <h4 className="font-bold text-sm text-gray-950 mb-1">Pooled Data Sharing</h4>
              <p className="text-xs text-gray-600 leading-relaxed">Combine monthly data allowances into a single shared pool to eliminate overages.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

