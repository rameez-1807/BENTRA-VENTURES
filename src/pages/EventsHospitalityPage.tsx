import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, useNavigate, useParams } from 'react-router-dom';
import { 
  PartyPopper, 
  Sparkles, 
  Calendar, 
  MessageSquare, 
  Phone, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  FilterX
} from 'lucide-react';

// Types
import { 
  EventItem, 
  HospitalityPackage, 
  EventFilterState, 
  EventCategory,
  EventTestimonial,
  PastEventMedia
} from '../types/events';

// Service & Data
import { eventsService } from '../services/eventsService';
import { 
  INITIAL_EVENTS, 
  HOSPITALITY_PACKAGES, 
  EVENT_TESTIMONIALS, 
  PAST_EVENT_MEDIA 
} from '../data/eventsData';

// Modular UI Components
import { EventHeroBanner } from '../components/events/EventHeroBanner';
import { EventFilterBar } from '../components/events/EventFilterBar';
import { EventCard } from '../components/events/EventCard';
import { EventDetailModal } from '../components/events/EventDetailModal';
import { HospitalityConfigurator } from '../components/events/HospitalityConfigurator';
import { DynamicBookingForm } from '../components/events/DynamicBookingForm';
import { EventMediaWall } from '../components/events/EventMediaWall';
import { EventTestimonials } from '../components/events/EventTestimonials';
import { EventGridSkeleton } from '../components/events/EventSkeleton';

interface EventsHospitalityPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  text: string;
}

