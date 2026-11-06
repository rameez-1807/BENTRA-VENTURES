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
  Waves,
  Building,
  Check,
  Zap,
  Activity
} from 'lucide-react';

interface WaterTankCleaningPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const WaterTankCleaningPage: React.FC<WaterTankCleaningPageProps> = ({ onOpenQuoteModal }) => {
  // Tank Booking Form State
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [tankLocation, setTankLocation] = useState('');
  const [tankType, setTankType] = useState('Overhead Sintex / PVC Tank');
  const [tankCapacity, setTankCapacity] = useState('1,500 – 2,000 Litres (₹800)');
  const [cleaningRequirements, setCleaningRequirements] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Official Verified Pricing from Flyer (Section 03)
  const tankPricing = [
    { capacity: '500 – 1,000 Litres', charge: '₹700', bestFor: 'Individual houses, small 2BHK/3BHK flats, overhead rooftop tanks' },
    { capacity: '1,500 – 2,000 Litres', charge: '₹800', bestFor: 'Independent bungalows, multi-family homes, dual rooftop tanks' },
    { capacity: '3,000 – 5,000 Litres', charge: '₹1,200', bestFor: 'Small apartment buildings, commercial offices, underground sumps' },
    { capacity: 'Above 5,000 Litres', charge: 'Custom Quotation', bestFor: 'Large residential societies, hospitals, hotels & industrial reservoirs' },
  ];

  // 6-Step Scientific Cleaning Process from Flyer
  const cleaningSteps = [
    {
      step: '01',
      title: 'Dewatering',
      desc: 'Automatic submersible dewatering pumps quickly drain stagnant water without wasting time or flooding surroundings.'
    },
    {
      step: '02',
      title: 'Sludge Removal',
      desc: 'Specialized industrial wet sludge vacuum suction removes settled mud, dirt, fungal bio-films, and algae from the floor.'
    },
    {
      step: '03',
      title: 'High-Pressure Jet Cleaning',
      desc: 'German high-pressure rotary water jets (up to 150 bar) strip away stubborn lime deposits, scales, and sediment stains.'
    },
    {
      step: '04',
      title: 'Chemical Scrubbing',
      desc: 'Eco-safe, non-toxic anti-bacterial scrubbing agents eliminate fungal colonies from interior walls and ceiling corners.'
    },
    {
      step: '05',
      title: 'Vacuum Drying',
      desc: 'High-power industrial vacuum drying extracts residual moisture, leaving the tank pristine and ready for sanitization.'
    },
    {
      step: '06',
      title: 'Disinfection & Sanitisation',
      desc: 'UV antibacterial radiation and food-grade disinfectant spray guarantees 99.9% germ-free, safe drinking water.'
    }
  ];

