import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroCarouselProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export interface SlideData {
  id: number;
  tag: string;
  tagColor: string;
  headline: string;
  subtitle: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  verticalId: string;
  image: string;
}

export const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    tag: 'BRENTRA IT SOLUTIONS',
    tagColor: '#00D4E7',
    headline: 'Next-Generation Software Engineering & Enterprise Digital Scale',
    subtitle: 'Transforming businesses through intelligent technology and digital innovation.',
    primaryCtaText: 'Explore IT Solutions',
    primaryCtaLink: '/it-digital',
    secondaryCtaText: 'Book a Free Tech Discovery Call',
    verticalId: 'it-digital',
    image: '/img-it.jpg',
  },
  {
    id: 2,
    tag: 'WORKFORCE & INFRASTRUCTURE',
    tagColor: '#38BDF8',
    headline: 'Reliable Workforce. Smarter Infrastructure. Stronger Businesses.',
    subtitle: 'Integrated manpower, facility management and operational solutions.',
    primaryCtaText: 'Explore Manpower & Facility',
    primaryCtaLink: '/manpower-staffing',
    secondaryCtaText: 'Request Corporate Proposal',
    verticalId: 'manpower-staffing',
    image: '/img-manpower.jpg',
  },
  {
    id: 3,
    tag: 'ENTERPRISE BUSINESS SOLUTIONS',
    tagColor: '#F59E0B',
    headline: 'Building Business Opportunities Through Diverse Services',
    subtitle: 'Connecting people, technology and services to create long-term value.',
    primaryCtaText: 'Explore Turnkey Realty & Supply',
    primaryCtaLink: '/realty-infrastructure',
    secondaryCtaText: 'Consult Our Central Desk',
    verticalId: 'realty-infrastructure',
    image: '/img-realty.jpg',
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onOpenQuoteModal }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const DURATION = 5000;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % HERO_SLIDES.length);
    }, DURATION);
    return () => clearInterval(timer);
  }, [isPaused, current]);

  const prev = () => setCurrent((c) => (c - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const next = () => setCurrent((c) => (c + 1) % HERO_SLIDES.length);

  const activeSlide = HERO_SLIDES[current];

  return (
    <section 
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6"
      aria-label="Enterprise Showcase Carousel"
    >
      <div
        className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/50 bg-[#0B1523] min-h-[340px] sm:min-h-[380px] md:min-h-[420px] flex items-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={(e) => { touchStartX.current = e.targetTouches[0].clientX; }}
        onTouchEnd={(e) => {
          if (!touchStartX.current) return;
          const diff = touchStartX.current - e.changedTouches[0].clientX;
          if (diff > 40) next();
          else if (diff < -40) prev();
          touchStartX.current = null;
        }}
      >
        {/* Background Images with Crossfade */}
        {HERO_SLIDES.map((slide, idx) => (
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.headline}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${
              idx === current ? 'opacity-100 scale-100' : 'opacity-0 pointer-events-none'
            }`}
            style={{
              transition: 'opacity 0.7s ease-in-out, transform 4s ease-out',
              transform: idx === current ? 'scale(1.02)' : 'scale(1)',
            }}
          />
        ))}

        {/* Gradient Overlay for Optimal Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/75 to-slate-900/35" />

        {/* Hero Slide Content (Left Aligned matching Reference Screenshot) */}
        <div className="relative z-10 w-full p-6 sm:p-10 md:p-14 lg:p-16 flex flex-col justify-center">
          
          {/* Pill Badge with Dot */}
          <div className="mb-3 sm:mb-4">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] sm:text-xs font-extrabold uppercase tracking-wider border shadow-xs"
              style={{
                color: activeSlide.tagColor,
                borderColor: `${activeSlide.tagColor}40`,
                backgroundColor: `${activeSlide.tagColor}18`,
              }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full animate-pulse" 
                style={{ backgroundColor: activeSlide.tagColor }} 
              />
              {activeSlide.tag}
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[42px] text-white leading-tight sm:leading-snug max-w-2xl mb-3 sm:mb-4 tracking-tight drop-shadow-sm">
            {activeSlide.headline}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed mb-6 sm:mb-8 font-normal">
            {activeSlide.subtitle}
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <Link
              to={activeSlide.primaryCtaLink}
              className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-[#00A3C4] hover:bg-[#008CA8] active:scale-95 text-white font-bold text-xs sm:text-sm shadow-md transition-all group"
            >
              <span>{activeSlide.primaryCtaText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => onOpenQuoteModal(activeSlide.verticalId)}
              className="inline-flex items-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-semibold text-xs sm:text-sm border border-white/25 backdrop-blur-sm transition-all cursor-pointer"
            >
              {activeSlide.secondaryCtaText}
            </button>
          </div>

        </div>

        {/* Circular Prev Arrow Button */}
        <button
          onClick={prev}
          className="absolute left-3 sm:left-5 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/45 hover:bg-slate-900/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Circular Next Arrow Button */}
        <button
          onClick={next}
          className="absolute right-3 sm:right-5 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-slate-950/45 hover:bg-slate-900/80 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Bottom Center Pagination Indicators */}
        <div className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
          {HERO_SLIDES.map((_, idx) => (
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

      </div>
    </section>
  );
};

export default HeroCarousel;
