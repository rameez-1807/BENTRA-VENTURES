import React, { useState } from 'react';
import { 
  Megaphone, 
  Share2, 
  TrendingUp, 
  Sparkles, 
  ArrowRight, 
  Phone, 
  Clock, 
  FileCheck2, 
  MessageSquare, 
  Video, 
  Palette, 
  Globe, 
  Check, 
  CheckCircle2, 
  Star,
  Clapperboard,
  Camera,
  Layers,
  Award
} from 'lucide-react';

interface DigitalMarketingPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const DigitalMarketingPage: React.FC<DigitalMarketingPageProps> = ({ onOpenQuoteModal }) => {
  // Marketing Enquiry Form State
  const [businessName, setBusinessName] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [businessType, setBusinessType] = useState('Retail / E-commerce');
  const [requiredServices, setRequiredServices] = useState('Growth Monthly Package (₹9,999 / month)');
  const [existingSocialLinks, setExistingSocialLinks] = useState('');
  const [marketingGoals, setMarketingGoals] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Official Verified Monthly Packages from Flyer (Section 06)
  const monthlyPackages = [
    {
      name: 'Starter Package',
      price: '₹4,999',
      period: 'per month',
      badge: 'Startups & Local Retail',
      popular: false,
      features: [
        '10 Custom Social Media Posts',
        'Facebook & Instagram Page Setup',
        'Hashtag Strategy & Captions',
        'Basic Audience Engagement',
        'Monthly Reach & Growth Report'
      ]
    },
    {
      name: 'Growth Package',
      price: '₹9,999',
      period: 'per month',
      badge: 'Most Popular',
      popular: true,
      features: [
        '20 High-Impact Social Posts & Creatives',
        '4 Trending Reels / Short Videos',
        'Facebook, Instagram & LinkedIn Posting',
        'Meta Ads Strategy & Campaign Setup',
        'Weekly Follower Growth Optimization',
        'Bi-Weekly Performance Reviews'
      ]
    },
    {
      name: 'Professional Package',
      price: '₹19,999',
      period: 'per month',
      badge: 'Aggressive Reach',
      popular: false,
      features: [
        '30 Daily Custom Creatives & Carousels',
        '8 High-Retention Viral Reels with SFX',
        'Full Account Handling & DM Lead Routing',
        'Google Ads & Meta Ads Funnel Setup',
        'Search Engine Optimization (SEO)',
        'Dedicated Campaign Manager'
      ]
    },
    {
      name: 'Premium Package',
      price: '₹34,999',
      period: 'per month',
      badge: 'Omnichannel Dominance',
      popular: false,
      features: [
        '45+ Creatives (Posters, Carousels & Stories)',
        '15 Viral Reels + Scripting & AI Avatars',
        '1 Video Shoot Session in Patna with 4K Crew',
        'Complete Lead Generation Ad Funnels',
        'Influencer Coordination & PR Campaigns',
        'Weekly Strategy & ROI Audit Calls'
      ]
    },
    {
      name: 'Enterprise Package',
      price: '₹59,999',
      period: 'per month',
      badge: 'Complete Corporate Studio',
      popular: false,
      features: [
        'Full Creative Agency Suite & Studio Production',
        'Daily Multi-Platform Posting (IG, FB, LI, YT)',
        'Multiple On-Location 4K Video Shoots in Bihar',
        'Cinema Drone Shots, Commercial Ads & Voiceovers',
        'Multi-Tier Paid Ads Scaling (Google + Meta)',
        'Senior Creative Director & Production Crew'
      ]
    }
  ];

