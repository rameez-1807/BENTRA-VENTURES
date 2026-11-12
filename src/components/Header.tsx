import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  MessageSquare, 
  ChevronDown, 
  Menu, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { MegaMenu } from './nav/MegaMenu';
import { MobileMenu } from './nav/MobileMenu';

interface HeaderProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const servicesTimerRef = useRef<NodeJS.Timeout | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route navigation
  useEffect(() => {
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleServicesMouseEnter = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    servicesTimerRef.current = setTimeout(() => {
      setServicesDropdownOpen(true);
    }, 100);
  };

  const handleServicesMouseLeave = () => {
    if (servicesTimerRef.current) clearTimeout(servicesTimerRef.current);
    servicesTimerRef.current = setTimeout(() => {
      setServicesDropdownOpen(false);
    }, 150);
  };

  return (
    <>
      {/* 1. Top Corporate Information Bar */}
      <div 
        className="bg-[#071426] text-slate-200 text-xs border-b border-[#162C42] py-2 hidden md:block"
        role="complementary"
        aria-label="Patna Operational Hub and Corporate Helpline"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[11px] font-medium tracking-wide">
          
          {/* LEFT: Green Live Status Dot & Operations Hours */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span className="text-emerald-400 font-semibold">
              Patna Operations Live: 7:00 AM – 9:00 PM IST (All 7 Days)
            </span>
          </div>

          {/* CENTER: Headquarters Address */}
          <div className="hidden xl:flex items-center text-slate-300">
            <span>HQ: Preven Vila, Flat 34, New Khajoorbana, Patna – 800006</span>
          </div>

          {/* RIGHT: Construction Baseline, Phone & WhatsApp */}
          <div className="flex items-center gap-4">
            <span className="text-amber-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Construction Baseline Locked at ₹1,900 / sq. ft.
            </span>
            <span className="text-slate-600">|</span>
            <a 
              href={SITE_CONFIG.contacts.phoneTel}
              className="flex items-center gap-1.5 text-slate-100 hover:text-white transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-slate-300" />
              <span>+91 90652 96294</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={SITE_CONFIG.contacts.whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Helpdesk</span>
            </a>
          </div>

        </div>
      </div>

      {/* 2. Main Navigation Header (Clean White, Sticky) */}
      <header 
        className={`sticky top-0 z-50 bg-white transition-all duration-200 border-b ${
          isScrolled ? 'shadow-md py-2.5 border-slate-200/90' : 'py-3.5 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* LEFT: Company Logo & Branding */}
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
              <span className="text-[9px] font-bold tracking-[0.22em] text-slate-500 uppercase mt-1">
                PRIVATE LIMITED
              </span>
            </div>
          </Link>

          {/* CENTER: Navigation Links matching Reference Screenshot */}
          <nav className="hidden lg:flex items-center gap-7 xl:gap-8">
            
            {/* 1. Services with Dropdown */}
            <div 
              className="relative"
              onMouseEnter={handleServicesMouseEnter}
              onMouseLeave={handleServicesMouseLeave}
            >
              <button
                type="button"
                onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors py-1 cursor-pointer ${
                  servicesDropdownOpen 
                    ? 'text-amber-600' 
                    : 'text-slate-700 hover:text-slate-900'
                }`}
                aria-expanded={servicesDropdownOpen}
                aria-haspopup="true"
              >
                <span>Services</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-amber-600' : 'text-slate-400'}`} />
              </button>
            </div>

            {/* 2. About */}
            <Link 
              to="/about"
              className={`text-sm font-semibold transition-colors py-1 ${
                location.pathname === '/about' 
                  ? 'text-slate-900 font-bold' 
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              About
            </Link>

            {/* 3. Careers & Partners */}
            <Link 
              to="/careers-partners"
              className={`text-sm font-semibold transition-colors py-1 ${
                location.pathname === '/careers-partners' 
                  ? 'text-slate-900 font-bold' 
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Careers & Partners
            </Link>

            {/* 4. Contact */}
            <Link 
              to="/contact"
              className={`text-sm font-semibold transition-colors py-1 ${
                location.pathname === '/contact'
                  ? 'text-slate-900 font-bold' 
                  : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* RIGHT: Phone & Book a Service CTA */}
          <div className="flex items-center gap-3 sm:gap-4">
            <a
              href="tel:+919065296294"
              className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
              <span>+91 90652 96294</span>
            </a>

            <button
              onClick={() => onOpenQuoteModal('bentra-facility')}
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <span>Book a Service</span>
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

        </div>

        {/* Full-Width Services MegaMenu */}
        <div 
          onMouseEnter={handleServicesMouseEnter} 
          onMouseLeave={handleServicesMouseLeave}
        >
          <MegaMenu 
            isOpen={servicesDropdownOpen} 
            onClose={() => setServicesDropdownOpen(false)} 
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
