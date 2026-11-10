import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  MessageSquare, 
  ChevronDown, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { MegaMenu } from './nav/MegaMenu';
import { MobileMenu } from './nav/MobileMenu';

interface HeaderProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route navigation
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Hover Intent (120ms delay) for MegaMenu
  const handleMouseEnter = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(true);
    }, 120);
  };

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 150);
  };

  return (
    <>
      {/* 1. Utility Top Strip (36px, Collapsible on Scroll) */}
      <div 
        className={`bg-slate-950 text-slate-300 text-xs border-b border-slate-800 transition-all duration-300 overflow-hidden ${
          isScrolled ? 'max-h-0 opacity-0 py-0' : 'max-h-12 opacity-100 py-2'
        } hidden md:block`}
        role="complementary"
        aria-label="Patna Operational Hours and Emergency Desk"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Patna Operations Live: {SITE_CONFIG.operatingHours.facilityServices}
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-slate-400 hidden xl:inline">
              HQ: {SITE_CONFIG.headquarters.address}, Patna – {SITE_CONFIG.headquarters.pincode}
            </span>
            <span className="text-slate-700 hidden xl:inline">|</span>
            <span className="text-amber-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Construction Baseline Locked at {SITE_CONFIG.rates.constructionBaselineFormatted}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a 
              href={SITE_CONFIG.contacts.phoneTel}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              {SITE_CONFIG.contacts.phoneFormatted}
            </a>
            <span className="text-slate-700">|</span>
            <a 
              href={SITE_CONFIG.contacts.whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              WhatsApp Helpdesk
            </a>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <header 
        className={`sticky top-0 z-50 bg-white transition-all duration-200 border-b ${
          isScrolled ? 'shadow-md py-2.5 border-slate-200/90' : 'py-3.5 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img 
              src="/b-logo.png" 
              alt="Brentra Ventures Emblem" 
              className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-slate-900 leading-none font-['Outfit']">
                BRENTRA <span className="text-amber-600">VENTURES</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase mt-1">
                Private Limited
              </span>
            </div>
          </Link>

          {/* Canonical 4 Top-Level Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {/* 1. Services with MegaMenu */}
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <button
                type="button"
                onClick={() => setMegaMenuOpen(!megaMenuOpen)}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  megaMenuOpen || location.pathname.startsWith('/bentra-facility') || location.pathname.startsWith('/realty') || location.pathname.startsWith('/events')
                    ? 'text-amber-600 bg-amber-50/80' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-expanded={megaMenuOpen}
                aria-haspopup="true"
              >
                Services
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${megaMenuOpen ? 'rotate-180 text-amber-600' : 'text-slate-400'}`} />
              </button>
            </div>

            {/* 2. About */}
            <Link 
              to="/about"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === '/about' 
                  ? 'text-slate-900 bg-slate-100 font-bold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About
            </Link>

            {/* 3. Careers & Partners */}
            <Link 
              to="/careers-partners"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === '/careers-partners' 
                  ? 'text-slate-900 bg-slate-100 font-bold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Careers & Partners
            </Link>

            {/* 4. Contact */}
            <Link 
              to="/contact"
              className={`px-3.5 py-2 rounded-xl text-sm font-semibold transition-colors ${
                location.pathname === '/contact' || location.pathname === '/patna-hub'
                  ? 'text-slate-900 bg-slate-100 font-bold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Header CTAs */}
          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.contacts.phoneTel}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>{SITE_CONFIG.contacts.phoneFormatted}</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal('bentra-facility')}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all active:scale-95 group"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Book a Service</span>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Desktop Full-Width MegaMenu Dropdown */}
        <div 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
        >
          <MegaMenu 
            isOpen={megaMenuOpen} 
            onClose={() => setMegaMenuOpen(false)} 
            onOpenQuoteModal={onOpenQuoteModal} 
          />
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onOpenQuoteModal={onOpenQuoteModal}
      />
    </>
  );
};

export default Header;
