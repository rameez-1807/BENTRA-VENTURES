import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Sparkles, 
  Cpu, 
  PartyPopper, 
  Users, 
  ShoppingBag, 
  Sun, 
  Truck, 
  Wheat, 
  GraduationCap, 
  Rocket, 
  HeartPulse,
  ArrowRight,
  ShieldCheck,
  Clock,
  Phone
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: (vertical?: string) => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onOpenQuoteModal }) => {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      className="absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-2xl z-50 animate-fade-in"
      role="region"
      aria-label="Enterprise Services Directory"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Cluster 1: Home & Facility */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 block">
                Cluster 01
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Home & Facility
              </h3>
            </div>

            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/bentra-facility"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-amber-600 flex items-center gap-1.5 transition-colors">
                      Brentra Facility Services
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800">
                        Bestseller
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      AC foam jet, mechanized water tank, sofa spa & doorstep salon
                    </p>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/manpower-staffing"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                      Security & Manpower
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      PSARA compliant guards, corporate housekeeping & facility staffing
                    </p>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/bentra-facility#healthcare"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-rose-500/10 text-rose-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <HeartPulse className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-rose-600 transition-colors">
                      Healthcare & Diagnostic
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      Doorstep diagnostic sample collection & sanitization
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cluster 2: Build & Realty */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 block">
                Cluster 02
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Build & Realty
              </h3>
            </div>

            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/realty-infrastructure"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-amber-700 flex items-center gap-1.5 transition-colors">
                      Realty & Infrastructure
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800">
                        ₹1,900/sq.ft
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      Turnkey architectural construction, structural engineering & interiors
                    </p>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/realty-infrastructure#solar"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-yellow-500/10 text-yellow-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-yellow-600 transition-colors">
                      Solar & Clean Energy
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      On-grid rooftop solar, industrial energy audits & net metering
                    </p>
                  </div>
                </Link>
              </li>
            </ul>

            {/* Quick Quote Highlight inside Cluster 2 */}
            <div className="mt-4 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60">
              <div className="text-xs font-bold text-amber-900 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                Construction Baseline Lock
              </div>
              <p className="text-[11px] text-amber-800 mt-1">
                Material + Labor guaranteed from ₹1,900 / sq. ft. in Patna & surrounding areas.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onOpenQuoteModal('realty-infrastructure');
                }}
                className="mt-2 text-xs font-semibold text-amber-700 hover:text-amber-900 inline-flex items-center gap-1"
              >
                Estimate Project Cost <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Cluster 3: Technology & Marketing */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-600 block">
                Cluster 03
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Technology & Systems
              </h3>
            </div>

            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/it-digital"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-cyan-600 transition-colors">
                      Enterprise IT & Cloud
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      Custom software, ERP, cloud architectures & cybersecurity
                    </p>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/careers-partners#academy"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      Skill Academy & Training
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      Apprenticeships, technician certifications & corporate skilling
                    </p>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/ventures"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Rocket className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-purple-600 transition-colors">
                      Ventures & Seed Grants
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      Early stage funding and infrastructure mentorship in Bihar
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>

          {/* Cluster 4: Trade & Hospitality */}
          <div className="space-y-4">
            <div className="border-b border-slate-100 pb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 block">
                Cluster 04
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Trade & Hospitality
              </h3>
            </div>

            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/events-hospitality"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-pink-500/10 text-pink-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <PartyPopper className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-pink-600 transition-colors">
                      Events & Luxury Hospitality
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      High-profile conclaves, royal weddings & broadcast AV staging
                    </p>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/fmcg-beverages"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors">
                      Fresh FMCG & Beverages
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      Packaged essentials, beverages & cold-chain food retail
                    </p>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/fmcg-beverages#mandi"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Wheat className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-amber-600 transition-colors">
                      Agri-Commodities & Mandi
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      Direct farm procurement & wholesale grain trade
                    </p>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  to="/fmcg-beverages#logistics"
                  onClick={onClose}
                  className="group flex items-start gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg bg-slate-500/10 text-slate-700 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                      Logistics & Supply Chain
                    </div>
                    <p className="text-xs text-slate-500 leading-snug">
                      Statewide fleet transit & hub-and-spoke distribution
                    </p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* MegaMenu Bottom Action Bar */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/80 -mx-4 -mb-8 px-6 py-4 rounded-b-2xl">
          <div className="flex items-center gap-6 text-xs text-slate-600">
            <span className="flex items-center gap-1.5 font-medium text-slate-900">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              Patna Operational Desk: {SITE_CONFIG.operatingHours.facilityServices}
            </span>
            <span className="hidden sm:inline text-slate-300">|</span>
            <span className="hidden sm:inline">
              PIN Code Coverage: 800001 – 800028
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/bentra-facility"
              onClick={onClose}
              className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 transition-colors"
            >
              Browse Full Catalog →
            </Link>
            <button
              onClick={() => {
                onClose();
                onOpenQuoteModal('bentra-facility');
              }}
              className="text-xs font-bold text-slate-950 bg-amber-500 hover:bg-amber-400 px-4 py-1.5 rounded-lg transition-colors shadow-sm"
            >
              Request Doorstep Pro
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;

