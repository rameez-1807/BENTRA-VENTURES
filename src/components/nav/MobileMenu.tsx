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
  MapPin
} from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenQuoteModal: (vertical?: string) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, onOpenQuoteModal }) => {
  const [openCluster, setOpenCluster] = useState<string | null>('home');

  if (!isOpen) return null;

  const toggleCluster = (id: string) => {
    setOpenCluster(openCluster === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm sm:max-w-md h-full bg-white ml-auto flex flex-col shadow-2xl overflow-y-auto">
        
        {/* Mobile Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur z-10">
          <Link to="/" onClick={onClose} className="flex items-center gap-2.5">
            <img src="/b-logo.png" alt="Brentra Logo" className="h-9 w-auto" />
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight text-slate-900 font-['Outfit']">
                BRENTRA <span className="text-amber-600">VENTURES</span>
              </span>
              <span className="text-[9px] font-bold tracking-widest text-slate-500 uppercase">
                Private Limited
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900 flex items-center justify-center"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Primary Links */}
        <div className="p-4 space-y-1">
          <Link
            to="/about"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            About & Leadership
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            to="/careers-partners"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            Careers & Partners
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
          <Link
            to="/contact"
            onClick={onClose}
            className="flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-slate-800 hover:bg-slate-50 text-sm"
          >
            Patna HQ & Contact
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>

        {/* Accordion Clusters */}
        <div className="px-4 pb-4 space-y-2 flex-grow">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-3 block">
            Ecosystem Divisions
          </span>

          {/* Cluster 1: Home & Facility */}
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleCluster('home')}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-50 text-left font-semibold text-sm text-slate-900"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Home & Facility Care
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openCluster === 'home' ? 'rotate-180' : ''}`} />
            </button>
            {openCluster === 'home' && (
              <div className="p-3 bg-white space-y-2 border-t border-slate-100 text-xs">
                <Link
                  to="/bentra-facility"
                  onClick={onClose}
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-amber-600"
                >
                  Brentra Facility Services (AC, Tank, Salon)
                </Link>
                <Link
                  to="/manpower-staffing"
                  onClick={onClose}
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-blue-600"
                >
                  Security Guards & Manpower
                </Link>
              </div>
            )}
          </div>

          {/* Cluster 2: Build & Realty */}
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleCluster('realty')}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-50 text-left font-semibold text-sm text-slate-900"
            >
              <span className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-600" />
                Build & Realty
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openCluster === 'realty' ? 'rotate-180' : ''}`} />
            </button>
            {openCluster === 'realty' && (
              <div className="p-3 bg-white space-y-2 border-t border-slate-100 text-xs">
                <Link
                  to="/realty-infrastructure"
                  onClick={onClose}
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-amber-700"
                >
                  Turnkey Construction (₹1,900/sq.ft)
                </Link>
                <Link
                  to="/realty-infrastructure#solar"
                  onClick={onClose}
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-amber-700"
                >
                  Solar & Clean Tech
                </Link>
              </div>
            )}
          </div>

          {/* Cluster 3: Technology */}
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleCluster('tech')}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-50 text-left font-semibold text-sm text-slate-900"
            >
              <span className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-600" />
                Technology & Systems
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openCluster === 'tech' ? 'rotate-180' : ''}`} />
            </button>
            {openCluster === 'tech' && (
              <div className="p-3 bg-white space-y-2 border-t border-slate-100 text-xs">
                <Link
                  to="/it-digital"
                  onClick={onClose}
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-cyan-600"
                >
                  Enterprise IT, Cloud & ERP
                </Link>
                <Link
                  to="/ventures"
                  onClick={onClose}
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-purple-600"
                >
                  Ventures & Incubation
                </Link>
              </div>
            )}
          </div>

          {/* Cluster 4: Trade & Hospitality */}
          <div className="border border-slate-100 rounded-xl overflow-hidden">
            <button
              onClick={() => toggleCluster('trade')}
              className="w-full flex items-center justify-between p-3.5 bg-slate-50/70 hover:bg-slate-50 text-left font-semibold text-sm text-slate-900"
            >
              <span className="flex items-center gap-2">
                <PartyPopper className="w-4 h-4 text-rose-600" />
                Trade & Hospitality
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${openCluster === 'trade' ? 'rotate-180' : ''}`} />
            </button>
            {openCluster === 'trade' && (
              <div className="p-3 bg-white space-y-2 border-t border-slate-100 text-xs">
                <Link
                  to="/events-hospitality"
                  onClick={onClose}
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-pink-600"
                >
                  Events & Luxury Hospitality
                </Link>
                <Link
                  to="/fmcg-beverages"
                  onClick={onClose}
                  className="block p-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 hover:text-emerald-600"
                >
                  Fresh FMCG & Beverages
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Direct Action Drawer Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
          <button
            onClick={() => {
              onClose();
              onOpenQuoteModal('bentra-facility');
            }}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-colors"
          >
            Book a Service / Get Quote
          </button>

          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <a
              href={SITE_CONFIG.contacts.phoneTel}
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-800 hover:border-slate-300"
            >
              <Phone className="w-3.5 h-3.5 text-blue-600" /> Call Desk
            </a>
            <a
              href={SITE_CONFIG.contacts.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp
            </a>
          </div>

          <div className="pt-2 text-[11px] text-slate-500 flex items-center justify-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            Patna HQ: {SITE_CONFIG.headquarters.address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;

