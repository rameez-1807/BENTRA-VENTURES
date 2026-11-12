import React from 'react';
import { Clock, Users2, Layers3, HeartHandshake } from 'lucide-react';

export const WHY_CHOOSE_ITEMS = [
  {
    id: 1,
    title: 'Reliable Service Delivery',
    description: 'Committed operational timelines with rapid urban dispatch within 60 minutes across Patna municipal limits and strict milestone adherence for construction projects.',
    icon: Clock,
    iconColor: 'text-[#00A3C4]',
    iconBg: 'bg-cyan-50',
  },
  {
    id: 2,
    title: 'Experienced Multi-Disciplinary Team',
    description: 'Certified civil architects, senior software engineers, hospitality experts, and background-verified technicians collaborating under unified corporate governance.',
    icon: Users2,
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
  {
    id: 3,
    title: 'Multiple Integrated Solutions',
    description: 'A single conglomerate partner providing end-to-end IT engineering, building materials, turnkey interiors, facility AMC, event management, and daily food supplies.',
    icon: Layers3,
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    id: 4,
    title: 'Customer-Centric Approach',
    description: 'Transparent pricing with zero hidden charges, dedicated single-point account managers, verified contracts, and post-service warranty follow-ups.',
    icon: HeartHandshake,
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
];

export const WhyChooseUsSection: React.FC = () => {
  return (
    <section 
      id="why-choose-us"
      className="py-16 sm:py-20 bg-white"
      aria-label="Why Choose Brentra Ventures"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#00A3C4]">
            Trust & Operational Excellence
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0E2442] tracking-tight mt-2">
            Why Choose Brentra Ventures
          </h2>
          <div className="w-16 h-1 bg-amber-500 mx-auto mt-3 rounded-full" />
          <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-3 leading-relaxed">
            We bridge industrial scale with personalized care, providing institutions and households with reliable, verified, and high-performance solutions.
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {WHY_CHOOSE_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${item.iconBg} ${item.iconColor} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="font-heading font-bold text-lg text-[#0E2442] mb-2 leading-snug group-hover:text-[#00A3C4] transition-colors">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <span>Verified Standard</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUsSection;
