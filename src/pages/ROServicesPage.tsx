import React, { useState } from 'react';
import { 
  Droplets, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Clock, 
  FileCheck2, 
  MessageSquare, 
  Wrench, 
  Filter, 
  Check, 
  Zap,
  RotateCcw,
  Star
} from 'lucide-react';

interface ROServicesPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const ROServicesPage: React.FC<ROServicesPageProps> = ({ onOpenQuoteModal }) => {
  // RO Booking Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [purifierBrand, setPurifierBrand] = useState('Kent RO');
  const [serviceType, setServiceType] = useState('RO Repair / Servicing');
  const [selectedPlan, setSelectedPlan] = useState('Classic AMC (₹1,499 / year)');
  const [bookingNotes, setBookingNotes] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Official Verified AMC Plans & Business Rules from Flyer
  const amcPlans = [
    {
      name: 'Basic AMC Plan',
      price: '₹899',
      period: 'per year',
      badge: 'Essential Maintenance',
      filterType: 'Non-brand standard filters',
      features: [
        '1 Comprehensive Annual Service Visit',
        '1 Scheduled Filter Health & TDS Check',
        'Non-brand standard replacement filters',
        'Labour charges included for scheduled visits',
        'Water pressure & leak inspection',
        'Multi-brand domestic purifier support'
      ],
      popular: false
    },
    {
      name: 'Classic AMC Plan',
      price: '₹1,499',
      period: 'per year',
      badge: 'Most Popular',
      filterType: 'Non-brand high-grade filters',
      features: [
        '1 Comprehensive Wet Service & Descaling',
        '1 Filter Health & Membrane Diagnostic Check',
        'Non-brand high-grade sediment/carbon filters',
        'Free breakdown visits within 24 hours',
        'TDS electronic balancing & mineral check',
        'Priority emergency technician allocation'
      ],
      popular: true
    },
    {
      name: 'Green AMC Plan',
      price: '₹2,399',
      period: 'per year',
      badge: 'High Performance',
      filterType: 'Non-brand premium filters',
      features: [
        '1 Complete Deep Overhaul Service',
        '2 Scheduled Filter & Health Inspections',
        'Non-brand premium carbon & sediment replacement',
        'Unlimited breakdown support visits',
        'Booster pump electrical diagnostics',
        'Zero labour charge on standard repairs'
      ],
      popular: false
    },
    {
      name: 'Green Plus AMC Plan',
      price: '₹4,599',
      period: 'per year',
      badge: 'All-Brand Coverage',
      filterType: 'All-brand coverage as specified by business',
      features: [
        'All-Brand Complete System Coverage',
        'OEM-Grade Membrane & Certified Filters',
        'Comprehensive breakdown & unlimited visits',
        'Pre-filter, sediment & activated carbon included',
        'Booster pump, SMPS & electrical repair coverage',
        'Multi-brand support (Kent, Aquaguard, Pureit, Livpure, etc.)'
      ],
      popular: false
    }
  ];

  // Specific Service & Labour Charges from Flyer (Section 02)
  const serviceRates = [
    { service: 'Basic Inspection / Labour Charge', price: '₹149', note: 'Standard doorstep diagnostic visit by certified RO technician' },
    { service: 'RO Repair Labour', price: '₹299 onwards', note: 'Motor, electrical, tubing, or tap repair labour' },
    { service: 'RO Installation', price: '₹499 onwards', note: 'New wall mounting, pre-filter installation & water inlet connection' },
    { service: 'Basic AMC Plan', price: '₹899 / year', note: '1 service + 1 filter check (non-brand filters)' },
    { service: 'Classic AMC Plan', price: '₹1,499 / year', note: '1 service + 1 filter check (non-brand filters)' },
    { service: 'Green AMC Plan', price: '₹2,399 / year', note: '1 service + 2 filter check (non-brand filters)' },
    { service: 'Green Plus AMC Plan', price: '₹4,599 / year', note: 'All-brand coverage as specified by the business' },
    { service: 'Filters & Spare Parts', price: 'As applicable', note: 'Genuine membrane, carbon blocks, UV lamp & pump replacement' },
  ];

