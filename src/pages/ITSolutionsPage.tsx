import React, { useState } from 'react';
import { 
  Cpu, 
  Code2, 
  Smartphone, 
  Bot, 
  CheckCircle2, 
  ArrowRight, 
  Server,
  Sparkles,
  Globe,
  Sliders,
  ShieldCheck,
  Phone,
  Mail,
  Layers,
  Check,
  Database,
  Cloud,
  Headphones,
  Video,
  Cctv,
  Send,
  MessageSquare,
  FileCheck2,
  Lock,
  ExternalLink
} from 'lucide-react';

interface ITSolutionsPageProps {
  onOpenQuoteModal: (vertical?: string) => void;
}

export const ITSolutionsPage: React.FC<ITSolutionsPageProps> = ({ onOpenQuoteModal }) => {
  // IT Enquiry Form State
  const [itName, setItName] = useState('');
  const [itPhone, setItPhone] = useState('');
  const [itEmail, setItEmail] = useState('');
  const [itCompany, setItCompany] = useState('');
  const [itProjectType, setItProjectType] = useState('Business Website (1-5 Pages)');
  const [itRequirements, setItRequirements] = useState('');
  const [itBudget, setItBudget] = useState('₹10,000 - ₹25,000');
  const [itSubmitted, setItSubmitted] = useState(false);

  // Estimator Selection State
  const [selectedServiceRate, setSelectedServiceRate] = useState<string>('Basic Business Website (1–5 Pages)');

  // Official Verified Flyer Rates (Section 05 of Pamphlet)
  const itServicesRateCard = [
    { service: 'Basic Business Website (1–5 Pages)', price: '₹10,000', category: 'Web Development', note: 'Responsive, Contact form, SEO setup' },
    { service: 'Business Website (5–10 Pages)', price: '₹15,000', category: 'Web Development', note: 'Multi-page corporate site with CMS' },
    { service: 'Professional Website (10–15 Pages)', price: '₹25,000', category: 'Web Development', note: 'Custom brand styling, blog & portal' },
    { service: 'E-commerce Website', price: '₹30,000', category: 'Web Development', note: 'Product catalog, payment gateway & cart' },
    { service: 'Custom Website / Web Portal', price: '₹40,000+', category: 'Web Development', note: 'Tailored SaaS, database & user dashboard' },
    { service: 'Android App Development', price: '₹25,000+', category: 'Mobile Apps', note: 'Google Play Store deployment, modern UI' },
    { service: 'Android + iOS App Development', price: '₹40,000+', category: 'Mobile Apps', note: 'Cross-platform Flutter / React Native' },
    { service: 'Custom Mobile App', price: '₹50,000+', category: 'Mobile Apps', note: 'Enterprise native app with custom APIs' },
    { service: 'ERP / CRM Solutions', price: '₹30,000+', category: 'Enterprise Software', note: 'Lead tracking, staff workflows & operations' },
    { service: 'Billing & Inventory Software', price: '₹20,000+', category: 'Enterprise Software', note: 'GST invoicing, stock alerts & reporting' },
    { service: 'School / Institute Management', price: '₹30,000+', category: 'Enterprise Software', note: 'Student portal, fees, attendance & LMS' },
    { service: 'Website Maintenance (AMC)', price: '₹2,000 / month', category: 'Maintenance', note: 'Regular updates, security patches & backups' },
    { service: 'Domain, Hosting & Email Setup', price: '₹3,000+', category: 'Infrastructure', note: 'High-speed cloud server & Google Workspace' },
    { service: 'Network Setup', price: '₹5,999+', category: 'Infrastructure', note: 'LAN, Wi-Fi mesh & router firewall configuration' },
    { service: 'CCTV Installation', price: '₹7,999+', category: 'Infrastructure', note: 'HD camera wiring, DVR/NVR & mobile live-feed' },
    { service: 'IT AMC & Technical Support', price: '₹3,000 / month', category: 'Maintenance', note: 'Comprehensive hardware & IT desk support' },
  ];

  // Core Service Offerings
  const coreServices = [
    {
      title: 'Business Website Development',
      desc: 'Mobile-responsive, fast-loading, SEO-ready corporate websites built to convert visitors into paying clients.',
      tags: ['Corporate Websites', 'Landing Pages', 'WordPress / React', 'Fast Load Times'],
      icon: Globe,
      color: 'blue'
    },
    {
      title: 'E-Commerce Website Development',
      desc: 'High-conversion online stores with secure UPI/card payment gateways, inventory management, and shipping integrations.',
      tags: ['Shopify & WooCommerce', 'UPI / Razorpay', 'Product Filters', 'Order Management'],
      icon: Code2,
      color: 'emerald'
    },
    {
      title: 'Web Application Development',
      desc: 'Custom cloud-native web portals, SaaS platforms, client dashboards, and workflow automation platforms.',
      tags: ['Next.js / Node.js', 'PostgreSQL / MongoDB', 'Role Authentication', 'Scalable APIs'],
      icon: Layers,
      color: 'indigo'
    },
    {
      title: 'Android & iOS App Development',
      desc: 'Native and cross-platform mobile apps for Android and iOS with fluid UI, push notifications, and offline capabilities.',
      tags: ['Flutter / React Native', 'Play Store & App Store', 'Push Notifications', 'Real-time Sync'],
      icon: Smartphone,
      color: 'cyan'
    },
    {
      title: 'ERP, CRM & Custom Software',
      desc: 'Tailored enterprise resource planning, customer relationship management, billing, inventory, and school management systems.',
      tags: ['Custom CRM', 'GST Billing', 'Inventory Tracking', 'Staff Management'],
      icon: Database,
      color: 'amber'
    },
    {
      title: 'Domain, Hosting & Business Email',
      desc: 'Reliable cloud servers, SSL certificates, official business email (Google Workspace/Zoho), and daily backups.',
      tags: ['Cloud Hosting', 'Business Email', 'SSL Encryption', '99.9% Uptime'],
      icon: Cloud,
      color: 'sky'
    },
    {
      title: 'Cloud Services & Networking',
      desc: 'Secure local area network (LAN) setup, Wi-Fi mesh routing, server virtualization, and cloud data migration.',
      tags: ['Office LAN Cabling', 'Wi-Fi Mesh', 'Firewall Setup', 'Cloud Migration'],
      icon: Server,
      color: 'violet'
    },
    {
      title: 'CCTV & IT Infrastructure',
      desc: 'HD IP CCTV surveillance camera installation, DVR/NVR setups, remote mobile viewing, and biometric access control.',
      tags: ['IP & HD Cameras', 'DVR / NVR Setup', 'Mobile Remote View', 'Biometric Access'],
      icon: Cctv,
      color: 'rose'
    },
    {
      title: 'Website Maintenance & Technical Support',
      desc: 'Monthly AMC support, regular backups, malware scanning, performance tuning, and 24/7 emergency bug fixes.',
      tags: ['Monthly Backups', 'Security Patches', 'Performance Tuning', 'Quick Support'],
      icon: Headphones,
      color: 'teal'
    }
  ];

  // Standard Website Package Inclusions (Verified from flyer)
  const websiteInclusions = [
    '100% Mobile & Tablet Responsive Design',
    'Contact Form & WhatsApp Direct Click-to-Chat',
    'Basic On-Page SEO (Meta tags, Titles, Sitemap)',
    'Social Media Profile Links & Integration',
    'Google Maps Location Integration (Where required)',
    'Fast Deployment & SSL Security Setup'
  ];

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setItSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `*BRENTRA IT SOLUTIONS ENQUIRY*%0A` +
      `--------------------------------%0A` +
      `*Name:* ${itName || 'Client'}%0A` +
      `*Phone:* ${itPhone || 'Not provided'}%0A` +
      `*Company:* ${itCompany || 'Individual / Business'}%0A` +
      `*Service Required:* ${itProjectType}%0A` +
      `*Budget:* ${itBudget}%0A` +
      `*Requirements:* ${encodeURIComponent(itRequirements || 'Please share a quotation and timeline.')}`;
    return `https://wa.me/919142144940?text=${text}`;
  };

  return (
    <div className="min-h-screen bg-white text-slate-800">
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-slate-50 via-white to-white border-b border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-widest">
              <Cpu className="w-4 h-4 text-blue-700" /> Brentra IT Solutions & Software
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-emerald-700" /> Build • Automate • Grow
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7">
              <h1 className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#0A192F] tracking-tight leading-[1.12]">
                Custom Software, Web & Mobile Applications Built for Growth
              </h1>

              <p className="text-base sm:text-lg text-slate-600 mt-5 leading-relaxed">
                From high-converting business websites starting at <strong className="text-blue-900 font-bold">₹10,000</strong> to custom ERP/CRM software, Android/iOS applications, and complete IT infrastructure setup across Patna and Bihar.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-8">
                <a
                  href="#pricing-table"
                  className="px-6 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center gap-2"
                >
                  <span>View Verified Rate Card</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="#it-enquiry"
                  className="px-5 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Request Custom IT Quote</span>
                </a>
                <a
                  href="tel:9065296294"
                  className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors shadow-sm flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-blue-700" />
                  <span>9065296294</span>
                </a>
              </div>

              {/* Highlights row */}
              <div className="mt-10 pt-6 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">1–5 Pages</div>
                  <div className="text-xs text-slate-500 mt-0.5">Website from ₹10,000</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">iOS & Android</div>
                  <div className="text-xs text-slate-500 mt-0.5">Apps from ₹25,000</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">ERP & CRM</div>
                  <div className="text-xs text-slate-500 mt-0.5">Solutions from ₹30,000</div>
                </div>
                <div>
                  <div className="text-2xl font-black text-[#0A192F] font-mono">100% Owned</div>
                  <div className="text-xs text-slate-500 mt-0.5">Source Code Rights</div>
                </div>
              </div>
            </div>

            {/* Visual preview card with IT photo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group">
                <img 
                  src="/img-it.jpg" 
                  alt="Brentra IT Solutions & Software Development" 
                  className="w-full h-[420px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/90 via-[#0A192F]/30 to-transparent flex flex-col justify-end p-6 text-white">
                  <span className="px-3 py-1 rounded bg-blue-600/90 text-white text-[10px] font-bold uppercase tracking-wider w-max mb-2">
                    Enterprise Engineering
                  </span>
                  <h3 className="text-xl font-bold text-white">Modern Software Architecture</h3>
                  <p className="text-xs text-slate-200 mt-1">
                    Delivering clean code, enterprise security, and 24/7 technical support for businesses across India.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Services Grid (9 Core Pillars) */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-widest px-3 py-1 rounded bg-blue-50 border border-blue-200">
              End-to-End Technology Capabilities
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              Comprehensive IT Solutions & Software Services
            </h2>
            <p className="text-sm text-slate-600">
              Everything your enterprise requires to build, automate, and scale operations digitally.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreServices.map((service, idx) => {
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

                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {service.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a
                      href="#it-enquiry"
                      onClick={() => setItProjectType(service.title)}
                      className="text-xs text-blue-700 hover:text-blue-900 font-bold inline-flex items-center gap-1"
                    >
                      Enquire for this service →
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Website Package Standard Inclusions */}
      <section className="py-14 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-10 shadow-sm">
            <div className="max-w-3xl mb-6">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest px-3 py-1 rounded bg-emerald-50 border border-emerald-200">
                Guaranteed Inclusions
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-[#0A192F] mt-2">
                Standard Inclusions with Every Website Package (1–5 Pages & Above)
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Every website built by Brentra Ventures includes these foundational business essentials at no hidden fee:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {websiteInclusions.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-500">
              <span>* Domain, hosting renewals, premium plugins, paid APIs, hardware, cloud usage and advanced integrations are extra unless included in the scope.</span>
              <span className="font-semibold text-blue-800">100% Transparent Terms</span>
            </div>
          </div>
        </div>
      </section>

      {/* Official Verified Price List Table (Section 05 of Pamphlet) */}
      <section id="pricing-table" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-widest px-3 py-1 rounded bg-blue-50 border border-blue-200">
              Verified Business Rates
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#0A192F]">
              IT Solutions & Software Services Rate Card
            </h2>
            <p className="text-sm text-slate-600">
              Official price list as published by Brentra Ventures Private Limited. No hidden surprises.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xl max-w-5xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0A192F] text-white text-xs font-bold uppercase tracking-wider">
                    <th className="py-4 px-6">Service / Deliverable</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Official Price (₹)</th>
                    <th className="py-4 px-6">Inclusions & Scope</th>
                    <th className="py-4 px-6 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-xs text-slate-700 font-sans">
                  {itServicesRateCard.map((item, idx) => (
                    <tr 
                      key={idx} 
                      className={`hover:bg-blue-50/50 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/60'}`}
                    >
                      <td className="py-3.5 px-6 font-bold text-[#0A192F]">
                        {item.service}
                      </td>
                      <td className="py-3.5 px-6 text-slate-500 font-medium">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-[11px]">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-6 font-mono font-extrabold text-blue-900 text-sm whitespace-nowrap">
                        {item.price}
                      </td>
                      <td className="py-3.5 px-6 text-slate-600">
                        {item.note}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <a
                          href="#it-enquiry"
                          onClick={() => {
                            setItProjectType(item.service);
                            setSelectedServiceRate(item.service);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-[#0A192F] text-blue-800 hover:text-white font-bold text-[11px] transition-colors inline-block"
                        >
                          Book / Inquire
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 text-[11px] text-slate-500 flex flex-wrap justify-between items-center gap-2">
              <span>* All prices are indicative of standard base scope. Highly custom logic, complex third-party API licensing, or specialized hardware are quoted upon requirement inspection.</span>
              <a 
                href="#it-enquiry" 
                className="font-bold text-blue-800 hover:underline"
              >
                Need something else? Request a Custom Quote →
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Dedicated IT Enquiry Form */}
      <section id="it-enquiry" className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-800 uppercase tracking-widest mb-2">
              <Send className="w-4 h-4 text-blue-600" /> Dedicated IT Consultation & Proposal
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0A192F] mb-2">
              Submit Your IT & Software Requirements
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mb-8">
              Fill out your project specifications below. Our technical architect will review your scope and provide a formal statement of work within 24 hours.
            </p>

            {itSubmitted ? (
              <div className="p-8 text-center space-y-4 bg-emerald-50 border border-emerald-200 rounded-2xl max-w-md mx-auto">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="font-heading font-bold text-xl text-slate-900">Enquiry Received!</h3>
                <p className="text-xs text-slate-600">
                  Thank you, <strong className="text-slate-900">{itName}</strong>. Our IT project lead will contact you on <strong className="text-slate-900">{itPhone}</strong> with technical architecture details and milestone timeline.
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
                    onClick={() => setItSubmitted(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 text-slate-700 font-bold text-xs"
                  >
                    Send Another Enquiry
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
                      value={itName}
                      onChange={(e) => setItName(e.target.value)}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={itPhone}
                      onChange={(e) => setItPhone(e.target.value)}
                      placeholder="e.g. 9065296294"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Business / Company Name</label>
                    <input
                      type="text"
                      value={itCompany}
                      onChange={(e) => setItCompany(e.target.value)}
                      placeholder="e.g. ABC Enterprises Pvt Ltd"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={itEmail}
                      onChange={(e) => setItEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Project / Service Type *</label>
                    <select
                      value={itProjectType}
                      onChange={(e) => setItProjectType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    >
                      <option value="Basic Business Website (1-5 Pages)">Basic Business Website (1–5 Pages) — ₹10,000</option>
                      <option value="Business Website (5-10 Pages)">Business Website (5–10 Pages) — ₹15,000</option>
                      <option value="Professional Website (10-15 Pages)">Professional Website (10–15 Pages) — ₹25,000</option>
                      <option value="E-commerce Website">E-commerce Website — ₹30,000</option>
                      <option value="Custom Website / Web Portal">Custom Website / Web Portal — ₹40,000+</option>
                      <option value="Android App Development">Android App Development — ₹25,000+</option>
                      <option value="Android + iOS App Development">Android + iOS App Development — ₹40,000+</option>
                      <option value="Custom Mobile App">Custom Mobile App — ₹50,000+</option>
                      <option value="ERP / CRM Solutions">ERP / CRM Solutions — ₹30,000+</option>
                      <option value="Billing & Inventory Software">Billing & Inventory Software — ₹20,000+</option>
                      <option value="School / Institute Management">School / Institute Management — ₹30,000+</option>
                      <option value="Website Maintenance (AMC)">Website Maintenance (AMC) — ₹2,000 / month</option>
                      <option value="Domain, Hosting & Email Setup">Domain, Hosting & Email Setup — ₹3,000+</option>
                      <option value="Network Setup">Network Setup — ₹5,999+</option>
                      <option value="CCTV Installation">CCTV Installation — ₹7,999+</option>
                      <option value="IT AMC & Technical Support">IT AMC & Technical Support — ₹3,000 / month</option>
                      <option value="Custom IT Solution / Other">Request a Custom Quote (Other Scope)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Estimated Budget (Optional)</label>
                    <select
                      value={itBudget}
                      onChange={(e) => setItBudget(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                    >
                      <option value="Under ₹15,000">Under ₹15,000</option>
                      <option value="₹15,000 - ₹30,000">₹15,000 – ₹30,000</option>
                      <option value="₹30,000 - ₹60,000">₹30,000 – ₹60,000</option>
                      <option value="₹60,000 - ₹1,50,000">₹60,000 – ₹1,50,000</option>
                      <option value="₹1,50,000+ Enterprise">₹1,50,000+ Enterprise Scope</option>
                      <option value="Flexible / Based on Quotation">Flexible / Based on Quotation</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Business Requirements & Scope Description</label>
                  <textarea
                    rows={3}
                    value={itRequirements}
                    onChange={(e) => setItRequirements(e.target.value)}
                    placeholder="Briefly describe what your software or website needs to do, preferred features, existing website link if any, etc."
                    className="w-full px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-sm focus:border-blue-600 focus:outline-none"
                  ></textarea>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 rounded-xl bg-[#0A192F] hover:bg-[#1E3E62] text-white font-bold text-xs uppercase tracking-wider shadow-md transition-transform active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                  >
                    <FileCheck2 className="w-4 h-4 text-cyan-400" />
                    <span>Submit IT Project Request</span>
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
                  Or call directly: <a href="tel:9065296294" className="font-bold text-slate-800 hover:underline">9065296294</a> / <a href="tel:+919142144940" className="font-bold text-slate-800 hover:underline">+91 91421 44940</a>
                </div>

              </form>
            )}

          </div>

        </div>
      </section>

    </div>
  );
};
