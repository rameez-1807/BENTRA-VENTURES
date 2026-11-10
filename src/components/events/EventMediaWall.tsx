import React, { useState } from 'react';
import { 
  Camera, 
  MapPin, 
  Users, 
  Calendar, 
  X, 
  Maximize2,
  Sparkles,
  PartyPopper
} from 'lucide-react';
import { PastEventMedia, EventCategory } from '../../types/events';

interface EventMediaWallProps {
  mediaItems: PastEventMedia[];
  onOpenBooking: () => void;
}

const CATEGORY_TABS: EventCategory[] = [
  'All',
  'Luxury Hospitality',
  'Conferences',
  'Corporate Galas',
  'Private Events',
  'Exhibitions'
];

export const EventMediaWall: React.FC<EventMediaWallProps> = ({
  mediaItems,
  onOpenBooking
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');
  const [activeLightbox, setActiveLightbox] = useState<PastEventMedia | null>(null);

  const filteredMedia = selectedCategory === 'All'
    ? mediaItems
    : mediaItems.filter(m => m.category === selectedCategory);

  return (
    <section id="media-wall" className="py-20 bg-slate-900 text-white border-b border-slate-800 relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/20 inline-block mb-2">
              Visual Archive & Social Proof
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white">
              Past Productions & Live Stage Media Wall
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
              Authentic on-site captures of hydraulic stages, curved LED conclaves, crystal mandaps, and Michelin-inspired banquets across Bihar.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar shrink-0">
            {CATEGORY_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedCategory(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === tab
                    ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/30'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Media Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightbox(item)}
              className="group relative rounded-3xl overflow-hidden bg-slate-950 border border-white/10 shadow-lg hover:border-pink-500/40 transition-all duration-300 cursor-pointer flex flex-col justify-between"
            >
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Maximize Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Bottom Overlay Info */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-slate-300">
                  <span className="flex items-center gap-1 font-mono text-[11px]">
                    <Calendar className="w-3 h-3 text-amber-400" /> {item.date}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-[11px] bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                    <Users className="w-3 h-3 text-pink-400" /> {item.attendees}
                  </span>
                </div>
              </div>

              {/* Caption Card */}
              <div className="p-5 space-y-2">
                <h3 className="font-heading font-bold text-base text-white group-hover:text-pink-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-slate-400">
                  <MapPin className="w-3 h-3 text-pink-500 shrink-0" />
                  <span className="truncate">{item.location}</span>
                </div>
                <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed pt-1">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeLightbox && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
            onClick={() => setActiveLightbox(null)}
          >
            <div 
              className="relative w-full max-w-3xl bg-slate-950 rounded-3xl overflow-hidden border border-white/20 shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 bg-black/60 flex items-center justify-between border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-pink-400" />
                  <span className="font-bold text-sm text-white">{activeLightbox.title}</span>
                </div>
                <button
                  onClick={() => setActiveLightbox(null)}
                  className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="relative max-h-[70vh] bg-black flex items-center justify-center p-2">
                <img
                  src={activeLightbox.imageUrl}
                  alt={activeLightbox.title}
                  className="max-w-full max-h-[65vh] object-contain rounded-xl"
                />
              </div>

              <div className="p-5 bg-slate-900 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
                <div>
                  <div className="text-white font-bold">{activeLightbox.location} • {activeLightbox.date}</div>
                  <p className="text-slate-400 mt-0.5">{activeLightbox.caption}</p>
                </div>

                <button
                  onClick={() => {
                    setActiveLightbox(null);
                    onOpenBooking();
                  }}
                  className="shrink-0 px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  Inquire Similar Setup
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

