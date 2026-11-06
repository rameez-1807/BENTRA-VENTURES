import React, { useState } from 'react';
import { 
  PartyPopper, 
  UtensilsCrossed, 
  CheckCircle2, 
  ArrowRight, 
  Phone, 
  Heart, 
  Award,
  Sparkles,
  Calendar,
  Users,
  Download,
  MessageSquare,
  ShieldCheck,
  Eye,
  X,
  Star,
  FileText,
  Music,
  Camera,
  MapPin
} from 'lucide-react';

interface EventsHospitalityPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const EventsHospitalityPage: React.FC<EventsHospitalityPageProps> = ({ onOpenQuoteModal }) => {
  const [eventType, setEventType] = useState('Luxury Wedding & Sangeet Gala');
  const [guestCount, setGuestCount] = useState<number>(500);
  const [eventDate, setEventDate] = useState('2026-11-25');
  const [budgetTier, setBudgetTier] = useState<'classic' | 'grand' | 'royal'>('grand');
  const [eventLocation, setEventLocation] = useState('Patna Heritage Lawns / Hotel Maurya');
  const [plannerName, setPlannerName] = useState('');
  const [plannerPhone, setPlannerPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [posterModalOpen, setPosterModalOpen] = useState(false);

  const [portfolioFilter, setPortfolioFilter] = useState<'all' | 'weddings' | 'corporate' | 'catering'>('all');

  // Package Rate Cards
  const eventPackages = [
    {
      id: 'pkg-royal-wedding',
      name: 'Royal Wedding & Sangeet Extravaganza',
      tagline: 'Turnkey Luxury Wedding Decor, Hydraulic Stage & Grand Mandap',
      startingPrice: '₹1,49,999',
      unit: 'Complete Turnkey Decor',
      badge: 'Most Popular in Bihar',
      accentColor: '#DB2777',
      highlights: [
        'Grand floral entrance canopy & red carpet pathway',
        'Custom 40ft thematic royal backdrop with laser floral cutouts',
        'Hydraulic revolving bride & groom varmala stage',
        'Vrindavan / Rajasthani royal glass mandap with sacred hawan kund',
        'Acoustic surround rigging & ambient architectural truss lighting',
        'Bespoke bridal entry concept with cold pyrotechnics'
      ]
    },
    {
      id: 'pkg-corporate-summit',
      name: 'Corporate Summit, AV & Conclave Rigging',
      tagline: 'High-Resolution P2/P3 Curved 4K LED Screens & Line Arrays',
      startingPrice: '₹49,999',
      unit: 'Full Day Setup',
      badge: 'Enterprise Standard',
      accentColor: '#0284C7',
      highlights: [
        'Seamless P2.6 ultra-HD LED video backdrop (up to 30ft x 12ft)',
        'JBL VRX / VTX Line Array sound with digital mixing console',
        'Multi-camera 4K live broadcast & YouTube/Zoom streaming rig',
        'Custom corporate registration podiums & attendee badge printers',
        'Wireless lapel & podium microphones with zero feedback',
        'Stage reveal pyrotechnics & confetti blasters for product launches'
      ]
    },
    {
      id: 'pkg-gourmet-catering',
      name: 'Royal Bihari & Global Gourmet Catering',
      tagline: 'FSSAI Certified 5-Star Brigade for 100 to 5,000+ Guests',
      startingPrice: '₹650 – ₹1,800',
      unit: 'Per Plate (Veg & Non-Veg)',
      badge: 'Chef Brigade',
      accentColor: '#D97706',
      highlights: [
        'Live interactive chef counters: Awadhi Galouti, Tandoor & Pasta',
        'Authentic Royal Bihari Bhoj: Champaran Meat, Litti Chokha & Khaja',
        'Multi-cuisine spreads: North Indian, Continental & Pan-Asian',
        'Gourmet Brentra artisanal ice cream & mocktail dessert lounge',
        'Hospitality staff dressed in royal traditional livery uniforms',
        'Strict FSSAI food safety inspection & temperature-controlled logistics'
      ]
    },
    {
      id: 'pkg-intimate-celebration',
      name: 'Haldi, Mehendi & Birthday Boutique Gala',
      tagline: 'Instagrammable Yellow Marigold Canopies & Fairy Lights',
      startingPrice: '₹34,999',
      unit: 'Complete Thematic Styling',
      badge: 'Trending Vibes',
      accentColor: '#EAB308',
      highlights: [
        'Vibrant marigold & yellow drape canopies with floral swings',
        'Neon hashtag selfie photobooths & personalized monogram backdrops',
        'High-energy Bollywood DJ setup with moving beam heads & smoke',
        'Mehendi lounge seating with colorful Bohemian floor cushions',
        'Complimentary props, pagris & customized giveaway accessories',
        'Dedicated event coordinator on-site throughout the celebration'
      ]
    }
  ];

  // Curated Portfolio Items with real photos
  const portfolioItems = [
    {
      id: 1,
      category: 'weddings',
      title: 'Royal Mauryan Palace Grand Wedding',
      location: 'Patna Heritage Grounds',
      guests: '1,200 Guests',
      tag: 'Grand Floral & Crystal Chandelier Canopy',
      image: '/img-events.jpg',
      priceGuide: 'Full Turnkey Decor'
    },
    {
      id: 2,
      category: 'corporate',
      title: 'Eastern India Tech & Energy Summit 2026',
      location: 'Gyan Bhawan, Gandhi Maidan, Patna',
      guests: '850 Delegates',
      tag: 'Curved 4K P2.6 LED Wall & Acoustic Rigging',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
      priceGuide: 'AV & Production'
    },
    {
      id: 3,
      category: 'catering',
      title: 'State Banquet & Diplomatic Gala Dinner',
      location: 'Patna Executive Club, Bailey Road',
      guests: '450 Dignitaries',
      tag: '7-Course Multi-Cuisine Gourmet Spread',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=600&q=80',
      priceGuide: '₹1,450 / Plate'
    },
    {
      id: 4,
      category: 'weddings',
      title: 'Enchanted Vrindavan Theme Sangeet & Reception',
      location: 'Danapur Riverfront Lawns, Patna',
      guests: '900 Guests',
      tag: 'Fairy Light Tunnel & Hydraulic Revolving Stage',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
      priceGuide: 'Wedding + Sangeet'
    },
    {
      id: 5,
      category: 'corporate',
      title: 'Annual Automobile Dealer Conclave & Awards',
      location: 'Hotel Maurya Grand Ballroom, Patna',
      guests: '400 Partners',
      tag: '360° Stage Reveal & Cold Pyrotechnics',
      image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=600&q=80',
      priceGuide: 'Corporate Production'
    },
    {
      id: 6,
      category: 'catering',
      title: 'Traditional Bihari Royal Bhoj & Live Chaat Arena',
      location: 'Saguna More Banquet Arena, Patna',
      guests: '2,000 Guests',
      tag: '12 Live Cooking Counters & Brentra Dessert Lounge',
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80',
      priceGuide: '₹850 / Plate'
    }
  ];

  const filteredPortfolio = portfolioFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === portfolioFilter);

