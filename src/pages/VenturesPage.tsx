import React from 'react';
import { 
  HeartPulse, 
  Pill, 
  Truck, 
  ArrowRight, 
  Phone, 
  Warehouse
} from 'lucide-react';

interface VenturesPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const VenturesPage: React.FC<VenturesPageProps> = ({ onOpenQuoteModal }) => {
  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Hero Banner - Premium White */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex items-center gap-2 text-blue-800 text-xs font-bold uppercase tracking-widest mb-3">
            <HeartPulse className="w-4 h-4" /> Brentra Special Ventures & Healthcare Logistics
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.15] max-w-4xl">
            Expanding Access to Reliable Healthcare & Regional Trade
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mt-5 leading-relaxed">
            Strategic medicine wholesale distribution networks, cold-chain pharmaceutical fulfillment, and forward-looking industrial warehousing connecting manufacturers with 1,200+ retail pharmacies across Eastern India.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-8">
            <button
              onClick={() => onOpenQuoteModal('ventures')}
              className="px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
            >
              Partner with Brentra Ventures
            </button>
            <a
              href="tel:+919430088000"
              className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors flex items-center gap-2 shadow-sm"
            >
              <Phone className="w-4 h-4 text-amber-600" /> Trade Desk: +91-94300-88000
            </a>
          </div>

          <div className="mt-12 pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl font-black text-[#0A192F] font-mono">1,200+</div>
              <div className="text-xs text-slate-500 mt-1">Retail Chemists Supplied</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A192F] font-mono">100%</div>
              <div className="text-xs text-slate-500 mt-1">GDP (Good Distribution Practice)</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A192F] font-mono">2-8°C</div>
              <div className="text-xs text-slate-500 mt-1">Calibrated Vaccine Cold Chain</div>
            </div>
            <div>
              <div className="text-2xl font-black text-[#0A192F] font-mono">24/7</div>
              <div className="text-xs text-slate-500 mt-1">Emergency Hospital Supply Line</div>
            </div>
          </div>

        </div>
      </section>

      {/* Ventures Focus Areas */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Pill,
                title: 'Pharmaceutical Wholesale Network',
                desc: 'Bulk sourcing directly from Tier-1 pharma manufacturers (Sun Pharma, Cipla, Torrent, Mankind) delivering authenticated genuine medicines to pharmacies in Patna and 14 northern districts.',
                badge: 'Zero Counterfeit Protocol'
              },
              {
                icon: Truck,
                title: 'Cold-Chain Biological Distribution',
                desc: 'Temperature-monitored refrigerated transport for insulin, oncology biologics, vaccines, and diagnostic reagents with real-time GPS telemetry and automated logger SMS alerts.',
                badge: 'Real-Time IoT Loggers'
              },
              {
                icon: Warehouse,
                title: 'Industrial Warehousing & 3PL',
                desc: 'Strategic warehousing facilities situated along the NH-30 and Bihta corridors offering grade-A pallet storage, inventory management, and cross-docking services.',
                badge: 'Grade-A Warehousing'
              }
            ].map((v, idx) => {
              const Icon = v.icon;
              return (
                <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:border-slate-400 transition-colors shadow-sm hover:shadow-md">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-blue-50 text-blue-800">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 border border-slate-200 text-slate-700 font-mono">
                        {v.badge}
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-[#0A192F]">
                      {v.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                      {v.desc}
                    </p>
                  </div>

                  <div className="pt-6 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => onOpenQuoteModal('ventures')}
                      className="text-xs font-bold text-[#0A192F] hover:text-blue-900 flex items-center gap-1.5 cursor-pointer"
                    >
                      Inquire Distribution Terms <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
};
