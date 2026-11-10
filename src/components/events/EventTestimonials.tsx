import React, { useState } from 'react';
import { 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  Quote, 
  CheckCircle2, 
  Sparkles,
  Award
} from 'lucide-react';
import { EventTestimonial } from '../../types/events';

interface EventTestimonialsProps {
  testimonials: EventTestimonial[];
}

export const EventTestimonials: React.FC<EventTestimonialsProps> = ({
  testimonials
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!testimonials || testimonials.length === 0) return null;

  const current = testimonials[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-pink-700 uppercase tracking-widest px-3 py-1 rounded-full bg-pink-50 border border-pink-200">
            Host & Delegate Endorsements
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F]">
            Trusted by Dignitaries, Families & Corporate Leaders
          </h2>
          <p className="text-xs sm:text-sm text-slate-600">
            Read firsthand accounts from hosts of Bihar's most prominent weddings, conclaves, and state galas.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-xl">
          
          <Quote className="w-16 h-16 text-pink-100 absolute top-6 right-8 pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-6 sm:gap-8 text-center md:text-left">
            
            {/* Avatar & verified badge */}
            <div className="shrink-0 relative">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-pink-100 shadow-md">
                <img
                  src={current.avatar}
                  alt={current.clientName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            {/* Testimonial Body */}
            <div className="flex-1 space-y-4">
              
              {/* Star Rating & Category badge */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: current.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-pink-50 text-pink-700 border border-pink-200">
                  {current.eventCategory}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {current.date}
                </span>
              </div>

              {/* Quote text */}
              <blockquote className="text-base sm:text-lg text-slate-700 font-medium italic leading-relaxed">
                "{current.quote}"
              </blockquote>

              {/* Attribution */}
              <div className="pt-2 border-t border-slate-100">
                <div className="font-heading font-bold text-base text-[#0A192F]">
                  {current.clientName}
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {current.role} • <strong className="text-slate-700">{current.companyOrFamily}</strong>
                </div>
                <div className="text-[11px] text-pink-700 font-semibold mt-0.5">
                  Event: {current.eventTitle}
                </div>
              </div>

            </div>

          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 mt-8 border-t border-slate-100">
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentIndex === idx ? 'w-6 bg-[#0A192F]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#0A192F] hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-[#0A192F] hover:text-white text-slate-700 flex items-center justify-center transition-colors cursor-pointer border border-slate-200"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

