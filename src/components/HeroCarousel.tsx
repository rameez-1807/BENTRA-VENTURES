import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroCarouselProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export interface VentureSlide {
  id: string;
  tag: string;
  badge: string;
  badgeColor: string;
  headline: string;
  description: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  verticalId: string;
  image: string;
}

export const VENTURE_SLIDES: VentureSlide[] = [
  {
    id: 'brentra-facility',
    tag: 'Brentra Facility',
    badge: 'BRENTRA FACILITY',
    badgeColor: '#0284C7',
    headline: 'Professional Facility Management & Maintenance Solutions',
    description: 'Integrated facility operations, building maintenance, AC jet service, RO water systems & corporate AMC support.',
    primaryCtaText: 'Explore Facility Services',
    primaryCtaLink: '/bentra-facility',
    secondaryCtaText: 'Request a Service',
    verticalId: 'bentra-facility',
    image: '/img-facility.jpg',
  },
  {
    id: 'brentra-events',
    tag: 'Brentra Events',
    badge: 'BRENTRA EVENTS',
    badgeColor: '#EC4899',
    headline: 'Signature Luxury Weddings & Corporate Summits in Bihar',
    description: 'Turnkey event execution — stage, decor, catering, artist booking for 100 to 5,000+ guests.',
    primaryCtaText: 'Plan Your Event',
    primaryCtaLink: '/events-hospitality',
    secondaryCtaText: 'Book Event Consultation',
    verticalId: 'events-hospitality',
    image: '/img-events.jpg',
  },
  {
    id: 'brentra-materials',
    tag: 'Brentra Materials',
    badge: 'BRENTRA MATERIALS',
    badgeColor: '#F59E0B',
    headline: 'Reliable Construction Materials & Building Supply Solutions',
    description: 'Certified 550D TMT steel rebars, 53-grade cement, kiln red bricks, river sand & bulk depot procurement across Bihar.',
    primaryCtaText: 'Explore Materials',
    primaryCtaLink: '/realty-infrastructure#materials',
    secondaryCtaText: 'Request a Quote',
    verticalId: 'building-materials',
    image: '/img-materials.jpg',
  },
  {
    id: 'brentra-it',
    tag: 'Brentra IT Solutions',
    badge: 'BRENTRA IT SOLUTIONS',
    badgeColor: '#00D4E7',
    headline: 'Next-Generation Software Engineering & Enterprise Digital Scale',
    description: 'Custom web platforms, mobile applications, cloud architecture, and AI-powered enterprise software.',
    primaryCtaText: 'Explore IT Solutions',
    primaryCtaLink: '/it-digital',
    secondaryCtaText: 'Book Tech Consultation',
    verticalId: 'it-digital',
    image: '/img-it.jpg',
  },
  {
    id: 'brentra-realty',
    tag: 'Brentra Realty',
    badge: 'BRENTRA REALTY',
    badgeColor: '#D9A441',
    headline: 'Complete Turnkey Construction Starting at ₹1,900 / sq. ft.',
    description: 'Full RCC framed structure, 550D TMT rebars, branded vitrified tiles, modular kitchen & 10-year warranty.',
    primaryCtaText: 'Get Construction Estimate',
    primaryCtaLink: '/realty-infrastructure',
    secondaryCtaText: 'Book Site Inspection',
    verticalId: 'realty-infrastructure',
    image: '/img-realty.jpg',
  },
  {
    id: 'brentra-fmcg',
    tag: 'Brentra Fresh Supply',
    badge: 'BRENTRA FRESH SUPPLY',
    badgeColor: '#10B981',
    headline: 'Farm-Fresh Wholesale FMCG Delivered Daily Across Bihar',
    description: 'Wholesale farm eggs, hygienic poultry, fresh Bihar river fish, and gourmet Brentra ice cream cold-chain supply.',
    primaryCtaText: 'View FMCG Products',
    primaryCtaLink: '/fmcg-beverages',
    secondaryCtaText: 'Place Bulk Order',
    verticalId: 'fmcg-beverages',
    image: '/img-fmcg.jpg',
  },
  {
    id: 'brentra-manpower',
    tag: 'Brentra Manpower',
    badge: 'BRENTRA MANPOWER',
    badgeColor: '#818CF8',
    headline: 'Skilled Technical Workforce & Corporate Security Staffing',
    description: 'Background-verified industrial technicians, facility maintenance crews, licensed security guards & recruitment support.',
    primaryCtaText: 'Explore Staffing Solutions',
    primaryCtaLink: '/manpower-staffing',
    secondaryCtaText: 'Request Workforce Proposal',
    verticalId: 'manpower-staffing',
    image: '/img-manpower.jpg',
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onOpenQuoteModal }) => {
  // Start on index 1 (Brentra Events) to match the reference screenshot layout!
  const [current, setCurrent] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const DURATION = 6000;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % VENTURE_SLIDES.length);
    }, DURATION);
    return () => clearInterval(timer);
  }, [isPaused, current]);

  const prev = () => setCurrent((c) => (c - 1 + VENTURE_SLIDES.length) % VENTURE_SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % VENTURE_SLIDES.length);

  const getIdx = (offset: number) => (current + offset + VENTURE_SLIDES.length) % VENTURE_SLIDES.length;

  const prevIdx = getIdx(-1);
  const nextIdx = getIdx(1);

  const activeSlide = VENTURE_SLIDES[current];
  const leftSlide = VENTURE_SLIDES[prevIdx];
  const rightSlide = VENTURE_SLIDES[nextIdx];

  return (
    <section 
      className="bg-[#07111F] pt-8 pb-10 sm:py-12 border-b border-[#1E3E62]/40 relative overflow-hidden"
      aria-label="Our Diverse Ventures Showcase"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => { touchStartX.current = e.targetTouches[0].clientX; }}
      onTouchEnd={(e) => {
        if (!touchStartX.current) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 45) next();
        else if (diff < -45) prev();
        touchStartX.current = null;
      }}
    >
      {/* Background subtle radial depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(14,36,66,0.5)_0%,rgba(7,17,31,0.95)_80%)] pointer-events-none" />

      {/* Section Heading matching Reference Screenshot */}
      <div className="relative z-10 text-center mb-6 sm:mb-8 px-4">
        <h2 className="text-white font-heading font-extrabold text-2xl sm:text-3xl md:text-[32px] tracking-wider uppercase">
          OUR DIVERSE VENTURES
        </h2>
      </div>

      {/* 3-Card Carousel Container */}
      <div className="relative z-10 max-w-[1420px] mx-auto px-3 sm:px-6 flex items-center justify-center gap-3 sm:gap-4 lg:gap-5">

        {/* Circular Prev Arrow Button */}
        <button
          onClick={prev}
          className="absolute left-1 sm:left-3 lg:left-4 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Left Preview Card (Width ~230px, Height ~355px) */}
        <div
          onClick={prev}
          className="hidden lg:block relative rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/10 shrink-0 group transition-all duration-300 hover:border-white/30"
          style={{ width: '230px', height: '355px' }}
          title={`Switch to ${leftSlide.tag}`}
        >
          <img
            key={`left-${leftSlide.id}`}
            src={leftSlide.image}
            alt={leftSlide.tag}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-55 group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/30" />
          
          {/* Bottom Business Name Label */}
          <div className="absolute bottom-5 left-4 right-4 z-10">
            <p className="text-white font-heading font-bold text-sm tracking-wide drop-shadow-md truncate">
              {leftSlide.tag}
            </p>
          </div>
        </div>

        {/* Center Main Featured Card (Width ~895px, Height ~398px) */}
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/15 flex-1 max-w-[895px] bg-slate-950 transition-all duration-500"
          style={{ minHeight: '398px' }}
        >
          {/* Center Card Background Photo with Crossfade Effect */}
          <img
            key={`center-${activeSlide.id}`}
            src={activeSlide.image}
            alt={activeSlide.headline}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out"
            style={{ animation: 'brentraFadeIn 0.5s ease-out' }}
          />

          {/* Cinematic Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-900/30" />

          {/* Card Content Aligned on the Left */}
          <div className="relative z-10 p-6 sm:p-10 md:p-12 lg:p-12 flex flex-col justify-center min-h-[398px]">
            
            {/* Category Pill Badge with Pulsing Dot */}
            <div className="mb-3 sm:mb-4">
              <span
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider border shadow-xs"
                style={{
                  color: activeSlide.badgeColor,
                  borderColor: `${activeSlide.badgeColor}50`,
                  backgroundColor: `${activeSlide.badgeColor}18`,
                }}
              >
                <span 
                  className="w-1.5 h-1.5 rounded-full animate-pulse" 
                  style={{ backgroundColor: activeSlide.badgeColor }} 
                />
                {activeSlide.badge}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-[34px] lg:text-[38px] text-white leading-tight sm:leading-snug max-w-xl mb-3 tracking-tight drop-shadow-sm">
              {activeSlide.headline}
            </h1>

            {/* Description */}
            <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-lg leading-relaxed mb-6 font-normal">
              {activeSlide.description}
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={activeSlide.primaryCtaLink}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 text-xs sm:text-sm font-bold transition-all hover:scale-105 active:scale-95 group shadow-sm"
                style={{
                  borderColor: activeSlide.badgeColor,
                  color: activeSlide.badgeColor,
                  backgroundColor: `${activeSlide.badgeColor}18`,
                }}
              >
                <span>{activeSlide.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() => onOpenQuoteModal(activeSlide.verticalId)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/30 text-xs sm:text-sm font-semibold text-white hover:bg-white/10 active:scale-95 transition-all cursor-pointer backdrop-blur-xs"
              >
                {activeSlide.secondaryCtaText}
              </button>
            </div>

          </div>
        </div>

        {/* Right Preview Card (Width ~230px, Height ~355px) */}
        <div
          onClick={next}
          className="hidden lg:block relative rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/10 shrink-0 group transition-all duration-300 hover:border-white/30"
          style={{ width: '230px', height: '355px' }}
          title={`Switch to ${rightSlide.tag}`}
        >
          <img
            key={`right-${rightSlide.id}`}
            src={rightSlide.image}
            alt={rightSlide.tag}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 opacity-55 group-hover:opacity-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/50 to-slate-950/30" />
          
          {/* Bottom Business Name Label */}
          <div className="absolute bottom-5 left-4 right-4 z-10">
            <p className="text-white font-heading font-bold text-sm tracking-wide drop-shadow-md truncate">
              {rightSlide.tag}
            </p>
          </div>
        </div>

        {/* Circular Next Arrow Button */}
        <button
          onClick={next}
          className="absolute right-1 sm:right-3 lg:right-4 z-30 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-slate-950/60 hover:bg-slate-900/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-xl"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

      </div>

      {/* Pagination Indicators matching Reference Screenshot */}
      <div className="relative z-10 flex justify-center items-center gap-2 mt-6">
        {VENTURE_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              idx === current
                ? 'w-7 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes brentraFadeIn {
          from { opacity: 0.5; transform: scale(1.02); }
          to   { opacity: 1;   transform: scale(1); }
        }
      `}</style>
    </section>
  );
};

export default HeroCarousel;
