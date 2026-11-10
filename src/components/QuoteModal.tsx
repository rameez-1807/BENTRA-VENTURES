import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Send, 
  Phone, 
  ShieldCheck, 
  Sparkles,
  Building2,
  Cpu,
  Users,
  PartyPopper,
  ShoppingBag,
  Sun,
  AlertCircle,
  MessageSquare
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVertical?: string;
  initialDetails?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialVertical = 'realty-infrastructure',
  initialDetails = ''
}) => {
  const [selectedVertical, setSelectedVertical] = useState<string>(initialVertical);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [locationName, setLocationName] = useState('Patna, Bihar');
  const [details, setDetails] = useState(initialDetails);
  const [honeypot, setHoneypot] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [leadRef, setLeadRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate phone number (10-digit Indian mobile)
    const phoneClean = phone.replace(/\D/g, '');
    if (phoneClean.length < 10) {
      setErrorMessage('Please enter a valid 10-digit Indian phone number.');
      return;
    }

    setIsSubmitting(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    try {
      const res = await fetch(`${apiUrl}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          phone: phoneClean,
          email,
          vertical: selectedVertical,
          type: 'quote',
          locationName,
          details,
          honeypot
        })
      });

      const data = await res.json();

      if (res.ok && data.success && data.leadId) {
        setLeadRef(data.leadId);
        setIsSuccess(true);
      } else {
        // True server error response (No fake success)
        setErrorMessage(data.error || 'Unable to submit your inquiry right now. Please call our Patna helpline directly.');
      }
    } catch (err: any) {
      console.error('Network error during lead submission:', err);
      setErrorMessage('Network connection to Patna operations server interrupted. Please call or WhatsApp our executive desk.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMessage(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setDetails('');
    onClose();
  };

  const verticalsConfig = [
    { id: 'realty-infrastructure', name: 'Turnkey Construction @ ₹1,900/sq.ft', icon: Building2, color: '#B45309' },
    { id: 'bentra-facility', name: 'Brentra Facility (AC, Tank, Sofa, Salon)', icon: Sparkles, color: '#F59E0B' },
    { id: 'it-digital', name: 'Enterprise IT, Cloud & ERP', icon: Cpu, color: '#0284C7' },
    { id: 'events-hospitality', name: 'Events & Luxury Hospitality', icon: PartyPopper, color: '#DB2777' },
    { id: 'manpower-staffing', name: 'Security Guards & Staffing', icon: Users, color: '#2563EB' },
    { id: 'solar-renewable-energy', name: 'Solar Rooftop & Clean Energy', icon: Sun, color: '#D97706' },
    { id: 'fmcg-beverages', name: 'Fresh FMCG & Food Processing', icon: ShoppingBag, color: '#059669' }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="p-5 sm:p-6 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-lg text-white font-['Outfit']">
                Brentra Central Inquiry & Consultation Desk
              </h2>
              <p className="text-xs text-slate-400">
                {SITE_CONFIG.headquarters.address}, Patna – {SITE_CONFIG.headquarters.pincode}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-5 animate-fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest px-3 py-1 rounded bg-slate-100 border border-slate-200">
                  INQUIRY REF: {leadRef}
                </span>
                <h3 className="font-bold text-2xl text-slate-900 mt-3 font-['Outfit']">
                  Consultation Request Dispatched!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>. Your requirement has been logged in our Patna central dispatch database. Our senior vertical lead will connect with you on <strong className="text-slate-900">{phone}</strong> within 2 business hours.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/919142144940?text=Hello%20Brentra%20Ventures%2C%20I%20have%20submitted%20consultation%20request%20${leadRef}%20for%20${selectedVertical}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" /> Message Desk on WhatsApp
                </a>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
                >
                  Close & Continue
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Error Alert Box (if server rejected) */}
              {errorMessage && (
                <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-semibold">{errorMessage}</p>
                    <p className="text-rose-700">
                      You can also reach our Patna executive desk directly at{' '}
                      <a href={SITE_CONFIG.contacts.phoneTel} className="font-bold underline">
                        {SITE_CONFIG.contacts.phoneFormatted}
                      </a>{' '}
                      or{' '}
                      <a href={SITE_CONFIG.contacts.whatsappLink} target="_blank" rel="noopener noreferrer" className="font-bold underline">
                        WhatsApp Helpdesk
                      </a>.
                    </p>
                  </div>
                </div>
              )}

              {/* Vertical Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  1. Select Target Service Vertical
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {verticalsConfig.map((item) => {
                    const isCurrent = selectedVertical === item.id;
                    const Icon = item.icon;
                    return (
                      <button
                        type="button"
                        key={item.id}
                        onClick={() => setSelectedVertical(item.id)}
                        className={`p-2.5 rounded-xl text-left border text-xs font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                          isCurrent 
                            ? 'bg-amber-50 border-amber-500 text-amber-900 shadow-sm font-bold' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" style={{ color: item.color }} />
                        <span className="truncate">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Helper Note */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between text-slate-700">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  {selectedVertical === 'realty-infrastructure' && 'Includes Free Site Inspection & Structural Estimate at ₹1,900/sq.ft'}
                  {selectedVertical === 'bentra-facility' && 'Verified Patna doorstep service with standardized pricing'}
                  {selectedVertical === 'it-digital' && 'Includes Free Technical SOW & Cloud Architecture Blueprint'}
                  {selectedVertical === 'events-hospitality' && 'Luxury venue booking, broadcast AV & bespoke catering'}
                  {selectedVertical === 'manpower-staffing' && 'PSARA compliant trained security personnel & staff replacement'}
                  {selectedVertical === 'solar-renewable-energy' && 'Subsidy evaluation, DISCOM net metering & structural audit'}
                  {selectedVertical === 'fmcg-beverages' && 'Wholesale Mandi quotes & farm-to-table bulk procurement'}
                </span>
              </div>

              {/* Hidden Bot Honeypot */}
              <input
                type="text"
                name="honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {/* Contact Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mobile Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9065296294"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. client@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Project Location / PIN
                  </label>
                  <input
                    type="text"
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g. Boring Road, Patna – 800001"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Specific Project Requirements & Scope
                </label>
                <textarea
                  rows={3}
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Describe your scope, plot size, floor plan requirements, or preferred start dates..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-slate-950 border-t-transparent animate-spin" />
                      <span>Transmitting to Patna Dispatch...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Official Consultation Request</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center">
                Your data is held strictly confidential under Brentra Ventures corporate governance.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuoteModal;
