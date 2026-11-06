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
  Droplets,
  Waves,
  Bug,
  Megaphone,
  Fish,
  Wrench,
  PartyPopper,
  Hammer,
  HeartPulse,
  MessageSquare
} from 'lucide-react';
import { VerticalId } from '../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialVertical?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  initialVertical = 'realty-infrastructure'
}) => {
  const [selectedVertical, setSelectedVertical] = useState<string>(initialVertical);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [locationName, setLocationName] = useState('Patna, Bihar');
  const [customDetails, setCustomDetails] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadRef, setLeadRef] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate SLA routing and CRM registration
    setTimeout(() => {
      const generatedRef = 'BV-' + Math.floor(100000 + Math.random() * 900000);
      setLeadRef(generatedRef);
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 700);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFullName('');
    setPhone('');
    setEmail('');
    setCustomDetails('');
    onClose();
  };

  const verticalsConfig = [
    { id: 'realty-infrastructure', name: 'Turnkey Construction @ ₹1,900/sq.ft', icon: Building2, color: '#B8860B' },
    { id: 'it-solutions', name: 'IT & Software (from ₹10,000)', icon: Cpu, color: '#0284C7' },
    { id: 'manpower-housekeeping', name: 'Manpower Supply & Housekeeping', icon: Users, color: '#2563EB' },
    { id: 'ro-water-purifier', name: 'RO Water Purifiers & AMC (from ₹899)', icon: Droplets, color: '#0891B2' },
    { id: 'water-tank-cleaning', name: 'Water Tank Cleaning (from ₹700)', icon: Waves, color: '#0284C7' },
    { id: 'pest-control', name: 'Pest & Termite Control (from ₹2/sq.ft)', icon: Bug, color: '#059669' },
    { id: 'digital-marketing', name: 'Social Media & Marketing (from ₹4,999)', icon: Megaphone, color: '#DB2777' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Strip */}
        <div className="p-5 sm:p-6 bg-[#0A192F] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/10 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg text-white">
                Brentra Central Inquiry & Booking Desk
              </h2>
              <p className="text-xs text-slate-300">
                Preven Vila, New Khajoorbana, Patna – 800006
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSuccess ? (
            <div className="py-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-slate-800 uppercase tracking-widest px-3 py-1 rounded bg-slate-100 border border-slate-200">
                  REF: {leadRef}
                </span>
                <h3 className="font-heading font-bold text-2xl text-[#0A192F] mt-3">
                  Service Request Dispatched!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto mt-2 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{fullName}</strong>. Your requirement has been assigned to our Patna operations team. You will receive an arrival or quotation call on <strong className="text-slate-900">{phone}</strong>.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`https://wa.me/919142144940?text=Hello%20Brentra,%20I%20just%20submitted%20request%20${leadRef}%20for%20${selectedVertical}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                >
                  <MessageSquare className="w-4 h-4" /> Track on WhatsApp
                </a>
                <button
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl bg-[#0A192F] text-white font-bold text-xs"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
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
                            ? 'bg-slate-100 border-[#0A192F] text-[#0A192F] shadow-sm font-bold' 
                            : 'bg-white border-slate-200 text-slate-600 hover:text-black hover:bg-slate-50'
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
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  {selectedVertical === 'realty-infrastructure' && 'Includes Free Site Inspection & Cost Estimate at ₹1,900/sq.ft'}
                  {selectedVertical === 'it-solutions' && 'Includes Free Technical Architecture & SOW Review'}
                  {selectedVertical === 'manpower-housekeeping' && 'Verified background-checked staff replacement guarantee'}
                  {selectedVertical === 'ro-water-purifier' && 'Doorstep technician inspection @ ₹149 in Patna'}
                  {selectedVertical === 'water-tank-cleaning' && '6-stage mechanized German pressure jetting process'}
                  {selectedVertical === 'pest-control' && 'Odorless herbal treatment safe for children & pets'}
                  {selectedVertical === 'digital-marketing' && 'Customized organic growth & paid ad proposal'}
                </span>
              </div>

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
                    placeholder="e.g. Ramesh Chandra Verma"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone Number (WhatsApp Active) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="9065296294"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    City / Location in Bihar *
                  </label>
                  <input
                    type="text"
                    required
                    value={locationName}
                    onChange={(e) => setLocationName(e.target.value)}
                    placeholder="e.g. New Khajoorbana, Bailey Road, Patna"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                  />
                </div>
              </div>

              {/* Requirement Details */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Describe Your Requirement / Estimated Scope
                </label>
                <textarea
                  rows={3}
                  value={customDetails}
                  onChange={(e) => setCustomDetails(e.target.value)}
                  placeholder="Please mention specific details, quantities, preferred date/time..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-[#0A192F] focus:outline-none focus:ring-1 focus:ring-[#0A192F]"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href="tel:9065296294"
                  className="text-xs text-[#0A192F] hover:underline flex items-center gap-1.5 font-bold"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-600" /> Helpline: 9065296294 / 9142144940
                </a>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center justify-center gap-2 disabled:opacity-50 transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    'Routing Request...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Submit Priority Request
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
