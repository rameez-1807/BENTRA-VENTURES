import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare,
  ShieldCheck 
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { SITE_CONFIG } from '../config/site';

const VERTICAL_OPTIONS = [
  { id: 'it-digital', label: 'IT & Digital Solutions' },
  { id: 'realty-infrastructure', label: 'Realty, Construction & Turnkey Interiors' },
  { id: 'events-hospitality', label: 'Events & Entertainment (Hospitality)' },
  { id: 'ventures', label: 'Healthcare & Pharma' },
  { id: 'building-materials', label: 'General Sourcing & Building Materials' },
  { id: 'manpower-staffing', label: 'Manpower & Workforce Solutions' },
  { id: 'bentra-facility', label: 'Facility Maintenance (RO, AC, Electrical, AMC)' },
  { id: 'fmcg-beverages', label: 'Fresh Food & FMCG Supply' },
  { id: 'general-inquiry', label: 'Corporate Secretariat / General Partnership' },
];

export const CorporateEnquirySection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    vertical: 'it-digital',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [leadRef, setLeadRef] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Please provide your full corporate or personal name.';
    }
    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      errors.phone = 'Please provide a valid 10-digit Indian mobile number.';
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Please provide a valid business or personal email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errors.message = 'Please provide a brief message describing your requirement (min 10 characters).';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!validate()) return;

    setIsSubmitting(true);
    const cleanPhone = formData.phone.replace(/\D/g, '');
    const fallbackId = 'BV-' + Math.floor(100000 + Math.random() * 900000);
    const API_BASE = import.meta.env.VITE_API_URL || 'https://bentra-ventures.onrender.com';

    let success = false;

    // 1. Try Backend API
    try {
      const res = await fetch(`${API_BASE}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.name.trim(),
          phone: cleanPhone,
          email: formData.email.trim(),
          vertical: formData.vertical,
          type: 'contact',
          locationName: 'Patna Corporate Desk',
          details: formData.message.trim(),
        }),
      });

      if (res.ok) {
        const json = await res.json();
        setLeadRef(json.data?.id || fallbackId);
        success = true;
      }
    } catch {
      // Backend unavailable, fallback to direct Supabase
    }

    // 2. Direct Supabase Fallback
    if (!success) {
      try {
        const { data, error } = await supabase.from('leads').insert({
          id: fallbackId,
          full_name: formData.name.trim(),
          phone: cleanPhone,
          email: formData.email.trim() || null,
          vertical: formData.vertical,
          type: 'contact',
          location_name: 'Patna Corporate Desk',
          details: formData.message.trim(),
        }).select();

        if (!error && data && data.length > 0) {
          setLeadRef(data[0].id || fallbackId);
          success = true;
        } else {
          setErrorMessage('Unable to log your enquiry right now. Please call our Patna helpline directly at +91 90652 96294.');
        }
      } catch {
        setErrorMessage('Network connection issue. Please connect with our team directly via phone or WhatsApp.');
      }
    }

    setIsSubmitting(false);
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      vertical: 'it-digital',
      message: '',
    });
    setLeadRef(null);
    setErrorMessage(null);
    setValidationErrors({});
  };

  return (
    <section 
      id="contact" 
      className="py-16 sm:py-20 bg-slate-50 border-t border-slate-200"
      aria-label="Contact and Corporate Business Enquiry"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00A3C4]">
            Direct Institutional Consultation
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0E2442] tracking-tight mt-2">
            Contact & Business Enquiry
          </h2>
          <div className="w-16 h-1 bg-[#00A3C4] mx-auto mt-3 rounded-full" />
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            Connect directly with Brentra Ventures central executive secretariat for enterprise contracts, turnkey tenders, or private service engagements.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Direct Corporate Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs space-y-6">
              <h3 className="font-heading font-bold text-lg text-[#0E2442] pb-3 border-b border-slate-100">
                Patna Central Secretariat Desk
              </h3>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Registered Headquarters</strong>
                    <span className="text-slate-600 text-xs leading-relaxed">
                      {SITE_CONFIG.headquarters.fullFormatted}
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Direct Telephone Line</strong>
                    <a 
                      href={SITE_CONFIG.contacts.phoneTel} 
                      className="text-[#0E2442] hover:text-[#00A3C4] font-bold text-xs sm:text-sm transition-colors"
                    >
                      {SITE_CONFIG.contacts.phoneFormatted}
                    </a>
                    <span className="block text-[11px] text-slate-500">Toll-free / Direct Dispatch line</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Official Corporate Desk</strong>
                    <a 
                      href={`mailto:${SITE_CONFIG.contacts.email}`} 
                      className="text-[#0E2442] hover:text-[#00A3C4] font-semibold text-xs sm:text-sm transition-colors"
                    >
                      {SITE_CONFIG.contacts.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-50 text-[#00A3C4] flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Operational Hours</strong>
                    <span className="text-slate-600 text-xs">
                      {SITE_CONFIG.operatingHours.facilityServices} (All 7 Days)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <a
                  href={SITE_CONFIG.contacts.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Instant WhatsApp Service Desk</span>
                </a>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#0E2442] text-white flex items-center gap-3">
              <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0" />
              <p className="text-xs text-slate-200">
                All client enquiries are assigned a verified corporate tracking reference with guaranteed response within 2 business hours.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Enquiry Form */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            {leadRef ? (
              <div className="py-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-extrabold text-2xl text-[#0E2442]">
                  Enquiry Successfully Received
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Thank you for reaching out. Your enquiry has been registered in our centralized corporate system under reference:
                </p>
                <div className="inline-block px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 font-mono font-black text-lg text-[#0E2442]">
                  {leadRef}
                </div>
                <p className="text-xs text-slate-500">
                  Our corporate operations desk will contact you via phone or email shortly.
                </p>
                <div className="pt-4">
                  <button
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-[#0E2442] hover:bg-[#16355C] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="font-heading font-bold text-lg text-[#0E2442] mb-1">
                  Send Your Project or Service Details
                </h3>
                <p className="text-xs text-slate-500 mb-4">
                  Fill out the form below. We treat all commercial specifications with strict confidentiality.
                </p>

                {errorMessage && (
                  <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 ${
                        validationErrors.name 
                          ? 'border-rose-400 focus:ring-rose-200' 
                          : 'border-slate-300 focus:ring-[#00A3C4]/30 focus:border-[#00A3C4]'
                      }`}
                    />
                    {validationErrors.name && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{validationErrors.name}</span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh@company.com"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 ${
                        validationErrors.email 
                          ? 'border-rose-400 focus:ring-rose-200' 
                          : 'border-slate-300 focus:ring-[#00A3C4]/30 focus:border-[#00A3C4]'
                      }`}
                    />
                    {validationErrors.email && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{validationErrors.email}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Mobile Number (10 Digits) *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 9065296294"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 ${
                        validationErrors.phone 
                          ? 'border-rose-400 focus:ring-rose-200' 
                          : 'border-slate-300 focus:ring-[#00A3C4]/30 focus:border-[#00A3C4]'
                      }`}
                    />
                    {validationErrors.phone && (
                      <span className="text-[11px] text-rose-600 mt-1 block">{validationErrors.phone}</span>
                    )}
                  </div>

                  {/* Service Interested In */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                      Service Interested In *
                    </label>
                    <select
                      value={formData.vertical}
                      onChange={(e) => setFormData({ ...formData, vertical: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs sm:text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#00A3C4]/30 focus:border-[#00A3C4]"
                    >
                      {VERTICAL_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wide">
                    Project Requirements / Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your site location, scope of work, timeline, or bulk requirements..."
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs sm:text-sm bg-white text-slate-900 focus:outline-none focus:ring-2 ${
                      validationErrors.message 
                        ? 'border-rose-400 focus:ring-rose-200' 
                        : 'border-slate-300 focus:ring-[#00A3C4]/30 focus:border-[#00A3C4]'
                    }`}
                  />
                  {validationErrors.message && (
                    <span className="text-[11px] text-rose-600 mt-1 block">{validationErrors.message}</span>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl bg-[#00A3C4] hover:bg-[#008CA8] active:scale-98 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Enquiry to Central Desk...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Corporate Enquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};

export default CorporateEnquirySection;