  // Multi-brand Support Tags
  const supportedBrands = [
    'Kent RO', 'Aquaguard (Eureka Forbes)', 'Pureit (HUL)', 'Livpure', 'Blue Star', 'AO Smith', 'Havells', 'Aqua Fresh', 'ZeroB', 'Custom Assembled RO'
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `*BRENTRA RO SERVICE / AMC BOOKING*%0A` +
      `--------------------------------%0A` +
      `*Customer Name:* ${customerName || 'Customer'}%0A` +
      `*Phone:* ${customerPhone || 'Not provided'}%0A` +
      `*Address:* ${customerAddress || 'Patna/Bihar'}%0A` +
      `*Purifier Brand:* ${purifierBrand}%0A` +
      `*Service Required:* ${serviceType}%0A` +
      `*Selected Plan:* ${selectedPlan}%0A` +
      `*Notes:* ${encodeURIComponent(bookingNotes || 'Please send a technician for inspection/AMC booking.')}`;
    return `https://wa.me/919142144940?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-900 text-xs font-bold uppercase tracking-widest">
              <Droplets className="w-4 h-4 text-cyan-600" /> Division 02 • Brentra Water Solutions
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Clean Water, Healthy Life
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.12]">
                RO Water Purifier Sales, Repair & AMC Plans
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mt-5 leading-relaxed">
                Certified water purification experts across Patna and Bihar. Complete multi-brand domestic and commercial RO servicing, filter replacements, membrane descaling, and verified annual maintenance contracts.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-8">
                <a
                  href="#amc-plans"
                  className="px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                >
                  <span>Explore AMC Plans from ₹899</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#ro-booking"
                  className="px-5 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center gap-2"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Book RO Technician (₹149)</span>
                </a>
                <a
                  href="tel:9065296294"
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-cyan-600" />
                  <span>Call: 9065296294</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">₹149</div>
                  <div className="text-xs text-slate-500 mt-0.5">Basic Inspection Charge</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">₹4,599</div>
                  <div className="text-xs text-slate-500 mt-0.5">All-Brand Coverage AMC</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">100%</div>
                  <div className="text-xs text-slate-500 mt-0.5">Multi-Brand Support</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">&lt; 60 Mins</div>
                  <div className="text-xs text-slate-500 mt-0.5">Rapid Doorstep Response</div>
                </div>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group">
                <img 
                  src="/img-ro.jpg" 
                  alt="Certified Brentra RO Water Purifier Technician Servicing Unit" 
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="px-3 py-1 rounded bg-cyan-600/90 text-white text-[10px] font-bold uppercase tracking-wider w-max mb-2">
                    Pure & Safe Water
                  </span>
                  <h3 className="text-xl font-bold text-white">Multi-Brand RO Expertise</h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Genuine filters, membranes, booster pumps, and UV lamps for Kent, Aquaguard, Pureit, and all major brands.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Multi-Brand Trust Bar */}
      <section className="py-6 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Supported Purifier Brands:
            </span>
            <div className="flex flex-wrap gap-2">
              {supportedBrands.map((b, i) => (
                <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-700 shadow-2xs">
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AMC Plans (4 Verified Plans with Rules) */}
      <section id="amc-plans" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-cyan-800 uppercase tracking-widest px-3 py-1 rounded bg-cyan-50 border border-cyan-200">
              Verified AMC Protection
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Annual Maintenance Contracts (AMC)
            </h2>
            <p className="text-sm text-slate-600">
              Choose the exact plan designed for your purifier. Transparent pricing with clear filter coverage rules.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {amcPlans.map((plan, idx) => (
              <div 
                key={idx}
                className={`rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between relative ${
                  plan.popular 
                    ? 'bg-gradient-to-b from-cyan-50/50 to-white border-2 border-cyan-600 shadow-xl' 
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-cyan-600 text-white text-[10px] font-extrabold uppercase tracking-widest shadow-md">
                    {plan.badge}
                  </div>
                )}