  // Suitable Establishments from Flyer
  const suitableFacilities = [
    { title: 'Homes & Apartments', desc: 'Overhead Sintex & loft water storage tanks for pure domestic consumption.' },
    { title: 'Housing Societies', desc: 'Large underground RCC water sumps and multi-tower overhead storage systems.' },
    { title: 'Offices & Commercial Buildings', desc: 'Continuous clean water supply for staff cafeterias, pantries and washrooms.' },
    { title: 'Hotels & Hospitals', desc: 'Sterile water tank hygiene adhering to public health & FSSAI medical safety norms.' },
    { title: 'Industrial Facilities', desc: 'Process water tanks, cooling tower reservoirs and high-capacity plant storage.' }
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `*BRENTRA WATER TANK CLEANING BOOKING*%0A` +
      `--------------------------------%0A` +
      `*Name:* ${custName || 'Client'}%0A` +
      `*Phone:* ${custPhone || 'Not provided'}%0A` +
      `*Location:* ${tankLocation || 'Patna/Bihar'}%0A` +
      `*Tank Type:* ${tankType}%0A` +
      `*Capacity:* ${tankCapacity}%0A` +
      `*Notes:* ${encodeURIComponent(cleaningRequirements || 'Need professional tank cleaning service.')}`;
    return `https://wa.me/919142144940?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-widest">
              <Waves className="w-4 h-4 text-blue-600" /> Division 03 • Brentra Hygiene Care
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> Safe Water, Better Health
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.12]">
                Professional Water Tank Cleaning & Sanitisation Services
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mt-5 leading-relaxed">
                Scientific 6-stage mechanized water tank cleaning across Patna and Bihar. High-pressure jetting, sludge removal, vacuum extraction, and food-grade UV disinfection for underground and overhead tanks. Starting at just <strong className="text-blue-900 font-bold">₹700</strong>.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-8">
                <a
                  href="#pricing-table"
                  className="px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                >
                  <span>View Capacity Rate Card</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#tank-booking"
                  className="px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Book Tank Cleaning (from ₹700)</span>
                </a>
                <a
                  href="tel:9065296294"
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>Call: 9065296294</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">₹700</div>
                  <div className="text-xs text-slate-500 mt-0.5">500–1000L Starting</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">6 Stages</div>
                  <div className="text-xs text-slate-500 mt-0.5">Mechanized Process</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">150 Bar</div>
                  <div className="text-xs text-slate-500 mt-0.5">High-Pressure Jetting</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">100%</div>
                  <div className="text-xs text-slate-500 mt-0.5">Eco-Safe Disinfection</div>
                </div>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group">
                <img 
                  src="/img-tank-cleaning.jpg" 
                  alt="Brentra Professional Tank Cleaning Technician in Safety Gear Pressure Jetting Tank" 
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="px-3 py-1 rounded bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wider w-max mb-2">
                    Mechanized Hygiene
                  </span>
                  <h3 className="text-xl font-bold text-white">High-Pressure Hydro Jetting</h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Complete sludge extraction, chemical scrubbing, and antibacterial sanitisation for crystal clear water.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 6-Step Mechanized Cleaning Process */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-widest px-3 py-1 rounded bg-blue-50 border border-blue-200">
              Scientific Disinfection
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Our 6-Step Mechanized Cleaning Process
            </h2>
            <p className="text-sm text-slate-600">
              Zero manual scrubbing shortcuts. We use industrial German high-pressure equipment and food-grade antibacterial agents.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cleaningSteps.map((step, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 font-mono font-black text-lg group-hover:scale-110 transition-transform">
                    {step.step}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#0A192F] group-hover:text-blue-900 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-emerald-700 font-semibold">
                  <CheckCircle2 className="w-4 h-4" /> Step {idx + 1} Certified Standard
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Official Verified Pricing Table (Section 03 of Flyer) */}
      <section id="pricing-table" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-widest px-3 py-1 rounded bg-blue-50 border border-blue-200">
              Transparent Pricing
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Water Tank Cleaning Charges by Capacity
            </h2>
            <p className="text-sm text-slate-600">
              Verified rates from Section 03 of the official Brentra Ventures company brochure.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0A192F] text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Tank Capacity</th>
                    <th className="py-4 px-6">Suggested Charge (₹)</th>
                    <th className="py-4 px-6">Ideal For</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-sans">
                  {tankPricing.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-blue-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
                    >
                      <td className="py-4 px-6 font-bold text-[#0A192F] text-sm">
                        {item.capacity}
                      </td>
                      <td className="py-4 px-6 font-mono font-extrabold text-blue-900 text-base whitespace-nowrap">
                        {item.charge}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {item.bestFor}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <a
                          href="#tank-booking"
                          onClick={() => setTankCapacity(`${item.capacity} (${item.charge})`)}
                          className="px-3.5 py-1.5 rounded-lg bg-blue-50 hover:bg-[#0A192F] text-blue-800 hover:text-white font-bold text-[11px] transition-colors inline-block"
                        >
                          Book Size
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap justify-between items-center gap-2">
              <span>* Suitable for underground sumps, overhead PVC/Sintex tanks, and RCC concrete reservoirs.</span>
              <span className="font-semibold text-blue-800">Above 5,000L: Request a Cleaning Quote</span>
            </div>
          </div>

        </div>
      </section>

      {/* Suitable Facilities */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="font-heading font-extrabold text-2xl text-[#0A192F]">
              Suitable Establishments & Facilities
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              We provide scheduled and emergency sanitisation for all building types.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {suitableFacilities.map((fac, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#0A192F] mb-1">{fac.title}</h4>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{fac.desc}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200 text-[10px] text-blue-700 font-bold uppercase tracking-wider">
                  Verified SLA Clean
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Tank Booking Form */}
      <section id="tank-booking" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">
              <Waves className="w-4 h-4 text-blue-600" /> Fast Doorstep Service Booking
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F] mb-2">
              Book Water Tank Cleaning Slot
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-8">
              Select your tank capacity and location. Our pressure jetting team arrives with complete equipment.
            </p>

            {bookingSubmitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md mx-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-heading font-bold text-xl text-slate-900">Booking Confirmed!</h3>
                <p className="text-xs text-slate-600">
                  Thank you, <strong className="text-slate-900">{custName}</strong>. Our mechanized cleaning crew is scheduled for your <strong className="text-slate-900">{tankCapacity}</strong> ({tankType}) at <strong className="text-slate-900">{tankLocation}</strong>. We will contact you on <strong className="text-slate-900">{custPhone}</strong>.
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
                    Book Another Tank
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={custName}
                      onChange={(e) => setCustName(e.target.value)}
                      placeholder="e.g. Deepak Kumar"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={custPhone}
                      onChange={(e) => setCustPhone(e.target.value)}
                      placeholder="e.g. 9065296294"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Tank Type *</label>
                    <select
                      value={tankType}
                      onChange={(e) => setTankType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    >
                      <option value="Overhead Sintex / PVC Tank">Overhead Sintex / PVC Tank</option>
                      <option value="Underground RCC Water Sump">Underground RCC Water Sump</option>
                      <option value="Rooftop Concrete Reservoir">Rooftop Concrete Reservoir</option>
                      <option value="Industrial Process Water Tank">Industrial Process Water Tank</option>
                      <option value="Multiple Tanks (Overhead + Underground)">Multiple Tanks (Both Overhead & Sump)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Approximate Tank Capacity *</label>
                    <select
                      value={tankCapacity}
                      onChange={(e) => setTankCapacity(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    >
                      <option value="500 – 1,000 Litres (₹700)">500 – 1,000 Litres (₹700)</option>
                      <option value="1,500 – 2,000 Litres (₹800)">1,500 – 2,000 Litres (₹800)</option>
                      <option value="3,000 – 5,000 Litres (₹1,200)">3,000 – 5,000 Litres (₹1,200)</option>
                      <option value="Above 5,000 Litres (Custom Quotation)">Above 5,000 Litres (Request a Cleaning Quote)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Property Location / Address in Patna *</label>
                  <input
                    type="text"
                    required
                    value={tankLocation}
                    onChange={(e) => setTankLocation(e.target.value)}
                    placeholder="e.g. Kankarbagh Main Road / New Khajoorbana, Patna"
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Specific Cleaning Requirements / Notes</label>
                  <textarea
                    rows={2}
                    value={cleaningRequirements}
                    onChange={(e) => setCleaningRequirements(e.target.value)}
                    placeholder="e.g. Tank has heavy algae, roof ladder available, last cleaned 1 year ago, etc."
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FileCheck2 className="w-4 h-4 text-cyan-400" />
                    <span>Confirm Tank Cleaning Booking</span>
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
                  For immediate tank cleaning: <a href="tel:9065296294" className="font-bold text-slate-800 hover:underline">9065296294</a> / <a href="tel:+919142144940" className="font-bold text-slate-800 hover:underline">+91 91421 44940</a>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
