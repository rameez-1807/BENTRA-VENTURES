import React from 'react';
import { 
  MapPin, 
  Building2, 
  Phone, 
  Clock, 
  CheckCircle2
} from 'lucide-react';

interface PatnaHubPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const PatnaHubPage: React.FC<PatnaHubPageProps> = ({ onOpenQuoteModal }) => {
  const facilities = [
    {
      name: 'Brentra Corporate Headquarters',
      location: 'Preven Vila, Flat Number 34, New Khajoorbana, Patna, Bihar – 800006',
      type: 'Executive Secretariat, Civil Architecture Studio, IT Development Lab',
      hours: 'Mon - Sun: 8:00 AM - 9:00 PM',
      phone: '9065296294 / +91 91421 44940',
      badge: 'Principal Office'
    },
    {
      name: 'Danapur Cold-Chain & Food Logistics Center',
      location: 'Danapur Industrial Corridor, Patna — 801503',
      type: '50-Ton Multi-Chamber Cold Storage, Egg & Poultry Staging Fleet',
      hours: '24/7 Operations (Morning Dispatches 5:30 AM)',
      phone: '+91-94300-88001',
      badge: 'FMCG Depot'
    },
    {
      name: 'Bihta Raw Materials & Civil Stockyard',
      location: 'NH-30 Bihta Highway Junction, Patna — 801103',
      type: 'TMT Steel Stockyard, Cement Silos, Sand & Aggregate Depot',
      hours: 'Mon - Sun: 6:00 AM - 10:00 PM',
      phone: '+91-94300-88002',
      badge: 'Realty Logistics'
    },
    {
      name: 'Kankarbagh Urban Care & Facility AMC Yard',
      location: 'Old Bypass Road, Kankarbagh, Patna — 800020',
      type: 'Technician Rapid Response Depot, Spare Parts & Testing Lab',
      hours: '7 Days a Week: 7:00 AM - 10:00 PM',
      phone: '+91-94300-88003',
      badge: 'Rapid Response'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Hero Banner - Premium White */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-widest mb-3">
            <MapPin className="w-4 h-4" /> Regional Infrastructure Network
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.15] max-w-4xl">
            Patna Central Hub & Regional Bihar Network
          </h1>
          <p className="text-base sm:text-xl text-slate-600 max-w-3xl mt-5 leading-relaxed">
            Our multi-facility footprint across Patna, Danapur, Bihta, and Kankarbagh enables instant ground deployment, seamless cold-chain delivery, and on-schedule construction material replenishment throughout Bihar.
          </p>
        </div>
      </section>

      {/* 4 Central Hub Facilities */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
            <h2 className="font-heading font-extrabold text-3xl text-[#0A192F]">
              Core Patna Facilities & Depots
            </h2>
            <p className="text-slate-600 text-sm">
              Coordinates, operating hours, and direct desk contact numbers for each specialized operational base.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {facilities.map((fac, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
                    <span className="text-xs font-bold px-2.5 py-1 rounded bg-slate-100 text-slate-800 border border-slate-200 uppercase font-mono">
                      {fac.badge}
                    </span>
                    <span className="text-xs text-emerald-700 flex items-center gap-1 font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Active Operations
                    </span>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-[#0A192F]">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{fac.location}</span>
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                    <div><strong>Specialization:</strong> {fac.type}</div>
                    <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-600" /> {fac.hours}
                    </div>
                  </div>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href={`tel:${fac.phone.replace(/[^0-9+]/g, '')}`}
                    className="text-xs font-mono font-bold text-[#0A192F] hover:underline flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-600" /> {fac.phone}
                  </a>
                  <button
                    onClick={() => onOpenQuoteModal()}
                    className="text-xs px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold cursor-pointer"
                  >
                    Schedule Visit
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* District Reach */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest px-3 py-1 rounded bg-amber-50 border border-amber-200">
            District Coverage
          </span>
          <h2 className="font-heading font-extrabold text-3xl text-[#0A192F]">
            Daily Logistics Delivery to 18 Bihar Districts
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Patna Metro, Danapur, Bihta, Hajipur, Vaishali, Muzaffarpur, Gaya, Bodh Gaya, Jehanabad, Nalanda, Bihar Sharif, Darbhanga, Samastipur, Begusarai, Munger, Bhagalpur, Arrah, and Buxar.
          </p>

          <div className="pt-4">
            <a
              href="tel:+919430088000"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md"
            >
              Contact Central Regional Coordinator
            </a>
          </div>
        </div>
      </section>

    </div>
  );
};
