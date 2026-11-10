import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ShieldCheck, 
  FileText, 
  Calendar, 
  UserCheck, 
  Truck, 
  Wrench, 
  Star,
  Printer,
  ChevronRight,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { BookingOrder, BookingStatus } from '../../types/facility';
import { SITE_CONFIG } from '../../config/site';
import { supabase } from '../../lib/supabase';

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingOrder | null;
  allBookings: BookingOrder[];
  onSelectBooking: (b: BookingOrder) => void;
  onUpdateStatus?: (bookingId: string, newStatus: BookingStatus) => void;
}

export const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({
  isOpen,
  onClose,
  booking,
  allBookings,
  onSelectBooking
}) => {
  const [activeTab, setActiveTab] = useState<'track' | 'invoice' | 'history'>('track');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [liveBooking, setLiveBooking] = useState<BookingOrder | null>(booking);

  useEffect(() => {
    setLiveBooking(booking);
  }, [booking]);

  if (!isOpen || !liveBooking) return null;

  const steps: { key: BookingStatus; label: string; desc: string; icon: any }[] = [
    { key: 'confirmed', label: 'Booking Confirmed', desc: 'Received at Patna Dispatch Desk', icon: CheckCircle2 },
    { key: 'pro_assigned', label: 'Technician Assigned', desc: 'Background & skills verified', icon: UserCheck },
    { key: 'on_the_way', label: 'Specialist In Transit', desc: 'En route with sanitized toolkit', icon: Truck },
    { key: 'in_progress', label: 'Service In Progress', desc: 'Doorstep OTP verified & work active', icon: Wrench },
    { key: 'completed', label: 'Service Completed', desc: 'Work inspected & 30-day warranty active', icon: ShieldCheck }
  ];

  const getStepIndex = (status: BookingStatus) => {
    switch (status) {
      case 'pending': return 0;
      case 'confirmed': return 0;
      case 'pro_assigned': return 1;
      case 'on_the_way': return 2;
      case 'in_progress': return 3;
      case 'completed': return 4;
      case 'cancelled': return -1;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(liveBooking.status);

  // Poll / Refresh from server
  const handleRefresh = async () => {
    if (!liveBooking.id || !liveBooking.customer.phone) return;
    setIsRefreshing(true);

    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    const cleanPhone = liveBooking.customer.phone.replace(/\D/g, '').slice(-10);

    try {
      const res = await fetch(`${apiUrl}/api/track/${liveBooking.id}?phone=${cleanPhone}`);
      const data = await res.json();
      if (res.ok && data.success && data.booking) {
        setLiveBooking(prev => {
          if (!prev) return prev;
          return {
            ...prev,
            status: data.booking.status,
            technician: data.booking.technician ? {
              id: data.booking.technician.id,
              name: data.booking.technician.name,
              phone: data.booking.technician.phone,
              avatar: data.booking.technician.avatar || prev.technician?.avatar || '/b-logo.png',
              rating: Number(data.booking.technician.rating || 4.9),
              reviewsCount: Number(data.booking.technician.reviews_count || 100),
              experienceYears: Number(data.booking.technician.experience_years || 5),
              jobsCompleted: Number(data.booking.technician.jobs_completed || 500),
              specialization: data.booking.technician.specialization || 'Patna Senior Specialist',
              verified: true,
              vehicleNo: data.booking.technician.vehicle_no
            } : prev.technician
          };
        });
      }
    } catch (err) {
      console.warn('Live tracking telemetry ping failed:', err);
    } finally {
      setIsRefreshing(false);
    }
  };

  // Realtime Live Subscription: Instant status update on customer's screen
  useEffect(() => {
    if (!liveBooking?.id) return;

    const channel = supabase
      .channel(`live-tracking-${liveBooking.id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'facility_bookings',
          filter: `id=eq.${liveBooking.id}`
        },
        (payload) => {
          console.log('⚡ Realtime status update received for booking:', payload);
          handleRefresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [liveBooking?.id]);

  const whatsappMsg = encodeURIComponent(
    `Hello Brentra Facility! I am tracking my booking #${liveBooking.id} (${liveBooking.items.map(i => i.serviceName).join(', ')}) scheduled for ${liveBooking.slotDate} at ${liveBooking.customer.locality}.`
  );
  const whatsappUrl = `https://wa.me/919142144940?text=${whatsappMsg}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Nav */}
        <div className="p-4 sm:p-5 border-b border-slate-800 bg-slate-950 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-amber-400 font-mono font-bold tracking-wider">
                BOOKING #{liveBooking.id}
              </div>
              <h2 className="text-base font-bold text-white font-['Outfit']">
                Live Dispatch & Specialist Desk
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
              title="Refresh telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => setActiveTab(activeTab === 'invoice' ? 'track' : 'invoice')}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{activeTab === 'invoice' ? 'Track Order' : 'Invoice'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Sub-Header */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeTab === 'track' 
                ? 'border-amber-500 text-amber-600 bg-white font-bold' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Live Tracking
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors ${
              activeTab === 'history' 
                ? 'border-amber-500 text-amber-600 bg-white font-bold' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            My Bookings ({allBookings.length})
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-grow space-y-6">

          {/* TAB 1: LIVE TRACK */}
          {activeTab === 'track' && (
            <>
              {/* Order Status Banner */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider">
                    Current Dispatch Status
                  </div>
                  <div className="text-base font-extrabold text-slate-900 capitalize mt-0.5">
                    {liveBooking.status.replace(/_/g, ' ')}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">
                    Slot: <strong className="text-slate-800">{liveBooking.slotDate} ({liveBooking.slotTime})</strong>
                  </div>
                </div>

                {liveBooking.otpCode && (
                  <div className="text-right">
                    <div className="text-[11px] text-slate-500">Doorstep Verification Code</div>
                    <div className="text-xl font-mono font-black text-amber-600 tracking-widest bg-white px-3 py-1 rounded-xl shadow-xs border border-amber-200">
                      {liveBooking.otpCode}
                    </div>
                    <span className="text-[10px] text-slate-500">Share with specialist at door</span>
                  </div>
                )}
              </div>

              {/* Stepper Timeline */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 font-['Outfit']">
                  Real-Time Dispatch Progress
                </h3>

                <div className="relative pl-6 space-y-6 before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  {steps.map((st, idx) => {
                    const isDone = idx <= currentIndex;
                    const isCurrent = idx === currentIndex;
                    const Icon = st.icon;

                    return (
                      <div key={st.key} className="relative flex items-start gap-4 group">
                        <div className={`absolute -left-6 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                          isDone 
                            ? 'bg-amber-500 text-slate-950 shadow-xs ring-4 ring-amber-100' 
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>

                        <div className="flex-1">
                          <div className={`text-xs font-bold ${isCurrent ? 'text-amber-600' : isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                            {st.label}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {st.desc}
                          </div>
                        </div>

                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold animate-pulse">
                            Active
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Assigned Technician Card */}
              {liveBooking.technician ? (
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Assigned Professional
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">
                      <ShieldCheck className="w-3.5 h-3.5" /> Police & Skill Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <img 
                      src={liveBooking.technician.avatar} 
                      alt={liveBooking.technician.name} 
                      className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-slate-900">{liveBooking.technician.name}</h4>
                      <div className="text-xs text-amber-600 font-medium">{liveBooking.technician.specialization}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {liveBooking.technician.rating}
                        </span>
                        <span>•</span>
                        <span>{liveBooking.technician.jobsCompleted}+ Jobs Done</span>
                        {liveBooking.technician.vehicleNo && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-[11px] text-slate-600">{liveBooking.technician.vehicleNo}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={`tel:${liveBooking.technician.phone}`}
                      className="flex-1 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Call Technician ({liveBooking.technician.phone})</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-center text-xs text-slate-600 space-y-1">
                  <p className="font-semibold text-slate-800">Technician Allocation in Progress</p>
                  <p className="text-[11px]">Our Patna dispatch desk is assigning the highest-rated pro nearest to {liveBooking.customer.locality}.</p>
                </div>
              )}

              {/* Items Card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                  Booked Services ({liveBooking.items.length})
                </span>
                <div className="divide-y divide-slate-200">
                  {liveBooking.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex justify-between items-center">
                      <div>
                        <div className="font-semibold text-slate-800">{item.serviceName} x{item.quantity}</div>
                        {item.addons && item.addons.length > 0 && (
                          <div className="text-[10px] text-slate-500">+ {item.addons.map(a => a.name).join(', ')}</div>
                        )}
                      </div>
                      <div className="font-mono text-slate-900 font-semibold">₹{item.price * item.quantity}</div>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                  <span>Total Amount</span>
                  <span className="font-mono text-amber-600">₹{liveBooking.totalAmount}</span>
                </div>
              </div>
            </>
          )}

          {/* TAB 2: INVOICE */}
          {activeTab === 'invoice' && (
            <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-6 text-xs text-slate-700">
              <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                  <h3 className="font-extrabold text-lg text-slate-900 font-['Outfit']">BRENTRA VENTURES PVT LTD</h3>
                  <p className="text-slate-500">{SITE_CONFIG.headquarters.address}</p>
                  <p className="text-slate-500">Patna, Bihar – {SITE_CONFIG.headquarters.pincode}</p>
                  <p className="text-slate-500">GST: 10AABCB1234F1Z9</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-bold text-amber-600 uppercase">
                    TAX INVOICE #{liveBooking.id}
                  </span>
                  <p className="text-slate-500 mt-1">Date: {new Date(liveBooking.createdAt).toLocaleDateString('en-IN')}</p>
                </div>
              </div>

              <div>
                <span className="font-bold uppercase tracking-wider text-[11px] text-slate-500 block mb-1">
                  Billed To
                </span>
                <p className="font-bold text-slate-900 text-sm">{liveBooking.customer.fullName}</p>
                <p>{liveBooking.customer.flatHouseNo}, {liveBooking.customer.locality}</p>
                <p>Phone: {liveBooking.customer.phone}</p>
              </div>

              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase text-[10px]">
                    <th className="py-2">Service Description</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {liveBooking.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-2 font-medium text-slate-800">{it.serviceName}</td>
                      <td className="py-2 text-center">{it.quantity}</td>
                      <td className="py-2 text-right font-mono">₹{it.price * it.quantity}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={2} className="py-2 text-slate-600">Doorstep Travel & Hygiene Surcharge</td>
                    <td className="py-2 text-right font-mono">₹{liveBooking.serviceFee || 49}</td>
                  </tr>
                  {Number(liveBooking.discount || 0) > 0 && (
                    <tr className="text-emerald-600 font-semibold">
                      <td colSpan={2} className="py-2">Discount ({liveBooking.promoCode})</td>
                      <td className="py-2 text-right font-mono">-₹{liveBooking.discount}</td>
                    </tr>
                  )}
                  <tr className="border-t-2 border-slate-900 font-bold text-sm text-slate-900">
                    <td colSpan={2} className="py-2.5">Total Amount Payable (Cash on Service)</td>
                    <td className="py-2.5 text-right font-mono text-amber-600">₹{liveBooking.totalAmount}</td>
                  </tr>
                </tbody>
              </table>

              <div className="pt-4 border-t border-slate-200 flex justify-between items-center text-[11px] text-slate-500">
                <span>Computer generated tax receipt. Signature not required.</span>
                <button
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white font-bold inline-flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Receipt
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              {allBookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => {
                    onSelectBooking(b);
                    setActiveTab('track');
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    b.id === liveBooking.id
                      ? 'border-amber-500 bg-amber-50/60 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">#{b.id}</span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 capitalize">
                        {b.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-800 mt-1">
                      {b.items.map(i => i.serviceName).join(', ')}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {b.slotDate} • {b.slotTime} • {b.customer.locality}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-extrabold text-slate-900 font-mono">₹{b.totalAmount}</div>
                    <div className="text-[11px] text-amber-600 flex items-center gap-1 font-semibold justify-end mt-1">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer controls: WhatsApp & Support */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp Support</span>
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={SITE_CONFIG.contacts.phoneTel}
              className="text-slate-700 hover:text-slate-900 font-semibold flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-amber-500" /> {SITE_CONFIG.contacts.phoneFormatted}
            </a>
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LiveTrackingModal;
