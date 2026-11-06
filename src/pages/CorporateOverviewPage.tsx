import React from 'react';
import { 
  Building2, 
  ShieldCheck, 
  Award, 
  Compass
} from 'lucide-react';
import { DirectorsQuad } from '../components/DirectorsQuad';

interface CorporateOverviewPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const CorporateOverviewPage: React.FC<CorporateOverviewPageProps> = ({ onOpenQuoteModal }) => {
  const milestones = [
    { year: '2018', title: 'Founding of Brentra Enterprises', desc: 'Commenced civil construction and agricultural commodities supply operations in Patna.' },
    { year: '2020', title: 'Launch of Turnkey Construction Starting @ ₹1,900/sq.ft', desc: 'Introduced standardized, all-inclusive home building guaranteeing zero hidden budget creep in Bihar.' },
    { year: '2022', title: 'Cold-Chain Logistics Expansion', desc: 'Commissioned 50-ton cold storage in Danapur and fleet of refrigerated delivery trucks for eggs, poultry, and fish.' },
    { year: '2024', title: 'Establishment of Brentra IT Labs & Facility Care', desc: 'Digitized group operations and opened enterprise software services and on-demand urban technician dispatch.' },
    { year: '2026', title: 'Conglomerate Consolidation', desc: 'Unified 7 diversified verticals under single institutional governance, serving 25,000+ happy clients.' },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Hero Banner - Premium White */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Building2 className="w-4 h-4" /> Brentra Ventures Corporate Overview
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.15] max-w-4xl">
            Diverse Ventures • Stronger Tomorrow
          </h1>
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mt-5 leading-relaxed">
            Headquartered in Patna, Bihar, Brentra Ventures PVT is driven by a singular institutional mandate: building transparent, dependable businesses that solve everyday infrastructure, dietary, technology, and lifestyle needs across Eastern India.
          </p>
        </div>
      </section>

      {/* Vision, Mission, Values */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#0A192F]">Our Vision</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                To become Eastern India's most trusted and diversified conglomerate by 2030, recognized for uncompromising ethics, price predictability, and customer satisfaction.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#0A192F]">Our Mission</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Empower families and commercial enterprises by eliminating opacity—whether guaranteeing ₹1,900/sq.ft for homes, farm-fresh eggs on morning tables, or software delivered on time.
              </p>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-8 space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-2xl text-[#0A192F]">Our Values</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Institutional governance, regional job creation in Bihar, radical transparency, and relentless operational speed across all 7 group subsidiaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Directors Desk Quad */}
      <DirectorsQuad />

      {/* Corporate Milestones */}
      <section id="milestones" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-2">
            <span className="text-xs font-bold text-amber-700 uppercase tracking-widest px-3 py-1 rounded bg-amber-50 border border-amber-200">
              The Brentra Journey
            </span>
            <h2 className="font-heading font-extrabold text-3xl text-[#0A192F]">
              Milestones & Organizational Evolution
            </h2>
          </div>

          <div className="space-y-4">
            {milestones.map((m, idx) => (
              <div key={idx} className="flex items-start gap-6 p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 transition-colors">
                <span className="font-heading font-black text-2xl text-[#0A192F] font-mono w-20 shrink-0">
                  {m.year}
                </span>
                <div className="space-y-1">
                  <h3 className="font-heading font-bold text-lg text-slate-900">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};
