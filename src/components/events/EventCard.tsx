import React from 'react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { EventItem } from '../../types/events';

interface EventCardProps {
  event: EventItem;
  onViewDetails: (event: EventItem) => void;
  onQuickInquire: (event: EventItem) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  onViewDetails,
  onQuickInquire
}) => {
  const formattedDate = new Date(event.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const getStatusBadge = () => {
    switch (event.status) {
      case 'Upcoming':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow">
            Upcoming
          </span>
        );
      case 'Ongoing':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-white text-[10px] font-extrabold uppercase tracking-wider shadow animate-pulse">
            Live Now
          </span>
        );
      case 'Past':
        return (
          <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-extrabold uppercase tracking-wider shadow">
            Portfolio Archive
          </span>
        );
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl">
      
      <div>
        {/* Top Media Container */}
        <div className="relative h-56 w-full overflow-hidden bg-slate-900 cursor-pointer" onClick={() => onViewDetails(event)}>
          <img
            src={event.featuredImage}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

          {/* Top Left: Category & Featured */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
            <span className="px-2.5 py-1 rounded-full bg-white/95 text-slate-900 text-[10px] font-extrabold uppercase tracking-wider shadow backdrop-blur-sm">
              {event.category}
            </span>
            {event.isFeatured && (
              <span className="px-2.5 py-1 rounded-full bg-pink-600 text-white text-[10px] font-extrabold uppercase tracking-wider shadow flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> Featured
              </span>
            )}
          </div>

          {/* Top Right: Status */}
          <div className="absolute top-3 right-3">
            {getStatusBadge()}
          </div>

          {/* Bottom Banner inside Image: Date & Capacity */}
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
            <span className="flex items-center gap-1 font-mono font-bold bg-black/60 px-2.5 py-1 rounded-xl backdrop-blur-md">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-1 font-mono font-bold bg-black/60 px-2.5 py-1 rounded-xl backdrop-blur-md">
              <Users className="w-3.5 h-3.5 text-pink-400" />
              {event.capacity.toLocaleString('en-IN')} Capacity
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-6 space-y-3.5">
          
          {/* Location Landmark */}
          <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
            <MapPin className="w-3.5 h-3.5 text-pink-600 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>

          {/* Title */}
          <h3 
            onClick={() => onViewDetails(event)}
            className="font-heading font-bold text-lg text-[#0A192F] group-hover:text-pink-600 transition-colors leading-snug cursor-pointer line-clamp-2"
          >
            {event.title}
          </h3>

          {/* Description snippet */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Highlights checklist (first 2) */}
          <div className="space-y-1.5 pt-1">
            {event.highlights.slice(0, 2).map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-pink-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
          </div>

          {/* Price Tier Badge */}
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Production Tier</span>
            <span className="text-xs font-bold text-[#0A192F] font-mono">{event.priceTier}</span>
          </div>

        </div>
      </div>

      {/* Action Buttons Footer */}
      <div className="p-6 pt-0 flex items-center gap-2 border-t border-slate-100 mt-2">
        <button
          onClick={() => onViewDetails(event)}
          className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-[#0A192F] text-slate-800 hover:text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={() => onQuickInquire(event)}
          className="px-4 py-2.5 rounded-xl bg-pink-50 hover:bg-pink-600 text-pink-700 hover:text-white border border-pink-200 hover:border-pink-600 font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
          title="Inquire for this event"
        >
          Inquire
        </button>
      </div>

    </div>
  );
};

