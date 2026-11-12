import React from 'react';

export interface StatItem {
  id: number;
  value: string;
  highlightText?: string;
  label: string;
}

export const BUSINESS_STATS: StatItem[] = [
  {
    id: 1,
    value: '7',
    highlightText: 'Conglomerate Units',
    label: 'Diversified Business Verticals',
  },
  {
    id: 2,
    value: '25,000+',
    label: 'Happy Families & Businesses Served',
  },
  {
    id: 3,
    value: '1,100+',
    highlightText: 'Jobs Created',
    label: 'Total Regional Workforce',
  },
  {
    id: 4,
    value: '100%',
    label: 'Verified Operations & Sourced Goods',
  },
];

export const BusinessStats: React.FC = () => {
  return (
    <section 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 mb-12 sm:mb-16"
      aria-label="Verified Corporate Scale & Business Statistics"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {BUSINESS_STATS.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-100 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-center min-h-[120px] sm:min-h-[130px]"
          >
            {/* Number and Highlight */}
            <div className="flex items-baseline flex-wrap gap-x-2">
              <span className="font-heading font-black text-3xl sm:text-4xl text-[#0E2442] tracking-tight">
                {stat.value}
              </span>
              {stat.highlightText && (
                <span className="font-heading font-bold text-base sm:text-lg text-amber-600 tracking-tight">
                  {stat.highlightText}
                </span>
              )}
            </div>

            {/* Descriptive Label */}
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-2 leading-relaxed">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BusinessStats;
