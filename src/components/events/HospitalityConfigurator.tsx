import React, { useState } from 'react';
import { 
  Sparkles, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  UtensilsCrossed, 
  Award, 
  Sliders, 
  UserCheck, 
  Zap,
  MessageSquare
} from 'lucide-react';
import { HospitalityPackage, HospitalityTier } from '../../types/events';
import { HOSPITALITY_PACKAGES } from '../../data/eventsData';

interface HospitalityConfiguratorProps {
  packages: HospitalityPackage[];
  onSelectPackageForBooking: (pkg: HospitalityPackage, guestCount: number, calculatedBudget: number) => void;
  onOpenWhatsApp: (pkg: HospitalityPackage, guestCount: number, calculatedBudget: number) => void;
}

export const HospitalityConfigurator: React.FC<HospitalityConfiguratorProps> = ({
  packages,
  onSelectPackageForBooking,
  onOpenWhatsApp
}) => {
  const [selectedTier, setSelectedTier] = useState<HospitalityTier>('Bespoke');
  const [guestCount, setGuestCount] = useState<number>(650);

  // Guarantee packages are never empty on initial mount
  const packageList = packages && packages.length > 0 ? packages : HOSPITALITY_PACKAGES;
  const activePackage = packageList.find(p => p.tier === selectedTier) || packageList[0];

  // Dynamically calculate budget based on guest slider & base rate
  const baseRate = activePackage?.priceEstimate?.baseRate ?? 149999;
  const perGuestRate = activePackage?.priceEstimate?.perGuestRate ?? 1450;
  const cateringTotal = guestCount * perGuestRate;
  const grandTotal = baseRate + cateringTotal;

  // Dynamically scale staffing ratio based on guest count
  const recommendedCap = activePackage?.guestCapacity?.recommended || 1000;
  const guestRatio = Math.max(1, guestCount / recommendedCap);
  const scaledStaff = {
    coordinators: Math.max(2, Math.round((activePackage?.staffingRatios?.eventCoordinators || 6) * guestRatio)),
    servers: Math.max(8, Math.round((activePackage?.staffingRatios?.serversAndButlers || 45) * guestRatio)),
    security: Math.max(3, Math.round((activePackage?.staffingRatios?.securityPersonnel || 15) * guestRatio)),
    chefs: Math.max(3, Math.round((activePackage?.staffingRatios?.executiveChefs || 8) * guestRatio))
  };

  return (
    <section id="hospitality-configurator" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <span className="text-xs font-bold text-pink-700 uppercase tracking-widest px-3 py-1 rounded-full bg-pink-50 border border-pink-200">
            Interactive Hospitality Architecture
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
            Hospitality Tier & Guest Scope Configurator
          </h2>
          <p className="text-sm text-slate-600">
            Simulate your entire event footprint in real time. Adjust tiers and guest numbers to view verified staffing ratios, culinary brigade scale, and transparent budget estimates.
          </p>
        </div>

        {/* Tier Selector Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 max-w-4xl mx-auto mb-10">
          {packageList.map((pkg) => {
            const isSelected = selectedTier === pkg.tier;
            return (
              <button
                key={pkg.id}
                onClick={() => setSelectedTier(pkg.tier)}
                className={`p-4 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden cursor-pointer ${
                  isSelected
                    ? 'bg-[#0A192F] border-[#0A192F] text-white shadow-xl scale-[1.02]'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                {pkg.badge && (
                  <span
                    className="text-[9px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full text-white inline-block mb-2 shadow-sm"
                    style={{ backgroundColor: pkg.accentColor }}
                  >
                    {pkg.badge}
                  </span>
                )}
                <div className={`font-heading font-bold text-sm sm:text-base leading-tight ${isSelected ? 'text-white' : 'text-[#0A192F]'}`}>
                  {pkg.name}
                </div>
                <div className={`text-[11px] mt-1 font-mono ${isSelected ? 'text-amber-300' : 'text-slate-500'}`}>
                  {pkg.tier} Tier
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Calculator Workspace */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Interactive Guest Controls & Amenities (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-10 space-y-8">
            
            {/* Header info of selected tier */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
              <div>
                <span className="text-xs font-bold text-pink-700 uppercase tracking-widest">
                  Selected Package Blueprint
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-[#0A192F] mt-1">
                  {activePackage.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {activePackage.tagline}
                </p>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Status</span>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> {activePackage.availabilityStatus}
                </span>
              </div>
            </div>

            {/* Guest Count Slider */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <Users className="w-4 h-4 text-pink-600" /> Expected Guest Count:
                </label>
                <span className="font-mono text-2xl font-black text-[#0A192F] bg-white px-3 py-1 rounded-xl border border-slate-200 shadow-sm">
                  {guestCount.toLocaleString('en-IN')} Guests
                </span>
              </div>

              <input
                type="range"
                min="50"
                max="3500"
                step="25"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-pink-600"
              />

              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>50 (Intimate)</span>
                <span>500 (Corporate Gala)</span>
                <span>1,500 (Grand Wedding)</span>
                <span>3,500+ (State Summit)</span>
              </div>
            </div>

            {/* Dynamic Staffing Brigade Ratios */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-amber-600" />
                Dynamic Hospitality Crew Allocated for {guestCount} Guests:
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="font-mono text-xl font-bold text-[#0A192F]">{scaledStaff.coordinators}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold mt-0.5">Floor Leads</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="font-mono text-xl font-bold text-[#0A192F]">{scaledStaff.servers}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold mt-0.5">Stewards & Butlers</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="font-mono text-xl font-bold text-[#0A192F]">{scaledStaff.security}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold mt-0.5">Security Officers</div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="font-mono text-xl font-bold text-[#0A192F]">{scaledStaff.chefs}</div>
                  <div className="text-[10px] text-slate-500 uppercase font-semibold mt-0.5">Master Chefs</div>
                </div>
              </div>
            </div>

            {/* Included Amenities Checklist */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                Included Amenities & Architectural Inclusions:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activePackage.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <span className="leading-tight">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Live Price Simulation & Confirmation Box (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#061426] via-[#0A192F] to-[#0D1F38] text-white p-6 sm:p-10 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-slate-800">
            
            <div className="space-y-6">
              
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400">
                  Real-Time Estimate Breakdown
                </span>
                <div className="text-3xl sm:text-4xl font-black font-mono text-white mt-1">
                  ₹{grandTotal.toLocaleString('en-IN')}*
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Total production, decor & catering for {guestCount} guests
                </div>
              </div>

              {/* Itemized summary */}
              <div className="space-y-3 pt-4 border-t border-white/10 text-xs">
                
                <div className="flex justify-between items-center text-slate-300">
                  <span>Staging, Sound & Decor Base:</span>
                  <span className="font-mono font-bold text-white">₹{baseRate.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Banquet & Plated Menu ({guestCount} × ₹{perGuestRate}):</span>
                  <span className="font-mono font-bold text-white">₹{cateringTotal.toLocaleString('en-IN')}</span>
                </div>

                <div className="flex justify-between items-center text-slate-300">
                  <span>Total Crew Members:</span>
                  <span className="font-mono font-bold text-amber-300">
                    {scaledStaff.coordinators + scaledStaff.servers + scaledStaff.security + scaledStaff.chefs} Specialists
                  </span>
                </div>

                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>FSSAI Hygiene Certification:</span>
                  <span>Included</span>
                </div>

                <div className="flex justify-between items-center text-emerald-400 font-bold">
                  <span>On-Site Event Lead Coordinator:</span>
                  <span>Complimentary</span>
                </div>

              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-[11px] text-slate-300 space-y-1">
                <div className="font-bold text-white">Package Scope Notice:</div>
                <p className="leading-relaxed">
                  *Taxes applicable as per GST norms. Final rate card adjusts automatically if you require imported floral arches or celebrity performances.
                </p>
              </div>

            </div>

            {/* CTAs */}
            <div className="space-y-2.5 pt-8">
              <button
                onClick={() => onSelectPackageForBooking(activePackage, guestCount, grandTotal)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <span>Lock In Scope & Book Package</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenWhatsApp(activePackage, guestCount, grandTotal)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Inquire via WhatsApp Desk</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

