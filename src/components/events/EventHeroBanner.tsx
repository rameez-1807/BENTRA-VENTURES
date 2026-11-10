import React, { useState, useEffect } from 'react';
import { 
  PartyPopper, 
  Sparkles, 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  Eye, 
  ChevronRight,
  ShieldCheck,
  Award
} from 'lucide-react';
import { EventItem } from '../../types/events';

interface EventHeroBannerProps {
  featuredEvent?: EventItem;
  onSelectEvent: (event: EventItem) => void;
  onOpenBooking: (prefillEventTitle?: string) => void;
  onOpenPosterModal: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

export const EventHeroBanner: React.FC<EventHeroBannerProps> = ({
  featuredEvent,
  onSelectEvent,
  onOpenBooking,
  onOpenPosterModal
}) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false
  });

  // Calculate live countdown timer
  useEffect(() => {
    if (!featuredEvent) return;

    const targetDate = new Date(`${featuredEvent.date}T09:00:00+05:30`).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [featuredEvent]);

  const formattedDate = featuredEvent 
    ? new Date(featuredEvent.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    : 'Upcoming 2026';

  return (
    <section className="relative py-14 lg:py-20 bg-gradient-to-b from-slate-900 via-[#0A192F] to-[#061426] text-white overflow-hidden border-b border-slate-800">
      
      {/* Decorative ambient lights */}
      <div className="absolute top-0 right-10 w-[500px] h-[500px] bg-pink-600/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[300px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Division pill badges */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-400/30 text-pink-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <PartyPopper className="w-4 h-4 text-pink-400" /> Division 05 • Brentra Luxury Events & Hospitality
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Turnkey Production Across Eastern India
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Headlines & Live Countdown Spotlight */}
          <div className="lg:col-span-7 space-y-6">
            
            <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
              Grand Weddings, Enterprise Summits & <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-400 to-amber-400">Royal Hospitality</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              Turnkey architectural event production for discerning hosts across Bihar. From 360° hydraulic floral varmala stages to 4K curved LED corporate conclaves and FSSAI-certified 5-star royal banquet catering for up to 5,000+ delegates.
            </p>

            {/* Dynamic "Next Major Event" Spotlight Card with Live Countdown */}
            {featuredEvent && (
              <div className="p-5 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl space-y-4">
                
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-amber-400">
                      Next Featured Event Spotlight
                    </span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-pink-500/30 border border-pink-400/40 text-pink-200 text-[10px] font-bold uppercase tracking-wide">
                    {featuredEvent.category}
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="font-heading font-bold text-lg sm:text-xl text-white hover:text-pink-300 transition-colors cursor-pointer"
                      onClick={() => onSelectEvent(featuredEvent)}>
                      {featuredEvent.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-amber-400" /> {formattedDate}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-pink-400" /> {featuredEvent.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-blue-400" /> {featuredEvent.capacity.toLocaleString('en-IN')} Cap.
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onSelectEvent(featuredEvent)}
                    className="shrink-0 px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>View Itinerary</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Live Countdown Display */}
                {!timeLeft.isPast ? (
                  <div className="pt-2">
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> Event Starts In:
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                        <div className="text-xl sm:text-2xl font-black font-mono text-amber-400">{timeLeft.days}</div>
                        <div className="text-[10px] uppercase text-slate-400 font-medium">Days</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                        <div className="text-xl sm:text-2xl font-black font-mono text-white">{timeLeft.hours}</div>
                        <div className="text-[10px] uppercase text-slate-400 font-medium">Hours</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                        <div className="text-xl sm:text-2xl font-black font-mono text-white">{timeLeft.minutes}</div>
                        <div className="text-[10px] uppercase text-slate-400 font-medium">Mins</div>
                      </div>
                      <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                        <div className="text-xl sm:text-2xl font-black font-mono text-pink-400">{timeLeft.seconds}</div>
                        <div className="text-[10px] uppercase text-slate-400 font-medium">Secs</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-1 text-xs text-emerald-400 font-bold">
                    ✓ Event in progress or successfully held. View full production gallery below.
                  </div>
                )}

              </div>
            )}

            {/* Quick Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#booking-engine"
                onClick={() => onOpenBooking()}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-600/30 transition-all flex items-center gap-2 cursor-pointer transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4 text-white" />
                <span>Book Hospitality Suite / Inquire</span>
              </a>

              <a
                href="#event-showcase"
                className="px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider border border-white/20 transition-colors flex items-center gap-2"
              >
                <span>Explore All Events</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="https://wa.me/919065296294?text=Hello%20Brentra%20Events%20Desk,%20I%20would%20like%20to%20inquire%20about%20event%20booking%20and%20hospitality."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center gap-1.5"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Desk</span>
              </a>

              <a
                href="tel:9065296294"
                className="px-4 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs border border-slate-700 transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-pink-400" />
                <span>9065296294</span>
              </a>
            </div>

            {/* Trust and Track Record Metrics */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <div className="text-2xl font-black text-amber-400 font-mono">380+</div>
                <div className="text-xs text-slate-400 mt-0.5">Galas & Conclaves Held</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white font-mono">5,000+</div>
                <div className="text-xs text-slate-400 mt-0.5">Max Banquet Capacity</div>
              </div>
              <div>
                <div className="text-2xl font-black text-pink-400 font-mono">P2.6 4K</div>
                <div className="text-xs text-slate-400 mt-0.5">Curved LED Walls</div>
              </div>
              <div>
                <div className="text-2xl font-black text-emerald-400 font-mono">100%</div>
                <div className="text-xs text-slate-400 mt-0.5">FSSAI 5-Star Kitchens</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Poster Card & Official Brochure Showcase */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl bg-slate-950 group">
              
              <div className="relative h-[480px] w-full overflow-hidden">
                <img 
                  src="/img-events.jpg" 
                  alt="Brentra Luxury Events & Wedding Hospitality Official Poster" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Badge */}
                <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-pink-600 text-white text-[11px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Official Event Brochure</span>
                </div>

                {/* Zoom button */}
                <button
                  onClick={onOpenPosterModal}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 backdrop-blur-md"
                  title="Enlarge Official Poster"
                >
                  <Eye className="w-4 h-4" />
                </button>

                {/* Poster Bottom Card Info */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white space-y-2">
                  <div className="flex items-center justify-between text-xs font-semibold">
                    <span className="text-pink-300">Turnkey Bihar Infrastructure</span>
                    <span className="text-amber-400 font-mono font-bold">Patna Central Division</span>
                  </div>
                  <h3 className="font-bold text-base text-white leading-snug">
                    Brentra Luxury Events & Hospitality Division
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-2">
                    Turnkey stage architecture, floral glass mandaps, hydraulic bride entry, JBL acoustics, Sufi nights & 5-star catering.
                  </p>
                  <div className="flex items-center justify-between pt-1 text-[11px]">
                    <button
                      onClick={onOpenPosterModal}
                      className="text-pink-400 hover:text-white font-bold underline cursor-pointer"
                    >
                      Enlarge Poster & Rates →
                    </button>
                    <span className="text-slate-400">Patna, Bihar</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

