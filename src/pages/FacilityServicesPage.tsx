import React, { useState, useEffect, useMemo } from 'react';
import { 
  Wrench, 
  Droplets, 
  Users, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Phone, 
  AlertTriangle, 
  Download,
  Search,
  MapPin,
  ShoppingBag,
  Star,
  Plus,
  Minus,
  Check,
  ChevronRight,
  Tv,
  Scissors,
  ShieldAlert,
  Paintbrush,
  Building,
  ArrowRight,
  Settings,
  HelpCircle,
  Truck,
  Award
} from 'lucide-react';
import { 
  ServiceItem, 
  ServiceCategory, 
  CartItem, 
  BookingOrder, 
  ServiceAddon, 
  BookingStatus,
  Technician
} from '../types/facility';
import { 
  FACILITY_CATEGORIES, 
  FACILITY_SERVICES, 
  PATNA_LOCALITIES, 
  MOCK_REVIEWS,
  MOCK_TECHNICIANS 
} from '../data/facilityData';
import { ServiceDetailModal } from '../components/facility/ServiceDetailModal';
import { CartDrawer } from '../components/facility/CartDrawer';
import { CheckoutModal } from '../components/facility/CheckoutModal';
import { LiveTrackingModal } from '../components/facility/LiveTrackingModal';
import { AdminDashboardModal } from '../components/facility/AdminDashboardModal';

interface FacilityServicesPageProps {
  onOpenQuoteModal?: (vertical?: string) => void;
}

