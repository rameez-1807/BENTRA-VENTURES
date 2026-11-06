import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Clock, 
  FileCheck2, 
  MessageSquare, 
  Bug, 
  Check, 
  AlertTriangle,
  Home,
  Building2,
  Shield,
  Award
} from 'lucide-react';

interface PestControlPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const PestControlPage: React.FC<PestControlPageProps> = ({ onOpenQuoteModal }) => {
  // Pest Control Enquiry Form State
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [propertyLocation, setPropertyLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Residential Apartment / Flat');
  const [propertyArea, setPropertyArea] = useState('1,200 sq. ft.');
  const [pestProblem, setPestProblem] = useState('Cockroach Treatment (₹999 / visit)');
  const [enquiryDetails, setEnquiryDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Official Verified Pricing from Flyer (Section 04)
  const pestRates = [
    { service: 'General Pest Control', price: '₹2 / sq. ft.', unit: 'per sq. ft.', note: 'Comprehensive multi-pest spray for crawling insects & silverfish' },
    { service: 'Termite Control (De-termite)', price: '₹8 / sq. ft.', unit: 'per sq. ft.', note: 'Drill-Fill-Seal chemical barrier treatment with warranty' },
    { service: 'Cockroach Treatment', price: '₹999 / visit', unit: 'per visit', note: 'Odorless herbal gel baiting in kitchen cabinets & drainage' },
    { service: 'Ant Treatment', price: '₹799 / visit', unit: 'per visit', note: 'Colony eradication spray & specialized barrier formulation' },
    { service: 'Mosquito Treatment', price: '₹1,499 / visit', unit: 'per visit', note: 'Cold fogging, thermal fogging & larval breeding elimination' },
    { service: 'Rodent Control', price: '₹999 onwards', unit: 'per treatment', note: 'Trap placement, glue boards, bait stations & burrow fumigation' },
    { service: 'Commercial / Industrial', price: 'Custom Quotation', unit: 'quote based', note: 'Warehouses, food processing units, hotels & office campuses' },
  ];

  // Specific Pest Treatments
  const treatmentsList = [
    {
      title: 'Termite Control Treatment',
      rate: '₹8 / sq. ft.',
      desc: 'Advanced drill-fill-seal barrier method targeting subterranean termites destroying woodwork, door frames, and foundations.',
      warranty: '1 to 5 Years Warranty'
    },
    {
      title: 'General Pest Control',
      rate: '₹2 / sq. ft.',
      desc: 'Whole-house preventive spray eradicating crawling insects, spiders, silverfish, lizards, and general pest infestations.',
      warranty: 'Odorless & Safe Spray'
    },
    {
      title: 'Cockroach Gel Treatment',
      rate: '₹999 / visit',
      desc: '100% odorless Bayer herbal gel spots applied inside kitchen trolleys, behind refrigerators, and under sinks without emptying cabinets.',
      warranty: 'Zero Cooking Disruption'
    },
    {
      title: 'Ant Eradication Service',
      rate: '₹799 / visit',
      desc: 'Targeted ant-trail elimination destroying the underground Queen ant colony permanently from walls and garden borders.',
      warranty: 'Immediate Relief'
    },
    {
      title: 'Mosquito Thermal Fogging',
      rate: '₹1,499 / visit',
      desc: 'Intense cold & thermal fogging for society compounds, open basements, gardens, and drainage inlets against Dengue & Malaria vectors.',
      warranty: 'Society Fogging Spec'
    },
    {
      title: 'Rodent & Rat Eradication',
      rate: '₹999 onwards',
      desc: 'Tamper-resistant bait stations, specialized tracking powder, and industrial glue pads eliminating stubborn rats.',
      warranty: 'Entry Point Sealing'
    }
  ];

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `*BRENTRA PEST CONTROL ENQUIRY*%0A` +
      `--------------------------------%0A` +
      `*Name:* ${clientName || 'Client'}%0A` +
      `*Phone:* ${clientPhone || 'Not provided'}%0A` +
      `*Location:* ${propertyLocation || 'Patna/Bihar'}%0A` +
      `*Property Type:* ${propertyType}%0A` +
      `*Area:* ${propertyArea}%0A` +
      `*Pest Problem:* ${pestProblem}%0A` +
      `*Details:* ${encodeURIComponent(enquiryDetails || 'Need pest control inspection.')}`;
    return `https://wa.me/919142144940?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-widest">
              <Bug className="w-4 h-4 text-emerald-600" /> Division 04 • Brentra Pest Management
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-widest">
              <Shield className="w-3.5 h-3.5 text-amber-700" /> Pest Free Today, Safer Tomorrow
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.12]">
                Certified Pest Control & Termite Eradication Services
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mt-5 leading-relaxed">
                Govt-approved eco-friendly herbal treatments for termites (<strong className="text-emerald-900 font-bold">₹8/sq.ft</strong>), cockroaches, ants, mosquitoes, and rodents across Patna and Bihar. Safe for children, pets, and senior citizens.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-8">
                <a
                  href="#pricing-table"
                  className="px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                >
                  <span>View Verified Price List</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#pest-enquiry"
                  className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Book Inspection / Treatment</span>
                </a>
                <a
                  href="tel:9065296294"
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span>Call: 9065296294</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">₹2 / sq.ft</div>
                  <div className="text-xs text-slate-500 mt-0.5">General Pest Control</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">₹8 / sq.ft</div>
                  <div className="text-xs text-slate-500 mt-0.5">Termite Drill & Seal</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">₹999</div>
                  <div className="text-xs text-slate-500 mt-0.5">Cockroach Herbal Gel</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">100%</div>
                  <div className="text-xs text-slate-500 mt-0.5">Odorless & Pet Safe</div>
                </div>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group">
                <img 
                  src="/img-pest-control.jpg" 
                  alt="Brentra Professional Pest Control Technician in Protective Gear Treating Property" 
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="px-3 py-1 rounded bg-emerald-600/90 text-white text-[10px] font-bold uppercase tracking-wider w-max mb-2">
                    Eco-Safe & Certified
                  </span>
                  <h3 className="text-xl font-bold text-white">Advanced Chemical Barrier</h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Specialized micro-spraying and drill-fill-seal termite protection protecting homes and offices.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Treatments Grid */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
              Targeted Pest Eradication
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Pest Management Solutions & Methods
            </h2>
            <p className="text-sm text-slate-600">
              Tailored chemical and herbal treatments eradicating insects right from their breeding source.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatmentsList.map((t, idx) => (
              <div 
                key={idx}
                className="bg-white border border-slate-200 hover:border-emerald-400 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      {t.rate}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">{t.warranty}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#0A192F] group-hover:text-emerald-900 transition-colors">
                    {t.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {t.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Child & Pet Friendly</span>
                  <a
                    href="#pest-enquiry"
                    onClick={() => setPestProblem(`${t.title} (${t.rate})`)}
                    className="text-emerald-700 hover:text-emerald-900 font-bold"
                  >
                    Select Plan →
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Official Verified Price List Table (Section 04 of Flyer) */}
      <section id="pricing-table" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
              Verified Rates
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Official Pest Control Rate Card
            </h2>
            <p className="text-sm text-slate-600">
              Preserved verbatim from Section 04 of the Brentra Ventures company brochure.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0A192F] text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Service</th>
                    <th className="py-4 px-6">Official Price (₹)</th>
                    <th className="py-4 px-6">Treatment Description</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-sans">
                  {pestRates.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-emerald-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
                    >
                      <td className="py-3.5 px-6 font-bold text-[#0A192F]">
                        {item.service}
                      </td>
                      <td className="py-3.5 px-6 font-mono font-extrabold text-emerald-900 text-sm whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="py-3.5 px-6 text-slate-600">
                        {item.note}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <a
                          href="#pest-enquiry"
                          onClick={() => setPestProblem(`${item.service} (${item.price})`)}
                          className="px-3.5 py-1.5 rounded-lg bg-emerald-50 hover:bg-[#0A192F] text-emerald-800 hover:text-white font-bold text-[11px] transition-colors inline-block"
                        >
                          Book Service
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap justify-between items-center gap-2">
              <span>* Final charges depend on site area, infestation, treatment method, minimum visit charges and warranty.</span>
              <span className="font-semibold text-emerald-800">For large commercial premises: Request a Pest Control Quote</span>
            </div>
          </div>

        </div>
      </section>

      {/* Dedicated Pest Control Enquiry Form */}
      <section id="pest-enquiry" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-widest mb-2">
              <Bug className="w-4 h-4 text-emerald-600" /> Doorstep Inspection & Booking
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F] mb-2">
              Book Pest Control Treatment
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-8">
              Submit your property details and infestation type below for priority technician assignment.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md mx-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-heading font-bold text-xl text-slate-900">Treatment Scheduled!</h3>
                <p className="text-xs text-slate-600">
                  Thank you, <strong className="text-slate-900">{clientName}</strong>. Our certified pest inspector has been booked for <strong className="text-slate-900">{pestProblem}</strong> at <strong className="text-slate-900">{propertyLocation}</strong>. We will contact you on <strong className="text-slate-900">{clientPhone}</strong>.
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
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Book Another Property
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      placeholder="e.g. Sunil Kumar"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
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
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Property Type *</label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="Residential Apartment / Flat">Residential Apartment / Flat</option>
                      <option value="Independent House / Bungalow">Independent House / Bungalow</option>
                      <option value="Commercial Office / Store">Commercial Office / Store</option>
                      <option value="Restaurant / Food Business">Restaurant / Food Business</option>
                      <option value="Warehouse / Industrial Plant">Warehouse / Industrial Plant</option>
                      <option value="Hospital / School / Institution">Hospital / School / Institution</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Approximate Property Area (Sq. Ft.) *</label>
                    <input
                      type="text"
                      required
                      value={propertyArea}
                      onChange={(e) => setPropertyArea(e.target.value)}
                      placeholder="e.g. 1,200 sq. ft."
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Pest Problem / Service Required *</label>
                    <select
                      value={pestProblem}
                      onChange={(e) => setPestProblem(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    >
                      <option value="General Pest Control (₹2 / sq. ft.)">General Pest Control — ₹2 / sq. ft.</option>
                      <option value="Termite Control (₹8 / sq. ft.)">Termite Control (De-termite) — ₹8 / sq. ft.</option>
                      <option value="Cockroach Treatment (₹999 / visit)">Cockroach Treatment — ₹999 / visit</option>
                      <option value="Ant Treatment (₹799 / visit)">Ant Treatment — ₹799 / visit</option>
                      <option value="Mosquito Fogging (₹1,499 / visit)">Mosquito Fogging — ₹1,499 / visit</option>
                      <option value="Rodent Control (₹999 onwards)">Rodent Control — ₹999 onwards</option>
                      <option value="Commercial / Industrial Custom Quote">Commercial / Industrial Custom Quote</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Site Location / Address in Patna *</label>
                    <input
                      type="text"
                      required
                      value={propertyLocation}
                      onChange={(e) => setPropertyLocation(e.target.value)}
                      placeholder="e.g. Bailey Road, Boring Canal Road, Patna"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Infestation Severity & Notes</label>
                  <textarea
                    rows={2}
                    value={enquiryDetails}
                    onChange={(e) => setEnquiryDetails(e.target.value)}
                    placeholder="e.g. Termite mud tubes on wooden cupboard, severe kitchen roach infestation, urgent treatment needed tomorrow, etc."
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-emerald-600 focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FileCheck2 className="w-4 h-4 text-cyan-400" />
                    <span>Confirm Pest Control Booking</span>
                  </button>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Quick WhatsApp Booking</span>
                  </a>
                </div>

                <div className="text-center text-[11px] text-slate-500 pt-1">
                  For immediate emergency pest treatment: <a href="tel:9065296294" className="font-bold text-slate-800 hover:underline">9065296294</a> / <a href="tel:+919142144940" className="font-bold text-slate-800 hover:underline">+91 91421 44940</a>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
