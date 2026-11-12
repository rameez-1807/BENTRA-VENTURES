import React from 'react';
import { SearchCheck, PenTool, CheckCircle, Handshake, ArrowRight } from 'lucide-react';

export const APPROACH_STEPS = [
  {
    step: '01',
    title: 'Understand Requirements',
    description: 'We conduct comprehensive scoping, on-site diagnostics, and requirement gathering to understand your technical, architectural, or logistical goals.',
    icon: SearchCheck,
  },
  {
    step: '02',
    title: 'Plan Solutions',
    description: 'Our engineering and management desks produce clear architectural blueprints, timeline milestones, and guaranteed upfront price estimates.',
    icon: PenTool,
  },
  {
    step: '03',
    title: 'Deliver Services',
    description: 'Specialized teams and background-verified technicians execute the work using certified materials and strict quality assurance checks.',
    icon: CheckCircle,
  },
  {
    step: '04',
    title: 'Build Relationships',
    description: 'We provide dedicated post-delivery AMC support, milestone reviews, warranty guarantees, and transparent long-term partnership frameworks.',
    icon: Handshake,
  },
];

export const BusinessApproachSection: React.FC = () => {
  return (
    <section 
      id="business-approach"
      className="py-16 sm:py-20 bg-slate-900 text-white relative overflow-hidden"
      aria-label="Our 4-Step Business Approach"
    >
      {/* Background Accent Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-14 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00D4E7]">
            Structured Execution Methodology
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-tight mt-2">
            Our Business Approach
          </h2>
          <div className="w-16 h-1 bg-[#00D4E7] mx-auto mt-3 rounded-full" />
          <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            A disciplined, transparent, and quality-driven four-phase lifecycle guiding every client engagement from initial consultation to enduring operations.
          </p>
        </div>

        {/* 4-Step Process Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {APPROACH_STEPS.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === APPROACH_STEPS.length - 1;

            return (
              <div
                key={item.step}
                className="relative bg-slate-800/80 rounded-2xl p-6 sm:p-7 border border-slate-700/80 shadow-lg hover:border-[#00D4E7]/60 hover:bg-slate-800 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-mono text-2xl font-black text-[#00D4E7] opacity-80">
                      {item.step}
                    </span>
                    <div className="w-11 h-11 rounded-xl bg-slate-700/60 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00D4E7]/20 group-hover:text-[#00D4E7] transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-heading font-bold text-lg text-white mb-2 leading-snug group-hover:text-[#00D4E7] transition-colors">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Flow indicator on desktop */}
                {!isLast && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 items-center justify-center text-slate-400">
                    <ArrowRight className="w-3 h-3 text-[#00D4E7]" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default BusinessApproachSection;
