import React, { useState } from 'react';
import { Quote, ShieldCheck, ChevronRight, Award } from 'lucide-react';
import { DIRECTORS } from '../data/mockData';

export const DirectorsQuad: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>(DIRECTORS[0].id);

  return (
    <section id="directors" className="py-20 bg-white border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-amber-600" /> Corporate Governance & Vision
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F] tracking-tight">
            From the Desk of the Directors
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            Brentra Ventures is steered by a multidisciplinary leadership quad combining institutional governance, technological foresight, civil engineering rigor, and cold-chain supply precision.
          </p>
        </div>

        {/* 4-Column Desktop Grid / 2x2 Tablet / 1-Col Mobile Card Stack */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DIRECTORS.map((director) => {
            const isSelected = activeTab === director.id;
            return (
              <div
                key={director.id}
                onClick={() => setActiveTab(director.id)}
                className={`flex flex-col justify-between rounded-2xl p-6 transition-all duration-300 relative group cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-50 border-2 border-[#0A192F] shadow-xl -translate-y-1' 
                    : 'bg-white hover:bg-slate-50/80 border border-slate-200 hover:border-slate-300 shadow-sm'
                }`}
              >
                {/* Director Avatar Badge & Designation */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div 
                      className="w-14 h-14 rounded-2xl flex items-center justify-center font-heading font-black text-xl text-white shadow-md relative overflow-hidden bg-[#0A192F]"
                      style={{ 
                        border: `2px solid ${director.accentColor}`
                      }}
                    >
                      {director.initials}
                      <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white" />
                    </div>
                    <span 
                      className="text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider font-mono bg-slate-100 text-slate-700 border border-slate-200"
                    >
                      Board Quad
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#0A192F] group-hover:text-blue-900 transition-colors">
                    {director.name}
                  </h3>
                  <div className="text-xs font-bold text-amber-700 mt-0.5">
                    {director.role}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 font-medium pb-4 border-b border-slate-100">
                    {director.division}
                  </div>

                  {/* Dynamic Quote Bubble */}
                  <div className="relative mt-4 bg-slate-100/70 p-3.5 rounded-xl border border-slate-200">
                    <Quote className="w-5 h-5 text-slate-400 absolute -top-2.5 -left-1 transform -scale-x-100" />
                    <p className="text-xs text-slate-700 italic leading-relaxed pt-1">
                      "{director.quote}"
                    </p>
                  </div>
                </div>

                {/* Director Mandate Focus & Message Snippet */}
                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Strategic Mandate:
                  </div>
                  <p className="text-xs text-slate-600 leading-normal line-clamp-3">
                    {director.focus}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#0A192F] group-hover:text-blue-800">
                    <span>Read Full Vision</span>
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Director Deep Vision Callout Box */}
        {(() => {
          const selected = DIRECTORS.find(d => d.id === activeTab) || DIRECTORS[0];
          return (
            <div className="mt-12 p-8 rounded-2xl bg-slate-50 border border-slate-200 relative overflow-hidden shadow-md">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 max-w-3xl">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-700 uppercase tracking-wider">
                    <span>Executive Note from {selected.name}</span>
                    <span>•</span>
                    <span className="text-slate-500">{selected.role}</span>
                  </div>
                  <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-serif italic">
                    "{selected.message}"
                  </p>
                  <p className="text-xs text-slate-500 pt-1">
                    Portfolio: <strong className="text-slate-800">{selected.division}</strong> | Operating out of Brentra Corporate Towers, Bailey Road, Patna.
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    href="tel:+919430088000"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                  >
                    Direct Secretariat Connect
                  </a>
                </div>
              </div>
            </div>
          );
        })()}

      </div>
    </section>
  );
};