export const EventsHospitalityPage: React.FC<EventsHospitalityPageProps> = ({ onOpenQuoteModal }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { slug } = useParams<{ slug?: string }>();
  const navigate = useNavigate();

  // Core Data States with instant initial fallback
  const [events, setEvents] = useState<EventItem[]>(INITIAL_EVENTS);
  const [packages, setPackages] = useState<HospitalityPackage[]>(HOSPITALITY_PACKAGES);
  const [testimonials, setTestimonials] = useState<EventTestimonial[]>(EVENT_TESTIMONIALS);
  const [pastMedia, setPastMedia] = useState<PastEventMedia[]>(PAST_EVENT_MEDIA);
  const [isLoading, setIsLoading] = useState(false);

  // Filter & Search State
  const [filters, setFilters] = useState<EventFilterState>({
    category: 'All',
    status: 'All',
    searchQuery: '',
    sortBy: 'date-asc'
  });

  // Modal States
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPosterModalOpen, setIsPosterModalOpen] = useState(false);

  // Booking Engine Prefill State
  const [prefilledBooking, setPrefilledBooking] = useState<{
    eventTitle?: string;
    packageId?: string;
    guestCount?: number;
    estimatedBudget?: number;
  }>({});

  // Toast Notification System
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, text, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  // Initial Data Fetching
  useEffect(() => {
    let isMounted = true;

    async function loadData() {
      setIsLoading(true);
      try {
        const [eventsRes, packagesRes] = await Promise.all([
          eventsService.getEvents(),
          eventsService.getHospitalityPackages()
        ]);

        if (isMounted) {
          setEvents(eventsRes.events);
          setPackages(packagesRes);
          setTestimonials(eventsService.getTestimonials());
          setPastMedia(eventsService.getPastMedia());
        }
      } catch (err) {
        console.error('Error fetching events data:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, []);

  // Dynamic SEO Page Title
  useEffect(() => {
    if (selectedEvent) {
      document.title = `${selectedEvent.title} | Brentra Luxury Events & Hospitality`;
    } else {
      document.title = 'Events & Luxury Hospitality | Brentra Ventures Patna, Bihar';
    }
  }, [selectedEvent]);

  // Sync route param or searchParam ?event=slug with modal
  useEffect(() => {
    const targetSlug = slug || searchParams.get('event');
    if (targetSlug && events.length > 0) {
      const match = events.find(e => e.slug === targetSlug || e.id === targetSlug);
      if (match) {
        setSelectedEvent(match);
        setIsDetailModalOpen(true);
      }
    }
  }, [slug, searchParams, events]);

  // Handle URL updates when modal opens/closes
  const handleOpenDetailModal = (event: EventItem) => {
    setSelectedEvent(event);
    setIsDetailModalOpen(true);
    setSearchParams({ event: event.slug }, { replace: true });
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedEvent(null);
    setSearchParams({}, { replace: true });
  };

  // Filter events dynamically
  const filteredEvents = useMemo(() => {
    let result = [...events];

    if (filters.category !== 'All') {
      result = result.filter(e => e.category === filters.category);
    }

    if (filters.status !== 'All') {
      result = result.filter(e => e.status === filters.status);
    }

    if (filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      result = result.filter(e => 
        e.title.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.highlights.some(h => h.toLowerCase().includes(q))
      );
    }

    switch (filters.sortBy) {
      case 'date-asc':
        result.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
        break;
      case 'date-desc':
        result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'capacity-desc':
        result.sort((a, b) => b.capacity - a.capacity);
        break;
      case 'featured':
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [events, filters]);

  // Featured Event for Hero Spotlight
  const featuredEvent = useMemo(() => {
    return events.find(e => e.isFeatured && e.status === 'Upcoming') || events[0];
  }, [events]);

  // Event Handlers for Booking flow
  const handleBookFromEvent = (event: EventItem) => {
    setPrefilledBooking({
      eventTitle: event.title,
      guestCount: event.capacity
    });
    addToast(`Selected "${event.title}". Complete your reservation details below.`, 'info');
    const el = document.getElementById('booking-engine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleBookFromPackage = (pkg: HospitalityPackage, guestCount: number, budget: number) => {
    setPrefilledBooking({
      eventTitle: `${pkg.name} (${pkg.tier} Tier)`,
      packageId: pkg.id,
      guestCount,
      estimatedBudget: budget
    });
    addToast(`Locked in ${pkg.name} for ${guestCount} guests. Customize your booking below.`, 'info');
    const el = document.getElementById('booking-engine');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsAppBooking = (eventOrPackage: EventItem | HospitalityPackage, guestCount?: number, budget?: number) => {
    const isPackage = 'tier' in eventOrPackage;
    const title = isPackage ? (eventOrPackage as HospitalityPackage).name : (eventOrPackage as EventItem).title;
    const url = eventsService.generateWhatsAppUrl({
      eventType: title,
      estimatedGuests: guestCount || (isPackage ? 500 : (eventOrPackage as EventItem).capacity),
      budgetRange: budget ? `₹${budget.toLocaleString('en-IN')}` : undefined
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleResetFilters = () => {
    setFilters({
      category: 'All',
      status: 'All',
      searchQuery: '',
      sortBy: 'date-asc'
    });
    addToast('Filters reset to default view.', 'info');
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased selection:bg-[#0A192F] selection:text-white">
      
      {/* Toast Notifications Overlay */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-2xl shadow-2xl border text-xs font-semibold flex items-start gap-3 backdrop-blur-md transition-all animate-slide-up ${
              toast.type === 'success'
                ? 'bg-slate-900/95 text-white border-emerald-500/50 shadow-emerald-950/20'
                : toast.type === 'error'
                ? 'bg-slate-900/95 text-white border-rose-500/50 shadow-rose-950/20'
                : 'bg-slate-900/95 text-white border-pink-500/50 shadow-pink-950/20'
            }`}
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <Sparkles className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
            )}
            <div className="flex-1 leading-snug">{toast.text}</div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>

      {/* 1. DYNAMIC HERO WITH FEATURED SPOTLIGHT & LIVE COUNTDOWN */}
      <EventHeroBanner
        featuredEvent={featuredEvent}
        onSelectEvent={handleOpenDetailModal}
        onOpenBooking={(title) => {
          if (title) setPrefilledBooking({ eventTitle: title });
          const el = document.getElementById('booking-engine');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenPosterModal={() => setIsPosterModalOpen(true)}
      />

      {/* 2. DYNAMIC EVENT SHOWCASE WITH REAL-TIME FILTERING & SEARCH */}
      <section id="event-showcase" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-pink-700 uppercase tracking-widest px-3 py-1 rounded-full bg-pink-50 border border-pink-200 inline-block mb-2">
                Turnkey Event Portfolio
              </span>
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
                Signature Events & Upcoming Conclaves
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                Explore upcoming luxury celebrations, corporate summits, and historical archives executed by Brentra across Bihar.
              </p>
            </div>
          </div>

          {/* Filter Bar */}
          <EventFilterBar
            filterState={filters}
            onFilterChange={(newF) => setFilters((prev) => ({ ...prev, ...newF }))}
            onResetFilters={handleResetFilters}
            totalResults={filteredEvents.length}
          />

          {/* Event Cards Grid / Loading State / Empty State */}
          {isLoading ? (
            <EventGridSkeleton count={6} />
          ) : filteredEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((evt) => (
                <EventCard
                  key={evt.id}
                  event={evt}
                  onViewDetails={handleOpenDetailModal}
                  onQuickInquire={handleBookFromEvent}
                />
              ))}
            </div>
          ) : (
            <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 shadow-sm max-w-xl mx-auto space-y-4">
              <div className="w-16 h-16 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FilterX className="w-8 h-8" />
              </div>
              <h3 className="font-heading font-bold text-xl text-[#0A192F]">No Matching Events Found</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We couldn't find any events matching your selected category, status, or search query. Try loosening your filters or resetting the search.
              </p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* 3. INTERACTIVE HOSPITALITY TIER & GUEST CONFIGURATOR */}
      <HospitalityConfigurator
        packages={packages}
        onSelectPackageForBooking={handleBookFromPackage}
        onOpenWhatsApp={(pkg, count, budget) => handleWhatsAppBooking(pkg, count, budget)}
      />

      {/* 4. MULTI-STEP DYNAMIC BOOKING & INQUIRY ENGINE */}
      <DynamicBookingForm
        initialEventTitle={prefilledBooking.eventTitle}
        initialPackageId={prefilledBooking.packageId}
        initialGuests={prefilledBooking.guestCount}
        initialBudgetEstimate={prefilledBooking.estimatedBudget}
        onSuccessToast={(msg) => addToast(msg, 'success')}
        onErrorToast={(msg) => addToast(msg, 'error')}
      />

      {/* 5. DYNAMIC SOCIAL PROOF & PAST PRODUCTION MEDIA WALL */}
      <EventMediaWall
        mediaItems={pastMedia}
        onOpenBooking={() => {
          const el = document.getElementById('booking-engine');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 6. DYNAMIC CLIENT & DELEGATE TESTIMONIALS */}
      <EventTestimonials
        testimonials={testimonials}
      />

      {/* 7. EVENT DETAIL MODAL (Supports Swipeable Gallery, Map, Full Itinerary) */}
      <EventDetailModal
        event={selectedEvent}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onBookEvent={handleBookFromEvent}
        onOpenWhatsApp={(evt) => handleWhatsAppBooking(evt)}
      />

      {/* 8. OFFICIAL POSTER ZOOM MODAL */}
      {isPosterModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setIsPosterModalOpen(false)}
        >
          <div 
            className="relative w-full max-w-3xl bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 bg-black/60 flex items-center justify-between text-white border-b border-white/10">
              <div className="flex items-center gap-2">
                <PartyPopper className="w-4 h-4 text-pink-400" />
                <span className="font-bold text-sm">Brentra Events & Wedding Hospitality Official Flyer</span>
              </div>
              <button
                onClick={() => setIsPosterModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative max-h-[75vh] overflow-y-auto p-4 flex items-center justify-center bg-black">
              <img 
                src="/img-events.jpg" 
                alt="Brentra Events Full Poster View" 
                className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
              />
            </div>

            <div className="p-4 bg-[#061426] text-white flex flex-wrap items-center justify-between gap-3 text-xs border-t border-white/10">
              <div>
                <span className="text-slate-400">Patna Central Event Desk:</span>
                <span className="font-bold text-white ml-1.5">9065296294 • +91 91421 44940</span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={eventsService.generateWhatsAppUrl({ eventType: 'Brochure Inquiry' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <MessageSquare className="w-3.5 h-3.5" /> Book on WhatsApp
                </a>
                <button
                  onClick={() => setIsPosterModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
