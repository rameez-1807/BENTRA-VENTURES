import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AboutCompanySection: React.FC = () => {
  return (
    <section 
      id="about-company"
      className="py-16 sm:py-20 bg-slate-50 border-y border-slate-200"
      aria-label="About Brentra Ventures Private Limited"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Brand Story & Mission/Vision */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[#0E2442] text-xs font-bold uppercase tracking-wider shadow-xs">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
              Corporate Identity & Governance
            </div>

            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E2442] tracking-tight leading-tight">
              An Integrated Enterprise Conglomerate Powering Regional Growth
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              <strong>Brentra Ventures Private Limited</strong> is a diversified Indian corporate group strategically headquartered in Patna, Bihar. We operate cross-functional enterprises across Enterprise IT Engineering, Turnkey Infrastructure & Construction, On-Demand Facility Care, Cold-Chain FMCG Distribution, Bulk Materials Procurement, and Luxury Hospitality.
            </p>

            {/* Vision and Mission Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#0E2442] font-bold text-sm font-heading">
                  <div className="w-8 h-8 rounded-lg bg-cyan-50 text-[#00A3C4] flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <span>Our Vision</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To engineer enduring infrastructure, industrial supply chains, and technology ecosystems that power sustainable business growth, create skilled employment, and elevate standards across Eastern India.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#0E2442] font-bold text-sm font-heading">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <span>Our Mission</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  To deliver uncompromising execution precision, transparent pricing frameworks, and verified operational benchmarks across every vertical through modern engineering and responsible governance.
                </p>
              </div>
            </div>

            {/* Key Pillars */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs text-slate-700 font-semibold">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Transparent SLA Governance
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 100% Verified Field Technicians
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Bihar State Central Operations Desk
              </span>
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0E2442] hover:bg-[#16355C] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all group"
              >
                <span>Read Full Corporate Profile & Leadership</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Visual Corporate Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-slate-200 bg-white">
              <img
                src="/brentra-infrastructure-banner.jpg"
                alt="Brentra Ventures Headquarters and Infrastructure Operations"
                className="w-full h-80 sm:h-96 object-cover"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

              {/* Floating Stat Badge */}
              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-2xl bg-white/95 backdrop-blur-md border border-white/40 shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Corporate Headquarters
                  </p>
                  <p className="text-sm font-bold text-[#0E2442]">
                    Preven Vila, New Khajoorbana, Patna
                  </p>
                  <p className="text-xs text-slate-600">
                    PIN: 800006 &bull; Bihar, India
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="inline-block px-2.5 py-1 rounded-md text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    Active Operations
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutCompanySection;

