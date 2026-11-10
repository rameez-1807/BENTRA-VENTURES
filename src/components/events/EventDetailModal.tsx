import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  CheckCircle2, 
  Sparkles, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  Building2, 
  ChevronLeft, 
  ChevronRight,
  Share2
} from 'lucide-react';
import { EventItem } from '../../types/events';

interface EventDetailModalProps {
  event: EventItem | null;
  isOpen: boolean;
  onClose: () => void;
  onBookEvent: (event: EventItem) => void;
  onOpenWhatsApp: (event: EventItem) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  isOpen,
  onClose,
  onBookEvent,
  onOpenWhatsApp
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Synchronize active image index when event changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [event]);

  // Keyboard navigation: Escape key closes modal, Left/Right arrow cycles gallery
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || !event) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && event.gallery.length > 1) {
        setActiveImageIndex((prev) => (prev + 1) % event.gallery.length);
      }
      if (e.key === 'ArrowLeft' && event.gallery.length > 1) {
        setActiveImageIndex((prev) => (prev - 1 + event.gallery.length) % event.gallery.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, event, onClose]);

  if (!isOpen || !event) return null;

  const allImages = event.gallery && event.gallery.length > 0 ? event.gallery : [event.featuredImage];
  const activeImage = allImages[activeImageIndex] || event.featuredImage;

  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-event-title"
    >
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Sticky Header Bar */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-[#061426] via-[#0A192F] to-[#0A192F] text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-pink-600 text-white text-[10px] font-extrabold uppercase tracking-wider">
              {event.category}
            </span>
            <span className="text-xs text-slate-300 hidden sm:inline">•</span>
            <span className="text-xs text-slate-300 font-mono hidden sm:inline">{event.status}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenWhatsApp(event)}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Inquire</span>
            </button>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="overflow-y-auto p-5 sm:p-8 space-y-8">
          
          {/* 1. Media Gallery Showcase */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-slate-950 shadow-inner group">
              <img
                src={activeImage}
                alt={event.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Gallery Controls if multiple images */}
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                    title="Previous image"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev + 1) % allImages.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
                    title="Next image"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}

              {/* Caption pill */}
              <div className="absolute bottom-3 left-3 text-xs text-white font-mono bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-md">
                Slide {activeImageIndex + 1} of {allImages.length}
              </div>
            </div>

            {/* Thumbnail selector row */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                      activeImageIndex === idx ? 'border-pink-600 scale-105 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 2. Key Metadata Badges & Title */}
          <div className="space-y-3">
            <h2 id="modal-event-title" className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F] leading-tight">
              {event.title}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Date</span>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                  <span className="truncate">{formattedDate}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Scheduled Time</span>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="truncate">{event.time}</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Venue Capacity</span>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Users className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span>{event.capacity.toLocaleString('en-IN')} Attendees</span>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Package Tier</span>
                <div className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="truncate">{event.priceTier}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Comprehensive Description & Highlights */}
          <div className="space-y-4">
            <h3 className="font-heading font-bold text-base text-[#0A192F] uppercase tracking-wider text-xs">
              Event Overview & Production Scope
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {event.description}
            </p>

            <div className="p-5 rounded-2xl bg-pink-50/50 border border-pink-100 space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-900 block">
                Production Highlights & Engineering:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {event.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-pink-600 shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Full Itinerary Timeline */}
          {event.itinerary && event.itinerary.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="font-heading font-bold text-base text-[#0A192F] uppercase tracking-wider text-xs">
                Official Event Itinerary & Schedule
              </h3>
              <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                {event.itinerary.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 relative pl-8">
                    <div className="absolute left-2.5 top-1.5 w-3 h-3 rounded-full bg-pink-600 ring-4 ring-pink-100" />
                    <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 w-full">
                      <div className="text-xs font-mono font-bold text-pink-700">{item.time}</div>
                      <div className="text-xs font-semibold text-slate-800 mt-0.5">{item.activity}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Venue Information Card */}
          <div className="p-5 rounded-2xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-xs uppercase tracking-wider text-amber-400">Venue Specifications</span>
              </div>
              <span className="text-[11px] text-slate-400">{event.venueDetails.city}</span>
            </div>
            
            <div>
              <div className="font-bold text-base text-white">{event.venueDetails.name}</div>
              <div className="text-xs text-slate-300 mt-0.5">{event.venueDetails.address}</div>
              {event.venueDetails.landmark && (
                <div className="text-[11px] text-slate-400 mt-1 italic">Landmark: {event.venueDetails.landmark}</div>
              )}
            </div>

            <div className="text-[11px] text-slate-400 pt-2 border-t border-white/10 flex items-center justify-between">
              <span>Managed by: <strong>{event.organizer}</strong></span>
              <span>Official FSSAI & District Security Cleared</span>
            </div>
          </div>

        </div>

        {/* Sticky Footer CTA Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">Pricing Guidance</span>
            <span className="text-base font-black text-[#0A192F] font-mono">{event.priceTier}</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onClose();
                onBookEvent(event);
              }}
              className="flex-1 sm:flex-initial px-6 py-3 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Reserve / Inquire for This Event</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => onOpenWhatsApp(event)}
              className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              title="Instant WhatsApp Desk"
            >
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