                <div>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{plan.badge}</span>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[#0A192F]">
                    {plan.name}
                  </h3>

                  <div className="mt-4 mb-3 pb-4 border-b border-slate-100">
                    <div className="flex items-baseline gap-1">
                      <span className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">{plan.price}</span>
                      <span className="text-xs text-slate-500 font-medium">/{plan.period}</span>
                    </div>
                    <div className="mt-2 text-[11px] font-bold text-cyan-900 bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-200">
                      Coverage: {plan.filterType}
                    </div>
                  </div>

                  <ul className="space-y-2.5 text-xs text-slate-700">
                    {plan.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 pt-4 border-t border-slate-100">
                  <a
                    href="#ro-booking"
                    onClick={() => setSelectedPlan(`${plan.name} (${plan.price} / year)`)}
                    className={`w-full py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider text-center block transition-all ${
                      plan.popular
                        ? 'bg-cyan-600 hover:bg-cyan-700 text-white shadow-md'
                        : 'bg-[#0A192F] hover:bg-[#1E3E62] text-white'
                    }`}
                  >
                    Select {plan.name.split(' ')[0]}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs text-slate-600 max-w-4xl mx-auto flex flex-wrap justify-between items-center gap-2">
            <span><strong>* Important Business Rules:</strong> Basic (₹899), Classic (₹1,499), and Green (₹2,399) include non-brand replacement filters. The Green Plus (₹4,599) includes all-brand support and OEM coverage.</span>
            <span className="text-cyan-800 font-bold">100% Genuine Parts</span>
          </div>

        </div>
      </section>

      {/* Official Rate Card Table from Flyer */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-cyan-800 uppercase tracking-widest px-3 py-1 rounded bg-cyan-50 border border-cyan-200">
              Verified Rates
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              RO Service, Labour & AMC Price List
            </h2>
            <p className="text-sm text-slate-600">
              Verified pricing as listed in Section 02 of the official company brochure.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0A192F] text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Service / Plan</th>
                    <th className="py-4 px-6">Official Price (₹)</th>
                    <th className="py-4 px-6">Scope & Terms</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-sans">
                  {serviceRates.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-cyan-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
                    >
                      <td className="py-3.5 px-6 font-bold text-[#0A192F]">
                        {item.service}
                      </td>
                      <td className="py-3.5 px-6 font-mono font-extrabold text-cyan-900 text-sm whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="py-3.5 px-6 text-slate-600">
                        {item.note}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <a
                          href="#ro-booking"
                          onClick={() => setServiceType(item.service)}
                          className="px-3 py-1.5 rounded-lg bg-cyan-50 hover:bg-[#0A192F] text-cyan-800 hover:text-white font-bold text-[11px] transition-colors inline-block"
                        >
                          Book Now
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500">
              * Filter replacements, spare parts and other exclusions depend on the selected plan.
            </div>
          </div>

        </div>
      </section>

      {/* Dedicated RO Booking Form */}
      <section id="ro-booking" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-800 uppercase tracking-widest mb-2">
              <Droplets className="w-4 h-4 text-cyan-600" /> Fast Technician Dispatch
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F] mb-2">
              Book RO Purifier Service or AMC
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-8">
              Submit your address and purifier brand below. For immediate doorstep assistance, use our 1-click WhatsApp booking.
            </p>

            {bookingSubmitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md mx-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-heading font-bold text-xl text-slate-900">Service Call Registered!</h3>
                <p className="text-xs text-slate-600">
                  Thank you, <strong className="text-slate-900">{customerName}</strong>. A certified technician has been assigned for your <strong className="text-slate-900">{purifierBrand}</strong> at <strong className="text-slate-900">{customerAddress}</strong>. We will confirm arrival on <strong className="text-slate-900">{customerPhone}</strong>.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                  >
                    <MessageSquare className="w-4 h-4" /> Open in WhatsApp
                  </a>
                  <button
                    onClick={() => setBookingSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Book Another Purifier
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Customer Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Rakesh Verma"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-cyan-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 9065296294"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-cyan-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Purifier Brand *</label>
                    <select
                      value={purifierBrand}
                      onChange={(e) => setPurifierBrand(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-cyan-600 focus:outline-none"
                    >
                      {supportedBrands.map((b, i) => (
                        <option key={i} value={b}>{b}</option>
                      ))}
                      <option value="Other Brand / Not Sure">Other Brand / Not Sure</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Service Type *</label>
                    <select
                      value={serviceType}
                      onChange={(e) => setServiceType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-cyan-600 focus:outline-none"
                    >
                      <option value="Basic Inspection / Labour (₹149)">Basic Inspection / Labour (₹149)</option>
                      <option value="RO Installation (₹499 onwards)">RO Installation (₹499 onwards)</option>
                      <option value="RO Repair Labour (₹299 onwards)">RO Repair Labour (₹299 onwards)</option>
                      <option value="Annual Maintenance Contract (AMC)">Annual Maintenance Contract (AMC)</option>
                      <option value="Filter & Membrane Replacement">Filter & Membrane Replacement</option>
                      <option value="New RO Purifier Purchase">New RO Purifier Purchase</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Select AMC Plan (If applicable)</label>
                    <select
                      value={selectedPlan}
                      onChange={(e) => setSelectedPlan(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-cyan-600 focus:outline-none"
                    >
                      <option value="None / Service Only">None (Just Regular Servicing)</option>
                      <option value="Basic AMC (₹899 / year)">Basic AMC — ₹899 / year (1 service + 1 filter check)</option>
                      <option value="Classic AMC (₹1,499 / year)">Classic AMC — ₹1,499 / year (1 service + 1 filter check)</option>
                      <option value="Green AMC (₹2,399 / year)">Green AMC — ₹2,399 / year (1 service + 2 filter check)</option>
                      <option value="Green Plus AMC (₹4,599 / year)">Green Plus AMC — ₹4,599 / year (All-Brand Coverage)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Customer Address / Locality *</label>
                    <input
                      type="text"
                      required
                      value={customerAddress}
                      onChange={(e) => setCustomerAddress(e.target.value)}
                      placeholder="e.g. Flat 302, Bailey Road, Patna"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-cyan-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specific Issue / Notes</label>
                  <textarea
                    rows={2}
                    value={bookingNotes}
                    onChange={(e) => setBookingNotes(e.target.value)}
                    placeholder="e.g. Water taste bad, leaking pipe, low water flow, filter change required, etc."
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-cyan-600 focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FileCheck2 className="w-4 h-4 text-cyan-400" />
                    <span>Confirm Doorstep Booking</span>
                  </button>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Quick WhatsApp Booking</span>
                  </a>
                </div>

                <div className="text-center text-[11px] text-slate-500 pt-1">
                  Urgent technician helpline: <a href="tel:9065296294" className="font-bold text-slate-800 hover:underline">9065296294</a> / <a href="tel:+919142144940" className="font-bold text-slate-800 hover:underline">+91 91421 44940</a>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
