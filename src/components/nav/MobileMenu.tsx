import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  ChevronDown, 
  Phone, 
  MessageSquare, 
  Sparkles, 
  Building2, 
  Cpu, 
  PartyPopper, 
  Users, 
  ShoppingBag, 
  ArrowRight,
  ShieldCheck,
  MapPin,
  Compass
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: (vertical?: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenQuoteModal }) => {
  const [openCompany, setOpenCompany] = useState(false);
  const [openVerticals, setOpenVerticals] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm sm:max-w-md h-full bg-white ml-auto flex flex-col shadow-2xl overflow-y-auto">
        
        {/* Mobile Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
            <img src="/b-logo.png" alt="Brentra Logo" className="h-9 w-auto" />
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-[#0E2442] font-['Outfit']">
                BRENTRA <span className="text-[#0E2442]">VENTURES</span>
              </span>
              <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                Private Limited
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center cursor-pointer"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Links */}
        <div className="p-4 space-y-1.5 border-b border-slate-100">
          {/* Home */}
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            <span>Home</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* About Us */}
          <Link
            to="/about"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            <span>About Us</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* Director Message */}
          <Link
            to="/about#director"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            <span>Director Message</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* Brentra Facility with URBAN badge */}
          <Link
            to="/bentra-facility"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-cyan-50/70 text-sm"
          >
            <div className="flex items-center gap-2">
              <span>Brentra Facility</span>
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase bg-[#00A3C4] text-white rounded">
                URBAN
              </span>
            </div>
            <ArrowRight className="w-4 h-4 text-[#00A3C4]" />
          </Link>

          {/* Company Accordion */}
          <div className="rounded-xl border border-slate-200/80 overflow-hidden">
            <button
              onClick={() => setOpenCompany(!openCompany)}
              className="w-full flex items-center justify-between px-3.5 py-2.5 bg-slate-50/80 text-left font-semibold text-sm text-slate-800"
            >
              <span>Company</span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openCompany ? 'rotate-180' : ''}`} />
            </button>
            {openCompany && (
              <div className="p-3 bg-white space-y-1.5 border-t border-slate-100 text-xs">
                <Link
                  to="/about"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-slate-700 font-medium"
                >
                  <Building2 className="w-3.5 h-3.5 text-amber-600" />
                  <span>Leadership & Vision</span>
                </Link>
                <Link
                  to="/about#director"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-slate-700 font-medium"
                >
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  <span>Director's Message</span>
                </Link>
                <Link
                  to="/contact"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-slate-700 font-medium"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Patna Central Hub</span>
                </Link>
                <Link
                  to="/admin"
                  onClick={onClose}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-slate-50 text-slate-500 font-medium"
                >
                  <span>Operations Console</span>
                </Link>
              </div>
            )}
          </div>

          {/* Careers */}
          <Link
            to="/careers-partners"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            <span>Careers</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>

          {/* Contact Us */}
          <Link
            to="/contact"
            onClick={onClose}
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            <span>Contact Us</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Verticals Explorer Accordion */}
        <div className="p-4 space-y-2 flex-grow">
          <button
            onClick={() => setOpenVerticals(!openVerticals)}
            className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-slate-50 text-left font-bold text-xs uppercase tracking-wider text-slate-600 border border-slate-200"
          >
            <span>Explore All 8 Verticals</span>
            <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openVerticals ? 'rotate-180' : ''}`} />
          </button>

          {openVerticals && (
            <div className="grid grid-cols-1 gap-1 pt-1 text-xs">
              <Link to="/it-digital" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                • IT & Digital Solutions
              </Link>
              <Link to="/realty-infrastructure" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                • Realty, Construction & Turnkey Interiors
              </Link>
              <Link to="/events-hospitality" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                • Events & Entertainment (Hospitality)
              </Link>
              <Link to="/ventures" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                • Healthcare & Pharma
              </Link>
              <Link to="/realty-infrastructure#materials" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                • General Sourcing & Building Materials
              </Link>
              <Link to="/manpower-staffing" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                • Manpower & Workforce Solutions
              </Link>
              <Link to="/bentra-facility" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                • Facility Maintenance (RO, AC, AMC)
              </Link>
              <Link to="/fmcg-beverages" onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100 text-slate-700 font-medium">
                • Fresh Food & FMCG Supply
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Footer CTAs */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3 sticky bottom-0">
          <button
            onClick={() => {
              onClose();
              onOpenQuoteModal('bentra-facility');
            }}
            className="w-full py-3 rounded-xl bg-[#00A3C4] hover:bg-[#008CA8] active:scale-98 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Book a Service</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <a
              href={SITE_CONFIG.contacts.phoneTel}
              className="py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-800 font-semibold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600" />
              <span>Call Us</span>
            </a>
            <a
              href={SITE_CONFIG.contacts.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-2.5 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold flex items-center justify-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MobileMenu;
