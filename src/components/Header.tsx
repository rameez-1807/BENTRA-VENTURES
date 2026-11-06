import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Phone, 
  MessageSquare, 
  ChevronDown, 
  Menu, 
  X, 
  Building2, 
  Cpu, 
  Users, 
  Droplets, 
  Waves, 
  Bug, 
  Megaphone,
  Sparkles, 
  ArrowRight, 
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

interface HeaderProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenQuoteModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [verticalsDropdownOpen, setVerticalsDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setVerticalsDropdownOpen(false);
  }, [location.pathname]);

  const verticalsList = [
    {
      title: 'Brentra Facility (Home Services)',
      path: '/facility-services',
      icon: Sparkles,
      color: '#0788FF',
      tagline: 'Urban Company style on-demand salon, AC, cleaning, electrician from ₹79'
    },
    {
      title: 'Construction Services',
      path: '/construction-services',
      icon: Building2,
      color: '#B8860B',
      tagline: 'Complete Turnkey Home Construction @ ₹1,900/sq.ft'
    },
    {
      title: 'IT Solutions & Software',
      path: '/it-solutions',
      icon: Cpu,
      color: '#0284C7',
      tagline: 'Websites (from ₹10k), Mobile Apps, ERP, CCTV & IT AMC'
    },
    {
      title: 'Manpower & Housekeeping',
      path: '/manpower-housekeeping',
      icon: Users,
      color: '#2563EB',
      tagline: 'Security Guards, Cleaners, Electricians from ₹15,500/mo'
    },
    {
      title: 'RO Water Purifier & AMC',
      path: '/ro-water-purifier',
      icon: Droplets,
      color: '#0891B2',
      tagline: 'Inspection ₹149, Annual AMC from ₹899 to ₹4,599'
    },
    {
      title: 'Water Tank Cleaning',
      path: '/water-tank-cleaning',
      icon: Waves,
      color: '#0284C7',
      tagline: '6-Stage High-Pressure Cleaning from ₹700 (500L–1000L)'
    },
    {
      title: 'Pest Control Services',
      path: '/pest-control',
      icon: Bug,
      color: '#059669',
      tagline: 'Termite (₹8/sq.ft), General Pest (₹2/sq.ft), Roach (₹999)'
    },
    {
      title: 'Social Media & Marketing',
      path: '/digital-marketing',
      icon: Megaphone,
      color: '#DB2777',
      tagline: 'Monthly Growth Packages from ₹4,999, Reels & Ad Campaigns'
    }
  ];

  return (
    <>
      {/* Top Corporate Strip - Executive Deep Navy */}
      <div className="bg-[#0A192F] text-xs text-slate-300 py-1.5 px-4 hidden md:block border-b border-[#1E3E62]/40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Patna Central Desk: Mon–Sun (8:00 AM – 9:00 PM IST)
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-300">Office: Preven Vila, Flat 34, New Khajoorbana, Patna – 800006</span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-medium flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> ₹1,900/sq.ft Turnkey Construction Guarantee
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a 
              href="tel:9065296294" 
              className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5" /> 9065296294
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="tel:+919142144940" 
              className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5" /> +91 91421 44940
            </a>
            <span className="text-slate-600">|</span>
            <a 
              href="https://wa.me/919142144940" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors font-medium"
            >
              <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Support
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar - Premium White */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-xl shadow-md py-2.5 border-b border-slate-200/90' 
            : 'bg-white py-3.5 border-b border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Official Logo - Logo B and Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="/b-logo.png" 
              alt="Brentra Ventures PVT Logo" 
              className="h-10 sm:h-12 w-auto object-contain transition-transform group-hover:scale-105 drop-shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0A192F] leading-tight flex items-center gap-1.5 font-['Outfit']">
                <span>BRENTRA</span>
                <span className="text-[#0284C7]">VENTURES</span>
              </span>
              <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.22em] text-slate-500 uppercase -mt-0.5">
                PRIVATE LIMITED
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link 
              to="/" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/' 
                  ? 'text-[#0A192F] border-b-2 border-[#0A192F] rounded-none font-bold pb-1' 
                  : 'text-slate-700 hover:text-[#0A192F] hover:bg-slate-50'
              }`}
            >
              Home
            </Link>

            <Link 
              to="/corporate-overview" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/corporate-overview' 
                  ? 'text-[#0A192F] bg-slate-100 font-bold' 
                  : 'text-slate-700 hover:text-[#0A192F] hover:bg-slate-50'
              }`}
            >
              About Us
            </Link>

            <Link 
              to="/facility-services" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                location.pathname === '/facility-services' || location.pathname === '/brentra-facility'
                  ? 'text-[#0788FF] bg-blue-50 font-bold' 
                  : 'text-slate-700 hover:text-[#0788FF] hover:bg-slate-50'
              }`}
            >
              <span>Brentra Facility</span>
              <span className="px-1.5 py-0.5 rounded-full bg-[#0788FF] text-white text-[9px] font-extrabold uppercase">
                Urban
              </span>
            </Link>

            {/* Business Verticals Mega-Menu Button */}
            <div 
              className="relative"
              onMouseEnter={() => setVerticalsDropdownOpen(true)}
              onMouseLeave={() => setVerticalsDropdownOpen(false)}
            >
              <button 
                type="button" 
                className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:text-[#0A192F] hover:bg-slate-50 transition-colors flex items-center gap-1.5 cursor-pointer"
                onClick={() => setVerticalsDropdownOpen(!verticalsDropdownOpen)}
                aria-expanded={verticalsDropdownOpen}
              >
                <span>Services & Rates</span>
                <ChevronDown className={`w-4 h-4 text-amber-600 transition-transform duration-200 ${verticalsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Mega-Menu Panel */}
              {verticalsDropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[760px] pt-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 grid grid-cols-2 gap-3.5">
                    <div className="col-span-2 pb-3 mb-1 border-b border-slate-100 flex justify-between items-center">
                      <span className="text-xs font-bold text-[#0A192F] uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Brentra Ventures Service Verticals & Pricing
                      </span>
                      <span className="text-[11px] font-medium text-slate-500">Patna, Bihar</span>
                    </div>

                    {verticalsList.map((vert, idx) => {
                      const IconComponent = vert.icon;
                      return (
                        <Link
                          key={idx}
                          to={vert.path}
                          className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 transition-all group/item"
                        >
                          <div 
                            className="p-2.5 rounded-xl shrink-0 mt-0.5 transition-transform group-hover/item:scale-110 shadow-sm"
                            style={{ backgroundColor: `${vert.color}15`, color: vert.color }}
                          >
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-[#0A192F] group-hover/item:text-blue-900 flex items-center gap-1">
                              {vert.title}
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                              {vert.tagline}
                            </p>
                          </div>
                        </Link>
                      );
                    })}

                    <div className="col-span-2 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 px-1">
                      <span>Looking for institutional procurement or civil contracts?</span>
                      <button 
                        onClick={() => {
                          setVerticalsDropdownOpen(false);
                          onOpenQuoteModal();
                        }}
                        className="text-[#0A192F] hover:text-amber-700 font-bold flex items-center gap-1"
                      >
                        Request Instant Quote <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Link 
              to="/patna-hub" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/patna-hub' 
                  ? 'text-[#0A192F] bg-slate-100 font-bold' 
                  : 'text-slate-700 hover:text-[#0A192F] hover:bg-slate-50'
              }`}
            >
              Contact Us
            </Link>

            <Link 
              to="/careers" 
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/careers' 
                  ? 'text-[#0A192F] bg-slate-100 font-bold' 
                  : 'text-slate-700 hover:text-[#0A192F] hover:bg-slate-50'
              }`}
            >
              Our Partners
            </Link>
          </nav>

          {/* Right Utilities (Quote Button & Fast Contact) */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => onOpenQuoteModal()}
              className="relative inline-flex items-center justify-center px-6 py-2.5 text-sm font-bold text-white transition-all bg-[#00ACC1] hover:bg-[#0097A7] rounded-lg shadow-md hover:shadow-xl active:scale-95 cursor-pointer"
            >
              Book a Service
            </button>
          </div>

          {/* Mobile Menu Hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenQuoteModal()}
              className="px-2.5 py-1.5 text-xs font-bold text-white bg-[#0A192F] rounded-lg"
            >
              Quote
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#0A192F] hover:bg-slate-100"
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-[#0A192F]" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md text-base font-semibold text-slate-800 hover:bg-slate-50"
              >
                Home
              </Link>
              <Link
                to="/facility-services"
                className="flex items-center justify-between px-3 py-2 rounded-md text-base font-bold text-[#0788FF] bg-blue-50"
              >
                <span>Brentra Facility (Home Services)</span>
                <span className="px-2 py-0.5 rounded-full bg-[#0788FF] text-white text-[10px] font-extrabold uppercase">
                  Urban Co Style
                </span>
              </Link>
              <Link
                to="/corporate-overview"
                className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                Corporate Overview
              </Link>
              <Link
                to="/patna-hub"
                className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                Patna Hub & Contact
              </Link>
              <Link
                to="/careers"
                className="block px-3 py-2 rounded-md text-base font-semibold text-slate-700 hover:bg-slate-50"
              >
                Partners & Careers
              </Link>
            </div>

            <div className="pt-2 border-t border-slate-100">
              <div className="text-xs font-bold text-[#0A192F] uppercase tracking-wider mb-2 px-3">
                Service Pages & Rates
              </div>
              <div className="grid grid-cols-1 gap-1">
                {verticalsList.map((vert, idx) => (
                  <Link
                    key={idx}
                    to={vert.path}
                    className="flex items-center gap-2.5 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-md"
                  >
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: vert.color }} />
                    {vert.title}
                  </Link>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuoteModal();
                }}
                className="w-full py-2.5 px-4 text-center font-bold text-white bg-[#0A192F] rounded-xl text-xs uppercase tracking-wider shadow-md"
              >
                Book a Service / Free Quote
              </button>
              <div className="flex gap-2">
                <a
                  href="tel:9065296294"
                  className="flex-1 py-2 px-3 text-center text-xs font-semibold bg-slate-100 text-slate-800 rounded-lg flex items-center justify-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#0A192F]" /> 9065296294
                </a>
                <a
                  href="https://wa.me/919142144940"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-3 text-center text-xs font-semibold bg-emerald-600 text-white rounded-lg flex items-center justify-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
