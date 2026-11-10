/**
 * Brentra Ventures — Master Route Registry & Alias Redirect Map
 * Reference: TRD §6, PRD Navigation Overhaul, App Flow Document §2
 */

export interface AppRouteDefinition {
  path: string;
  title: string;
  description: string;
  verticalId?: string;
}

export const APP_ROUTES: Record<string, AppRouteDefinition> = {
  home: {
    path: '/',
    title: 'Brentra Ventures — Integrated Enterprise Conglomerate',
    description: 'Premier conglomerate driving Bihar with Realty & Infrastructure, Doorstep Facility Management, IT Solutions, Luxury Hospitality, and Trade.'
  },
  realty: {
    path: '/realty-infrastructure',
    title: 'Realty & Infrastructure | Brentra Ventures',
    description: 'Turnkey architectural engineering, residential towers, commercial complexes, and luxury construction in Patna from ₹1,900/sq.ft.',
    verticalId: 'realty-infrastructure'
  },
  facility: {
    path: '/bentra-facility',
    title: 'Brentra Facility Services — Doorstep Patna Home Care',
    description: 'Verified AC power-jet cleaning, 6-step mechanized water tank wash, salon at home, plumbing, and electrical repairs in 45 mins.',
    verticalId: 'bentra-facility'
  },
  it: {
    path: '/it-digital',
    title: 'Enterprise IT, Cloud & AI Engineering | Brentra Ventures',
    description: 'Enterprise ERP systems, custom web/mobile software, cloud migrations, and cybersecurity solutions for Eastern India enterprises.',
    verticalId: 'it-digital'
  },
  fmcg: {
    path: '/fmcg-beverages',
    title: 'Fresh FMCG, Food & Beverages | Brentra Ventures',
    description: 'Farm-direct food processing, packaged staples, cold-pressed oils, and statewide distribution network.',
    verticalId: 'fmcg-beverages'
  },
  events: {
    path: '/events-hospitality',
    title: 'Events & Luxury Hospitality | Brentra Ventures',
    description: 'High-impact enterprise conclaves, royal destination weddings, VVIP hospitality suites, and broadcast-grade AV production in Patna.',
    verticalId: 'events-hospitality'
  },
  manpower: {
    path: '/manpower-staffing',
    title: 'Security & Manpower Solutions | Brentra Ventures',
    description: 'PSARA compliant trained security personnel, commercial housekeeping, and skilled facility staffing across Bihar.',
    verticalId: 'manpower-staffing'
  },
  ventures: {
    path: '/ventures',
    title: 'Ventures, Incubation & Strategic Capital | Brentra Ventures',
    description: 'Catalyzing next-generation entrepreneurs, seed capital grants, and institutional mentorship for Bihar startups.',
    verticalId: 'venture-capital-investments'
  },
  corporate: {
    path: '/about',
    title: 'Corporate Leadership & Governance | Brentra Ventures',
    description: 'Learn about our visionary leadership, ethical corporate governance, Patna headquarters, and multi-vertical mission.'
  },
  patnaHub: {
    path: '/patna-hub',
    title: 'Patna Central Operations Hub | Brentra Ventures',
    description: 'Our physical logistics depot, dispatch center, and corporate regional headquarters in Patna – 800006.'
  },
  careers: {
    path: '/careers-partners',
    title: 'Careers, Vendor & Partner Network | Brentra Ventures',
    description: 'Join our rapidly expanding conglomerate. Explore executive careers, technician onboarding, and vendor partnerships.'
  },
  contact: {
    path: '/contact',
    title: 'Contact Corporate Desk & Patna HQ | Brentra Ventures',
    description: 'Reach our executive operations team, book a corporate meeting, or request an emergency service consultation.'
  },
  admin: {
    path: '/admin',
    title: 'Operations & Dispatch Console | Brentra Admin',
    description: 'Authorized operations console for order dispatch, lead review, technician assignment, and OTP verification.'
  }
};

/**
 * Legacy URL aliases mapped to their target canonical destination paths
 * Used for 301 server redirects and client `<Navigate to="..." replace />`
 */
export const ROUTE_ALIASES: Record<string, string> = {
  // Realty & Construction
  '/construction-services': '/realty-infrastructure',
  '/realty': '/realty-infrastructure',
  '/construction': '/realty-infrastructure',

  // Facility Services
  '/facility-services': '/bentra-facility',
  '/home-facility-services': '/bentra-facility',
  '/home-services': '/bentra-facility',
  '/urban-services': '/bentra-facility',
  '/facility': '/bentra-facility',
  '/services': '/bentra-facility',
  '/ro-water-purifier': '/bentra-facility',
  '/ro-services': '/bentra-facility',
  '/water-tank-cleaning': '/bentra-facility',
  '/tank-cleaning': '/bentra-facility',
  '/pest-control': '/bentra-facility',
  '/pest-control-services': '/bentra-facility',

  // IT & Tech
  '/it-solutions': '/it-digital',
  '/it-services': '/it-digital',
  '/digital-marketing': '/it-digital',
  '/marketing-services': '/it-digital',

  // Manpower & Staffing
  '/manpower-housekeeping': '/manpower-staffing',
  '/manpower-services': '/manpower-staffing',

  // Events & Hospitality
  '/events': '/events-hospitality',
  '/hospitality': '/events-hospitality',

  // FMCG
  '/fresh-fmcg': '/fmcg-beverages',

  // Corporate & Careers
  '/corporate-overview': '/about',
  '/careers': '/careers-partners',
  '/partners': '/careers-partners'
};