export const FacilityServicesPage: React.FC<FacilityServicesPageProps> = ({ onOpenQuoteModal }) => {
  // Services & Categories State
  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('brentra_facility_services');
    return saved ? JSON.parse(saved) : FACILITY_SERVICES;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLocality, setSelectedLocality] = useState<string>(PATNA_LOCALITIES[0]);
  const [localityPickerOpen, setLocalityPickerOpen] = useState(false);

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('brentra_facility_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  // Bookings State
  const [bookings, setBookings] = useState<BookingOrder[]>(() => {
    const saved = localStorage.getItem('brentra_facility_bookings');
    if (saved) return JSON.parse(saved);
    
    // Seed initial mock active order for demo
    const initialBooking: BookingOrder = {
      id: 'BF-PAT-92041',
      createdAt: new Date().toISOString(),
      customer: {
        fullName: 'Dr. Alok Verma',
        phone: '+91 94300 88000',
        locality: 'Boring Road / Boring Canal Road',
        flatHouseNo: 'Flat 402, Anand Heights',
        landmark: 'Near Alankar Jewellers',
        city: 'Patna',
        pincode: '800001'
      },
      items: [
        {
          serviceId: 'srv-ac-foam-jet',
          serviceName: 'Power Jet AC Deep Cleaning (Split/Window)',
          price: 599,
          quantity: 1,
          addons: [{ id: 'addon-anti-bacterial-spray', name: 'Anti-Mold Sanitization Coating', price: 99 }]
        }
      ],
      slotDate: 'Today',
      slotTime: '12:00 PM - 02:00 PM (Afternoon)',
      paymentMethod: 'cash_after_service',
      paymentStatus: 'pending',
      subtotal: 698,
      serviceFee: 29,
      discount: 0,
      totalAmount: 727,
      status: 'on_the_way',
      technician: MOCK_TECHNICIANS[0],
      otpCode: '5821'
    };
    return [initialBooking];
  });

  // Modals state
  const [activeDetailService, setActiveDetailService] = useState<ServiceItem | null>(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState<string | undefined>();
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [liveTrackingModalOpen, setLiveTrackingModalOpen] = useState(false);
  const [activeTrackingBooking, setActiveTrackingBooking] = useState<BookingOrder | null>(null);
  const [adminModalOpen, setAdminModalOpen] = useState(false);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('brentra_facility_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('brentra_facility_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('brentra_facility_services', JSON.stringify(services));
  }, [services]);

  // Cart operations
  const handleAddToCart = (service: ServiceItem, selectedAddons: ServiceAddon[] = []) => {
    const existingIndex = cart.findIndex(item => item.service.id === service.id);
    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += 1;
      if (selectedAddons.length > 0) {
        updated[existingIndex].selectedAddons = selectedAddons;
      }
      setCart(updated);
    } else {
      setCart([...cart, { service, quantity: 1, selectedAddons }]);
    }
  };

  const handleUpdateQuantity = (serviceId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart(cart.filter(item => item.service.id !== serviceId));
    } else {
      setCart(cart.map(item => item.service.id === serviceId ? { ...item, quantity } : item));
    }
  };

  const handleRemoveFromCart = (serviceId: string) => {
    setCart(cart.filter(item => item.service.id !== serviceId));
  };

  const handleProceedToCheckout = (promo?: string, discount: number = 0) => {
    setAppliedPromo(promo);
    setDiscountAmount(discount);
    setCartDrawerOpen(false);
    setCheckoutModalOpen(true);
  };

  const handleBookingSuccess = (newBooking: BookingOrder) => {
    setBookings([newBooking, ...bookings]);
    setCart([]); // Clear cart
    setActiveTrackingBooking(newBooking);
    setLiveTrackingModalOpen(true);
  };

  const handleUpdateBookingStatus = (bookingId: string, newStatus: BookingStatus) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
    if (activeTrackingBooking && activeTrackingBooking.id === bookingId) {
      setActiveTrackingBooking({ ...activeTrackingBooking, status: newStatus });
    }
  };

  const handleAssignTechnician = (bookingId: string, tech: Technician) => {
    setBookings(bookings.map(b => b.id === bookingId ? { ...b, technician: tech, status: 'pro_assigned' } : b));
    if (activeTrackingBooking && activeTrackingBooking.id === bookingId) {
      setActiveTrackingBooking({ ...activeTrackingBooking, technician: tech, status: 'pro_assigned' });
    }
  };

  const handleUpdateServicePrice = (serviceId: string, newPrice: number) => {
    setServices(services.map(s => s.id === serviceId ? { ...s, price: newPrice } : s));
  };

  // Filtered services
  const filteredServices = useMemo(() => {
    return services.filter(srv => {
      const matchesCat = selectedCategory === 'all' || srv.categoryId === selectedCategory;
      const matchesSearch = 
        !searchQuery || 
        srv.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        srv.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        srv.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => {
    const addonsSum = item.selectedAddons.reduce((s, a) => s + a.price, 0);
    return acc + (item.service.price + addonsSum) * item.quantity;
  }, 0);

  // Icon mapping helper
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scissors': return Scissors;
      case 'Sparkles': return Sparkles;
      case 'Tv': return Tv;
      case 'ShieldAlert': return ShieldAlert;
      case 'Wrench': return Wrench;
      case 'Droplets': return Droplets;
      case 'Paintbrush': return Paintbrush;
      case 'Building': return Building;
      default: return Sparkles;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased pb-24">
      
      {/* 1. TOP SUB-NAV BAR: Patna Location & Quick Actions */}
      <div className="sticky top-0 z-30 bg-[#061426] text-white border-b border-[#1E3E62]/60 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3">
          
          {/* Location Picker */}
          <div className="relative">
            <button
              onClick={() => setLocalityPickerOpen(!localityPickerOpen)}
              className="flex items-center gap-1.5 text-xs text-slate-200 hover:text-white transition-colors cursor-pointer bg-[#001F45] px-3 py-1.5 rounded-xl border border-blue-900/50"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0788FF]" />
              <span className="font-semibold">{selectedLocality.split('/')[0]}</span>
              <span className="text-[10px] text-slate-400">Patna ▾</span>
            </button>

            {localityPickerOpen && (
              <div className="absolute left-0 mt-2 w-72 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 p-2 z-40 max-h-80 overflow-y-auto">
                <div className="p-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Select Patna Locality
                </div>
                {PATNA_LOCALITIES.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setSelectedLocality(loc);
                      setLocalityPickerOpen(false);
                    }}
                    className={`w-full text-left p-2 rounded-xl text-xs flex items-center justify-between hover:bg-blue-50 cursor-pointer ${
                      selectedLocality === loc ? 'font-bold text-[#0788FF] bg-blue-50/60' : 'text-slate-700'
                    }`}
                  >
                    <span>{loc}</span>
                    {selectedLocality === loc && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Bar with live filter */}
          <div className="flex-1 max-w-md mx-auto hidden sm:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search AC, Haircut, Cleaning, Electrician, RO..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-[#001F45]/80 border border-blue-900/60 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#0788FF]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Quick Buttons: My Bookings, Admin Desk & Cart */}
          <div className="flex items-center gap-2">
            
            {/* My Bookings Tracker */}
            {bookings.length > 0 && (
              <button
                onClick={() => {
                  setActiveTrackingBooking(bookings[0]);
                  setLiveTrackingModalOpen(true);
                }}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Truck className="w-3.5 h-3.5 text-[#0788FF]" />
                <span className="hidden md:inline">Track Booking</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              </button>
            )}

            {/* Admin Desk Button */}
            <button
              onClick={() => setAdminModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
              title="Brentra Operations Desk"
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden lg:inline">Admin Desk</span>
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setCartDrawerOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-[#0788FF] hover:bg-[#0066CC] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Cart</span>
              {totalCartCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-white text-[#0788FF] text-[10px] font-extrabold">
                  {totalCartCount}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 2. HERO SECTION — Navy & Electric Blue */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-[#061426] via-[#001F45] to-[#061426] text-white overflow-hidden border-b border-blue-950">
        
        {/* Subtle background glow */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#0788FF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-[#0788FF]" /> Brentra Facility • Patna's Urban Standard
              </div>

              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.15]">
                Expert Home Services, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-[#0788FF] to-cyan-300">On-Demand in 60 Mins</span>
              </h1>

              <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
                Haircuts at home, power-jet AC servicing, bathroom deep cleaning, certified electricians, and RO purification. Transparent rate cards, background-checked specialists, and a 30-day service warranty across Patna.
              </p>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-lg font-black text-amber-400 font-mono">4.88 ★</div>
                  <div className="text-[11px] text-slate-300">12,000+ Patna Ratings</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-lg font-black text-[#0788FF] font-mono">&lt; 60 Mins</div>
                  <div className="text-[11px] text-slate-300">Fast Doorstep Arrival</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-lg font-black text-emerald-400 font-mono">30 Days</div>
                  <div className="text-[11px] text-slate-300">Free Re-work Guarantee</div>
                </div>
                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="text-lg font-black text-purple-400 font-mono">100%</div>
                  <div className="text-[11px] text-slate-300">Police Verified Pros</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden border-2 border-white/10 shadow-2xl bg-gradient-to-tr from-slate-900 to-blue-900">
                <img 
                  src="/img-facility.jpg" 
                  alt="Brentra Facility Technician" 
                  className="w-full h-80 sm:h-96 object-cover opacity-90 hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#061426] via-transparent to-transparent" />
                
                {/* Floating Technician Pro Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#061426]/90 backdrop-blur-md border border-white/15 text-white flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={MOCK_TECHNICIANS[0].avatar} 
                      alt="" 
                      className="w-11 h-11 rounded-xl object-cover border border-blue-400"
                    />
                    <div>
                      <div className="text-xs font-bold">{MOCK_TECHNICIANS[0].name}</div>
                      <div className="text-[10px] text-blue-300">{MOCK_TECHNICIANS[0].specialization}</div>
                      <div className="flex items-center gap-1 text-[10px] text-amber-400 font-bold mt-0.5">
                        <Star className="w-3 h-3 fill-amber-400" /> {MOCK_TECHNICIANS[0].rating} • 1,400+ jobs
                      </div>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold">
                    On Duty
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. SERVICE CATEGORY TILES (Urban Company style grid) */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold text-[#0788FF] uppercase tracking-wider">
                Explore Categories
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-heading text-slate-900">
                What home service do you need in Patna?
              </h2>
            </div>
            
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-bold text-[#0788FF] hover:underline cursor-pointer"
              >
                View All Services
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {FACILITY_CATEGORIES.map((cat) => {
              const Icon = getCategoryIcon(cat.iconName);
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-3.5 rounded-2xl border transition-all text-center flex flex-col items-center justify-between cursor-pointer group ${
                    isSelected
                      ? 'border-[#0788FF] bg-blue-50/80 shadow-md ring-2 ring-[#0788FF]/30'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                    isSelected ? 'bg-[#0788FF] text-white shadow' : 'bg-slate-100 text-slate-700 group-hover:bg-blue-50 group-hover:text-[#0788FF]'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="mt-2.5">
                    <div className="text-xs font-bold text-slate-900 leading-tight">
                      {cat.shortName}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-1">
                      From ₹{cat.startingPrice}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. MULTI-CARD SERVICE CATALOGUE WITH TABS */}
      <section className="py-12 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header & Filter Indicator */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="text-xs font-bold text-[#0788FF] uppercase tracking-wider">
                Transparent Rate Cards
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#061426]">
                {selectedCategory === 'all' 
                  ? 'Popular Services in Patna' 
                  : FACILITY_CATEGORIES.find(c => c.id === selectedCategory)?.name || 'Services'}
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Showing {filteredServices.length} verified services with upfront fixed prices & 30-day warranty.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === 'all' 
                    ? 'bg-[#061426] text-white' 
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                All Services
              </button>
              {FACILITY_CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-colors cursor-pointer ${
                    selectedCategory === c.id 
                      ? 'bg-[#061426] text-white' 
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {c.shortName}
                </button>
              ))}
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((srv) => {
              const inCartItem = cart.find(i => i.service.id === srv.id);
              const quantityInCart = inCartItem ? inCartItem.quantity : 0;

              return (
                <div
                  key={srv.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Image Thumbnail */}
                    <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
                      <img 
                        src={srv.image} 
                        alt={srv.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {srv.badge && (
                        <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-[#0788FF] text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
                          {srv.badge}
                        </div>
                      )}

                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                        <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm text-amber-300 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {srv.rating} ({srv.reviewsCount})
                        </span>
                        <span className="flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm text-slate-200">
                          <Clock className="w-3 h-3" /> {srv.durationMins} mins
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 space-y-2.5">
                      <h3 className="font-heading font-bold text-base text-[#061426] group-hover:text-[#0788FF] transition-colors leading-snug">
                        {srv.name}
                      </h3>
                      
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {srv.tagline}
                      </p>

                      {/* Included Quick Highlights */}
                      <ul className="space-y-1 pt-1 text-[11px] text-slate-500">
                        {srv.included.slice(0, 2).map((inc, i) => (
                          <li key={i} className="flex items-center gap-1.5">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span className="truncate">{inc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Pricing & Add to Cart Footer */}
                  <div className="p-5 pt-3 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-extrabold text-[#061426]">₹{srv.price}</span>
                        {srv.originalPrice > srv.price && (
                          <span className="text-xs text-slate-400 line-through">₹{srv.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-[10px] font-bold text-emerald-600">
                        {srv.discountPct}% OFF • 30-Day SLA
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActiveDetailService(srv)}
                        className="px-2.5 py-1.5 rounded-xl text-slate-600 hover:text-black text-xs font-semibold hover:bg-slate-200/60 transition-colors cursor-pointer"
                      >
                        Details
                      </button>

                      {quantityInCart === 0 ? (
                        <button
                          onClick={() => handleAddToCart(srv)}
                          className="px-4 py-2 rounded-xl bg-[#0788FF] hover:bg-[#0066CC] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all flex items-center gap-1 cursor-pointer active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      ) : (
                        <div className="flex items-center gap-1.5 bg-[#061426] text-white rounded-xl p-1 shadow">
                          <button
                            onClick={() => handleUpdateQuantity(srv.id, quantityInCart - 1)}
                            className="w-6 h-6 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-bold w-4 text-center">
                            {quantityInCart}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(srv.id, quantityInCart + 1)}
                            className="w-6 h-6 rounded-lg bg-white/20 hover:bg-white/30 text-white flex items-center justify-center cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 5. WHY CHOOSE BRENTRA FACILITY (Urban Company Comparison Matrix) */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#0788FF] uppercase tracking-wider">
              The Brentra Standard
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#061426]">
              Why Patna Prefers Brentra Facility
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              How our certified home services platform compares against the unorganized local market.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 text-slate-400 font-semibold uppercase text-[11px]">
                  <th className="py-3 px-4">Service Feature</th>
                  <th className="py-3 px-4 text-[#0788FF] font-extrabold bg-blue-50/50 rounded-t-xl">
                    Brentra Facility
                  </th>
                  <th className="py-3 px-4 text-slate-500">Local Unorganized Mechanics</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  {
                    feature: 'Pricing Transparency',
                    brentra: 'Fixed upfront rate card before work begins. No hidden costs.',
                    local: 'Unpredictable rates quoted after dismantling appliance.'
                  },
                  {
                    feature: 'Background & Security',
                    brentra: '100% Police verification + Aadhaar + skill test certification.',
                    local: 'No police verification or identity checks.'
                  },
                  {
                    feature: 'Post-Service Warranty',
                    brentra: 'Guaranteed 30-day service warranty with free re-work.',
                    local: 'No warranty once mechanic exits your gate.'
                  },
                  {
                    feature: 'Tools & Technology',
                    brentra: 'Kärcher pressure pumps, UV sanitizers, pure OEM gases.',
                    local: 'Basic manual tools and questionable duplicate gas refills.'
                  },
                  {
                    feature: 'Response TAT in Patna',
                    brentra: 'Arrival within 60 minutes across all Patna municipal wards.',
                    local: 'Repeated follow-up calls with uncertain arrival time.'
                  }
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/60">
                    <td className="py-3.5 px-4 font-bold text-slate-900">{row.feature}</td>
                    <td className="py-3.5 px-4 font-semibold text-[#061426] bg-blue-50/30 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{row.brentra}</span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{row.local}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>

      {/* 6. PATNA LOCALITY COVERAGE SECTION */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-bold text-[#0788FF] uppercase tracking-wider">
                Hyperlocal Patna Reach
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#061426]">
                Serving Every Sector & Colony Across Patna
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                With regional hubs in Boring Road, Kankarbagh, and Bailey Road, our mobile technician units reach your apartment or independent house within 60 minutes.
              </p>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="text-xs font-bold text-slate-900">Patna Central Facility Hotline:</div>
                <div className="flex flex-wrap gap-3 text-xs">
                  <a href="tel:+919065296294" className="font-bold text-[#0788FF] hover:underline flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> 9065296294
                  </a>
                  <a href="tel:+919142144940" className="font-bold text-[#0788FF] hover:underline flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> +91 91421 44940
                  </a>
                </div>
                <div className="text-[11px] text-slate-500">
                  Address: Preven Vila, Flat 34, New Khajoorbana, Patna, Bihar – 800006
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {PATNA_LOCALITIES.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => {
                      setSelectedLocality(loc);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition-all ${
                      selectedLocality === loc 
                        ? 'border-[#0788FF] bg-blue-50/90 text-[#061426] font-bold shadow-sm' 
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#0788FF] shrink-0" />
                      <span className="truncate">{loc}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 pl-5">60-Min Active Hub</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 7. VERIFIED PATNA CUSTOMER REVIEWS */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-bold text-[#0788FF] uppercase tracking-wider">
                Real Customer Feedback
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-[#061426]">
                Rated 4.88/5 by Patna Residents
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {MOCK_REVIEWS.map((rev) => (
              <div key={rev.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <div>
                    <div className="font-bold text-slate-900">{rev.customerName}</div>
                    <div className="text-slate-500">{rev.locality}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Verified
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 8. FLOATING STICKY CART BAR (when items in cart) */}
      {totalCartCount > 0 && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-40 bg-[#061426] text-white p-4 rounded-2xl shadow-2xl border border-blue-900/60 flex items-center justify-between animate-slide-up">
          <div>
            <div className="text-[11px] text-blue-300 font-bold uppercase tracking-wider">
              {totalCartCount} Service{totalCartCount > 1 ? 's' : ''} Added
            </div>
            <div className="text-lg font-black text-white">
              ₹{cartSubtotal}
            </div>
          </div>

          <button
            onClick={() => setCartDrawerOpen(true)}
            className="px-5 py-2.5 rounded-xl bg-[#0788FF] hover:bg-[#0066CC] text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>View Cart</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* 9. MODALS */}
      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeDetailService}
        onClose={() => setActiveDetailService(null)}
        onAddToCart={handleAddToCart}
        isInCart={cart.some(i => i.service.id === activeDetailService?.id)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={checkoutModalOpen}
        onClose={() => setCheckoutModalOpen(false)}
        cartItems={cart}
        appliedPromo={appliedPromo}
        discountAmount={discountAmount}
        onBookingSuccess={handleBookingSuccess}
      />

      {/* Live Tracking Modal */}
      <LiveTrackingModal
        isOpen={liveTrackingModalOpen}
        onClose={() => setLiveTrackingModalOpen(false)}
        booking={activeTrackingBooking || (bookings.length > 0 ? bookings[0] : null)}
        allBookings={bookings}
        onSelectBooking={(b) => setActiveTrackingBooking(b)}
        onUpdateStatus={handleUpdateBookingStatus}
      />

      {/* Admin Dashboard Operations Modal */}
      <AdminDashboardModal
        isOpen={adminModalOpen}
        onClose={() => setAdminModalOpen(false)}
        bookings={bookings}
        services={services}
        onUpdateBookingStatus={handleUpdateBookingStatus}
        onAssignTechnician={handleAssignTechnician}
        onUpdateServicePrice={handleUpdateServicePrice}
      />

    </div>
  );
};
