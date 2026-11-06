import React, { useState } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  CreditCard, 
  Banknote, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft,
  Sparkles,
  QrCode
} from 'lucide-react';
import { CartItem, BookingOrder, BookingAddress, Technician } from '../../types/facility';
import { PATNA_LOCALITIES, MOCK_TECHNICIANS } from '../../data/facilityData';

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

  // Step 1: Slot Selection
  // Dynamic dates: Today, Tomorrow, Day After Tomorrow
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
  const [phoneOtp, setPhoneOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  // Step 3: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'cash_after_service' | 'upi_online' | 'card_online'>('cash_after_service');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  // Totals
  const itemsSubtotal = cartItems.reduce((sum, item) => {
    const addonsPrice = item.selectedAddons.reduce((aSum, a) => aSum + a.price, 0);
    return sum + (item.service.price + addonsPrice) * item.quantity;
  }, 0);
  const serviceFee = itemsSubtotal > 0 ? 29 : 0;
  const grandTotal = Math.max(0, itemsSubtotal + serviceFee - discountAmount);

  const handleSendOtp = () => {
    if (!address.phone || address.phone.length < 10) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setOtpSent(true);
    setPhoneOtp('8492'); // Pre-fill mock OTP for effortless user experience
  };

  const handleVerifyOtp = () => {
    if (phoneOtp === '8492' || phoneOtp.length === 4) {
      setOtpVerified(true);
    } else {
      alert('Invalid OTP. Please enter 8492.');
    }
  };

  const handleConfirmOrder = () => {
    setIsSubmitting(true);

    // Pick an appropriate technician matching the category or random
    const randomTech: Technician = MOCK_TECHNICIANS[Math.floor(Math.random() * MOCK_TECHNICIANS.length)];
    const bookingId = `BF-PAT-${Math.floor(10000 + Math.random() * 90000)}`;
    const randomOtp = `${Math.floor(1000 + Math.random() * 9000)}`;

    const newBooking: BookingOrder = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      customer: {
        ...address,
        phone: address.phone.startsWith('+91') ? address.phone : `+91 ${address.phone}`
      },
      items: cartItems.map(item => ({
        serviceId: item.service.id,
        serviceName: item.service.name,
        price: item.service.price,
        quantity: item.quantity,
        addons: item.selectedAddons
      })),
      slotDate: selectedDate,
      slotTime: selectedTime,
      paymentMethod,
      paymentStatus: paymentMethod === 'cash_after_service' ? 'pending' : 'paid',
      subtotal: itemsSubtotal,
      serviceFee,
      discount: discountAmount,
      promoCode: appliedPromo,
      totalAmount: grandTotal,
      status: 'confirmed',
      technician: randomTech,
      customerNotes,
      otpCode: randomOtp
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onBookingSuccess(newBooking);
      onClose();
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0788FF] animate-pulse"></span>
              <span className="text-[11px] font-bold text-[#0788FF] uppercase tracking-wider">
                Step {step} of 3
              </span>
            </div>
            <h2 className="text-lg font-bold text-slate-900 font-heading">
              {step === 1 && 'Select Service Date & Time Slot'}
              {step === 2 && 'Patna Service Address & Contact'}
              {step === 3 && 'Choose Payment Method & Confirm'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        <div className="grid grid-cols-3 bg-slate-100/60 p-1 text-center text-xs font-semibold">
          <div className={`py-1.5 rounded-lg transition-colors ${step >= 1 ? 'bg-white shadow text-[#0788FF] font-bold' : 'text-slate-400'}`}>
            1. Date & Slot
          </div>
          <div className={`py-1.5 rounded-lg transition-colors ${step >= 2 ? 'bg-white shadow text-[#0788FF] font-bold' : 'text-slate-400'}`}>
            2. Address
          </div>
          <div className={`py-1.5 rounded-lg transition-colors ${step >= 3 ? 'bg-white shadow text-[#0788FF] font-bold' : 'text-slate-400'}`}>
            3. Payment
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">

          {/* STEP 1: Date & Slot */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  <Calendar className="w-4 h-4 text-[#0788FF]" /> Select Service Day
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {dateOptions.map((opt) => (
                    <button
                      type="button"
                      key={opt.label}
                      onClick={() => setSelectedDate(opt.dateStr)}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        selectedDate === opt.dateStr
                          ? 'border-[#0788FF] bg-blue-50/80 text-[#061426] font-bold shadow-sm ring-1 ring-[#0788FF]'
                          : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                      }`}
                    >
                      <div className="text-xs uppercase text-[#0788FF] font-extrabold">{opt.label}</div>
                      <div className="text-xs font-medium mt-1">{opt.dateStr}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  <Clock className="w-4 h-4 text-[#0788FF]" /> Select Arrival Time Window
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                        selectedTime === slot
                          ? 'border-[#0788FF] bg-blue-50/80 text-[#061426] font-bold shadow-sm ring-1 ring-[#0788FF]'
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
                <span>Our certified professional arrives right at the start of your window with sanitized equipment.</span>
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
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-[#0788FF] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number (for live SMS & OTP) *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 94300 88000"
                      value={address.phone}
                      onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-[#0788FF] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* OTP Simulation verification bar */}
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                {!otpVerified ? (
                  <div className="flex items-center gap-2 w-full">
                    {!otpSent ? (
                      <button
                        type="button"
                        onClick={handleSendOtp}
                        className="px-3 py-1.5 rounded-lg bg-[#061426] text-white text-[11px] font-bold cursor-pointer"
                      >
                        Send 4-Digit OTP
                      </button>
                    ) : (
                      <div className="flex items-center gap-2 flex-1">
                        <input
                          type="text"
                          maxLength={4}
                          value={phoneOtp}
                          onChange={(e) => setPhoneOtp(e.target.value)}
                          placeholder="8492"
                          className="w-24 px-2 py-1 bg-white border border-slate-300 text-center font-bold tracking-widest text-xs rounded"
                        />
                        <button
                          type="button"
                          onClick={handleVerifyOtp}
                          className="px-3 py-1 rounded bg-[#0788FF] text-white text-[11px] font-bold cursor-pointer"
                        >
                          Verify OTP
                        </button>
                        <span className="text-[10px] text-slate-500">(Mock code prefilled: 8492)</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold text-xs">
                    <CheckCircle2 className="w-4 h-4" /> Phone Number Verified
                  </div>
                )}
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
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-[#0788FF] focus:outline-none bg-white"
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
                    placeholder="e.g. Flat 302, Royal Residency"
                    value={address.flatHouseNo}
                    onChange={(e) => setAddress({ ...address, flatHouseNo: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-[#0788FF] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Landmark</label>
                  <input
                    type="text"
                    placeholder="e.g. Near Shiv Mandir, Opp. Dominos"
                    value={address.landmark}
                    onChange={(e) => setAddress({ ...address, landmark: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-[#0788FF] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Special Instructions for Technician (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Call before ringing bell / AC is on 2nd floor"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:border-[#0788FF] focus:outline-none"
                />
              </div>

            </div>
          )}

          {/* STEP 3: Payment Method & Review */}
          {step === 3 && (
            <div className="space-y-5">
              
              {/* Order Summary Recap Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="font-bold text-slate-900">Scheduled Booking Time</span>
                  <span className="text-[#0788FF] font-bold">{selectedDate} • {selectedTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Location</span>
                  <span className="font-semibold text-slate-800">{address.locality}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200 text-sm font-extrabold text-[#061426]">
                  <span>Total Amount Due</span>
                  <span>₹{grandTotal}</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-800 mb-3">
                  Select Payment Mode
                </label>
                <div className="space-y-3">
                  
                  {/* Option 1: Cash/UPI after service */}
                  <div
                    onClick={() => setPaymentMethod('cash_after_service')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'cash_after_service'
                        ? 'border-[#0788FF] bg-blue-50/70 shadow-sm ring-1 ring-[#0788FF]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center">
                        <Banknote className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Pay After Service (Recommended)</div>
                        <div className="text-[11px] text-slate-500">Pay cash or scan technician QR only when 100% satisfied.</div>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center">
                      {paymentMethod === 'cash_after_service' && <div className="w-2.5 h-2.5 rounded-full bg-[#0788FF]" />}
                    </div>
                  </div>

                  {/* Option 2: Instant UPI / QR */}
                  <div
                    onClick={() => setPaymentMethod('upi_online')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'upi_online'
                        ? 'border-[#0788FF] bg-blue-50/70 shadow-sm ring-1 ring-[#0788FF]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#0788FF] flex items-center justify-center">
                        <QrCode className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Instant UPI Payment (GPay, PhonePe, Paytm)</div>
                        <div className="text-[11px] text-slate-500">Prepay online with 100% money-back guarantee.</div>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center">
                      {paymentMethod === 'upi_online' && <div className="w-2.5 h-2.5 rounded-full bg-[#0788FF]" />}
                    </div>
                  </div>

                  {/* Option 3: Card / Netbanking */}
                  <div
                    onClick={() => setPaymentMethod('card_online')}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      paymentMethod === 'card_online'
                        ? 'border-[#0788FF] bg-blue-50/70 shadow-sm ring-1 ring-[#0788FF]'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-slate-900">Credit / Debit Card or Netbanking</div>
                        <div className="text-[11px] text-slate-500">Visa, MasterCard, RuPay, Corporate Cards.</div>
                      </div>
                    </div>
                    <div className="w-4 h-4 rounded-full border border-slate-400 flex items-center justify-center">
                      {paymentMethod === 'card_online' && <div className="w-2.5 h-2.5 rounded-full bg-[#0788FF]" />}
                    </div>
                  </div>

                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-emerald-50 text-emerald-900 rounded-xl text-[11px] border border-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero cancellation fee until 2 hours before scheduled slot arrival.</span>
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
                  if (!address.fullName || !address.phone || !address.flatHouseNo) {
                    alert('Please enter your name, phone number, and address.');
                    return;
                  }
                }
                setStep((s) => (s + 1) as any);
              }}
              className="px-6 py-2.5 rounded-xl bg-[#0788FF] hover:bg-[#0066CC] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleConfirmOrder}
              disabled={isSubmitting}
              className="px-8 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-extrabold uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Dispatching Specialist...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Confirm Booking (₹{grandTotal})</span>
                </>
              )}
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
