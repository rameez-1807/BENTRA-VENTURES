import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface HeroCarouselProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

const slides = [
  {
    id: 1,
    verticalId: 'it-solutions',
    tag: 'Brentra IT Solutions',
    tagColor: '#00C6D4',
    headline: 'Next-Generation Software Engineering & Enterprise Digital Scale',
    subtext: 'Custom Web Apps, Scalable Mobile Solutions, AI Workflows & Cloud Infrastructure built for ambitious enterprises',
    primaryCtaText: 'Explore IT Solutions',
    primaryCtaLink: '/it-solutions',
    secondaryCtaText: 'Book a Free Tech Discovery Call',
    image: '/img-it.jpg',
  },
  {
    id: 2,
    verticalId: 'fresh-fmcg',
    tag: 'Brentra Fresh Supply',
    tagColor: '#22C55E',
    headline: 'Farm-Fresh Wholesale FMCG Delivered Daily Across Bihar',
    subtext: 'Eggs, Poultry, River Fish, Gourmet Ice Cream & Makhana — cold-chain logistics from farm to your doorstep',
    primaryCtaText: 'View Pricing & Products',
    primaryCtaLink: '/fresh-fmcg',
    secondaryCtaText: 'Place Bulk WhatsApp Order',
    image: '/img-fmcg.jpg',
  },
  {
    id: 3,
    verticalId: 'realty-infrastructure',
    tag: 'Brentra Realty',
    tagColor: '#F59E0B',
    headline: 'Complete Turnkey Construction Starting at ₹1,900 / sq. ft.',
    subtext: 'RCC frame, 550D TMT steel, Kajaria tiles, modular kitchen, false ceiling — zero hidden costs, 10-year warranty',
    primaryCtaText: 'Get Construction Estimate',
    primaryCtaLink: '/realty-infrastructure',
    secondaryCtaText: 'Book Free Site Inspection',
    image: '/img-realty.jpg',
  },
  {
    id: 4,
    verticalId: 'facility-services',
    tag: 'Brentra Facility',
    tagColor: '#60A5FA',
    headline: 'On-Demand AC, RO & Facility Maintenance in Under 60 Minutes',
    subtext: 'Background-verified technicians, rapid urban dispatch, corporate AMC plans for Patna & Bihar',
    primaryCtaText: 'Book a Technician',
    primaryCtaLink: '/facility-services',
    secondaryCtaText: 'View AMC Plans',
    image: '/img-facility.jpg',
  },
  {
    id: 5,
    verticalId: 'events-hospitality',
    tag: 'Brentra Events',
    tagColor: '#F472B6',
    headline: 'Signature Luxury Weddings & Corporate Summits in Bihar',
    subtext: 'Turnkey event execution — stage, decor, catering, artist booking for 100 to 5,000+ guests',
    primaryCtaText: 'Plan Your Event',
    primaryCtaLink: '/events-hospitality',
    secondaryCtaText: 'Book Event Consultation',
    image: '/img-events.jpg',
  },
  {
    id: 6,
    verticalId: 'building-materials',
    tag: 'Brentra Materials',
    tagColor: '#FB923C',
    headline: 'Bulk Building Materials at Wholesale Truckload Rates',
    subtext: '550D TMT rebars, 53-grade cement, red clay bricks, river sand — direct depot pricing across Bihar',
    primaryCtaText: 'Request Bulk Quote',
    primaryCtaLink: '/realty-infrastructure#materials',
    secondaryCtaText: 'Call Materials Desk',
    image: '/img-materials.jpg',
  },
  {
    id: 7,
    verticalId: 'ventures',
    tag: 'Brentra Healthcare',
    tagColor: '#A78BFA',
    headline: 'Pharmaceutical Wholesale Distribution & Cold-Chain Logistics',
    subtext: 'Pan-Bihar medicine supply alliances, 2–8°C biological logistics, 3PL warehousing & industrial trade',
    primaryCtaText: 'Explore Healthcare Division',
    primaryCtaLink: '/ventures',
    secondaryCtaText: 'Become a Trade Partner',
    image: '/img-healthcare.jpg',
  },
];

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ onOpenQuoteModal }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const DURATION = 6000;

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, DURATION);
    return () => clearInterval(timer);
  }, [isPaused, current]);

  const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);
  const next = () => setCurrent((c) => (c + 1) % slides.length);

  const getIdx = (offset: number) => (current + offset + slides.length) % slides.length;

  return (
    <section
      className="bg-[#07111F] py-8 sm:py-10 border-b border-[#1E3E62]/60 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(e) => { touchStartX.current = e.targetTouches[0].clientX; }}
      onTouchEnd={(e) => {
        if (!touchStartX.current) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 50) next();
        else if (diff < -50) prev();
        touchStartX.current = null;
      }}
    >
      {/* Section Title */}
      <div className="text-center mb-6 px-4">
        <h2 className="text-white font-heading font-extrabold text-2xl sm:text-3xl tracking-wider uppercase">
          Our Diverse Ventures
        </h2>
      </div>

      {/* 3-Card Carousel */}
      <div className="relative flex items-center justify-center gap-3 sm:gap-4 px-2 sm:px-6 max-w-[1400px] mx-auto">

        {/* Prev Arrow */}
        <button
          onClick={prev}
          className="absolute left-1 sm:left-2 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all backdrop-blur-sm shrink-0 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {/* Left Peek Card */}
        <div
          className="hidden sm:block relative rounded-2xl overflow-hidden cursor-pointer shrink-0 opacity-50 hover:opacity-65 transition-opacity"
          style={{ width: '220px', height: '340px' }}
          onClick={prev}
        >
          <img
            src={slides[getIdx(-1)].image}
            alt={slides[getIdx(-1)].tag}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#07111F]/60" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-bold text-sm font-heading truncate">{slides[getIdx(-1)].tag}</p>
          </div>
        </div>

        {/* Center Active Card */}
        <div
          className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex-1 max-w-[860px]"
          style={{ minHeight: '380px' }}
        >
          {/* Background Photo */}
          <img
            key={current}
            src={slides[current].image}
            alt={slides[current].tag}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ animation: 'fadeInSoft 0.6s ease-in-out' }}
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#07111F]/90 via-[#07111F]/65 to-[#07111F]/30" />

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-10 flex flex-col justify-center min-h-[380px]">
            {/* Tag */}
            <span
              className="inline-flex items-center gap-1.5 self-start px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border"
              style={{
                color: slides[current].tagColor,
                borderColor: `${slides[current].tagColor}40`,
                backgroundColor: `${slides[current].tagColor}15`,
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: slides[current].tagColor }} />
              {slides[current].tag}
            </span>

            {/* Headline */}
            <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white leading-tight max-w-xl mb-3">
              {slides[current].headline}
            </h1>

            {/* Subtext */}
            <p className="text-slate-300 text-sm sm:text-base max-w-lg leading-relaxed mb-6">
              {slides[current].subtext}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                to={slides[current].primaryCtaLink}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border-2 text-sm font-bold transition-all hover:scale-105 active:scale-95"
                style={{
                  borderColor: slides[current].tagColor,
                  color: slides[current].tagColor,
                  backgroundColor: `${slides[current].tagColor}15`,
                }}
              >
                {slides[current].primaryCtaText}
                <ArrowRight className="w-4 h-4" />
              </Link>

              <button
                onClick={() => onOpenQuoteModal(slides[current].verticalId)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-white/30 text-sm font-bold text-white hover:bg-white/10 transition-all active:scale-95 cursor-pointer"
              >
                {slides[current].secondaryCtaText}
              </button>
            </div>
          </div>
        </div>

        {/* Right Peek Card */}
        <div
          className="hidden sm:block relative rounded-2xl overflow-hidden cursor-pointer shrink-0 opacity-50 hover:opacity-65 transition-opacity"
          style={{ width: '220px', height: '340px' }}
          onClick={next}
        >
          <img
            src={slides[getIdx(1)].image}
            alt={slides[getIdx(1)].tag}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#07111F]/60" />
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-bold text-sm font-heading truncate">{slides[getIdx(1)].tag}</p>
          </div>
        </div>

        {/* Next Arrow */}
        <button
          onClick={next}
          className="absolute right-1 sm:right-2 z-20 p-2 sm:p-3 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all backdrop-blur-sm shrink-0 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`rounded-full transition-all duration-300 cursor-pointer ${
              idx === current
                ? 'w-6 h-2.5 bg-white'
                : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <style>{`
        @keyframes fadeInSoft {
          from { opacity: 0.4; transform: scale(1.03); }
          to   { opacity: 1;   transform: scale(1); }
        }
      `}</style>
    </section>
  );
};
