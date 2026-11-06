import React, { useState } from 'react';
import { 
  Fish, 
  Egg, 
  Download, 
  MessageSquare, 
  Flame, 
  IceCream,
  Wheat,
  Clock
} from 'lucide-react';
import { DAILY_RATES } from '../data/mockData';

interface FreshFMCGPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const FreshFMCGPage: React.FC<FreshFMCGPageProps> = ({ onOpenQuoteModal }) => {
  const [eggTrays, setEggTrays] = useState<number>(10);
  const [chickenKg, setChickenKg] = useState<number>(25);
  const [fishKg, setFishKg] = useState<number>(15);
  const [iceCreamTubs, setIceCreamTubs] = useState<number>(4);
  const [makhanaKg, setMakhanaKg] = useState<number>(5);

  const [deliverySlot, setDeliverySlot] = useState<string>('morning');
  const [buyerType, setBuyerType] = useState<string>('restaurant');
  const [deliveryLocation, setDeliveryLocation] = useState<string>('Bailey Road, Patna');

  const eggRate = 144;
  const chickenRate = 185;
  const fishRate = 220;
  const iceCreamRate = 480;
  const makhanaRate = 940;

  const totalEstimate = (eggTrays * eggRate) + 
                        (chickenKg * chickenRate) + 
                        (fishKg * fishRate) + 
                        (iceCreamTubs * iceCreamRate) + 
                        (makhanaKg * makhanaRate);

