import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Lock, 
  Key, 
  CheckCircle2, 
  Clock, 
  Phone, 
  Truck, 
  Wrench, 
  RefreshCw,
  Search,
  Filter,
  AlertCircle,
  Eye,
  Edit3
} from 'lucide-react';
import { SITE_CONFIG } from '../config/site';
import { supabase } from '../lib/supabase';

interface LeadRecord {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  vertical: string;
  type: string;
  location_name: string;
  details?: string;
  status: string;
  created_at: string;
}

interface BookingRecord {
  id: string;
  customer_name: string;
  phone: string;
  address: string;
  locality?: string;
  pincode: string;
  slot_date: string;
  slot_time: string;
  status: string;
  total_amount: number;
  payment_method: string;
  payment_status: string;
  technician_name?: string;
  technician_phone?: string;
  created_at: string;
  items?: any[];
}

export const AdminPage: React.FC = () => {
  const [adminKey, setAdminKey] = useState<string>('brentra_admin_secret_2026_patna');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<'bookings' | 'leads' | 'telemetry'>('bookings');
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Technician assignment state
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [selectedTechId, setSelectedTechId] = useState<string>('tech-101');
  const [isAssigning, setIsAssigning] = useState<boolean>(false);

  // OTP Verification state
  const [otpVerifyBookingId, setOtpVerifyBookingId] = useState<string | null>(null);
  const [verifyOtpInput, setVerifyOtpInput] = useState<string>('');
  const [otpVerifyError, setOtpVerifyError] = useState<string | null>(null);
  const [otpVerifySuccess, setOtpVerifySuccess] = useState<string | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const fetchAdminData = async (key: string) => {
    setIsLoading(true);
    setAuthError(null);

    try {
      const [bookingsRes, leadsRes] = await Promise.all([
        fetch(`${apiUrl}/api/admin/bookings`, { headers: { 'X-Admin-Key': key } }),
        fetch(`${apiUrl}/api/admin/leads`, { headers: { 'X-Admin-Key': key } })
      ]);

      if (!bookingsRes.ok || !leadsRes.ok) {
        throw new Error('Authentication failed: Invalid administrator credentials');
      }

      const bookingsData = await bookingsRes.json();
      const leadsData = await leadsRes.json();

      setBookings(bookingsData.bookings || []);
      setLeads(leadsData.leads || []);
      setIsAuthenticated(true);
    } catch (err: any) {
      setAuthError(err.message || 'Authorization failed. Please check your admin key.');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchAdminData(adminKey.trim());
  };

  // Realtime Live Subscription: Auto-updates on database events
  useEffect(() => {
    if (!isAuthenticated) return;

    const channel = supabase
      .channel('admin-realtime-feed')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'facility_bookings' },
        (payload) => {
          console.log('⚡ Realtime Booking Change:', payload);
          fetchAdminData(adminKey);
        }
      )
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'leads' },
        (payload) => {
          console.log('⚡ Realtime Lead Change:', payload);
          fetchAdminData(adminKey);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAuthenticated, adminKey]);

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/admin/bookings/${bookingId}/status`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey
        },
        body: JSON.stringify({ status: newStatus, note: `Manual status update by admin to ${newStatus}` })
      });
      if (res.ok) {
        fetchAdminData(adminKey);
      }
    } catch (err) {
      console.error('Error changing status:', err);
    }
  };

  const handleAssignTechnician = async (bookingId: string) => {
    setIsAssigning(true);
    try {
      const res = await fetch(`${apiUrl}/api/admin/bookings/${bookingId}/assign`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey
        },
        body: JSON.stringify({ technicianId: selectedTechId })
      });
      if (res.ok) {
        setSelectedBookingId(null);
        fetchAdminData(adminKey);
      }
    } catch (err) {
      console.error('Error assigning technician:', err);
    } finally {
      setIsAssigning(false);
    }
  };

  const handleVerifyOtp = async (bookingId: string) => {
    setOtpVerifyError(null);
    setOtpVerifySuccess(null);

    try {
      const res = await fetch(`${apiUrl}/api/admin/bookings/${bookingId}/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey
        },
        body: JSON.stringify({ otp: verifyOtpInput })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setOtpVerifySuccess('OTP verified successfully! Order marked as In Progress.');
        setTimeout(() => {
          setOtpVerifyBookingId(null);
          setVerifyOtpInput('');
          setOtpVerifySuccess(null);
          fetchAdminData(adminKey);
        }, 1200);
      } else {
        setOtpVerifyError(data.error || 'Invalid OTP code.');
      }
    } catch (err: any) {
      setOtpVerifyError('Verification failed. Server unreachable.');
    }
  };

  const handleLeadStatusChange = async (leadId: string, newStatus: string) => {
    try {
      const res = await fetch(`${apiUrl}/api/admin/leads/${leadId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchAdminData(adminKey);
      }
    } catch (err) {
      console.error('Error updating lead status:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-950 px-4 py-16">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mb-6">
            <Lock className="w-7 h-7" />
          </div>

          <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-500 block">
            Authorized Personnel Only
          </span>
          <h1 className="text-2xl font-bold text-white mt-1 font-['Outfit']">
            Operations & Dispatch Console
          </h1>
          <p className="text-xs text-slate-400 mt-2">
            Enter your cryptographically assigned administrator API key to access live order dispatching, lead review, and doorstep OTP verification.
          </p>

          {authError && (
            <div className="mt-4 p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Admin Secret Key (X-Admin-Key)
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="password"
                  required
                  value={adminKey}
                  onChange={(e) => setAdminKey(e.target.value)}
                  placeholder="Enter secret key..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white text-xs font-mono focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate Console</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-500">
            Patna Operations Desk • Server: {apiUrl}
          </div>
        </div>
      </div>
    );
  }

  // Filtered Bookings
  const filteredBookings = bookings.filter(b => {
    const matchesFilter = statusFilter === 'all' || b.status === statusFilter;
    const matchesSearch = 
      b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.customer_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      (b.locality && b.locality.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Top Header */}
      <div className="bg-slate-900 border-b border-slate-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md">
              <LayoutDashboard className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-amber-400 uppercase tracking-wider">
                BRENTRA OPERATIONS CONSOLE
              </div>
              <h1 className="text-lg font-bold text-white font-['Outfit']">
                Patna Central Dispatch Management
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchAdminData(adminKey)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={() => setIsAuthenticated(false)}
              className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800/60 text-rose-300 text-xs font-semibold transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-4 text-xs font-bold border-t border-slate-800">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'bookings' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Facility Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-3 border-b-2 transition-colors ${
              activeTab === 'leads' ? 'border-amber-500 text-amber-400' : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Enterprise Leads ({leads.length})
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* TAB 1: BOOKINGS */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by ID, customer name, phone, or locality..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-400">Status:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pro_assigned">Pro Assigned</option>
                  <option value="on_the_way">On The Way</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Booking ID</th>
                      <th className="py-3.5 px-4">Customer & Location</th>
                      <th className="py-3.5 px-4">Scheduled Slot</th>
                      <th className="py-3.5 px-4">Total Amount</th>
                      <th className="py-3.5 px-4">Technician</th>
                      <th className="py-3.5 px-4">Status & Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {filteredBookings.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-8 text-center text-slate-500">
                          No bookings matching criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredBookings.map((b) => (
                        <tr key={b.id} className="hover:bg-slate-800/40 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                            #{b.id}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{b.customer_name}</div>
                            <div className="text-[11px] text-slate-400">{b.phone}</div>
                            <div className="text-[11px] text-slate-500 truncate max-w-xs">{b.address}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-slate-200">{b.slot_date}</div>
                            <div className="text-[11px] text-slate-400">{b.slot_time}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-100">
                            ₹{b.total_amount}
                            <span className="block text-[10px] text-slate-500 uppercase font-normal">{b.payment_method}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            {b.technician_name ? (
                              <div>
                                <span className="font-semibold text-emerald-400">{b.technician_name}</span>
                                <span className="block text-[10px] text-slate-400">{b.technician_phone}</span>
                              </div>
                            ) : (
                              <button
                                onClick={() => setSelectedBookingId(b.id)}
                                className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 border border-amber-500/30 hover:bg-amber-500/20 text-[11px] font-semibold"
                              >
                                + Assign Pro
                              </button>
                            )}
                          </td>
                          <td className="py-3.5 px-4 space-y-1.5">
                            <div className="flex items-center gap-2">
                              <select
                                value={b.status}
                                onChange={(e) => handleStatusChange(b.id, e.target.value)}
                                className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200"
                              >
                                <option value="confirmed">confirmed</option>
                                <option value="pro_assigned">pro_assigned</option>
                                <option value="on_the_way">on_the_way</option>
                                <option value="in_progress">in_progress</option>
                                <option value="completed">completed</option>
                                <option value="cancelled">cancelled</option>
                              </select>
                            </div>

                            {/* Doorstep OTP Verification button */}
                            {b.status !== 'completed' && b.status !== 'cancelled' && (
                              <button
                                onClick={() => {
                                  setOtpVerifyBookingId(b.id);
                                  setVerifyOtpInput('');
                                  setOtpVerifyError(null);
                                  setOtpVerifySuccess(null);
                                }}
                                className="block text-[10px] text-cyan-400 hover:text-cyan-300 font-mono font-semibold"
                              >
                                [Verify Doorstep OTP]
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: LEADS */}
        {activeTab === 'leads' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-300">
                <thead className="bg-slate-950/80 text-slate-400 uppercase font-mono text-[10px] border-b border-slate-800">
                  <tr>
                    <th className="py-3.5 px-4">Lead ID</th>
                    <th className="py-3.5 px-4">Client Name & Phone</th>
                    <th className="py-3.5 px-4">Vertical</th>
                    <th className="py-3.5 px-4">Location</th>
                    <th className="py-3.5 px-4">Project Details</th>
                    <th className="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {leads.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-slate-500">
                        No leads currently recorded.
                      </td>
                    </tr>
                  ) : (
                    leads.map((l) => (
                      <tr key={l.id} className="hover:bg-slate-800/40 transition-colors">
                        <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                          #{l.id}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold text-white">{l.full_name}</div>
                          <div className="text-[11px] text-slate-400">{l.phone}</div>
                          {l.email && <div className="text-[10px] text-slate-500">{l.email}</div>}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[11px]">
                            {l.vertical}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-300">
                          {l.location_name}
                        </td>
                        <td className="py-3.5 px-4 max-w-xs text-slate-400 truncate">
                          {l.details || 'No additional notes provided'}
                        </td>
                        <td className="py-3.5 px-4">
                          <select
                            value={l.status}
                            onChange={(e) => handleLeadStatusChange(l.id, e.target.value)}
                            className="px-2 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs font-semibold text-slate-200"
                          >
                            <option value="PENDING_REVIEW">PENDING_REVIEW</option>
                            <option value="CONTACTED">CONTACTED</option>
                            <option value="QUOTED">QUOTED</option>
                            <option value="WON">WON</option>
                            <option value="LOST">LOST</option>
                          </select>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal: Assign Technician */}
      {selectedBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-white">
            <h3 className="font-bold text-base font-['Outfit'] mb-2">
              Assign Technician to #{selectedBookingId}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Select verified Patna specialist for this service slot:
            </p>

            <select
              value={selectedTechId}
              onChange={(e) => setSelectedTechId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs mb-4 text-white"
            >
              <option value="tech-101">Rakesh Kumar Sharma (HVAC & AC Pro)</option>
              <option value="tech-102">Sunita Devi (Bridal & Salon Pro)</option>
              <option value="tech-103">Manoj Paswan (Deep Clean & Sanitation)</option>
              <option value="tech-104">Amitabh Verma (RO & Membrane Pro)</option>
              <option value="tech-105">Md. Tariq Anwar (Master Barber)</option>
            </select>

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setSelectedBookingId(null)}
                className="px-3.5 py-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleAssignTechnician(selectedBookingId)}
                disabled={isAssigning}
                className="px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Doorstep OTP Verification */}
      {otpVerifyBookingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl text-white">
            <h3 className="font-bold text-base font-['Outfit'] mb-2">
              Verify Doorstep OTP for #{otpVerifyBookingId}
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter the 4-digit code provided by the customer at the doorstep:
            </p>

            {otpVerifyError && (
              <div className="p-2.5 rounded-lg bg-rose-950/80 border border-rose-800 text-rose-300 text-xs mb-3">
                {otpVerifyError}
              </div>
            )}
            {otpVerifySuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs mb-3">
                {otpVerifySuccess}
              </div>
            )}

            <input
              type="text"
              maxLength={4}
              value={verifyOtpInput}
              onChange={(e) => setVerifyOtpInput(e.target.value)}
              placeholder="e.g. 4819"
              className="w-full text-center tracking-widest font-mono text-xl py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white mb-4 focus:outline-none focus:border-cyan-400"
            />

            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setOtpVerifyBookingId(null)}
                className="px-3.5 py-2 rounded-lg bg-slate-800 text-xs text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </button>
              <button
                onClick={() => handleVerifyOtp(otpVerifyBookingId)}
                className="px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs"
              >
                Verify Code & Start
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;

