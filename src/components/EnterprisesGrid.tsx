import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export interface EnterpriseCardData {
  id: string;
  title: string;
  description: string;
  link: string;
  image: string;
  badge?: string;
}

export const ENTERPRISES_DATA: EnterpriseCardData[] = [
  {
    id: 'it-digital',
    title: 'IT & Digital Solutions',
    description: 'Software Development, Web Applications, Mobile Apps & Enterprise Cloud Infrastructure.',
    link: '/it-digital',
    image: '/img-it.jpg',
  },
  {
    id: 'realty-construction',
    title: 'Realty, Construction & Turnkey Interiors',
    description: 'Complete Turnkey Construction Starting @ ₹1,900/sq.ft, RCC Foundation & Modular Interiors.',
    link: '/realty-infrastructure',
    image: '/img-realty.jpg',
    badge: 'From ₹1,900/sq.ft',
  },
  {
    id: 'events-hospitality',
    title: 'Events & Entertainment (Hospitality)',
    description: 'Corporate Summits, Luxury Banquets, Mega Weddings & Acoustic Production.',
    link: '/events-hospitality',
    image: '/img-events.jpg',
  },
  {
    id: 'healthcare-pharma',
    title: 'Healthcare & Pharma',
    description: 'Pharmaceutical Wholesale Distribution, Temperature-Controlled Logistics & Supplies.',
    link: '/ventures',
    image: '/img-healthcare.jpg',
  },
  {
    id: 'building-materials',
    title: 'General Sourcing & Building Materials',
    description: '550D TMT Steel, 53-Grade Cement, Kiln Bricks, River Sand & Industrial Procurement.',
    link: '/realty-infrastructure#materials',
    image: '/img-materials.jpg',
  },
  {
    id: 'manpower-staffing',
    title: 'Manpower & Workforce Solutions',
    description: 'Skilled Engineering, Industrial Workforce, Security Staffing & Recruitment Support.',
    link: '/manpower-staffing',
    image: '/img-manpower.jpg',
  },
  {
    id: 'facility-maintenance',
    title: 'Facility Maintenance (RO, AC, Electrical, AMC)',
    description: 'Building Maintenance, AC Jet Wash, Commercial RO Water Systems & Preventive AMC.',
    link: '/bentra-facility',
    image: '/img-facility.jpg',
    badge: '< 60 Mins Dispatch',
  },
  {
    id: 'fresh-fmcg',
    title: 'Fresh Food & FMCG Supply',
    description: 'Daily Farm-Fresh Eggs Wholesale, Processed Poultry, Bihar River Fish & Gourmet Ice Cream.',
    link: '/fmcg-beverages',
    image: '/img-fmcg.jpg',
  },
];

export const EnterprisesGrid: React.FC = () => {
  return (
    <section 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16"
      aria-label="Our Conglomerate Enterprises and Services"
    >
      {/* Centered Section Heading matching Reference Screenshot */}
      <div className="text-center mb-10 sm:mb-12">
        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0E2442] tracking-wider uppercase">
          OUR ENTERPRISES & SERVICES
        </h2>
        <div className="w-16 h-1 bg-[#00A3C4] mx-auto mt-3 rounded-full" />
        <p className="text-slate-600 text-xs sm:text-sm md:text-base max-w-2xl mx-auto mt-3">
          Explore our diversified conglomerate verticals powering commercial, industrial, and consumer growth across Bihar and Eastern India.
        </p>
      </div>

      {/* 4x2 Grid: 4 columns desktop, 2 columns tablet, 1 column mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
        {ENTERPRISES_DATA.map((card) => (
          <Link
            key={card.id}
            to={card.link}
            className="group relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block min-h-[220px] sm:min-h-[240px] md:min-h-[250px] border border-slate-200/40 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#00A3C4]"
            aria-label={`${card.title} - Explore Vertical`}
          >
            {/* Background Photographic Image with Smooth Hover Zoom */}
            <img
              src={card.image}
              alt={card.title}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />

            {/* Dark Gradient Overlay for Maximum Text Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-900/20 group-hover:from-slate-950/90 group-hover:via-slate-950/50 transition-colors" />

            {/* Optional Top Badge */}
            {card.badge && (
              <div className="absolute top-3 right-3 z-10">
                <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-[#00A3C4] text-white shadow-xs uppercase tracking-wide">
                  {card.badge}
                </span>
              </div>
            )}

            {/* Bottom Card Content */}
            <div className="relative z-10 p-5 flex flex-col justify-end h-full">
              <h3 className="font-heading font-bold text-white text-base sm:text-lg leading-snug group-hover:text-amber-300 transition-colors">
                {card.title}
              </h3>
              
              <p className="text-slate-300 text-xs mt-1.5 line-clamp-2 leading-relaxed opacity-90">
                {card.description}
              </p>

              <div className="mt-3.5 flex items-center gap-1.5 text-xs font-semibold text-[#38BDF8] group-hover:text-amber-300 transition-colors">
                <span>Explore Vertical</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default EnterprisesGrid;