  // Official Verified Individual Rates from Flyer (Section 06)
  const individualRates = [
    { service: 'Logo Design', price: '₹500', unit: 'per design', note: 'High-res vector logo, transparent PNG, brand mark' },
    { service: 'Social Media Post Design', price: '₹250 / post', unit: 'per post', note: 'Engaging promotional, festive or educational graphic' },
    { service: 'Carousel Design (Multi-Slide)', price: '₹800', unit: 'per carousel', note: 'Swipeable high-retention 5 to 8 slide educational graphic' },
    { service: 'AI-Generated Basic Video', price: '₹500 / video', unit: 'per video', note: 'Short AI visual montage with background audio' },
    { service: 'AI-Generated Promotional Video', price: '₹1,000 / video', unit: 'per video', note: 'AI script, voiceover synthesis, animated transitions' },
    { service: 'AI-Generated Premium Video', price: '₹2,500+ / video', unit: 'per video', note: 'Hyper-realistic AI human avatar presenter & custom branding' },
    { service: 'Real Shoot + Basic Editing', price: '₹1,500 / video', unit: 'per video', note: 'On-camera product or founder clip with trim, text & audio' },
    { service: 'Real Shoot + Professional Production', price: '₹2,500+ / video', unit: 'per video', note: '4K cinema camera shoot, color grading & dynamic captions' },
    { service: 'Business Brochure Design', price: '₹1,999', unit: 'per brochure', note: 'Print-ready corporate catalog, bi-fold or tri-fold layout' },
    { service: 'Website Content Writing', price: '₹500 / page', unit: 'per page', note: 'SEO-rich, persuasive, human-crafted commercial copy' },
  ];

