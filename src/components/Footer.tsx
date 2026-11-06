import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  ArrowRight, 
  MessageSquare,
  Globe
} from 'lucide-react';

interface FooterProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenQuoteModal }) => {
  return (
    <footer className="bg-[#0A192F] text-slate-300 relative z-20 border-t border-slate-200">
      
      {/* Pre-Footer Action Banner */}
      <div className="border-b border-white/10 bg-gradient-to-r from-[#07152B] via-[#0E2442] to-[#07152B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
              Ready to Partner with Brentra Ventures Private Limited?
            </h3>
            <p className="text-sm text-slate-300">
              Turnkey construction @ ₹1,900/sq.ft, IT solutions from ₹10,000, manpower staffing, RO purification AMC, tank cleaning & pest control.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-[#0A192F] font-bold text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer"
            >
              Request Free Consultation / Quote
            </button>
            <a
              href="tel:9065296294"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" /> 9065296294
            </a>
            <a
              href="tel:+919142144940"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs border border-white/15 transition-colors flex items-center gap-2"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400" /> +91 91421 44940
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand & Corporate Address */}
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white p-3 rounded-2xl inline-flex items-center gap-3 shadow-md">
              <img 
                src="/b-logo.png" 
                alt="Brentra Ventures PVT" 
                className="h-10 w-auto object-contain"
              />
              <div className="flex flex-col">
                <span className="font-extrabold text-base tracking-tight text-[#0A192F] leading-tight flex items-center gap-1 font-['Outfit']">
                  <span>BRENTRA</span>
                  <span className="text-[#0284C7]">VENTURES</span>
                </span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase">
                  PRIVATE LIMITED
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pr-4">
              Brentra Ventures Private Limited is a trusted integrated service partner delivering complete home construction, enterprise IT & software engineering, manpower supply, water purification, tank cleaning, pest control, and social media marketing.
            </p>

            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Office Address:</strong> Preven Vila, Flat Number 34, New Khajoorbana, Patna, Bihar – 800006
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Customer Care: <strong className="text-white">9065296294</strong> / <strong className="text-white">+91 91421 44940</strong> / <strong className="text-white">+91 70042 77962</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Official Email: <strong className="text-white">brentraventures@gmail.com</strong></span>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Website: <strong className="text-white">www.brentraventures.in</strong></span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-2">
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                CIN Registered
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                MSME Verified
              </span>
              <span className="text-[11px] px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-slate-300">
                GST Compliant
              </span>
            </div>
          </div>

          {/* Business Verticals (All 7 Pages) */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Core Services & Pricing
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/facility-services" className="text-white hover:text-cyan-300 font-bold transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-[#0788FF]" /> Brentra Facility (Home Services)
                </Link>
              </li>
              <li>
                <Link to="/construction-services" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-400" /> Construction (@ ₹1,900/sq.ft)
                </Link>
              </li>
              <li>
                <Link to="/it-solutions" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-cyan-400" /> IT & Software (from ₹10,000)
                </Link>
              </li>
              <li>
                <Link to="/manpower-housekeeping" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-blue-400" /> Manpower & Housekeeping
                </Link>
              </li>
              <li>
                <Link to="/ro-water-purifier" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-sky-400" /> RO Purifiers & AMC (from ₹899)
                </Link>
              </li>
              <li>
                <Link to="/water-tank-cleaning" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-cyan-400" /> Water Tank Cleaning (from ₹700)
                </Link>
              </li>
              <li>
                <Link to="/pest-control" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-emerald-400" /> Pest Control (Termite ₹8/sq.ft)
                </Link>
              </li>
              <li>
                <Link to="/digital-marketing" className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-pink-400" /> Digital Marketing (from ₹4,999)
                </Link>
              </li>
            </ul>
          </div>

          {/* Governance & Hub */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Company & Network
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/corporate-overview" className="text-slate-300 hover:text-white transition-colors">
                  Corporate Overview & Vision
                </Link>
              </li>
              <li>
                <Link to="/patna-hub" className="text-slate-300 hover:text-white transition-colors">
                  Patna Office & Hub Facilities
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-slate-300 hover:text-white transition-colors">
                  Careers & Job Openings
                </Link>
              </li>
              <li>
                <Link to="/careers#partner" className="text-slate-300 hover:text-white transition-colors">
                  Vendor & Contractor Onboarding
                </Link>
              </li>
              <li>
                <Link to="/facility-services" className="text-slate-300 hover:text-white transition-colors">
                  Corporate Facility AMC
                </Link>
              </li>
            </ul>
          </div>

          {/* Regional Network */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-sm text-white uppercase tracking-wider">
              Service Network
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              On-ground service delivery across Patna and major Bihar districts:
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              {['Patna Metro', 'Danapur', 'Bihta', 'Hajipur', 'Muzaffarpur', 'Gaya', 'Bhagalpur', 'Darbhanga', 'Begusarai'].map((district, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-slate-300">
                  {district}
                </span>
              ))}
            </div>

            <div className="pt-2">
              <a
                href="https://wa.me/919142144940"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <MessageSquare className="w-3.5 h-3.5" /> 24x7 WhatsApp Service Desk
              </a>
            </div>
          </div>

        </div>

        {/* Legal & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Brentra Ventures Private Limited. All Rights Reserved. Patna, Bihar – 800006.
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> One Company. Multiple Solutions. Endless Possibilities.
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
