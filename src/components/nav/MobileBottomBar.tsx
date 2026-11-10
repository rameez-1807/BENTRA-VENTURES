import React from 'react';
import { Phone, MessageSquare, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '../../config/site';

interface MobileBottomBarProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ onOpenQuoteModal }) => {
  return (
    <aside 
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-3 lg:hidden shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
      aria-label="Mobile quick actions"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2">
        <a
          href={SITE_CONFIG.contacts.phoneTel}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-slate-50 border border-slate-200/80 text-slate-800 hover:bg-slate-100 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-blue-600 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Call Desk</span>
        </a>

        <a
          href={SITE_CONFIG.contacts.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-800 hover:bg-emerald-100 active:scale-95 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-emerald-600 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        <button
          onClick={() => onOpenQuoteModal('bentra-facility')}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-amber-500 text-slate-950 font-bold hover:bg-amber-400 active:scale-95 transition-all shadow-sm shadow-amber-500/20"
        >
          <Sparkles className="w-4 h-4 text-slate-950 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Book Service</span>
        </button>
      </div>
    </aside>
  );
};

export default MobileBottomBar;

