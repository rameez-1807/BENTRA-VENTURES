/**
 * Brentra Ventures — Master Site Configuration & Single Source of Truth
 * Reference: Section 13 Safe Decisions Baseline, PRD, TRD §6, Backend Schema §3
 */

export interface VerticalMeta {
  id: string;
  slug: string;
  title: string;
  cluster: 'Home & Facility' | 'Build & Realty' | 'Technology & Marketing' | 'Trade & Hospitality';
  shortDesc: string;
  badge?: string;
}

export const APPROVED_VERTICALS: VerticalMeta[] = [
  // Build & Realty
  {
    id: 'realty-infrastructure',
    slug: 'realty-infrastructure',
    title: 'Realty & Infrastructure',
    cluster: 'Build & Realty',
    shortDesc: 'Turnkey architectural design, residential/commercial construction & smart engineering.',
    badge: 'Baseline ₹1,900/sq.ft.'
  },
  {
    id: 'solar-renewable-energy',
    slug: 'solar-renewable-energy',
    title: 'Solar & Clean Energy',
    cluster: 'Build & Realty',
    shortDesc: 'On-grid rooftop solar installations, commercial energy audits & off-grid micro-grids.'
  },
  // Home & Facility
  {
    id: 'bentra-facility',
    slug: 'bentra-facility',
    title: 'Brentra Facility Services',
    cluster: 'Home & Facility',
    shortDesc: 'On-demand AC power-jet, mechanized water tank wash, deep home spa, electrical & plumbing.',
    badge: 'Patna Verified Pros'
  },
  {
    id: 'manpower-staffing',
    slug: 'manpower-staffing',
    title: 'Security & Manpower Solutions',
    cluster: 'Home & Facility',
    shortDesc: 'PSARA compliant trained security guards, corporate facility staff & verified workforce.'
  },
  // Technology & Marketing
  {
    id: 'it-digital',
    slug: 'it-digital',
    title: 'Enterprise IT & Cloud Solutions',
    cluster: 'Technology & Marketing',
    shortDesc: 'Full-stack software engineering, ERP architecture, cloud migration & cybersecurity.'
  },
  {
    id: 'education-skill-development',
    slug: 'education-skill-development',
    title: 'Skill Academy & Training',
    cluster: 'Technology & Marketing',
    shortDesc: 'Vocational trade certification, technician apprenticeships & enterprise digital skilling.'
  },
  // Trade & Hospitality
  {
    id: 'events-hospitality',
    slug: 'events-hospitality',
    title: 'Events & Luxury Hospitality',
    cluster: 'Trade & Hospitality',
    shortDesc: 'Grand conventions, high-end weddings, VIP catering & broadcast AV production.'
  },
  {
    id: 'fmcg-beverages',
    slug: 'fmcg-beverages',
    title: 'FMCG, Food & Beverages',
    cluster: 'Trade & Hospitality',
    shortDesc: 'Packaged premium staples, beverages, regional food processing & cold-chain distribution.'
  },
  {
    id: 'agriculture-farming',
    slug: 'agriculture-farming',
    title: 'Agri-Commodities & Mandi Trade',
    cluster: 'Trade & Hospitality',
    shortDesc: 'Direct farmer procurement, daily wholesale Mandi pricing & grain warehousing.'
  },
  {
    id: 'logistics-supply-chain',
    slug: 'logistics-supply-chain',
    title: 'Logistics & Supply Chain',
    cluster: 'Trade & Hospitality',
    shortDesc: 'Statewide fleet transit, hub-and-spoke Bihar distribution & last-mile fulfillment.'
  },
  {
    id: 'healthcare-wellness',
    slug: 'healthcare-wellness',
    title: 'Healthcare & Diagnostic Services',
    cluster: 'Home & Facility',
    shortDesc: 'Preventive health packages, doorstep sample collection & medical facility upkeep.'
  },
  {
    id: 'venture-capital-investments',
    slug: 'venture-capital-investments',
    title: 'Venture Capital & Seed Incubation',
    cluster: 'Technology & Marketing',
    shortDesc: 'Early-stage equity funding, infrastructure grants & mentorship for Bihar startups.'
  }
];

export const PATNA_SERVICED_PINCODES = [
  '800001', '800002', '800003', '800004', '800005', '800006',
  '800007', '800008', '800009', '800010', '800011', '800012',
  '800013', '800014', '800015', '800020', '800023', '800024',
  '800025', '800026', '800028'
];

export function isValidPatnaPincode(pincode: string): boolean {
  const clean = pincode.trim();
  return PATNA_SERVICED_PINCODES.includes(clean);
}

export const SITE_CONFIG = {
  name: 'Brentra Ventures',
  legalName: 'Brentra Ventures Private Limited',
  tagline: 'Multi-Vertical Enterprise Conglomerate for Eastern India',
  description: 'Brentra Ventures drives regional economic transformation across Bihar through world-class Construction & Realty, Doorstep Facility Management, IT Engineering, Luxury Events, and FMCG Trade.',
  url: 'https://brentraventures.com',
  headquarters: {
    address: 'Preven Vila, Flat 34, New Khajoorbana',
    area: 'New Khajoorbana, Mahendru Area',
    city: 'Patna',
    state: 'Bihar',
    pincode: '800006',
    country: 'India',
    fullFormatted: 'Preven Vila, Flat 34, New Khajoorbana, Patna – 800006, Bihar, India'
  },
  contacts: {
    phone: '+91 90652 96294',
    phoneFormatted: '+91 90652 96294',
    phoneTel: 'tel:+919065296294',
    whatsapp: '+91 91421 44940',
    whatsappLink: 'https://wa.me/919142144940?text=Hello%20Brentra%20Ventures%2C%20I%20would%20like%20to%20inquire%20about%20your%20services.',
    email: 'contact@brentraventures.com',
    careersEmail: 'careers@brentraventures.com',
    supportEmail: 'support@brentraventures.com'
  },
  operatingHours: {
    corporate: 'Mon – Sat: 8:00 AM – 8:00 PM IST',
    facilityServices: '7:00 AM – 9:00 PM IST (All 7 Days)',
    emergencyHelpline: '24/7 Priority Emergency Support for Active Sites'
  },
  rates: {
    constructionBaselinePerSqFt: 1900,
    constructionBaselineFormatted: '₹1,900 / sq. ft.',
    facilityDoorstepFee: 49,
    facilityDoorstepFeeFormatted: '₹49'
  },
  socialLinks: {
    linkedin: 'https://linkedin.com/company/brentra-ventures',
    twitter: 'https://x.com/brentraventures',
    facebook: 'https://facebook.com/brentraventures',
    instagram: 'https://instagram.com/brentraventures'
  },
  navClusters: [
    {
      title: 'Home & Facility',
      tagline: 'Urban On-Demand Doorstep Care',
      verticals: ['bentra-facility', 'manpower-staffing', 'healthcare-wellness']
    },
    {
      title: 'Build & Realty',
      tagline: 'Modern Architectural Engineering',
      verticals: ['realty-infrastructure', 'solar-renewable-energy']
    },
    {
      title: 'Technology & Marketing',
      tagline: 'Enterprise Cloud & Systems',
      verticals: ['it-digital', 'education-skill-development', 'venture-capital-investments']
    },
    {
      title: 'Trade & Hospitality',
      tagline: 'Supply Chain, Food & Luxury Celebrations',
      verticals: ['events-hospitality', 'fmcg-beverages', 'agriculture-farming', 'logistics-supply-chain']
    }
  ]
};

