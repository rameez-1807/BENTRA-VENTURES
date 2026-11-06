import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Tag, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { CartItem } from '../../types/facility';
import { PROMO_CODES } from '../../data/facilityData';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (serviceId: string, quantity: number) => void;
  onRemoveItem: (serviceId: string) => void;
  onProceedToCheckout: (appliedPromo?: string, discount?: number) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Calculate items subtotal
  const itemsSubtotal = cartItems.reduce((sum, item) => {
    const addonsPrice = item.selectedAddons.reduce((aSum, a) => aSum + a.price, 0);
    return sum + (item.service.price + addonsPrice) * item.quantity;
  }, 0);

  // Safety & convenience fee
  const serviceFee = itemsSubtotal > 0 ? 29 : 0;

  // Calculate promo discount
  let discountAmount = 0;
  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const rule = PROMO_CODES[appliedPromo];
    if (itemsSubtotal >= rule.minOrder) {
      if (rule.flatDiscount) {
        discountAmount = rule.flatDiscount;
      } else if (rule.discountPct) {
        discountAmount = Math.round((itemsSubtotal * rule.discountPct) / 100);
      }
    }
  }

  const grandTotal = Math.max(0, itemsSubtotal + serviceFee - discountAmount);

  const handleApplyPromo = (codeToApply?: string) => {
    const code = (codeToApply || promoInput).trim().toUpperCase();
    setPromoError(null);

    if (!code) {
      setPromoError('Please enter a valid coupon code.');
      return;
    }

    if (PROMO_CODES[code]) {
      const rule = PROMO_CODES[code];
      if (itemsSubtotal < rule.minOrder) {
        setPromoError(`Minimum order value of ₹${rule.minOrder} required for ${code}.`);
        return;
      }
      setAppliedPromo(code);
      setPromoInput('');
    } else {
      setPromoError('Invalid coupon code. Try BRENTRAFIRST or PATNA50.');
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#061426] text-white flex items-center justify-center font-bold">
                <ShoppingBag className="w-4 h-4 text-[#0788FF]" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 font-heading">
                  Service Cart
                </h2>
                <span className="text-xs text-slate-500">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Cart Body */}
          <div className="p-5 overflow-y-auto flex-grow space-y-4">
            {cartItems.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0788FF] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-slate-800">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Explore our salon, AC, cleaning, electrician, and RO services to add your first booking!
                </p>
                <button
                  onClick={onClose}
                  className="mt-3 px-5 py-2.5 rounded-xl bg-[#0788FF] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#0066CC] transition-colors"
                >
                  Browse Services
                </button>
              </div>
            ) : (
              <>
                {/* List of items */}
                <div className="space-y-3">
                  {cartItems.map((item) => {
                    const addonsSum = item.selectedAddons.reduce((s, a) => s + a.price, 0);
                    const itemUnitTotal = item.service.price + addonsSum;

                    return (
                      <div 
                        key={item.service.id} 
                        className="p-3.5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1">
                            <h4 className="text-xs font-bold text-slate-900 leading-snug">
                              {item.service.name}
                            </h4>
                            <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                              <Clock className="w-3 h-3" /> {item.service.durationMins} mins
                              <span>•</span>
                              <span className="text-[#0788FF] font-semibold">₹{item.service.price}</span>
                            </div>
                          </div>

                          {/* Price & Remove */}
                          <div className="text-right">
                            <span className="text-sm font-extrabold text-[#061426]">
                              ₹{itemUnitTotal * item.quantity}
                            </span>
                          </div>
                        </div>

                        {/* Selected Add-ons Pill list */}
                        {item.selectedAddons.length > 0 && (
                          <div className="bg-slate-50 p-2 rounded-xl text-[11px] space-y-1">
                            <div className="font-semibold text-slate-600">Selected Add-ons:</div>
                            {item.selectedAddons.map(a => (
                              <div key={a.id} className="flex justify-between text-slate-500">
                                <span>+ {a.name}</span>
                                <span className="font-medium text-slate-700">₹{a.price}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Stepper + Delete */}
                        <div className="flex items-center justify-between pt-1 border-t border-slate-100">
                          <button
                            onClick={() => onRemoveItem(item.service.id)}
                            className="text-[11px] text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer font-medium"
                          >
                            <Trash2 className="w-3.5 h-3.5" /> Remove
                          </button>

                          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
                            <button
                              onClick={() => onUpdateQuantity(item.service.id, item.quantity - 1)}
                              className="w-6 h-6 rounded bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold text-slate-800 w-5 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => onUpdateQuantity(item.service.id, item.quantity + 1)}
                              className="w-6 h-6 rounded bg-white hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>

                      </div>
                    );
                  })}
                </div>

                {/* Promo Code Box */}
                <div className="p-3.5 rounded-2xl bg-blue-50/50 border border-blue-100 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#061426]">
                    <Tag className="w-3.5 h-3.5 text-[#0788FF]" /> Apply Coupons & Offers
                  </div>

                  {appliedPromo ? (
                    <div className="flex items-center justify-between bg-emerald-100 text-emerald-900 p-2.5 rounded-xl text-xs font-semibold">
                      <div className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>'{appliedPromo}' Applied (-₹{discountAmount})</span>
                      </div>
                      <button 
                        onClick={handleRemovePromo}
                        className="text-emerald-700 hover:text-emerald-900 text-[11px] underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input 
                        type="text"
                        placeholder="Try BRENTRAFIRST or PATNA50"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs text-slate-900 uppercase font-mono"
                      />
                      <button
                        onClick={() => handleApplyPromo()}
                        className="px-4 py-2 rounded-xl bg-[#061426] text-white text-xs font-bold hover:bg-[#0788FF] transition-colors cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {promoError && (
                    <div className="flex items-center gap-1 text-[11px] text-rose-600">
                      <AlertCircle className="w-3 h-3" /> {promoError}
                    </div>
                  )}

                  {/* Quick Click Coupons */}
                  {!appliedPromo && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {Object.entries(PROMO_CODES).map(([code, val]) => (
                        <button
                          key={code}
                          type="button"
                          onClick={() => handleApplyPromo(code)}
                          className="px-2 py-1 rounded-md bg-white border border-blue-200 text-[10px] font-bold text-[#0788FF] hover:bg-blue-100/60 transition-colors cursor-pointer"
                        >
                          {code} ({val.label})
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bill Breakdown */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="font-bold text-slate-900 uppercase tracking-wider text-[11px] mb-2">
                    Payment Summary
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-slate-800">₹{itemsSubtotal}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Safety, PPE & Packaging Fee</span>
                    <span className="font-semibold text-slate-800">₹{serviceFee}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-semibold">
                      <span>Promo Discount ({appliedPromo})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="pt-2 border-t border-slate-200 flex justify-between text-sm font-extrabold text-[#061426]">
                    <span>Grand Total</span>
                    <span>₹{grandTotal}</span>
                  </div>
                </div>

                {/* Trust Guarantee Note */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 bg-white p-2.5 rounded-xl border border-slate-100">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>30-Day Service Guarantee with complete insurance coverage.</span>
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Button */}
          {cartItems.length > 0 && (
            <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
              <div>
                <div className="text-[11px] text-slate-400">To Pay</div>
                <div className="text-xl font-black text-[#061426]">₹{grandTotal}</div>
              </div>

              <button
                onClick={() => onProceedToCheckout(appliedPromo || undefined, discountAmount)}
                className="px-6 py-3 rounded-xl bg-[#0788FF] hover:bg-[#0066CC] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Select Slot & Address</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