  // Dynamic estimate calculation
  const getEstimatedCost = () => {
    let perPlate = 850;
    let baseDecor = 120000;
    if (budgetTier === 'classic') {
      perPlate = 650;
      baseDecor = 65000;
    } else if (budgetTier === 'royal') {
      perPlate = 1450;
      baseDecor = 220000;
    }
    const cateringTotal = guestCount * perPlate;
    const grandEstimate = cateringTotal + baseDecor;
    return {
      perPlate,
      baseDecor,
      cateringTotal,
      grandEstimate
    };
  };

  const estimate = getEstimatedCost();

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `*BRENTRA LUXURY EVENTS INQUIRY*%0A` +
      `--------------------------------%0A` +
      `*Client Name:* ${plannerName || 'Client'}%0A` +
      `*Contact:* ${plannerPhone || 'Not provided'}%0A` +
      `*Event Type:* ${eventType}%0A` +
      `*Expected Guests:* ${guestCount} Guests%0A` +
      `*Event Date:* ${eventDate}%0A` +
      `*Venue/City:* ${eventLocation}%0A` +
      `*Package Tier:* ${budgetTier.toUpperCase()}%0A` +
      `*Estimated Budget:* ₹${estimate.grandEstimate.toLocaleString('en-IN')}%0A` +
      `*Notes:* ${encodeURIComponent(specialRequests || 'Please share available floor themes, stage blueprints, and catering menu options.')}`;
    return `https://wa.me/919065296294?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased">
      
      {/* 1. HERO SECTION WITH OFFICIAL POSTER SHOWCASE */}
      <section className="relative py-16 lg:py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-800 text-xs font-bold uppercase tracking-widest">
              <PartyPopper className="w-4 h-4 text-pink-600" /> Division 05 • Brentra Luxury Events & Hospitality
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Turnkey Production Across Bihar
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Column: Headlines & Rates */}
            <div className="lg:col-span-7 space-y-5">
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.12]">
                Signature Weddings, Summits & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-rose-600 to-amber-600">Royal Catering</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                From fairy-tale destination weddings and high-tech curved LED corporate summits to 5-star multi-cuisine catering for up to 5,000+ guests. Turnkey event architecture executed with military precision across Patna and all major districts of Bihar.
              </p>

              {/* Verified Rate Callouts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-bold text-pink-700 uppercase tracking-wider block">Royal Wedding Decor</span>
                  <span className="text-xl font-extrabold text-[#0A192F]">From ₹1.49L</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Hydraulic Stage & Mandap</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm">
                  <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">Corporate Conclaves</span>
                  <span className="text-xl font-extrabold text-[#0A192F]">From ₹49,999</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">4K Curved LED & Sound</span>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-sm col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Gourmet Catering</span>
                  <span className="text-xl font-extrabold text-[#0A192F]">₹650 - ₹1,800</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Per Plate • Live Counters</span>
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-4">
                <a
                  href="#planner-calc"
                  className="px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Check Date & Cost Calculator</span>
                </a>

                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp Event Architect</span>
                </a>

                <a
                  href="tel:9065296294"
                  className="px-4 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Phone className="w-4 h-4 text-pink-600" />
                  <span>9065296294</span>
                </a>
              </div>

              {/* Credibility Stats */}
              <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">380+</div>
                  <div className="text-xs text-slate-500 mt-0.5">Galas & Summits Held</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">5,000+</div>
                  <div className="text-xs text-slate-500 mt-0.5">Max Catering Capacity</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">P2.6 4K</div>
                  <div className="text-xs text-slate-500 mt-0.5">Curved LED Screens</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">100%</div>
                  <div className="text-xs text-slate-500 mt-0.5">FSSAI Certified Kitchens</div>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Poster Card Showcase */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-[#061426] group">
                
                {/* Official Poster Image */}
                <div className="relative h-[440px] w-full overflow-hidden">
                  <img 
                    src="/img-events.jpg" 
                    alt="Brentra Luxury Events & Wedding Hospitality Official Poster" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-[#061426]/30 to-transparent" />

                  {/* Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-pink-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Official Event Brochure</span>
                  </div>

                  {/* Zoom button */}
                  <button
                    onClick={() => setPosterModalOpen(true)}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer"
                    title="Zoom Poster View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>

                  {/* Poster Bottom Card Info */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-pink-300">Royal Wedlock & Corporate AV</span>
                      <span className="text-amber-300 font-mono">₹1,49,999 Starting</span>
                    </div>
                    <h3 className="font-bold text-base text-white leading-snug">
                      Brentra Luxury Events & Hospitality Division
                    </h3>
                    <p className="text-[11px] text-slate-200 line-clamp-2">
                      Complete stage architecture, floral mandaps, JBL sound, celebrity artists & gourmet catering across Bihar.
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px]">
                      <button
                        onClick={() => setPosterModalOpen(true)}
                        className="text-pink-300 hover:text-white font-bold underline cursor-pointer"
                      >
                        Enlarge Poster View →
                      </button>
                      <span className="text-slate-300">Patna, Bihar</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. TRANSPARENT EVENT PACKAGES & RATE CARDS */}
      <section id="packages" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-pink-700 uppercase tracking-widest px-3 py-1 rounded bg-pink-50 border border-pink-200">
              Transparent Pricing • No Hidden Costs
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Curated Event & Hospitality Packages
            </h2>
            <p className="text-sm text-slate-600">
              Clear upfront rates with complete itemized production blueprints for weddings, institutional corporate summits, and gourmet catering.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {eventPackages.map((pkg) => (
              <div 
                key={pkg.id}
                className="bg-white border border-slate-200 hover:border-slate-400 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span 
                      className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full text-white shadow-sm"
                      style={{ backgroundColor: pkg.accentColor }}
                    >
                      {pkg.badge}
                    </span>
                    <Sparkles className="w-4 h-4 text-amber-500" />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#0A192F] group-hover:text-pink-700 transition-colors leading-snug">
                    {pkg.name}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 mb-4">
                    {pkg.tagline}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 mb-5">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">Package Rate</span>
                    <div className="text-2xl font-black text-[#0A192F] font-mono">
                      {pkg.startingPrice}
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">{pkg.unit}</span>
                  </div>

                  {/* Highlights checklist */}
                  <div className="space-y-2">
                    <div className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                      Package Inclusions:
                    </div>
                    {pkg.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 space-y-2">
                  <a
                    href="#planner-calc"
                    onClick={() => setEventType(pkg.name)}
                    className="w-full py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Configure & Book</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-emerald-200"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire via WhatsApp</span>
                  </a>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE EVENT COST & GUEST PLANNER CALCULATOR */}
      <section id="planner-calc" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            
            <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
              <span className="text-xs font-bold text-pink-700 uppercase tracking-widest px-3 py-1 rounded bg-pink-50 border border-pink-200">
                Live Cost Simulator
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F]">
                Plan Your Event Budget & Reserve Patna Dates
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Adjust the guest slider and catering tier to estimate the total production & banquet cost for your wedding or summit.
              </p>
            </div>

            {inquirySubmitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-lg mx-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-heading font-bold text-xl text-slate-900">Event Date Tentatively Reserved!</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{plannerName}</strong>. Our Chief Event Architect is reviewing your requirements for <strong className="text-slate-900">{guestCount} guests</strong> on <strong className="text-slate-900">{eventDate}</strong>. We will call you on <strong className="text-slate-900">{plannerPhone}</strong> with floor blueprints and tasting menu invitations.
                </p>
                
                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                  >
                    <MessageSquare className="w-4 h-4" /> Send Plan to WhatsApp Desk
                  </a>
                  <button
                    onClick={() => setInquirySubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Calculate Another Event
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-6 text-xs">
                
                {/* 1. Event Type Selector */}
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
                    1. Select Event Type & Theme
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                    {[
                      'Luxury Wedding & Sangeet Gala',
                      'Corporate Summit / Conclave',
                      'Gourmet Banquet & Reception',
                      'Haldi / Mehendi & Birthday Gala'
                    ].map((style) => (
                      <button
                        type="button"
                        key={style}
                        onClick={() => setEventType(style)}
                        className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          eventType === style 
                            ? 'bg-[#0A192F] border-[#0A192F] text-white font-bold shadow' 
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>

                {/* 2. Guest Count Slider & Catering Tier */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-5 rounded-2xl bg-white border border-slate-200">
                  <div className="lg:col-span-7 space-y-3">
                    <div className="flex justify-between items-center">
                      <label className="font-bold text-slate-800 uppercase tracking-wider text-xs">
                        2. Estimated Guest Count:
                      </label>
                      <span className="font-mono text-xl font-black text-[#0A192F]">
                        {guestCount} Guests
                      </span>
                    </div>

                    <input
                      type="range"
                      min="100"
                      max="3000"
                      step="50"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0A192F]"
                    />

                    <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                      <span>100 (Intimate)</span>
                      <span>1,000 (Grand Reception)</span>
                      <span>3,000+ (Mega Conclave)</span>
                    </div>

                    <div className="pt-2">
                      <label className="block font-bold text-slate-800 uppercase tracking-wider text-xs mb-2">
                        3. Catering & Decor Luxury Tier:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'classic', label: 'Classic Elegance', price: '₹650/plate' },
                          { id: 'grand', label: 'Grand Luxe', price: '₹850/plate' },
                          { id: 'royal', label: 'Royal Imperial', price: '₹1,450/plate' }
                        ].map((t) => (
                          <button
                            type="button"
                            key={t.id}
                            onClick={() => setBudgetTier(t.id as any)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              budgetTier === t.id
                                ? 'bg-[#0A192F] border-[#0A192F] text-white font-bold'
                                : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                            }`}
                          >
                            <div className="text-xs font-bold">{t.label}</div>
                            <div className={`text-[10px] ${budgetTier === t.id ? 'text-amber-300' : 'text-slate-500'}`}>{t.price}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Cost Summary Card */}
                  <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-[#061426] to-[#0A192F] text-white flex flex-col justify-between space-y-4">
                    <div>
                      <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">
                        Estimated Budget Range
                      </span>
                      <div className="text-3xl font-black font-mono text-white mt-1">
                        ₹{estimate.grandEstimate.toLocaleString('en-IN')}*
                      </div>
                      <div className="text-[11px] text-slate-300 mt-1">
                        Approx. based on {guestCount} guests & {budgetTier.toUpperCase()} tier
                      </div>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-slate-300 pt-3 border-t border-white/10">
                      <div className="flex justify-between">
                        <span>Catering ({guestCount} × ₹{estimate.perPlate}):</span>
                        <span className="font-bold text-white">₹{estimate.cateringTotal.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Stage, Sound & Decor:</span>
                        <span className="font-bold text-white">₹{estimate.baseDecor.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-amber-300 font-bold">
                        <span>FSSAI Certified Service:</span>
                        <span>Included</span>
                      </div>
                    </div>

                    <div className="text-[10px] text-slate-400 italic">
                      *Taxes extra. Final quote varies based on custom floral import choices & artist line-ups.
                    </div>
                  </div>
                </div>

                {/* Date & Venue Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Target Event Date *</label>
                    <input
                      type="date"
                      required
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Proposed Venue / City in Bihar *</label>
                    <input
                      type="text"
                      required
                      value={eventLocation}
                      onChange={(e) => setEventLocation(e.target.value)}
                      placeholder="e.g. Hotel Maurya / Gyan Bhawan / Bailey Road"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Contact Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={plannerName}
                      onChange={(e) => setPlannerName(e.target.value)}
                      placeholder="e.g. Anand Vikram Singh"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Number (WhatsApp Active) *</label>
                    <input
                      type="tel"
                      required
                      value={plannerPhone}
                      onChange={(e) => setPlannerPhone(e.target.value)}
                      placeholder="+91 94300 XXXXX"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Custom Styling Requests / Artist Needs (Optional)</label>
                  <textarea
                    rows={2}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    placeholder="e.g. Need revolving varmala stage, Sufi musical night artists, live Chaat counters..."
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-amber-400" />
                    <span>Check Date Availability & Receive Tasting Menu Proposal</span>
                  </button>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp Direct Booking</span>
                  </a>
                </div>

                <div className="text-center text-[11px] text-slate-500 pt-1">
                  Patna Event Helpdesk: <a href="tel:9065296294" className="font-bold text-slate-800 hover:underline">9065296294</a> / <a href="tel:+919142144940" className="font-bold text-slate-800 hover:underline">+91 91421 44940</a> • Office: Preven Vila, Flat 34, New Khajoorbana, Patna – 800006
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

      {/* 4. VISUAL PORTFOLIO & REAL STAGE REVIEWS */}
      <section id="portfolio" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold text-pink-700 uppercase tracking-widest px-3 py-1 rounded bg-pink-50 border border-pink-200">
                Visual Excellence
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F] mt-2">
                Executed Stage & Wedding Gallery
              </h2>
            </div>

            <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
              {[
                { id: 'all', label: 'All Projects' },
                { id: 'weddings', label: 'Weddings' },
                { id: 'corporate', label: 'Corporate' },
                { id: 'catering', label: 'Gourmet Catering' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setPortfolioFilter(tab.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    portfolioFilter === tab.id 
                      ? 'bg-[#0A192F] text-white shadow' 
                      : 'text-slate-600 hover:text-black'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPortfolio.map((item) => (
              <div 
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all group shadow-sm hover:shadow-xl"
              >
                <div>
                  <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    
                    <span 
                      className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/90 text-slate-900 shadow"
                    >
                      {item.category}
                    </span>

                    <span className="absolute bottom-3 right-3 text-xs text-white font-mono font-bold bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                      {item.guests}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="font-heading font-bold text-base text-[#0A192F] group-hover:text-pink-700 transition-colors">
                      {item.title}
                    </h3>
                    <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-pink-600" />
                      <span>{item.location}</span>
                    </div>

                    <div className="mt-3 p-2.5 rounded-xl bg-pink-50/50 border border-pink-100 text-xs text-pink-900 font-medium">
                      ✨ {item.tag}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0A192F]">{item.priceGuide}</span>
                  <a
                    href="#planner-calc"
                    onClick={() => setEventType(item.title)}
                    className="text-pink-700 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    Inquire Similar Setup →
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. POSTER ZOOM MODAL */}
      {posterModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div 
            className="relative w-full max-w-3xl bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-black/60 flex items-center justify-between text-white border-b border-white/10">
              <div className="flex items-center gap-2">
                <PartyPopper className="w-4 h-4 text-pink-400" />
                <span className="font-bold text-sm">Brentra Events & Wedding Hospitality Official Flyer</span>
              </div>
              <button
                onClick={() => setPosterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative max-h-[75vh] overflow-y-auto p-4 flex items-center justify-center bg-black">
              <img 
                src="/img-events.jpg" 
                alt="Brentra Events Full Poster View" 
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>

            <div className="p-4 bg-[#061426] text-white flex flex-wrap items-center justify-between gap-3 text-xs border-t border-white/10">
              <div>
                <span className="text-slate-400">Patna Central Event Desk:</span>
                <span className="font-bold text-white ml-1.5">9065296294 • +91 91421 44940</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Book on WhatsApp
                </a>
                <button
                  onClick={() => setPosterModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