  const generateWhatsAppMessage = () => {
    const text = `*BRENTRA FRESH WHOLESALE ORDER INQUIRY*%0A` +
      `--------------------------------%0A` +
      `*Buyer Type:* ${buyerType}%0A` +
      `*Delivery Location:* ${deliveryLocation}%0A` +
      `*Slot:* ${deliverySlot === 'morning' ? 'Morning 6:00 AM - 8:30 AM' : 'Evening 4:00 PM - 7:00 PM'}%0A` +
      `--------------------------------%0A` +
      `*Items Requested:*%0A` +
      (eggTrays > 0 ? `• Farm Eggs: ${eggTrays} Trays (${eggTrays * 30} pcs) @ ₹${eggTrays * eggRate}%0A` : '') +
      (chickenKg > 0 ? `• Processed Chicken: ${chickenKg} kg @ ₹${chickenKg * chickenRate}%0A` : '') +
      (fishKg > 0 ? `• Fresh River Rohu Fish: ${fishKg} kg @ ₹${fishKg * fishRate}%0A` : '') +
      (iceCreamTubs > 0 ? `• Brentra Ice Cream (4L Tubs): ${iceCreamTubs} tubs @ ₹${iceCreamTubs * iceCreamRate}%0A` : '') +
      (makhanaKg > 0 ? `• Jumbo Makhana: ${makhanaKg} kg @ ₹${makhanaKg * makhanaRate}%0A` : '') +
      `--------------------------------%0A` +
      `*Est. Wholesale Total:* ₹${totalEstimate.toLocaleString('en-IN')}%0A` +
      `Please confirm stock availability and dispatch time.`;
    return `https://wa.me/919430088000?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Hero Banner - Premium White */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold uppercase tracking-widest mb-3">
            <Fish className="w-4 h-4" /> Brentra Fresh & FMCG Logistics Division
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.15] max-w-4xl">
            Uncompromised Freshness: Farm-to-Door Wholesale Supply Chain
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mt-5 leading-relaxed">
            Direct daily procurement and temperature-controlled logistics for hotels, banquet halls, cloud kitchens, and supermarkets across Patna and Bihar. Fresh farm eggs, hygienic poultry, fresh river fish, gourmet ice creams & agricultural staples.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-8">
            <a
              href="#order"
              className="px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
            >
              Configure Bulk Order & WhatsApp Launcher
            </a>
            <a
              href="#rate-card"
              className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors shadow-sm flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-600" /> Daily Patna Wholesale Rate Card
            </a>
            <button
              onClick={() => onOpenQuoteModal('fresh-fmcg')}
              className="px-5 py-3.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold text-xs uppercase tracking-wider border border-emerald-200 transition-colors cursor-pointer"
            >
              Inquire Corporate Supply AMC
            </button>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-black text-[#0A192F] font-mono">35+ Tons</div>
              <div className="text-xs text-slate-500 mt-1">Daily Fresh Influx Handled</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A192F] font-mono">-18°C to 4°C</div>
              <div className="text-xs text-slate-500 mt-1">Calibrated Cold-Chain Fleet</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A192F] font-mono">FSSAI</div>
              <div className="text-xs text-slate-500 mt-1">Batch Tested & Certified</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A192F] font-mono">5:30 AM</div>
              <div className="text-xs text-slate-500 mt-1">First Scheduled City Dispatch</div>
            </div>
          </div>

        </div>
      </section>

      {/* Live Daily Patna Wholesale Rate Card */}
      <section id="rate-card" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold uppercase tracking-widest mb-1">
                <Clock className="w-3.5 h-3.5" /> Updated Daily at 06:00 AM IST
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F]">
                Today's Patna Wholesale Rate Board
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Transparent mandi-benchmarked procurement rates with zero middlemen margins.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => alert("Downloading Brentra_Daily_Patna_RateCard.pdf...")}
                className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-slate-300 shadow-sm cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-emerald-600" /> Download PDF Rate Card
              </button>
            </div>
          </div>

          {/* Rate Table - Clean White */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 uppercase font-mono tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="py-4 px-6">Commodity / Produce</th>
                    <th className="py-4 px-6">Wholesale Benchmark Rate</th>
                    <th className="py-4 px-6">Unit Specification</th>
                    <th className="py-4 px-6">Daily Trend</th>
                    <th className="py-4 px-6">Patna Yard Status</th>
                    <th className="py-4 px-6 text-right">Instant Order</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {DAILY_RATES.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-4 px-6 font-bold text-[#0A192F] flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        {row.item}
                      </td>
                      <td className="py-4 px-6 font-mono font-black text-base text-emerald-800">
                        {row.rate}
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        {row.unit}
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-[11px] font-mono font-bold text-slate-700">
                          {row.change}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                          {row.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <a
                          href="#order"
                          className="px-3 py-1.5 rounded-lg bg-[#0A192F] text-white hover:bg-[#1E3E62] font-bold text-[11px] transition-colors"
                        >
                          Book Batch
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>

      {/* 4 Core Sourcing Verticals Showcase */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
              Farm-to-Commercial Sourcing
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Dedicated Fresh Supply Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Egg,
                title: 'Poultry & Farm Eggs',
                desc: 'Wholesale delivery of clean, candled white & brown farm eggs. Bulk crates packed specifically for commercial bakers, restaurants, and cloud kitchens.',
                stats: 'Daily farm fresh batches'
              },
              {
                icon: Fish,
                title: 'River Fish & Fresh Meats',
                desc: 'Hygienically dressed fresh chicken, goat meat, and authentic Bihar river Rohu, Catla, and Boari caught daily from the Ganges and certified tributaries.',
                stats: '0-4°C chill chain maintained'
              },
              {
                icon: IceCream,
                title: 'Brentra Ice Cream Division',
                desc: 'Premium commercial 4-Liter & 10-Liter tubs in 12 gourmet flavors for wedding caterers, banquet venues, and ice cream parlors with on-site cold carts.',
                stats: '100% Pure Dairy Cream'
              },
              {
                icon: Wheat,
                title: 'Agri-Staples: Makhana & Mushrooms',
                desc: 'Direct sourcing from Mithila growers: Jumbo 5-Suta foxnuts (Makhana) and fresh white button mushrooms packaged under strict vacuum sealing.',
                stats: 'Direct farm gate procurement'
              }
            ].map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200 hover:border-slate-400 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#0A192F] group-hover:text-blue-900 transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-emerald-800 font-bold">{cat.stats}</span>
                    <button
                      onClick={() => onOpenQuoteModal('fresh-fmcg')}
                      className="text-slate-500 hover:text-black font-semibold cursor-pointer"
                    >
                      Inquire →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Quick-Bulk WhatsApp Order Launcher */}
      <section id="order" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="text-center max-w-xl mx-auto mb-8 space-y-2">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
                Fast-Track Commercial Ordering
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F]">
                Quick-Bulk WhatsApp Order Launcher
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Adjust desired quantities below. Your total is calculated live and formatted into an instant WhatsApp commercial dispatch order.
              </p>
            </div>

            {/* Quantity Adjusters */}
            <div className="space-y-3.5">
              
              {/* Eggs */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Egg className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0A192F]">Farm Fresh Eggs (Trays of 30 pcs)</div>
                    <div className="text-xs text-slate-500 font-mono">₹144 per tray</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setEggTrays(Math.max(0, eggTrays - 5))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-mono font-bold text-[#0A192F] text-sm">
                    {eggTrays} Trays
                  </span>
                  <button
                    onClick={() => setEggTrays(eggTrays + 5)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold cursor-pointer"
                  >
                    +
                  </button>
                  <span className="w-24 text-right font-mono font-bold text-emerald-800 text-xs">
                    ₹{(eggTrays * eggRate).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Chicken */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Flame className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0A192F]">Hygienic Processed Chicken (Skinless Cut)</div>
                    <div className="text-xs text-slate-500 font-mono">₹185 per kg</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setChickenKg(Math.max(0, chickenKg - 5))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-mono font-bold text-[#0A192F] text-sm">
                    {chickenKg} Kg
                  </span>
                  <button
                    onClick={() => setChickenKg(chickenKg + 5)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold cursor-pointer"
                  >
                    +
                  </button>
                  <span className="w-24 text-right font-mono font-bold text-emerald-800 text-xs">
                    ₹{(chickenKg * chickenRate).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Fish */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Fish className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0A192F]">Fresh Bihar River Rohu Fish</div>
                    <div className="text-xs text-slate-500 font-mono">₹220 per kg</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFishKg(Math.max(0, fishKg - 5))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-mono font-bold text-[#0A192F] text-sm">
                    {fishKg} Kg
                  </span>
                  <button
                    onClick={() => setFishKg(fishKg + 5)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold cursor-pointer"
                  >
                    +
                  </button>
                  <span className="w-24 text-right font-mono font-bold text-emerald-800 text-xs">
                    ₹{(fishKg * fishRate).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Brentra Ice Cream */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <IceCream className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0A192F]">Brentra Gourmet Ice Cream (4L Tub)</div>
                    <div className="text-xs text-slate-500 font-mono">₹480 per 4L Tub</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIceCreamTubs(Math.max(0, iceCreamTubs - 1))}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-mono font-bold text-[#0A192F] text-sm">
                    {iceCreamTubs} Tubs
                  </span>
                  <button
                    onClick={() => setIceCreamTubs(iceCreamTubs + 1)}
                    className="w-8 h-8 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-bold cursor-pointer"
                  >
                    +
                  </button>
                  <span className="w-24 text-right font-mono font-bold text-emerald-800 text-xs">
                    ₹{(iceCreamTubs * iceCreamRate).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

            </div>

            {/* Delivery Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-200">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Buyer Category
                </label>
                <select
                  value={buyerType}
                  onChange={(e) => setBuyerType(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-800"
                >
                  <option value="Restaurant / Cloud Kitchen">Restaurant / Cloud Kitchen</option>
                  <option value="Banquet Hall / Event Caterer">Banquet Hall / Event Caterer</option>
                  <option value="Retail Supermarket">Retail Supermarket</option>
                  <option value="Institution / Hostel">Institution / Hostel</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Delivery Slot
                </label>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-800"
                >
                  <option value="morning">Morning (6:00 AM - 8:30 AM)</option>
                  <option value="evening">Evening (4:00 PM - 7:00 PM)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">
                  Delivery Area in Patna
                </label>
                <input
                  type="text"
                  value={deliveryLocation}
                  onChange={(e) => setDeliveryLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-300 text-xs text-slate-800"
                  placeholder="e.g. Fraser Road, Patna"
                />
              </div>
            </div>

            {/* Total & Launcher Trigger */}
            <div className="mt-8 p-6 rounded-2xl bg-[#0A192F] text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg">
              <div>
                <div className="text-xs text-slate-300">Calculated Wholesale Estimate:</div>
                <div className="text-3xl font-heading font-black text-amber-400">
                  ₹{totalEstimate.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] text-emerald-300 mt-0.5">
                  ✓ FSSAI Batch Quality Guaranteed • Refrigerator Fleet Dispatch
                </div>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" /> Launch WhatsApp Commercial Order
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
