import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare,
  Globe,
  Clock
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';

interface FooterProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  return (
    <footer className="bg-slate-950 text-slate-300 relative z-20 border-t border-slate-800" role="contentinfo">
      
      {/* Pre-Footer Action Banner */}
      <div className="border-b border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-extrabold text-xl sm:text-2xl text-white font-['Outfit']">
              Ready to Build with Brentra Ventures Private Limited?
            </h3>
            <p className="text-sm text-slate-400 max-w-2xl">
              Turnkey architectural construction from ₹1,900/sq.ft, verified doorstep AC & facility care in 45 mins, enterprise IT & cloud engineering, luxury hospitality, and agricultural commodity supply.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal('realty-infrastructure')}
              className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Request Free Consultation
            </button>
            <a
              href={SITE_CONFIG.contacts.phoneTel}
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" /> {SITE_CONFIG.contacts.phoneFormatted}
            </a>
            <a
              href={SITE_CONFIG.contacts.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 font-semibold text-xs border border-emerald-800/60 transition-colors flex items-center gap-2"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Desk
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Corporate Address */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <img 
                src="/b-logo.png" 
                alt="Brentra Ventures" 
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-lg tracking-tight text-white font-['Outfit']">
                  BRENTRA <span className="text-amber-500">VENTURES</span>
                </span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-slate-400 uppercase">
                  Private Limited
                </span>
              </div>
            </Link>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pr-4">
              Brentra Ventures Private Limited is an integrated enterprise conglomerate spearheading regional development across Eastern India with multi-vertical operations across Realty, Facility Care, IT Engineering, Trade, and Luxury Hospitality.
            </p>

            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong className="text-slate-200">Headquarters:</strong> {SITE_CONFIG.headquarters.fullFormatted}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Direct Helpline: <strong className="text-white">{SITE_CONFIG.contacts.phoneFormatted}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-400 shrink-0" />
                <span>
                  Operational Hours: <strong className="text-slate-300">{SITE_CONFIG.operatingHours.facilityServices}</strong>
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Official Desk: <strong className="text-white">{SITE_CONFIG.contacts.email}</strong>
                </span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                CIN Registered
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                MSME Verified
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-400">
                GST Compliant
              </span>
            </div>
          </div>

          {/* Core Services (Canonical Routes) */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-['Outfit']">
              Core Verticals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/bentra-facility" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3" /> Brentra Facility Services
                </Link>
              </li>
              <li>
                <Link to="/realty-infrastructure" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> Realty & Infrastructure (@ ₹1,900/sq.ft)
                </Link>
              </li>
              <li>
                <Link to="/events-hospitality" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-pink-400" /> Events & Luxury Hospitality
                </Link>
              </li>
              <li>
                <Link to="/it-digital" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-cyan-400" /> Enterprise IT & Cloud Systems
                </Link>
              </li>
              <li>
                <Link to="/manpower-staffing" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-blue-400" /> Security & Manpower Solutions
                </Link>
              </li>
              <li>
                <Link to="/fmcg-beverages" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> FMCG, Food & Beverages
                </Link>
              </li>
              <li>
                <Link to="/ventures" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-purple-400" /> Ventures & Seed Incubation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Governance */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-['Outfit']">
              Company & Hubs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-300 hover:text-white transition-colors">
                  Corporate Leadership & Vision
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-300 hover:text-white transition-colors">
                  Patna Central Hub & Facilities
                </Link>
              </li>
              <li>
                <Link to="/careers-partners" className="text-slate-300 hover:text-white transition-colors">
                  Careers & Job Openings
                </Link>
              </li>
              <li>
                <Link to="/careers-partners#partner" className="text-slate-300 hover:text-white transition-colors">
                  Vendor & Contractor Network
                </Link>
              </li>
              <li>
                <Link to="/admin" className="text-slate-500 hover:text-slate-400 transition-colors">
                  Operations Console (Authorized)
                </Link>
              </li>
            </ul>
          </div>

          {/* Patna Coverage Network */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-white uppercase tracking-wider font-['Outfit']">
              Patna Coverage
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Doorstep dispatch across all Patna PIN codes (800001 – 800028):
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['Boring Road', 'Kankarbagh', 'Bailey Road', 'Patliputra', 'Danapur', 'Rajendra Nagar', 'Fraser Road', 'Khagaul', 'Phulwari Sharif', 'Anisabad', 'AIIMS Patna'].map((locality, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                  {locality}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <a
                href={SITE_CONFIG.contacts.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5" /> 24/7 WhatsApp Service Desk
              </a>
            </div>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Brentra Ventures Private Limited. All Rights Reserved. Patna, Bihar – 800006.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> One Enterprise. Infinite Possibilities.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
