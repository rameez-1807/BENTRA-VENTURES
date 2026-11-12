import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  MessageSquare, 
  ChevronDown, 
  Menu, 
  ShieldCheck, 
  Sparkles,
  Building2,
  Compass,
  ArrowRight
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { MobileMenu } from './nav/MobileMenu';

interface HeaderProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const companyTimerRef = useRef<NodeJS.Timeout | null>(null);
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
    setCompanyDropdownOpen(false);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleCompanyMouseEnter = () => {
    if (companyTimerRef.current) clearTimeout(companyTimerRef.current);
    companyTimerRef.current = setTimeout(() => {
      setCompanyDropdownOpen(true);
    }, 100);
  };

  const handleCompanyMouseLeave = () => {
    if (companyTimerRef.current) clearTimeout(companyTimerRef.current);
    companyTimerRef.current = setTimeout(() => {
      setCompanyDropdownOpen(false);
    }, 150);
  };

  const isHome = location.pathname === '/';

  return (
    <>
      {/* 1. Slim Dark Navy Top Announcement Bar */}
      <div 
        className="bg-[#0B1B2B] text-slate-200 text-xs border-b border-[#162C42] py-2 hidden md:block"
        role="complementary"
        aria-label="Patna Operational Hub and Corporate Helpline"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-[11px] font-medium tracking-wide">
          {/* Left Announcement */}
          <div className="flex items-center gap-3">
            <span className="text-slate-300">
              Patna Central Hub | Office Hours: 9:00 AM – 8:00 PM | Corporate Contact
            </span>
          </div>

          {/* Right Direct Links */}
          <div className="flex items-center gap-4">
            <a 
              href={SITE_CONFIG.contacts.phoneTel}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors font-semibold"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{SITE_CONFIG.contacts.phoneFormatted}</span>
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href={SITE_CONFIG.contacts.whatsappLink}
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Desk</span>
            </a>
            <span className="text-slate-600 hidden lg:inline">|</span>
            <span className="text-slate-400 hidden lg:inline">
              CIN Registered &bull; Patna HQ
            </span>
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
          
          {/* LEFT: Company Logo & Name */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <img 
              src="/b-logo.png" 
              alt="Brentra Ventures Emblem" 
              className="h-10 sm:h-11 w-auto object-contain transition-transform group-hover:scale-105"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0E2442] leading-none font-['Outfit']">
                BRENTRA <span className="text-[#0E2442]">VENTURES</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.22em] text-slate-500 uppercase mt-1">
                PRIVATE LIMITED
              </span>
            </div>
          </Link>

          {/* CENTER / RIGHT Navigation Links matching Reference */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            
            {/* 1. Home */}
            <Link 
              to="/" 
              className={`px-3 py-2 text-sm font-semibold transition-colors relative ${
                isHome ? 'text-slate-900 font-bold' : 'text-slate-700 hover:text-slate-900'
              }`}
            >
              Home
              {isHome && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-slate-900 rounded-full" />
              )}
            </Link>

            {/* 2. About Us */}
            <Link 
              to="/about"
              className={`px-3 py-2 text-sm font-semibold transition-colors rounded-lg ${
                location.pathname === '/about' 
                  ? 'text-slate-900 bg-slate-100 font-bold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>

            {/* 3. Director Message */}
            <Link 
              to="/about#director"
              className="px-3 py-2 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-50 transition-colors rounded-lg"
            >
              Director Message
            </Link>

            {/* 4. Brentra Facility with URBAN pill badge */}
            <Link 
              to="/bentra-facility"
              className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold transition-colors rounded-lg ${
                location.pathname.startsWith('/bentra-facility')
                  ? 'text-[#00A3C4] bg-cyan-50/80 font-bold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <span>Brentra Facility</span>
              <span className="px-1.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wide bg-[#00A3C4] text-white rounded-md shadow-xs">
                URBAN
              </span>
            </Link>

            {/* 5. Company (Dropdown Menu) */}
            <div 
              className="relative"
              onMouseEnter={handleCompanyMouseEnter}
              onMouseLeave={handleCompanyMouseLeave}
            >
              <button
                type="button"
                onClick={() => setCompanyDropdownOpen(!companyDropdownOpen)}
                className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                  companyDropdownOpen
                    ? 'text-slate-900 bg-slate-100' 
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
                aria-expanded={companyDropdownOpen}
                aria-haspopup="true"
              >
                <span>Company</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${companyDropdownOpen ? 'rotate-180 text-slate-900' : 'text-slate-400'}`} />
              </button>

              {/* Company Dropdown Card */}
              {companyDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Corporate Group</p>
                    <p className="text-xs font-semibold text-slate-800">Brentra Ventures Pvt Ltd</p>
                  </div>

                  <Link 
                    to="/about"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-[#0E2442] hover:bg-slate-50 transition-colors"
                  >
                    <Building2 className="w-4 h-4 text-amber-600" />
                    <div>
                      <div>Leadership & Vision</div>
                      <span className="text-[10px] text-slate-400 font-normal">Board of Directors & Ethos</span>
                    </div>
                  </Link>

                  <Link 
                    to="/about#director"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-[#0E2442] hover:bg-slate-50 transition-colors"
                  >
                    <Compass className="w-4 h-4 text-blue-600" />
                    <div>
                      <div>Director's Message</div>
                      <span className="text-[10px] text-slate-400 font-normal">Strategic roadmap & commitments</span>
                    </div>
                  </Link>

                  <Link 
                    to="/contact"
                    className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 hover:text-[#0E2442] hover:bg-slate-50 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <div>
                      <div>Patna Central Hub</div>
                      <span className="text-[10px] text-slate-400 font-normal">Headquarters & State Operations</span>
                    </div>
                  </Link>

                  <div className="border-t border-slate-100 my-1" />

                  <Link 
                    to="/admin"
                    className="flex items-center justify-between px-4 py-2 text-[11px] font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors"
                  >
                    <span>Operations Console</span>
                    <ArrowRight className="w-3 h-3 text-slate-400" />
                  </Link>
                </div>
              )}
            </div>

            {/* 6. Careers */}
            <Link 
              to="/careers-partners"
              className={`px-3 py-2 text-sm font-semibold transition-colors rounded-lg ${
                location.pathname === '/careers-partners' 
                  ? 'text-slate-900 bg-slate-100 font-bold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Careers
            </Link>

            {/* 7. Contact Us */}
            <Link 
              to="/contact"
              className={`px-3 py-2 text-sm font-semibold transition-colors rounded-lg ${
                location.pathname === '/contact'
                  ? 'text-slate-900 bg-slate-100 font-bold' 
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* RIGHT CTA: Book a Service */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal('bentra-facility')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#00A3C4] hover:bg-[#008CA8] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-sm transition-all cursor-pointer"
            >
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
