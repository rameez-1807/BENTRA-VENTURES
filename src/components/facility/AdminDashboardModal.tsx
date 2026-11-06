import React, { useState } from 'react';
import { 
  X, 
  LayoutDashboard, 
  TrendingUp, 
  Users, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  UserCheck, 
  Edit3, 
  Save, 
  Search, 
  Filter,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import { BookingOrder, BookingStatus, ServiceItem, Technician } from '../../types/facility';
import { MOCK_TECHNICIANS } from '../../data/facilityData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: BookingOrder[];
  services: ServiceItem[];
  onUpdateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  onAssignTechnician: (bookingId: string, tech: Technician) => void;
  onUpdateServicePrice: (serviceId: string, newPrice: number) => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({
  isOpen,
  onClose,
  bookings,
  services,
  onUpdateBookingStatus,
  onAssignTechnician,
  onUpdateServicePrice
}) => {
  const [tab, setTab] = useState<'orders' | 'catalog' | 'team'>('orders');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [assigningBookingId, setAssigningBookingId] = useState<string | null>(null);

  // Price editor temporary state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editPriceVal, setEditPriceVal] = useState<number>(0);

  if (!isOpen) return null;

  // Analytics Metrics
  const totalBookings = bookings.length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.status !== 'cancelled' ? b.totalAmount : 0), 0);
  const activeDispatches = bookings.filter(b => ['confirmed', 'pro_assigned', 'on_the_way', 'in_progress'].includes(b.status)).length;
  const completedJobs = bookings.filter(b => b.status === 'completed').length;

  const filteredBookings = bookings.filter(b => {
    const matchesFilter = filterStatus === 'all' || b.status === filterStatus;
    const matchesSearch = 
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.items.some(i => i.serviceName.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const handleStartEdit = (srv: ServiceItem) => {
    setEditingServiceId(srv.id);
    setEditPriceVal(srv.price);
  };

  const handleSavePrice = (srvId: string) => {
    onUpdateServicePrice(srvId, editPriceVal);
    setEditingServiceId(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-100 bg-[#061426] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0788FF] text-white flex items-center justify-center font-bold">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-blue-400 font-mono font-bold uppercase tracking-wider">
                BRENTRA FACILITY CENTRAL DESK
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white font-heading">
                Operations & Dispatch Management Platform
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top KPIs Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-slate-50 border-b border-slate-200">
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] text-slate-500 font-medium">Total Bookings</div>
            <div className="text-xl font-black text-[#061426] mt-0.5">{totalBookings}</div>
            <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">+100% Patna Growth</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] text-slate-500 font-medium">Platform GMV</div>
            <div className="text-xl font-black text-[#061426] mt-0.5">₹{totalRevenue.toLocaleString()}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Direct + Cash Collections</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] text-slate-500 font-medium">Active Dispatches</div>
            <div className="text-xl font-black text-[#0788FF] mt-0.5">{activeDispatches}</div>
            <div className="text-[10px] text-blue-600 font-semibold mt-0.5">Real-time on field</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
            <div className="text-[11px] text-slate-500 font-medium">Completed Jobs</div>
            <div className="text-xl font-black text-emerald-600 mt-0.5">{completedJobs}</div>
            <div className="text-[10px] text-slate-500 mt-0.5">30-Day Warranty Active</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white px-4 text-xs font-bold text-slate-600">
          <button
            onClick={() => setTab('orders')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              tab === 'orders' ? 'border-[#0788FF] text-[#0788FF]' : 'border-transparent hover:text-slate-900'
            }`}
          >
            Live Bookings & Dispatch ({bookings.length})
          </button>
          <button
            onClick={() => setTab('catalog')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              tab === 'catalog' ? 'border-[#0788FF] text-[#0788FF]' : 'border-transparent hover:text-slate-900'
            }`}
          >
            Service Rates & Catalogue ({services.length})
          </button>
          <button
            onClick={() => setTab('team')}
            className={`py-3 px-4 border-b-2 transition-colors cursor-pointer ${
              tab === 'team' ? 'border-[#0788FF] text-[#0788FF]' : 'border-transparent hover:text-slate-900'
            }`}
          >
            Verified Field Specialists ({MOCK_TECHNICIANS.length})
          </button>
        </div>

        {/* Main Body */}
        <div className="p-5 overflow-y-auto flex-grow space-y-4">
          
          {/* TAB 1: ORDERS */}
          {tab === 'orders' && (
            <div className="space-y-4">
              
              {/* Search & Filter Bar */}
              <div className="flex flex-col sm:flex-row gap-3 items-center justify-between">
                <div className="relative w-full sm:w-72">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search ID, customer, locality..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:outline-none focus:border-[#0788FF]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <Filter className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white text-xs font-semibold text-slate-700 cursor-pointer"
                  >
                    <option value="all">All Statuses</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="pro_assigned">Specialist Assigned</option>
                    <option value="on_the_way">On The Way</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-2xl bg-white shadow-sm">
                <table className="w-full text-left border-collapse text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase text-[10px]">
                    <tr>
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer & Contact</th>
                      <th className="p-3">Services</th>
                      <th className="p-3">Slot Date / Time</th>
                      <th className="p-3">Amount</th>
                      <th className="p-3">Assigned Specialist</th>
                      <th className="p-3">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="p-8 text-center text-slate-400">
                          No matching orders found.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                          <td className="p-3 font-mono font-bold text-slate-900">
                            {b.id}
                            <div className="text-[10px] text-slate-400 font-sans">
                              OTP: {b.otpCode}
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-slate-900">{b.customer.fullName}</div>
                            <div className="text-[11px] text-slate-500">{b.customer.phone}</div>
                            <div className="text-[10px] text-slate-400">{b.customer.locality}</div>
                          </td>
                          <td className="p-3 max-w-[180px]">
                            <div className="truncate font-medium text-slate-800">
                              {b.items.map(i => `${i.quantity}x ${i.serviceName}`).join(', ')}
                            </div>
                            <div className="text-[10px] text-slate-500">
                              {b.items.reduce((acc, i) => acc + (i.addons ? i.addons.length : 0), 0)} add-ons
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-semibold text-slate-800">{b.slotDate}</div>
                            <div className="text-[10px] text-slate-500">{b.slotTime}</div>
                          </td>
                          <td className="p-3 font-bold text-[#061426]">
                            ₹{b.totalAmount}
                            <div className="text-[10px] text-slate-400 font-normal capitalize">
                              {b.paymentMethod.replace(/_/g, ' ')}
                            </div>
                          </td>
                          <td className="p-3">
                            {b.technician ? (
                              <div className="flex items-center gap-2">
                                <img 
                                  src={b.technician.avatar} 
                                  alt="" 
                                  className="w-6 h-6 rounded-full object-cover" 
                                />
                                <div>
                                  <div className="font-semibold text-slate-800">{b.technician.name}</div>
                                  <button
                                    onClick={() => setAssigningBookingId(b.id)}
                                    className="text-[10px] text-[#0788FF] hover:underline cursor-pointer"
                                  >
                                    Reassign
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                onClick={() => setAssigningBookingId(b.id)}
                                className="px-2 py-1 rounded-md bg-blue-50 text-[#0788FF] font-bold text-[10px] hover:bg-blue-100 cursor-pointer"
                              >
                                + Assign Specialist
                              </button>
                            )}
                          </td>
                          <td className="p-3">
                            <select
                              value={b.status}
                              onChange={(e) => onUpdateBookingStatus(b.id, e.target.value as BookingStatus)}
                              className="px-2 py-1 rounded-lg border border-slate-300 bg-white text-[11px] font-semibold text-slate-800 cursor-pointer"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="pro_assigned">Assigned</option>
                              <option value="on_the_way">On The Way</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Technician Assignment Sub-Modal */}
              {assigningBookingId && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#061426]">
                      Assign Field Specialist to Order #{assigningBookingId}
                    </span>
                    <button
                      onClick={() => setAssigningBookingId(null)}
                      className="text-xs font-bold text-slate-500 hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {MOCK_TECHNICIANS.map((tech) => (
                      <div
                        key={tech.id}
                        onClick={() => {
                          onAssignTechnician(assigningBookingId, tech);
                          setAssigningBookingId(null);
                        }}
                        className="p-3 rounded-xl bg-white border border-slate-200 hover:border-[#0788FF] cursor-pointer transition-all flex items-center gap-3"
                      >
                        <img src={tech.avatar} alt="" className="w-9 h-9 rounded-xl object-cover" />
                        <div className="flex-1">
                          <div className="font-bold text-xs text-slate-900">{tech.name}</div>
                          <div className="text-[10px] text-slate-500">{tech.specialization}</div>
                          <div className="text-[10px] text-amber-500 font-bold">★ {tech.rating}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

          {/* TAB 2: SERVICE CATALOG & PRICING */}
          {tab === 'catalog' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    Live Consumer Rate Cards
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Click edit to modify launch rates. Changes reflect instantly on customer booking screens.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {services.map((srv) => (
                  <div 
                    key={srv.id} 
                    className="p-4 rounded-2xl border border-slate-200 bg-white shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <img 
                        src={srv.image} 
                        alt="" 
                        className="w-12 h-12 rounded-xl object-cover" 
                      />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{srv.name}</h4>
                        <div className="text-[10px] text-slate-500 capitalize">{srv.categoryId.replace('-', ' ')} • {srv.durationMins} mins</div>
                        <div className="text-xs font-bold text-slate-900 mt-1">
                          Current Price: <span className="text-[#0788FF]">₹{srv.price}</span>
                          <span className="text-slate-400 line-through text-[10px] ml-1.5">₹{srv.originalPrice}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      {editingServiceId === srv.id ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold">₹</span>
                          <input
                            type="number"
                            value={editPriceVal}
                            onChange={(e) => setEditPriceVal(Number(e.target.value))}
                            className="w-20 px-2 py-1 rounded border border-slate-300 text-xs font-bold"
                          />
                          <button
                            onClick={() => handleSavePrice(srv.id)}
                            className="p-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                          >
                            <Save className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleStartEdit(srv)}
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" /> Edit Rate
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: FIELD TEAM */}
          {tab === 'team' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Active Patna Field Specialists
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {MOCK_TECHNICIANS.map((tech) => (
                  <div key={tech.id} className="p-4 rounded-2xl border border-slate-200 bg-white space-y-3 shadow-sm">
                    <div className="flex items-center gap-3">
                      <img src={tech.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <h4 className="font-bold text-xs text-slate-900">{tech.name}</h4>
                        <div className="text-[11px] text-[#0788FF] font-medium">{tech.specialization}</div>
                        <div className="text-[10px] text-slate-500 font-mono">{tech.vehicleNo || 'Two-wheeler'}</div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-100 grid grid-cols-3 text-center text-[11px]">
                      <div>
                        <div className="font-bold text-slate-900">★ {tech.rating}</div>
                        <div className="text-[9px] text-slate-400">Rating</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{tech.jobsCompleted}+</div>
                        <div className="text-[9px] text-slate-400">Jobs</div>
                      </div>
                      <div>
                        <div className="font-bold text-slate-900">{tech.experienceYears} Yrs</div>
                        <div className="text-[9px] text-slate-400">Experience</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[11px] pt-1">
                      <span className="flex items-center gap-1 text-emerald-600 font-bold">
                        <ShieldCheck className="w-3.5 h-3.5" /> Police Verified
                      </span>
                      <a href={`tel:${tech.phone}`} className="text-[#0788FF] font-semibold hover:underline">
                        Call {tech.phone.slice(-4)}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500">
          <div>
            Data synchronizes with local storage. Dispatches reflect instantly in customer timeline.
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#061426] text-white font-bold hover:bg-[#1E3E62] transition-colors cursor-pointer"
          >
            Close Desk
          </button>
        </div>

      </div>
    </div>
  );
};
