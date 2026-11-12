import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Fish, 
  Hammer, 
  ArrowRight, 
  Sparkles, 
  MapPin, 
  CheckCircle2, 
  ChevronDown,
  ShieldCheck
} from 'lucide-react';
import { HeroCarousel } from '../components/HeroCarousel';
import { BusinessStats } from '../components/BusinessStats';
import { EnterprisesGrid } from '../components/EnterprisesGrid';
import { AboutCompanySection } from '../components/AboutCompanySection';
import { WhyChooseUsSection } from '../components/WhyChooseUsSection';
import { BusinessApproachSection } from '../components/BusinessApproachSection';
import { CorporateEnquirySection } from '../components/CorporateEnquirySection';

interface HomePageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenQuoteModal }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is included in the starting ₹1,900/sq. ft. Turnkey Construction package?',
      a: 'Our ₹1,900/sq.ft package is 100% turnkey. It includes structural architectural drawings, soil testing, excavation, RCC frame using 550D Grade-A TMT steel and 53-grade cement, kiln-burned red bricks, premium vitrified tiles (Kajaria/Somany), granite kitchen countertops, concealed Finolex wiring, Havells modular switches, Jaquar sanitaryware, complete Asian Paints Royale emulsion with putty base, AND a modular kitchen layout with designer false ceilings. Zero hidden costs.',
    },
    {
      q: 'How does Brentra Ventures manage daily wholesale deliveries for fresh FMCG?',
      a: 'We operate our own dedicated refrigerated cold-chain fleet originating from our central agricultural hub in Patna. We supply hotels, cloud kitchens, retail supermarkets, and banquet halls with fresh eggs, processed poultry, river fish, gourmet makhana, and Brentra ice creams on scheduled morning slots with complete FSSAI batch testing.',
    },
    {
      q: 'How fast can emergency facility technicians (AC, RO, electrical) arrive in Patna?',
      a: 'Within Patna municipal limits (Bailey Road, Kankarbagh, Danapur, Boring Road, Rajendra Nagar, Patliputra, Ashiana, etc.), our emergency verified technicians arrive within 60 minutes of booking. All technicians are background-verified and carry digital diagnostic kits.',
    },
    {
      q: 'Can enterprise clients sign a single umbrella AMC for multi-facility operations?',
      a: 'Yes. Through our Institutional Secretariat desk, corporate headquarters, hospitals, schools, and banks in Bihar can execute unified multi-vertical master service agreements covering regular facility maintenance, corporate catering, IT digital infrastructure, and periodic building audits.',
    },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* 1. Hero Section: Premium Image Slider matching Reference Screenshot */}
      <HeroCarousel onOpenQuoteModal={onOpenQuoteModal} />

      {/* 2. Business Statistics Section: 4 Horizontally Aligned Cards */}
      <BusinessStats />

      {/* 3. Our Enterprises & Services Section: 4x2 Grid of 8 Verticals */}
      <EnterprisesGrid />

      {/* 4. About Our Company: Vision, Mission & Corporate Profile */}
      <AboutCompanySection />

      {/* 5. Why Choose Us: 4 Feature Cards */}
      <WhyChooseUsSection />

      {/* 6. Our Business Approach: 4-Step Structured Execution Flow */}
      <BusinessApproachSection />

      {/* 7. Flagship Spotlight: Complete Turnkey Construction @ ₹1,900 / sq. ft. */}
      <section className="py-16 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 border border-amber-300/80 rounded-3xl p-8 sm:p-12 shadow-lg relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Brentra Infrastructure Flagship
                </div>

                <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-[#0E2442] tracking-tight leading-tight">
                  Complete Turnkey Construction Starting @{' '}
                  <span className="text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-lg border border-amber-300 inline-block my-1">
                    ₹1,900 / sq. ft.
                  </span>
                </h2>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Eliminate contractor disputes, budget escalations, and inferior material quality. Brentra Realty delivers complete homes ready for move-in across Patna and Bihar with structural grade 550D TMT steel, branded vitrified tiles, modular kitchen, and a 10-year structural safety warranty.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-lg font-black text-[#0E2442] font-mono">100%</div>
                    <div className="text-xs text-slate-600 mt-0.5">Turnkey Ready</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-lg font-black text-[#0E2442] font-mono">550D</div>
                    <div className="text-xs text-slate-600 mt-0.5">Grade-A TMT Steel</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-lg font-black text-[#0E2442] font-mono">₹0</div>
                    <div className="text-xs text-slate-600 mt-0.5">Hidden Cost Guarantee</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs">
                    <div className="text-lg font-black text-[#0E2442] font-mono">10 Yrs</div>
                    <div className="text-xs text-slate-600 mt-0.5">Structural Warranty</div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link
                    to="/realty-infrastructure#calculator"
                    className="px-6 py-3.5 rounded-xl bg-[#0E2442] hover:bg-[#16355C] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all"
                  >
                    Open Live Sq. Ft. Cost Calculator
                  </Link>
                  <button
                    onClick={() => onOpenQuoteModal('realty-infrastructure')}
                    className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors shadow-2xs cursor-pointer"
                  >
                    Book Free Site Inspection in Patna
                  </button>
                </div>
              </div>

              {/* Inclusions Summary Preview */}
              <div className="lg:col-span-5 bg-white p-6 sm:p-7 rounded-2xl border border-slate-200/90 shadow-sm space-y-4">
                <h3 className="font-heading font-bold text-base text-[#0E2442] border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span>What's Included in ₹1,900/sq.ft</span>
                  <span className="text-xs text-amber-700 font-mono font-bold">Zero Extra Cost</span>
                </h3>

                <ul className="space-y-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Architectural & Structural:</strong> 2D architectural plans, 3D elevation, soil tests, RCC framed seismic structure.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Flooring & Kitchen:</strong> Branded 4x2 vitrified tiles, Black Galaxy granite countertop, stainless steel sink.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Concealed Fittings:</strong> Fire-resistant copper wiring, modular switches, premium sanitaryware.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span><strong>Turnkey Modular Interiors:</strong> Designer false ceiling with LED ambient strips, modular kitchen cabinets.</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-slate-100 text-center">
                  <Link
                    to="/realty-infrastructure"
                    className="text-xs font-bold text-[#0E2442] hover:text-[#00A3C4] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>View Complete Technical Specifications</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. Patna Central Hub & Regional Coverage */}
      <section className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-800 text-xs font-bold uppercase tracking-wider shadow-2xs">
                <MapPin className="w-3.5 h-3.5 text-amber-600" /> Patna Central Hub Network
              </div>

              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0E2442] tracking-tight">
                Headquartered in Patna, Powering All of Bihar
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                From our corporate headquarters in New Khajoorbana to our cold-chain yard in Danapur and bulk building material staging stockyards along Patna transport corridors, Brentra Ventures maintains instant ground reach.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
                  <div className="p-2 rounded-lg bg-blue-50 text-blue-900 shrink-0 mt-1">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0E2442]">Brentra Corporate Secretariat (HQ)</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Preven Vila, Flat 34, New Khajoorbana, Patna – Executive Desk & Architectural Studios.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
                  <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 shrink-0 mt-1">
                    <Fish className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0E2442]">Cold-Chain Logistics Yard</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Danapur Industrial Corridor — Daily fleet dispatch for farm eggs, river fish & gourmet ice cream.</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-slate-200 flex items-start gap-3 shadow-2xs">
                  <div className="p-2 rounded-lg bg-amber-50 text-amber-800 shrink-0 mt-1">
                    <Hammer className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#0E2442]">Building Material Depot</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Bihta Highway Junction — Bulk wholesale staging for 550D TMT steel, cement & aggregates.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* SLA Status Table */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#0E2442]">
                    Regional Operational Status
                  </h3>
                  <p className="text-xs text-slate-500">Live SLA status across Bihar districts</p>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Active Operations
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                {[
                  { region: 'Patna Central Metro', sla: '< 60 Mins Dispatch', status: 'Immediate' },
                  { region: 'Danapur & Bihta Belt', sla: '< 90 Mins Dispatch', status: 'Active' },
                  { region: 'Muzaffarpur Hub', sla: 'Daily Morning Route', status: 'Operational' },
                  { region: 'Gaya & Bodh Gaya', sla: 'Daily Scheduled Route', status: 'Operational' },
                  { region: 'Bhagalpur East Hub', sla: 'Tri-Weekly Logistics', status: 'Operational' },
                  { region: 'Darbhanga & Mithila', sla: 'Direct Farm Influx', status: 'Operational' },
                ].map((hub, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                    <div className="font-bold text-[#0E2442]">{hub.region}</div>
                    <div className="text-slate-500 text-[11px]">{hub.sla}</div>
                    <div className="text-emerald-700 text-[10px] font-mono font-bold uppercase">{hub.status}</div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0E2442]">Need Regional Freight or Delivery?</div>
                  <div className="text-[11px] text-slate-500">We arrange custom cargo for bulk commercial clients.</div>
                </div>
                <a
                  href="tel:+919065296294"
                  className="px-3.5 py-2 rounded-xl bg-[#0E2442] hover:bg-[#16355C] text-white font-bold text-xs shrink-0 transition-colors"
                >
                  Call Logistics Desk
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Contact / Corporate Business Enquiry Section */}
      <CorporateEnquirySection />

      {/* 10. Frequently Asked Questions */}
      <section className="py-16 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold text-[#00A3C4] uppercase tracking-widest">
              Clear & Transparent Governance
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#0E2442]">
              Frequently Asked Questions
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              Answers regarding our ₹1,900/sq.ft turnkey contracts, wholesale rates, IT SLAs, and Patna response times.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-200 bg-white shadow-2xs overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <span className="font-heading font-semibold text-sm sm:text-base text-[#0E2442]">
                      {faq.q}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-[#00A3C4]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3 shadow-2xs">
            <p className="text-xs sm:text-sm text-slate-700">
              Have a specific question about your project, bulk order, or institutional tender?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => onOpenQuoteModal()}
                className="px-5 py-2.5 rounded-xl bg-[#0E2442] hover:bg-[#16355C] text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-colors"
              >
                Inquire With Central Desk
              </button>
              <a
                href="https://wa.me/919142144940"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
              >
                WhatsApp Desk
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
