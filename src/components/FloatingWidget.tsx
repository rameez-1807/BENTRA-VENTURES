import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, CalendarClock, ArrowUp, X, Sparkles } from 'lucide-react';

interface FloatingWidgetProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const FloatingWidget: React.FC<FloatingWidgetProps> = ({ onOpenQuoteModal }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <aside aria-label="Quick contact and support options" className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      
      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-white hover:bg-[#0A192F] text-slate-700 hover:text-white border border-slate-200 shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          title="Scroll to Top"
          aria-label="Scroll to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Action Strip */}
      {isMinimized ? (
        <button
          onClick={() => setIsMinimized(false)}
          className="px-4 py-2.5 rounded-full bg-[#0A192F] text-white font-bold text-xs shadow-xl flex items-center gap-2 hover:bg-[#1E3E62] transition-all hover:scale-105 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-400" /> Patna Fast Desk
        </button>
      ) : (
        <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          
          {/* Schedule Site Visit / Service Call Button */}
          <button
            onClick={() => onOpenQuoteModal('construction-services')}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs shadow-md transition-transform active:scale-95 cursor-pointer"
          >
            <CalendarClock className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Book Service / Quote</span>
            <span className="sm:hidden">Quote</span>
          </button>

          {/* Direct WhatsApp Instant Support */}
          <a
            href="https://wa.me/919142144940?text=Hello%20Brentra%20Ventures,%20I%20am%20inquiring%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-sm transition-colors"
            title="Chat on WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>

          {/* Direct Helpline Click-to-Call */}
          <a
            href="tel:9065296294"
            className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-[#0A192F] font-bold text-xs border border-slate-200 transition-colors"
            title="Call Patna Central Desk"
          >
            <Phone className="w-4 h-4 text-[#0A192F]" />
            <span className="hidden md:inline font-mono">9065296294</span>
            <span className="md:hidden">Call</span>
          </a>

          {/* Minimize toggle */}
          <button
            onClick={() => setIsMinimized(true)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-black hover:bg-slate-100 transition-colors cursor-pointer"
            title="Minimize"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </aside>
  );
};
