import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { CartItem, BookingOrder, BookingAddress } from '../../types/facility';
import { PATNA_LOCALITIES } from '../../data/facilityData';
import { SITE_CONFIG } from '../../config/site';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  appliedPromo?: string;
  discountAmount: number;
  onBookingSuccess: (newBooking: BookingOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  appliedPromo,
  discountAmount,
  onBookingSuccess
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Step 1: Slot Selection
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dayAfter = new Date(today);
  dayAfter.setDate(dayAfter.getDate() + 2);

  const formatDate = (d: Date) => d.toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' });

  const dateOptions = [
    { label: 'Today', dateStr: formatDate(today) },
    { label: 'Tomorrow', dateStr: formatDate(tomorrow) },
    { label: 'Day After', dateStr: formatDate(dayAfter) }
  ];

  const timeSlots = [
    '09:00 AM - 11:00 AM (Morning)',
    '12:00 PM - 02:00 PM (Afternoon)',
    '03:00 PM - 05:00 PM (Evening)',
    '06:00 PM - 08:00 PM (Late Evening)'
  ];

  const [selectedDate, setSelectedDate] = useState(dateOptions[0].dateStr);
  const [selectedTime, setSelectedTime] = useState(timeSlots[0]);

  // Step 2: Address & Contact Details
  const [address, setAddress] = useState<BookingAddress>({
    fullName: '',
    phone: '',
    alternatePhone: '',
    locality: PATNA_LOCALITIES[0],
    flatHouseNo: '',
    landmark: '',
    city: 'Patna',
    pincode: '800001'
  });
  const [customerNotes, setCustomerNotes] = useState('');

  // Step 3: Payment Method (Standardized to Cash after service)
  const paymentMethod = 'cash_after_service';
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Client preview calculation (server recalculates authoritatively)
  const itemsSubtotal = cartItems.reduce((sum, item) => {
    const addonsPrice = (item.selectedAddons || []).reduce((aSum, a) => aSum + a.price, 0);
    return sum + (item.service.price + addonsPrice) * item.quantity;
  }, 0);
  const serviceFee = itemsSubtotal > 0 ? SITE_CONFIG.rates.facilityDoorstepFee : 0;
  const estimatedTotal = Math.max(0, itemsSubtotal + serviceFee - discountAmount);

  const handleConfirmOrder = async () => {
    setErrorMessage(null);

    // Clean and validate phone number
    const cleanPhone = address.phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for dispatch coordination.');
      return;
    }

    if (!address.fullName.trim() || !address.flatHouseNo.trim()) {
      setErrorMessage('Please provide your full name and street/flat address.');
      return;
    }

    setIsSubmitting(true);

    const fullStreetAddress = `${address.flatHouseNo.trim()}, ${address.locality}, ${address.landmark ? address.landmark.trim() + ', ' : ''}Patna – ${address.pincode}`;

    const payload = {
      customerName: address.fullName.trim(),
      phone: cleanPhone,
      alternatePhone: address.alternatePhone?.trim() || undefined,
      address: fullStreetAddress,
      locality: address.locality,
      flatHouseNo: address.flatHouseNo.trim(),
      landmark: address.landmark?.trim() || undefined,
      pincode: address.pincode.trim(),
      slotDate: selectedDate,
      slotTime: selectedTime,
      items: cartItems.map(item => ({
        serviceId: item.service.id,
        quantity: item.quantity,
        addons: item.selectedAddons || []
      })),
      promoCode: appliedPromo || undefined,
      paymentMethod: 'cash_after_service',
      customerNotes: customerNotes.trim() || undefined
    };

    const apiUrl = import.meta.env.VITE_API_URL || 
      (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
        ? 'http://localhost:5000' 
        : 'https://bentra-ventures.onrender.com');

    try {
      const response = await fetch(`${apiUrl}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.bookingId) {
          const confirmedOrder: BookingOrder = {
            id: data.bookingId,
            createdAt: new Date().toISOString(),
            customer: {
              ...address,
              phone: `+91 ${cleanPhone}`
            },
            items: cartItems.map(item => ({
              serviceId: item.service.id,
              serviceName: item.service.name,
              price: item.service.price,
              quantity: item.quantity,
              addons: item.selectedAddons || []
            })),
            slotDate: selectedDate,
            slotTime: selectedTime,
            paymentMethod: 'cash_after_service',
            paymentStatus: 'pending',
            subtotal: Number(data.subtotal || itemsSubtotal),
            serviceFee: Number(data.serviceFee || serviceFee),
            discount: Number(data.discount || discountAmount),
            promoCode: appliedPromo,
            totalAmount: Number(data.totalAmount || estimatedTotal),
            status: 'confirmed',
            customerNotes,
            otpCode: data.otp || Math.floor(1000 + Math.random() * 9000).toString()
          };

          onBookingSuccess(confirmedOrder);
          onClose();
          return;
        }
      }
    } catch (err: any) {
      console.warn('Backend API unreachable, saving booking directly to Supabase:', err);
    }

    // Direct Supabase Fallback ensuring zero lost bookings in production
    try {
      const fallbackBookingId = `BF-PAT-${Math.floor(10000 + Math.random() * 90000)}`;
      const fallbackOtp = Math.floor(1000 + Math.random() * 9000).toString();

      const { data, error } = await supabase.from('facility_bookings').insert({
        id: fallbackBookingId,
        customer_name: address.fullName,
        phone: `+91 ${cleanPhone}`,
        alternate_phone: address.alternatePhone || null,
        locality: address.locality,
        flat_house_no: address.flatHouseNo,
        landmark: address.landmark || null,
        city: address.city || 'Patna',
        pincode: address.pincode.trim(),
        total_amount: estimatedTotal,
        payment_method: 'cash_after_service',
        payment_status: 'pending',
        status: 'confirmed',
        otp_code: fallbackOtp,
        customer_notes: customerNotes.trim() || null
      }).select();

      if (!error && data && data.length > 0) {
        const confirmedOrder: BookingOrder = {
          id: fallbackBookingId,
          createdAt: new Date().toISOString(),
          customer: {
            ...address,
            phone: `+91 ${cleanPhone}`
          },
          items: cartItems.map(item => ({
            serviceId: item.service.id,
            serviceName: item.service.name,
            price: item.service.price,
            quantity: item.quantity,
            addons: item.selectedAddons || []
          })),
          slotDate: selectedDate,
          slotTime: selectedTime,
          paymentMethod: 'cash_after_service',
          paymentStatus: 'pending',
          subtotal: itemsSubtotal,
          serviceFee: serviceFee,
          discount: discountAmount,
          promoCode: appliedPromo,
          totalAmount: estimatedTotal,
          status: 'confirmed',
          customerNotes,
          otpCode: fallbackOtp
        };

        onBookingSuccess(confirmedOrder);
        onClose();
      } else {
        setErrorMessage('Unable to confirm booking. Please call Patna dispatch at +91 90652 96294.');
      }
    } catch {
      setErrorMessage('Network connection lost while confirming booking. Please call +91 90652 96294.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">
                Step {step} of 3
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-['Outfit']">
              {step === 1 && 'Select Service Date & Arrival Window'}
              {step === 2 && 'Patna Doorstep Address & Phone'}
              {step === 3 && 'Order Summary & Doorstep Payment'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-3 bg-slate-100 p-1 text-center text-xs font-semibold">
          <div className={`py-1.5 rounded-lg transition-colors ${step >= 1 ? 'bg-white shadow-sm text-slate-900 font-bold' : 'text-slate-400'}`}>
            1. Date & Slot
          </div>
          <div className={`py-1.5 rounded-lg transition-colors ${step >= 2 ? 'bg-white shadow-sm text-slate-900 font-bold' : 'text-slate-400'}`}>
            2. Address
          </div>
          <div className={`py-1.5 rounded-lg transition-colors ${step >= 3 ? 'bg-white shadow-sm text-slate-900 font-bold' : 'text-slate-400'}`}>
            3. Confirm & OTP
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{errorMessage}</p>
                <p className="text-rose-700 mt-0.5">
                  Direct Patna Dispatch Helpline: <a href={SITE_CONFIG.contacts.phoneTel} className="font-bold underline">{SITE_CONFIG.contacts.phoneFormatted}</a>
                </p>
              </div>
            </div>
          )}

          {/* STEP 1: Date & Slot */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  <Calendar className="w-4 h-4 text-amber-500" /> Select Service Day
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {dateOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.label}
                      onClick={() => setSelectedDate(opt.dateStr)}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        selectedDate === opt.dateStr
                          ? 'border-amber-500 bg-amber-50 text-slate-900 font-bold shadow-sm ring-1 ring-amber-500'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-xs uppercase text-amber-600 font-extrabold">{opt.label}</div>
                      <div className="text-xs font-medium mt-1">{opt.dateStr}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  <Clock className="w-4 h-4 text-amber-500" /> Select Arrival Time Window
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedTime === slot
                          ? 'border-amber-500 bg-amber-50 text-slate-900 font-bold shadow-sm ring-1 ring-amber-500'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-xs">{slot}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Our verified Patna technician arrives within your chosen window equipped with sealed single-use tools.</span>
              </div>
            </div>
          )}

          {/* STEP 2: Address Details */}
          {step === 2 && (
            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Kumar"
                      value={address.fullName}
                      onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number (for Doorstep Pro & OTP) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9065296294"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Patna Locality Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Patna Service Area / Locality *
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <select
                    value={address.locality}
                    onChange={(e) => setAddress({ ...address, locality: e.target.value })}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none bg-white"
                  >
                    {PATNA_LOCALITIES.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">House / Flat No & Apartment *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 302, Maurya Enclave"
                    value={address.flatHouseNo}
                    onChange={(e) => setAddress({ ...address, flatHouseNo: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Landmark (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Near Shiv Mandir, Opp. SBI"
                    value={address.landmark}
                    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Special Instructions for Technician (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Ring bell twice / AC outdoor unit is on rooftop"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-600 text-[11px] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Doorstep OTP Security: A secure 4-digit code will be generated upon confirmation for you to share with your specialist at your door.</span>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Method & Review */}
          {step === 3 && (
            <div className="space-y-5">
              {/* Order Summary Recap Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-900">Scheduled Arrival</span>
                  <span className="text-amber-600 font-bold">{selectedDate} • {selectedTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Location</span>
                  <span className="font-semibold text-slate-800">{address.locality}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Items Subtotal</span>
                  <span className="font-mono text-slate-800">₹{itemsSubtotal}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Doorstep Hygiene & Travel Fee</span>
                  <span className="font-mono text-slate-800">₹{serviceFee}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between items-center text-emerald-600">
                    <span>Promo Discount ({appliedPromo})</span>
                    <span className="font-mono font-bold">-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2 border-t border-slate-200 text-sm font-extrabold text-slate-900">
                  <span>Estimated Total Amount</span>
                  <span className="font-mono text-base text-amber-600">₹{estimatedTotal}</span>
                </div>
              </div>

              {/* Payment Methods - Standardized to Cash after service */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  Payment Mode
                </label>
                <div className="p-4 rounded-2xl border-2 border-amber-500 bg-amber-50/70 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shadow-xs">
                      <Banknote className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-900">Pay Cash / QR After Service (Safe Standard)</div>
                      <div className="text-[11px] text-slate-600">Pay directly to technician via cash or UPI QR only after 100% satisfaction.</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-amber-500 flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-900 rounded-xl text-[11px] border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Brentra Quality Guarantee: 30-day service warranty on all AC, electrical & plumbing repairs.</span>
              </div>
            </div>
          )}

        </div>

        {/* Footer Navigation Buttons */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep((s) => (s - 1) as any)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <div />
          )}

          {step < 3 ? (
            <button
              onClick={() => {
                if (step === 2) {
                  if (!address.fullName.trim() || !address.phone.trim() || !address.flatHouseNo.trim()) {
                    setErrorMessage('Please enter your full name, phone number, and address before continuing.');
                    return;
                  }
                  setErrorMessage(null);
                }
                setStep((s) => (s + 1) as any);
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  <span>Confirming Dispatch...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Booking (₹{estimatedTotal})</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default CheckoutModal;
