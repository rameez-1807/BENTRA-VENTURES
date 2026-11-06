import React, { useState } from 'react';
import { 
  Users, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Clock, 
  FileCheck2, 
  MessageSquare, 
  Wrench, 
  Building2, 
  AlertCircle,
  Award,
  RefreshCw
} from 'lucide-react';

interface ManpowerServicesPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const ManpowerServicesPage: React.FC<ManpowerServicesPageProps> = ({ onOpenQuoteModal }) => {
  // Dedicated Manpower Enquiry Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [siteLocation, setSiteLocation] = useState('');
  const [staffCategory, setStaffCategory] = useState('Security Guard');
  const [numWorkers, setNumWorkers] = useState('2');
  const [shiftReq, setShiftReq] = useState('Day Shift (8 Hours)');
  const [additionalRequirements, setAdditionalRequirements] = useState('');
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);

  // Official Verified Monthly Rate Card from Flyer (Section 01)
  const manpowerRates = [
    { category: 'Sweeper / Cleaner', monthlyRate: '₹15,500', roleType: 'Unskilled / Semi-skilled', desc: 'Daily floor cleaning, mopping, waste segregation and disposal' },
    { category: 'Housekeeping Staff', monthlyRate: '₹16,000', roleType: 'Semi-skilled', desc: 'Commercial & residential deep cleaning, pantry care & hygiene' },
    { category: 'Gardener (Mali)', monthlyRate: '₹16,500', roleType: 'Skilled Maintenance', desc: 'Lawn trimming, plant pruning, watering & landscape upkeep' },
    { category: 'Gatekeeper', monthlyRate: '₹17,500', roleType: 'Access Control', desc: 'Visitor log maintenance, gate opening & perimeter surveillance' },
    { category: 'Security Guard', monthlyRate: '₹18,500', roleType: 'Security Services', desc: 'Uniformed, trained security guard for societies, offices & banks' },
    { category: 'Pump Operator', monthlyRate: '₹18,500', roleType: 'Technical Operations', desc: 'Borewell pump, water booster, level monitoring & valve management' },
    { category: 'Lift Operator', monthlyRate: '₹18,500', roleType: 'Building Operations', desc: 'Commercial lift handling, safety checks & emergency protocol' },
    { category: 'Electrician', monthlyRate: '₹22,000', roleType: 'Certified Technical', desc: 'Wiring, MCB panels, DG switchover, internal building electricals' },
    { category: 'Plumber', monthlyRate: '₹22,000', roleType: 'Certified Technical', desc: 'Pipeline maintenance, motor connections, drainage & leak repairs' },
    { category: 'Housekeeping Supervisor', monthlyRate: '₹25,000', roleType: 'Supervisory', desc: 'Attendance management, quality audit, hygiene inspection checklist' },
    { category: 'Security Supervisor', monthlyRate: '₹26,000', roleType: 'Supervisory', desc: 'Guard roster management, night vigilance, emergency drill protocol' },
    { category: 'Facility Supervisor', monthlyRate: '₹28,000', roleType: 'Management', desc: 'Overall facility SLA tracking, tenant coordination, vendor liaison' },
    { category: 'Facility Manager', monthlyRate: '₹40,000+', roleType: 'Executive', desc: 'End-to-end building administration, statutory compliance & budgeting' },
  ];

  // Core Service Pillars
  const servicesList = [
    {
      title: 'Skilled & Unskilled Manpower',
      desc: 'Screened and trained workforce for industrial, commercial, and residential deployments across Patna and Bihar.',
      icon: Users
    },
    {
      title: 'Housekeeping Staff & Cleaners',
      desc: 'Uniformed cleaners for daily sanitation, glass cleaning, floor scrubbing, and waste management.',
      icon: Sparkles
    },
    {
      title: 'Security Guards & Gatekeepers',
      desc: 'Disciplined, background-verified security guards with 24/7 day and night vigilance shifts.',
      icon: ShieldCheck
    },
    {
      title: 'Electricians, Plumbers & Technicians',
      desc: 'Certified technical crew for continuous electrical, plumbing, and pump maintenance.',
      icon: Wrench
    },
    {
      title: 'Gardeners, Operators & Supervisors',
      desc: 'Horticulturists, pump & lift operators, plus on-ground supervisors ensuring flawless execution.',
      icon: Building2
    },
    {
      title: 'Staff Replacement Coordination',
      desc: 'Guaranteed backup roster and zero-delay replacement coordination whenever assigned staff takes leave.',
      icon: RefreshCw
    }
  ];

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquirySubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `*BRENTRA MANPOWER ENQUIRY*%0A` +
      `--------------------------------%0A` +
      `*Name:* ${clientName || 'Client'}%0A` +
      `*Phone:* ${clientPhone || 'Not provided'}%0A` +
      `*Site Location:* ${siteLocation || 'Patna/Bihar'}%0A` +
      `*Category Required:* ${staffCategory}%0A` +
      `*Number of Staff:* ${numWorkers}%0A` +
      `*Shift:* ${shiftReq}%0A` +
      `*Notes:* ${encodeURIComponent(additionalRequirements || 'Need manpower deployment quotation.')}`;
    return `https://wa.me/919142144940?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-widest">
              <Users className="w-4 h-4 text-blue-700" /> Division 01 • Brentra Facility Care
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" /> 100% Police & Skill Verified
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.12]">
                Manpower Supply & Housekeeping Services
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mt-5 leading-relaxed">
                Reliable, skilled, and disciplined workforce for residential societies, commercial complexes, hospitals, corporate offices, and institutions across Patna and Bihar. Complete replacement guarantee included.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-8">
                <a
                  href="#pricing-table"
                  className="px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                >
                  <span>View Monthly Rate Card</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#manpower-enquiry"
                  className="px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Request Staff Deployment</span>
                </a>
                <a
                  href="tel:9065296294"
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>Call: 9065296294</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">100%</div>
                  <div className="text-xs text-slate-500 mt-0.5">Verified Identity</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">Zero Delay</div>
                  <div className="text-xs text-slate-500 mt-0.5">Replacement Roster</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">Uniformed</div>
                  <div className="text-xs text-slate-500 mt-0.5">& ID Badge Staff</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">Patna Metro</div>
                  <div className="text-xs text-slate-500 mt-0.5">Rapid Deployment</div>
                </div>
              </div>
            </div>

            {/* Manpower Visual Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group">
                <img 
                  src="/img-manpower.jpg" 
                  alt="Brentra Uniformed Manpower & Housekeeping Team" 
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="px-3 py-1 rounded bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wider w-max mb-2">
                    Skilled & Disciplined
                  </span>
                  <h3 className="text-xl font-bold text-white">Professional Facility Workforce</h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Security personnel, housekeeping professionals, pump operators, and electricians stationed on-site.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-widest px-3 py-1 rounded bg-blue-50 border border-blue-200">
              Complete Manpower Solutions
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Workforce Categories & Coverage
            </h2>
            <p className="text-sm text-slate-600">
              We cater to residential housing societies, corporate complexes, hospitals, and educational campuses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesList.map((service, idx) => {
              const Icon = service.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200 hover:border-blue-400 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#0A192F] group-hover:text-blue-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Daily & Shift Roster</span>
                    <a
                      href="#manpower-enquiry"
                      className="text-blue-700 hover:text-blue-900 font-bold"
                    >
                      Enquire Now →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Official Verified Monthly Pricing Table (Section 01 of Flyer) */}
      <section id="pricing-table" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-widest px-3 py-1 rounded bg-blue-50 border border-blue-200">
              Official Category Rates
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Monthly Manpower Rate Card
            </h2>
            <p className="text-sm text-slate-600">
              Transparent, category-wise monthly rates as verified from the Brentra Ventures brochure.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0A192F] text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Service Category</th>
                    <th className="py-4 px-6">Classification</th>
                    <th className="py-4 px-6">Official Monthly Rate (₹)</th>
                    <th className="py-4 px-6">Key Responsibilities</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-sans">
                  {manpowerRates.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-blue-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
                    >
                      <td className="py-3.5 px-6 font-bold text-[#0A192F]">
                        {item.category}
                      </td>
                      <td className="py-3.5 px-6 text-slate-500 font-medium">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px]">
                          {item.roleType}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 font-mono font-extrabold text-blue-900 text-sm whitespace-nowrap">
                        {item.monthlyRate}
                      </td>
                      <td className="py-3.5 px-6 text-slate-600">
                        {item.desc}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <a
                          href="#manpower-enquiry"
                          onClick={() => setStaffCategory(item.category)}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-[#0A192F] text-blue-800 hover:text-white font-bold text-[11px] transition-colors inline-block"
                        >
                          Select Role
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap justify-between items-center gap-2">
              <span>* Rates are indicative. Statutory costs, overtime, uniforms, equipment, GST etc. will be extra.</span>
              <span className="font-semibold text-blue-800">For custom headcounts: Contact Us for Manpower Pricing</span>
            </div>
          </div>

        </div>
      </section>

      {/* Dedicated Manpower Enquiry Form */}
      <section id="manpower-enquiry" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">
              <Users className="w-4 h-4 text-blue-600" /> Dedicated Staffing Roster Request
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F] mb-2">
              Manpower Deployment Enquiry Form
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-8">
              Submit your required workforce categories and site specifications below. Our facility coordinator will contact you immediately.
            </p>

            {enquirySubmitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md mx-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-heading font-bold text-xl text-slate-900">Requirement Registered!</h3>
                <p className="text-xs text-slate-600">
                  Thank you, <strong className="text-slate-900">{clientName}</strong>. A quote for <strong className="text-slate-900">{numWorkers}x {staffCategory}</strong> at <strong className="text-slate-900">{siteLocation}</strong> has been assigned to our operations team. We will call you on <strong className="text-slate-900">{clientPhone}</strong>.
                </p>
                <div className="pt-2 flex flex-col sm:flex-row gap-2 justify-center">
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
                  >
                    <MessageSquare className="w-4 h-4" /> Open in WhatsApp
                  </a>
                  <button
                    onClick={() => setEnquirySubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name / Contact Person *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Anand Sharma"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      placeholder="e.g. 9065296294"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Primary Staff Category Required *</label>
                    <select
                      value={staffCategory}
                      onChange={(e) => setStaffCategory(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    >
                      {manpowerRates.map((r, i) => (
                        <option key={i} value={r.category}>
                          {r.category} ({r.monthlyRate}/mo)
                        </option>
                      ))}
                      <option value="Multiple Categories / Complete Facility Crew">Multiple Categories (Combined Facility Crew)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Number of Workers Required *</label>
                    <select
                      value={numWorkers}
                      onChange={(e) => setNumWorkers(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="3-5">3 to 5 Persons</option>
                      <option value="6-10">6 to 10 Persons</option>
                      <option value="10-25">10 to 25 Persons</option>
                      <option value="25+ Large Facility">25+ Large Institutional Deployment</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Shift Requirements *</label>
                    <select
                      value={shiftReq}
                      onChange={(e) => setShiftReq(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    >
                      <option value="Day Shift (8 Hours)">Day Shift (8 Hours)</option>
                      <option value="Night Shift (8 Hours)">Night Shift (8 Hours)</option>
                      <option value="12-Hour Shift">12-Hour Shift</option>
                      <option value="24/7 Rotational (3 Shifts)">24/7 Rotational Coverage (3 Shifts)</option>
                      <option value="Part-time / Custom Hours">Part-time / Custom Hours</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Deployment Site Location *</label>
                    <input
                      type="text"
                      required
                      value={siteLocation}
                      onChange={(e) => setSiteLocation(e.target.value)}
                      placeholder="e.g. Boring Road, Bailey Road, Patna"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Additional Requirements / Notes</label>
                  <textarea
                    rows={3}
                    value={additionalRequirements}
                    onChange={(e) => setAdditionalRequirements(e.target.value)}
                    placeholder="Specify property type (apartment, commercial, hospital), uniform requirements, or specific tools needed."
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FileCheck2 className="w-4 h-4 text-cyan-400" />
                    <span>Submit Manpower Request</span>
                  </button>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Booking</span>
                  </a>
                </div>

                <div className="text-center text-[11px] text-slate-500 pt-1">
                  Or contact Central Desk: <a href="tel:9065296294" className="font-bold text-slate-800 hover:underline">9065296294</a> / <a href="tel:+919142144940" className="font-bold text-slate-800 hover:underline">+91 91421 44940</a>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
