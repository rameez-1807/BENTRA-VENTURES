import React from 'react';
import { 
  Building2, 
  Clock, 
  ShieldCheck, 
  Users, 
  Layers, 
  TrendingUp,
  MapPin,
  CheckCircle2
} from 'lucide-react';
import { PARENT_STATS } from '../data/mockData';

export const ParentStats: React.FC = () => {
  const iconList = [Layers, Building2, Clock, ShieldCheck, Users, TrendingUp];

  return (
    <section className="py-14 bg-[#F8FAFC] relative border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline Banner */}
        <div className="mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-widest mb-1">
              <MapPin className="w-4 h-4" /> Operational Footprint • Bihar State Central Hub
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F]">
              Conglomerate Impact & Scale Metrics
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> ISO 9001:2015 Audited
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-blue-700" /> Guaranteed SLAs
            </span>
          </div>
        </div>

        {/* 6 Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {PARENT_STATS.map((stat, idx) => {
            const Icon = iconList[idx] || ShieldCheck;
            return (
              <div 
                key={idx}
                className="bg-white border border-slate-200 hover:border-amber-400 rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-slate-50 group-hover:bg-amber-50 text-slate-700 group-hover:text-amber-700 flex items-center justify-center mb-4 transition-colors border border-slate-100">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading font-black text-2xl sm:text-3xl text-[#0A192F] tracking-tight group-hover:text-blue-900 transition-colors">
                      {stat.value}
                    </span>
                    <span className="text-xs font-bold text-amber-700">
                      {stat.suffix}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mt-2">
                    {stat.label}
                  </div>
                </div>
                <div className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-100">
                  {stat.sub}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