  // Core Service Capabilities
  const capabilities = [
    {
      title: 'Social Media Account Management',
      desc: 'Hands-off daily posting, captioning, hashtag optimization, and community comment moderation across all major social networks.',
      icon: Share2
    },
    {
      title: 'Facebook, Instagram & LinkedIn Marketing',
      desc: 'Targeted visual campaigns engaging B2C buyers on Instagram and enterprise corporate decision-makers on LinkedIn.',
      icon: TrendingUp
    },
    {
      title: 'High-Retention Reels & Creative Posts',
      desc: 'Dynamic video hooks, motion graphics, trending audio matching, and viral short-form storytelling.',
      icon: Clapperboard
    },
    {
      title: 'Logo Design & Brand Identity',
      desc: 'Distinctive brand emblems, color palettes, typography, corporate stationary, and brand guideline decks.',
      icon: Palette
    },
    {
      title: 'Search Engine Optimisation (SEO)',
      desc: 'Rank on Page 1 of Google for high-intent buyer keywords with technical SEO, schema, backlinking, and content clusters.',
      icon: Globe
    },
    {
      title: 'Google Ads & Meta Ads Management',
      desc: 'High-ROI pay-per-click (PPC) campaigns generating direct WhatsApp enquiries, phone calls, and ecommerce sales.',
      icon: Megaphone
    }
  ];

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `*BRENTRA DIGITAL MARKETING ENQUIRY*%0A` +
      `--------------------------------%0A` +
      `*Business Name:* ${businessName || 'Business Client'}%0A` +
      `*Contact Person:* ${contactName || 'Client'}%0A` +
      `*Phone:* ${contactPhone || 'Not provided'}%0A` +
      `*Business Type:* ${businessType}%0A` +
      `*Services / Package:* ${requiredServices}%0A` +
      `*Social / Website Links:* ${existingSocialLinks || 'Not available'}%0A` +
      `*Goals:* ${encodeURIComponent(marketingGoals || 'Need marketing proposal.')}`;
    return `https://wa.me/919142144940?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Hero Banner */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-900 text-xs font-bold uppercase tracking-widest">
              <Megaphone className="w-4 h-4 text-pink-600" /> Division 06 • Brentra Digital Growth
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 border border-purple-200 text-purple-900 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-purple-700" /> More Reach • More Engagement • More Business
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.12]">
                Social Media Marketing, Content Studio & Paid Ads
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mt-5 leading-relaxed">
                Grow your brand visibility, generate high-intent customer leads, and command social authority. Monthly growth retainers starting at just <strong className="text-pink-900 font-bold">₹4,999/month</strong> with complete reel production and poster creative support.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-8">
                <a
                  href="#monthly-packages"
                  className="px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                >
                  <span>Explore Monthly Packages from ₹4,999</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#marketing-enquiry"
                  className="px-5 py-3.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center gap-2"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Request Custom Marketing Proposal</span>
                </a>
                <a
                  href="tel:9065296294"
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-pink-600" />
                  <span>Call: 9065296294</span>
                </a>
              </div>

              {/* Guarantees */}
              <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">₹4,999</div>
                  <div className="text-xs text-slate-500 mt-0.5">Starter Retainer / Mo</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">₹250</div>
                  <div className="text-xs text-slate-500 mt-0.5">Post Design Rate</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">₹500</div>
                  <div className="text-xs text-slate-500 mt-0.5">Vector Logo Design</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">4K Studio</div>
                  <div className="text-xs text-slate-500 mt-0.5">Real & AI Video Shoots</div>
                </div>
              </div>
            </div>

            {/* Visual Photo Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group">
                <img 
                  src="/img-marketing.jpg" 
                  alt="Brentra Digital Marketing Agency Studio Working on Campaigns and Creatives" 
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="px-3 py-1 rounded bg-pink-600/90 text-white text-[10px] font-bold uppercase tracking-wider w-max mb-2">
                    Creative Digital Studio
                  </span>
                  <h3 className="text-xl font-bold text-white">Brand Growth That Converts</h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Meta ads, Google Ads, viral reels, and creative posters designed to flood your business with sales leads.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Core Capabilities Grid */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-pink-800 uppercase tracking-widest px-3 py-1 rounded bg-pink-50 border border-pink-200">
              Full-Stack Digital Growth
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Marketing & Branding Capabilities
            </h2>
            <p className="text-sm text-slate-600">
              Integrated campaigns combining aesthetic creative design with mathematical ad performance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((c, idx) => {
              const Icon = c.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-200 hover:border-pink-400 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-md"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-pink-50 text-pink-700 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-lg text-[#0A192F] group-hover:text-pink-900 transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">B2B & B2C Expertise</span>
                    <a
                      href="#marketing-enquiry"
                      onClick={() => setRequiredServices(c.title)}
                      className="text-pink-700 hover:text-pink-900 font-bold"
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

      {/* Official Verified Monthly Packages (Section 06 of Flyer) */}
      <section id="monthly-packages" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-pink-800 uppercase tracking-widest px-3 py-1 rounded bg-pink-50 border border-pink-200">
              Official Retainer Plans
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Monthly Social Media Packages
            </h2>
            <p className="text-sm text-slate-600">
              Verified tier pricing from Section 06 of the Brentra Ventures brochure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {monthlyPackages.map((pkg, idx) => (
              <div 
                key={idx}
                className={`rounded-2xl p-5 transition-all duration-300 flex flex-col justify-between ${
                  pkg.popular 
                    ? 'bg-gradient-to-b from-pink-50/50 to-white border-2 border-pink-600 shadow-xl' 
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-md'
                }`}
              >
                <div>
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                    {pkg.badge}
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-[#0A192F]">
                    {pkg.name}
                  </h3>

                  <div className="mt-3 mb-4 pb-3 border-b border-slate-100">
                    <div className="font-heading font-extrabold text-2xl text-pink-900">
                      {pkg.price}
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium">{pkg.period}</div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700">
                    {pkg.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <Check className="w-3.5 h-3.5 text-pink-600 shrink-0 mt-0.5" />
                        <span className="text-[11px] leading-tight">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100">
                  <a
                    href="#marketing-enquiry"
                    onClick={() => setRequiredServices(`${pkg.name} (${pkg.price}/month)`)}
                    className={`w-full py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-center block transition-all ${
                      pkg.popular
                        ? 'bg-pink-600 hover:bg-pink-700 text-white shadow-md'
                        : 'bg-[#0A192F] hover:bg-[#1E3E62] text-white'
                    }`}
                  >
                    Select Plan
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-500">
            * Advertising budget for Meta and Google Ads is separate. Client sets ad budget according to target sales goals.
          </div>

        </div>
      </section>

      {/* Official Verified Individual Rates Table (Section 06 of Flyer) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-pink-800 uppercase tracking-widest px-3 py-1 rounded bg-pink-50 border border-pink-200">
              A La Carte Rate Card
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Individual Marketing, Video & Design Services
            </h2>
            <p className="text-sm text-slate-600">
              Official rates for individual logo design, single video shoots, and poster creatives.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0A192F] text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Service</th>
                    <th className="py-4 px-6">Official Price (₹)</th>
                    <th className="py-4 px-6">Deliverable Scope</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-sans">
                  {individualRates.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-pink-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
                    >
                      <td className="py-3.5 px-6 font-bold text-[#0A192F]">
                        {item.service}
                      </td>
                      <td className="py-3.5 px-6 font-mono font-extrabold text-pink-900 text-sm whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="py-3.5 px-6 text-slate-600">
                        {item.note}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <a
                          href="#marketing-enquiry"
                          onClick={() => setRequiredServices(`${item.service} (${item.price})`)}
                          className="px-3.5 py-1.5 rounded-lg bg-pink-50 hover:bg-[#0A192F] text-pink-800 hover:text-white font-bold text-[11px] transition-colors inline-block"
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
              <span>* AI video pricing depends on duration, voice-over, animation and editing requirements.</span>
              <span className="font-semibold text-pink-800">Custom projects: Request a Marketing Proposal</span>
            </div>
          </div>

        </div>
      </section>

      {/* Dedicated Marketing Enquiry Form */}
      <section id="marketing-enquiry" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-pink-800 uppercase tracking-widest mb-2">
              <Megaphone className="w-4 h-4 text-pink-600" /> Strategic Growth Consultation
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F] mb-2">
              Request Marketing Proposal & Strategy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-8">
              Share your business objectives and required services below. Our creative team will audit your presence and present a strategic growth plan.
            </p>

            {submitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md mx-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-heading font-bold text-xl text-slate-900">Proposal Request Received!</h3>
                <p className="text-xs text-slate-600">
                  Thank you, <strong className="text-slate-900">{contactName}</strong> from <strong className="text-slate-900">{businessName}</strong>. Our digital marketing director has received your request for <strong className="text-slate-900">{requiredServices}</strong>. We will contact you on <strong className="text-slate-900">{contactPhone}</strong> with a detailed plan.
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
                    Submit Another Brand
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleEnquirySubmit} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Company / Business Name *</label>
                    <input
                      type="text"
                      required
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      placeholder="e.g. Royal Patna Jewellers"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Contact Person Name *</label>
                    <input
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Vikas Sinha"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="e.g. 9065296294"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Business Industry / Type *</label>
                    <select
                      value={businessType}
                      onChange={(e) => setBusinessType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                    >
                      <option value="Retail / E-commerce">Retail / E-commerce</option>
                      <option value="Real Estate / Construction">Real Estate / Construction</option>
                      <option value="Healthcare / Clinic / Hospital">Healthcare / Clinic / Hospital</option>
                      <option value="Restaurant / Cafe / Cloud Kitchen">Restaurant / Cafe / Cloud Kitchen</option>
                      <option value="Education / Coaching / College">Education / Coaching / College</option>
                      <option value="B2B Manufacturing / Corporate">B2B Manufacturing / Corporate</option>
                      <option value="Professional Services (Law, CA, Tech)">Professional Services (Law, CA, Tech)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Required Package / Service *</label>
                    <select
                      value={requiredServices}
                      onChange={(e) => setRequiredServices(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                    >
                      <option value="Starter Monthly Package (₹4,999 / month)">Starter Monthly Package — ₹4,999 / month</option>
                      <option value="Growth Monthly Package (₹9,999 / month)">Growth Monthly Package — ₹9,999 / month</option>
                      <option value="Professional Monthly Package (₹19,999 / month)">Professional Monthly Package — ₹19,999 / month</option>
                      <option value="Premium Monthly Package (₹34,999 / month)">Premium Monthly Package — ₹34,999 / month</option>
                      <option value="Enterprise Monthly Package (₹59,999 / month)">Enterprise Monthly Package — ₹59,999 / month</option>
                      <option value="Logo Design (₹500)">Logo Design — ₹500</option>
                      <option value="Video Shooting & Production (₹1,500 - ₹2,500+)">Video Shooting & Production — ₹1,500 to ₹2,500+</option>
                      <option value="Custom Marketing Proposal">Request a Marketing Proposal (Custom Scope)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Existing Website or Instagram Handle</label>
                    <input
                      type="text"
                      value={existingSocialLinks}
                      onChange={(e) => setExistingSocialLinks(e.target.value)}
                      placeholder="e.g. @royalpatna / royalpatna.com"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Core Marketing Goals & Requirements</label>
                  <textarea
                    rows={2}
                    value={marketingGoals}
                    onChange={(e) => setMarketingGoals(e.target.value)}
                    placeholder="e.g. Generate 50 WhatsApp enquiries weekly, increase Instagram followers, launch brand video reel, etc."
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-pink-600 focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FileCheck2 className="w-4 h-4 text-cyan-400" />
                    <span>Submit Marketing Request</span>
                  </button>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Instant WhatsApp Connect</span>
                  </a>
                </div>

                <div className="text-center text-[11px] text-slate-500 pt-1">
                  Connect with our strategy team: <a href="tel:9065296294" className="font-bold text-slate-800 hover:underline">9065296294</a> / <a href="tel:+919142144940" className="font-bold text-slate-800 hover:underline">+91 91421 44940</a>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
