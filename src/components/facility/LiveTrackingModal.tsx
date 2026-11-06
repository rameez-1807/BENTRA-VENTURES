import React, { useState } from 'react';
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
  AlertTriangle
} from 'lucide-react';
import { BookingOrder, BookingStatus } from '../../types/facility';

interface LiveTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  booking: BookingOrder | null;
  allBookings: BookingOrder[];
  onSelectBooking: (b: BookingOrder) => void;
  onUpdateStatus: (bookingId: string, newStatus: BookingStatus) => void;
}

export const LiveTrackingModal: React.FC<LiveTrackingModalProps> = ({
  isOpen,
  onClose,
  booking,
  allBookings,
  onSelectBooking,
  onUpdateStatus
}) => {
  const [activeTab, setActiveTab] = useState<'track' | 'invoice' | 'history'>('track');
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const [userStars, setUserStars] = useState(5);

  if (!isOpen || !booking) return null;

  const steps: { key: BookingStatus; label: string; desc: string; icon: any }[] = [
    { key: 'confirmed', label: 'Booking Confirmed', desc: 'Received at Central Patna Hub', icon: CheckCircle2 },
    { key: 'pro_assigned', label: 'Specialist Assigned', desc: 'Background & skills verified', icon: UserCheck },
    { key: 'on_the_way', label: 'Specialist On The Way', desc: 'Estimated arrival in 25 mins', icon: Truck },
    { key: 'in_progress', label: 'Service In Progress', desc: 'Safety protocols & equipment active', icon: Wrench },
    { key: 'completed', label: 'Service Completed', desc: '30-day warranty activated', icon: ShieldCheck }
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

  const currentIndex = getStepIndex(booking.status);

  // WhatsApp share link
  const whatsappMsg = encodeURIComponent(
    `Hello Brentra Facility! I need an update on my booking ID: ${booking.id} (${booking.items.map(i => i.serviceName).join(', ')}) scheduled for ${booking.slotDate} at ${booking.customer.locality}.`
  );
  const whatsappUrl = `https://wa.me/919065296294?text=${whatsappMsg}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Nav */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-[#061426] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0788FF] text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-blue-300 font-mono font-bold">
                BOOKING #{booking.id}
              </div>
              <h2 className="text-base font-bold text-white font-heading">
                Live Order & Technician Desk
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab(activeTab === 'invoice' ? 'track' : 'invoice')}
              className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{activeTab === 'invoice' ? 'Track Order' : 'Invoice'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Sub-Header */}
        <div className="flex border-b border-slate-200 bg-slate-50 text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab('track')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'track' 
                ? 'border-[#0788FF] text-[#0788FF] bg-white' 
                : 'border-transparent hover:text-slate-900'
            }`}
          >
            Live Tracking
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 text-center border-b-2 transition-colors cursor-pointer ${
              activeTab === 'history' 
                ? 'border-[#0788FF] text-[#0788FF] bg-white' 
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
              <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50/50 border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-[#0788FF] uppercase tracking-wider">
                    Current Dispatch Status
                  </div>
                  <div className="text-base font-extrabold text-[#061426] capitalize mt-0.5">
                    {booking.status.replace(/_/g, ' ')}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Slot: <strong className="text-slate-700">{booking.slotDate} ({booking.slotTime})</strong>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-500">Service OTP</div>
                  <div className="text-xl font-mono font-black text-[#0788FF] tracking-widest bg-white px-3 py-1 rounded-xl shadow-sm border border-blue-100">
                    {booking.otpCode}
                  </div>
                  <span className="text-[10px] text-slate-400">Share with pro upon arrival</span>
                </div>
              </div>

              {/* Stepper Timeline */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  Real-Time Service Progress
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
                            ? 'bg-[#0788FF] text-white shadow-md ring-4 ring-blue-100' 
                            : 'bg-white border-2 border-slate-300 text-slate-400'
                        }`}>
                          <Icon className="w-3.5 h-3.5" />
                        </div>

                        <div className="flex-1">
                          <div className={`text-xs font-bold ${isCurrent ? 'text-[#0788FF]' : isDone ? 'text-slate-900' : 'text-slate-400'}`}>
                            {st.label}
                          </div>
                          <div className="text-[11px] text-slate-500 mt-0.5">
                            {st.desc}
                          </div>
                        </div>

                        {isCurrent && (
                          <span className="px-2 py-0.5 rounded-full bg-blue-100 text-[#0788FF] text-[10px] font-bold animate-pulse">
                            Active
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Assigned Technician Card */}
              {booking.technician && (
                <div className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Assigned Professional
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <ShieldCheck className="w-3.5 h-3.5" /> Police & Skill Verified
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <img 
                      src={booking.technician.avatar} 
                      alt={booking.technician.name} 
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-bold text-[#061426]">{booking.technician.name}</h4>
                      <div className="text-xs text-[#0788FF] font-medium">{booking.technician.specialization}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1 text-amber-500 font-bold">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {booking.technician.rating}
                        </span>
                        <span>•</span>
                        <span>{booking.technician.jobsCompleted}+ Jobs Done</span>
                        {booking.technician.vehicleNo && (
                          <>
                            <span>•</span>
                            <span className="font-mono text-[11px] text-slate-600">{booking.technician.vehicleNo}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2 border-t border-slate-100">
                    <a
                      href={`tel:${booking.technician.phone}`}
                      className="flex-1 py-2.5 rounded-xl bg-[#061426] hover:bg-[#1E3E62] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Call Professional</span>
                    </a>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp Help</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Service Address & Items summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0788FF]" /> Service Destination
                  </div>
                  <div className="font-semibold text-slate-900">{booking.customer.fullName}</div>
                  <div className="text-slate-600">{booking.customer.flatHouseNo}, {booking.customer.landmark}</div>
                  <div className="text-slate-600">{booking.customer.locality}, {booking.customer.city}</div>
                  <div className="text-slate-700 font-medium">Contact: {booking.customer.phone}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="font-bold text-slate-800 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#0788FF]" /> Booked Services ({booking.items.length})
                  </div>
                  <div className="space-y-1 pt-1">
                    {booking.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between text-slate-700">
                        <span>{it.quantity}x {it.serviceName}</span>
                        <span className="font-bold text-[#061426]">₹{it.price * it.quantity}</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-[#061426]">
                      <span>Total Amount</span>
                      <span>₹{booking.totalAmount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating form if completed */}
              {booking.status === 'completed' && !ratingSubmitted && (
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-center space-y-3">
                  <h4 className="text-xs font-bold text-amber-900 uppercase tracking-wider">
                    How was your service with {booking.technician?.name || 'our specialist'}?
                  </h4>
                  <div className="flex justify-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setUserStars(star)}
                        className="cursor-pointer"
                      >
                        <Star className={`w-7 h-7 ${star <= userStars ? 'fill-amber-400 text-amber-400' : 'text-slate-300'}`} />
                      </button>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setRatingSubmitted(true);
                      alert('Thank you for rating! Your feedback helps us maintain top quality in Patna.');
                    }}
                    className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs uppercase cursor-pointer"
                  >
                    Submit 5-Star Review
                  </button>
                </div>
              )}
            </>
          )}

          {/* TAB 2: INVOICE RECEIPT */}
          {activeTab === 'invoice' && (
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-3xl space-y-6 text-xs text-slate-700 font-sans">
              <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                  <div className="text-lg font-black text-[#061426] tracking-tight">BRENTRA FACILITY</div>
                  <div className="text-[11px] text-slate-500">Brentra Ventures Private Limited</div>
                  <div className="text-[11px] text-slate-500">CIN: U45309BR2024PTC068944 | GSTIN: 10AABCB9482Q1Z3</div>
                  <div className="text-[11px] text-slate-500">Preven Vila, Flat 34, New Khajoorbana, Patna - 800006</div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-bold text-[#0788FF]">TAX INVOICE</div>
                  <div className="font-mono text-slate-900 font-semibold">{booking.id}</div>
                  <div className="text-slate-500">{new Date(booking.createdAt).toLocaleDateString('en-IN')}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="font-bold text-slate-900 mb-1">Billed To:</div>
                  <div className="text-slate-800 font-semibold">{booking.customer.fullName}</div>
                  <div>{booking.customer.flatHouseNo}, {booking.customer.locality}</div>
                  <div>Patna, Bihar - {booking.customer.pincode}</div>
                  <div>Phone: {booking.customer.phone}</div>
                </div>

                <div className="text-right">
                  <div className="font-bold text-slate-900 mb-1">Service Details:</div>
                  <div>Slot: {booking.slotDate}</div>
                  <div>Window: {booking.slotTime}</div>
                  <div>Payment Mode: {booking.paymentMethod.replace(/_/g, ' ')}</div>
                  <div>Status: <span className="uppercase font-bold text-emerald-600">{booking.paymentStatus}</span></div>
                </div>
              </div>

              {/* Invoice table */}
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-300 text-slate-500 text-[11px]">
                    <th className="py-2">Service Item</th>
                    <th className="py-2 text-center">Qty</th>
                    <th className="py-2 text-right">Rate</th>
                    <th className="py-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {booking.items.map((item, i) => (
                    <tr key={i}>
                      <td className="py-2.5 font-medium text-slate-800">
                        {item.serviceName}
                        {item.addons && item.addons.length > 0 && (
                          <div className="text-[10px] text-slate-500">
                            + Add-ons: {item.addons.map(a => a.name).join(', ')}
                          </div>
                        )}
                      </td>
                      <td className="py-2.5 text-center">{item.quantity}</td>
                      <td className="py-2.5 text-right">₹{item.price}</td>
                      <td className="py-2.5 text-right font-semibold">₹{item.price * item.quantity}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={3} className="py-2 text-right text-slate-500">Safety & Platform Fee</td>
                    <td className="py-2 text-right font-medium">₹{booking.serviceFee}</td>
                  </tr>
                  {booking.discount > 0 && (
                    <tr>
                      <td colSpan={3} className="py-2 text-right text-emerald-600">Promo Discount ({booking.promoCode})</td>
                      <td className="py-2 text-right text-emerald-600 font-semibold">-₹{booking.discount}</td>
                    </tr>
                  )}
                  <tr className="border-t-2 border-slate-900 text-sm font-extrabold text-[#061426]">
                    <td colSpan={3} className="py-3 text-right">Net Grand Total</td>
                    <td className="py-3 text-right">₹{booking.totalAmount}</td>
                  </tr>
                </tbody>
              </table>

              <div className="p-3 rounded-xl bg-slate-100 text-[10px] text-slate-500 text-center">
                This is a computer-generated invoice and does not require a physical signature. 30-Day service warranty valid under Brentra Facility terms.
              </div>

              <div className="text-center">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-xl bg-[#061426] hover:bg-[#1E3E62] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" /> Print or Download PDF Invoice
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: BOOKINGS HISTORY */}
          {activeTab === 'history' && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                All Bookings Associated with This Device
              </h3>

              {allBookings.map((b) => (
                <div 
                  key={b.id}
                  onClick={() => {
                    onSelectBooking(b);
                    setActiveTab('track');
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    b.id === booking.id ? 'border-[#0788FF] bg-blue-50/60 shadow-sm' : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-xs text-[#061426]">#{b.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                        {b.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-slate-800 font-medium mt-1">
                      {b.items.map(i => i.serviceName).join(', ')}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {b.slotDate} • {b.slotTime} • {b.customer.locality}
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-extrabold text-[#061426]">₹{b.totalAmount}</div>
                    <div className="text-[11px] text-[#0788FF] flex items-center gap-1 font-semibold justify-end mt-1">
                      <span>View</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer controls: quick simulated status changer for demo/testing + contact */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-slate-500 font-medium">Demo Simulator:</span>
            <select
              value={booking.status}
              onChange={(e) => onUpdateStatus(booking.id, e.target.value as BookingStatus)}
              className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-800 text-[11px] font-semibold cursor-pointer"
            >
              <option value="confirmed">Confirmed</option>
              <option value="pro_assigned">Specialist Assigned</option>
              <option value="on_the_way">On The Way</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:+919065296294"
              className="text-slate-700 hover:text-black font-semibold flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-[#0788FF]" /> +91-90652-96294
            </a>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#061426] text-white font-bold hover:bg-[#1E3E62] transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
