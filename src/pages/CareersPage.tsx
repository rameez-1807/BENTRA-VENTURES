import React, { useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  ArrowRight
} from 'lucide-react';

interface CareersPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const CareersPage: React.FC<CareersPageProps> = ({ onOpenQuoteModal }) => {
  const [activeTab, setActiveTab] = useState<'careers' | 'partners'>('careers');
  const [partnerType, setPartnerType] = useState('Civil Contractor / Masonry Crew');
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [partnerName, setPartnerName] = useState('');
  const [partnerPhone, setPartnerPhone] = useState('');
  const [partnerCity, setPartnerCity] = useState('Patna');

  const jobs = [
    {
      title: 'Senior Civil Project Engineer',
      vertical: 'Realty & Turnkey Construction',
      location: 'Patna & Danapur Sites',
      type: 'Full-Time',
      exp: '5+ Years in RCC & Turnkey Residential'
    },
    {
      title: 'Full-Stack Software Engineer (Next.js / Python)',
      vertical: 'IT & Digital Solutions',
      location: 'Patna HQ / Hybrid',
      type: 'Full-Time',
      exp: '3+ Years in SaaS Engineering'
    },
    {
      title: 'Cold-Chain Logistics Supervisor',
      vertical: 'Fresh Supply & FMCG',
      location: 'Danapur Logistics Depot',
      type: 'Full-Time',
      exp: '3+ Years in Perishable / FMCG Logistics'
    },
    {
      title: 'HVAC & AC Senior Technician (Team Lead)',
      vertical: 'Facility Maintenance Division',
      location: 'Patna Metro',
      type: 'Full-Time',
      exp: '4+ Years in Commercial & VRF AC'
    },
  ];

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Hero Banner - Premium White */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <Users className="w-4 h-4" /> Brentra Talent & Vendor Ecosystem
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.15] max-w-4xl">
            Careers & Vendor Partner Onboarding
          </h1>
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mt-5 leading-relaxed">
            Build your career with Eastern India's fastest-growing conglomerate, or register your transport fleet, building material manufacturing unit, or civil contracting crew as an empaneled Brentra Partner.
          </p>

          <div className="flex items-center gap-3 pt-8">
            <button
              onClick={() => setActiveTab('careers')}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'careers'
                  ? 'bg-[#0A192F] text-white shadow-md'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Explore Job Openings
            </button>
            <button
              onClick={() => setActiveTab('partners')}
              className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === 'partners'
                  ? 'bg-[#0A192F] text-white shadow-md'
                  : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
              }`}
            >
              Vendor & Contractor Onboarding
            </button>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {activeTab === 'careers' ? (
            <div className="space-y-8">
              <div className="max-w-2xl">
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F]">
                  Current Career Openings at Brentra Ventures
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  We offer competitive industry remuneration, milestone performance bonuses, health coverage, and rapid leadership advancement across Bihar.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jobs.map((job, idx) => (
                  <div key={idx} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-sm">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[11px] font-bold text-amber-700 uppercase font-mono tracking-wider">
                          {job.vertical}
                        </span>
                        <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold">
                          {job.type}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-xl text-[#0A192F]">{job.title}</h3>
                      <div className="text-xs text-slate-500 mt-2 space-y-1">
                        <div>Location: <strong className="text-slate-800">{job.location}</strong></div>
                        <div>Required Experience: <strong className="text-slate-800">{job.exp}</strong></div>
                      </div>
                    </div>

                    <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                      <a
                        href={`mailto:careers@brentraventures.com?subject=Job%20Application:%20${encodeURIComponent(job.title)}`}
                        className="text-xs font-bold text-[#0A192F] hover:underline flex items-center gap-1"
                      >
                        Apply via Email <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                      <span className="text-[11px] text-slate-400">Patna Central Desk</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div id="partner" className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-xl">
              <div className="text-center mb-8 space-y-2">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest px-3 py-1 rounded bg-amber-50 border border-amber-200">
                  Vendor Empanelment
                </span>
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F]">
                  Join the Brentra Supply & Contracting Network
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm">
                  We guarantee predictable fortnightly billing, long-term procurement agreements, and verified institutional volume.
                </p>
              </div>

              {partnerSubmitted ? (
                <div className="p-8 text-center space-y-3 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md mx-auto">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h3 className="font-heading font-bold text-lg text-slate-900">Empanelment Request Received!</h3>
                  <p className="text-xs text-slate-600">
                    Thank you, <strong className="text-slate-900">{partnerName}</strong>. Our Vendor Procurement Officer will contact <strong className="text-slate-900">{partnerPhone}</strong> to inspect credentials and dispatch the vendor agreement.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePartnerSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider mb-2">
                      Partner Category
                    </label>
                    <select
                      value={partnerType}
                      onChange={(e) => setPartnerType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-sm"
                    >
                      <option value="Civil Contractor / Masonry Crew">Civil Contractor / Masonry Crew (Turnkey ₹1,900)</option>
                      <option value="Building Materials Supplier (Cement/TMT/Bricks)">Building Materials Supplier (Cement/TMT/Bricks)</option>
                      <option value="Poultry / Fish / Egg Farm Producer">Poultry / Fish / Egg Farm Producer</option>
                      <option value="Refrigerated Truck / Freight Operator">Refrigerated Truck / Freight Operator</option>
                      <option value="AC & RO Certified Technician Franchise">AC & RO Certified Technician Franchise</option>
                      <option value="Event Sound, Truss & Stage Provider">Event Sound, Truss & Stage Provider</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Company / Contractor Name *</label>
                      <input
                        type="text"
                        required
                        value={partnerName}
                        onChange={(e) => setPartnerName(e.target.value)}
                        placeholder="e.g. Maa Durga Civil Infra"
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Contact Phone *</label>
                      <input
                        type="tel"
                        required
                        value={partnerPhone}
                        onChange={(e) => setPartnerPhone(e.target.value)}
                        placeholder="+91 94300 XXXXX"
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Base District in Bihar *</label>
                      <input
                        type="text"
                        required
                        value={partnerCity}
                        onChange={(e) => setPartnerCity(e.target.value)}
                        placeholder="e.g. Patna, Danapur, Muzaffarpur"
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">GSTIN / Trade Reg (If applicable)</label>
                      <input
                        type="text"
                        placeholder="e.g. 10AAAAA0000A1Z5"
                        className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-transform active:scale-95 cursor-pointer"
                  >
                    Submit Vendor Empanelment Application
                  </button>
                </form>
              )}
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
