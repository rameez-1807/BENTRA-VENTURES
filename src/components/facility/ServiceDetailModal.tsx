import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Plus, 
  Check, 
  ShieldCheck, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { ServiceItem, ServiceAddon } from '../../types/facility';

interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onAddToCart: (service: ServiceItem, selectedAddons: ServiceAddon[]) => void;
  isInCart?: boolean;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onAddToCart,
  isInCart
}) => {
  const [selectedAddons, setSelectedAddons] = useState<ServiceAddon[]>([]);

  if (!service) return null;

  const toggleAddon = (addon: ServiceAddon) => {
    if (selectedAddons.some(a => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const totalItemPrice = service.price + addonsTotal;

  const handleAdd = () => {
    onAddToCart(service, selectedAddons);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image & Close */}
        <div className="relative h-56 sm:h-64 w-full bg-slate-900 shrink-0">
          <img 
            src={service.image} 
            alt={service.name} 
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {service.badge && (
            <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0788FF] text-white text-xs font-bold uppercase tracking-wider shadow">
              {service.badge}
            </div>
          )}

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
              <span className="flex items-center gap-1 bg-amber-500/20 px-2 py-0.5 rounded text-amber-300 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {service.rating}
              </span>
              <span className="text-slate-300">({service.reviewsCount.toLocaleString()} verified ratings)</span>
              <span className="text-slate-400">•</span>
              <span className="flex items-center gap-1 text-slate-200">
                <Clock className="w-3.5 h-3.5" />
                {service.durationMins} mins
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-white leading-tight">
              {service.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-slate-700">
          
          {/* Price Bar */}
          <div className="flex items-baseline justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div>
              <div className="text-xs text-slate-500 font-medium">Standard Service Fee</div>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-extrabold text-[#061426]">₹{service.price}</span>
                {service.originalPrice > service.price && (
                  <span className="text-sm text-slate-400 line-through">₹{service.originalPrice}</span>
                )}
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                  {service.discountPct}% OFF
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="text-xs text-slate-500 font-medium">Guaranteed By</div>
              <div className="flex items-center gap-1 text-xs font-bold text-[#0788FF] mt-0.5">
                <ShieldCheck className="w-4 h-4" /> 30-Day Warranty
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-2">Service Overview</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* What's Included & Excluded Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 mb-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> What's Included
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {service.included.map((inc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-100">
              <h4 className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800 mb-3">
                <XCircle className="w-4 h-4 text-rose-600" /> What's Excluded
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {service.excluded.map((exc, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Optional Add-ons */}
          {service.addOns && service.addOns.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
                  Recommended Add-ons
                </h3>
                <span className="text-xs text-slate-400">Customizable</span>
              </div>

              <div className="space-y-2.5">
                {service.addOns.map((addon) => {
                  const isSelected = selectedAddons.some(a => a.id === addon.id);
                  return (
                    <div 
                      key={addon.id}
                      onClick={() => toggleAddon(addon)}
                      className={`flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected 
                          ? 'border-[#0788FF] bg-blue-50/60 shadow-sm' 
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                          isSelected ? 'bg-[#0788FF] border-[#0788FF] text-white' : 'border-slate-300 bg-white'
                        }`}>
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <div className="text-xs font-bold text-slate-900">{addon.name}</div>
                          {addon.durationMins && (
                            <div className="text-[11px] text-slate-500">+{addon.durationMins} mins duration</div>
                          )}
                        </div>
                      </div>

                      <div className="text-xs font-bold text-[#061426]">
                        +₹{addon.price}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Brentra Promise Banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-[#061426] to-[#001F45] text-white flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0788FF]/20 text-[#0788FF] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-white">Brentra Facility Verified Partner</div>
              <div className="text-slate-300 text-[11px]">Background verified, police-checked technician with sanitized toolkit.</div>
            </div>
          </div>

        </div>

        {/* Footer Fixed Actions */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between shrink-0">
          <div>
            <div className="text-[11px] text-slate-500">Total Payable</div>
            <div className="text-xl font-extrabold text-[#061426]">
              ₹{totalItemPrice}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleAdd}
              className="px-6 py-2.5 rounded-xl bg-[#0788FF] hover:bg-[#0066CC] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              {isInCart ? 'Update In Cart' : 'Add to Booking Cart'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
