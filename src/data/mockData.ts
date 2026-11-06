import { Director, HeroSlide } from '../types';

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    verticalId: 'it-solutions',
    tag: 'Enterprise Technology & AI Engineering',
    headline: 'Next-Generation Software Engineering & Enterprise Digital Scale',
    subtext: 'Custom Web Apps, Scalable Mobile Solutions, AI Workflows & Cloud Infrastructure built for ambitious enterprises.',
    primaryCtaText: 'Explore IT Solutions',
    primaryCtaLink: '/it-solutions',
    secondaryCtaText: 'Book a Free Tech Discovery Call',
    secondaryCtaLink: '/it-solutions#estimator',
    badge: 'ISO 27001 & SOC2 Practices',
    bgGradient: 'from-[#0A192F] via-[#0F284E] to-[#0A192F]',
    accentColor: '#00D2DF',
    iconName: 'Cpu',
    stats: { label: 'Active Enterprise Codebases', value: '140+' }
  },
  {
    id: 2,
    verticalId: 'fresh-fmcg',
    tag: 'Agricultural & Cold-Chain Supply',
    headline: 'Uncompromised Freshness: Farm-to-Door Wholesale Supply Chain',
    subtext: 'Daily supply of fresh eggs, premium fish, farm-fresh meat, gourmet ice cream, and packaged agricultural staples.',
    primaryCtaText: 'View Daily Wholesale Rates',
    primaryCtaLink: '/fresh-fmcg#rate-card',
    secondaryCtaText: 'Place Commercial Supply Order',
    secondaryCtaLink: '/fresh-fmcg#order',
    badge: 'FSSAI Certified Cold-Chain',
    bgGradient: 'from-[#0A192F] via-[#0D382B] to-[#0A192F]',
    accentColor: '#10B981',
    iconName: 'Fish',
    stats: { label: 'Daily Fresh Influx', value: '35+ Tons' }
  },
  {
    id: 3,
    verticalId: 'realty-infrastructure',
    tag: 'Flagship Construction Program',
    headline: 'Complete Turnkey Construction Starting @ ₹1,900 / sq. ft.',
    subtext: 'From foundation to final paint, modular kitchens & luxury interiors. Transparent, on-time, zero hidden costs in Bihar.',
    primaryCtaText: 'Calculate Construction Cost',
    primaryCtaLink: '/realty-infrastructure#calculator',
    secondaryCtaText: 'Book Site Inspection',
    secondaryCtaLink: '/realty-infrastructure#inspection',
    badge: 'Guaranteed 10-Year Structural Warranty',
    bgGradient: 'from-[#0A192F] via-[#332211] to-[#0A192F]',
    accentColor: '#C5A880',
    iconName: 'Building2',
    stats: { label: 'Turnkey Sq. Ft. Delivered', value: '1.2M+' }
  },
  {
    id: 4,
    verticalId: 'facility-services',
    tag: 'On-Demand Urban Infrastructure',
    headline: 'On-Demand Home & Facility Care You Can Rely On',
    subtext: 'Certified AC technicians, RO purification experts, sanitization, deep cleaning, and verified professional manpower.',
    primaryCtaText: 'Book A Technician in 60s',
    primaryCtaLink: '/facility-services#emergency',
    secondaryCtaText: 'Corporate Facility AMC',
    secondaryCtaLink: '/facility-services#amc',
    badge: '<60 Mins Emergency TAT',
    bgGradient: 'from-[#0A192F] via-[#1A2F50] to-[#0A192F]',
    accentColor: '#38BDF8',
    iconName: 'Wrench',
    stats: { label: 'Verified Technicians on Field', value: '450+' }
  },
  {
    id: 5,
    verticalId: 'events-hospitality',
    tag: 'Luxury Celebrations & Conventions',
    headline: 'Signature Celebrations & Seamless Corporate Gatherings',
    subtext: 'End-to-end luxury wedding planning, stage & acoustic production, corporate conferences, and premium catering services.',
    primaryCtaText: 'Plan Your Event',
    primaryCtaLink: '/events-hospitality#planner',
    secondaryCtaText: 'Check Date Availability',
    secondaryCtaLink: '/events-hospitality#inquiry',
    badge: 'Capacity 100 to 5,000+ Guests',
    bgGradient: 'from-[#0A192F] via-[#2F1138] to-[#0A192F]',
    accentColor: '#EC4899',
    iconName: 'PartyPopper',
    stats: { label: 'Executed Galas & Summits', value: '380+' }
  },
  {
    id: 6,
    verticalId: 'building-materials',
    tag: 'Bulk Wholesale Building Materials',
    headline: 'High-Grade Raw Materials for Stronger Foundations',
    subtext: 'Bulk wholesale sourcing of certified cement, TMT steel, graded sand, red clay bricks, and exterior aggregates.',
    primaryCtaText: 'Request Bulk Material Quote',
    primaryCtaLink: '/realty-infrastructure#materials',
    secondaryCtaText: 'Download Supply Catalog',
    secondaryCtaLink: '/realty-infrastructure#materials',
    badge: 'BIS & ISO Certified Sourcing',
    bgGradient: 'from-[#0A192F] via-[#372714] to-[#0A192F]',
    accentColor: '#F59E0B',
    iconName: 'Hammer',
    stats: { label: 'Monthly Fleet Dispatches', value: '800+ Trucks' }
  },
  {
    id: 7,
    verticalId: 'ventures',
    tag: 'Healthcare & Regional Trade Expansion',
    headline: 'Expanding Access to Reliable Healthcare & Regional Trade',
    subtext: 'Strategic medicine wholesale distribution networks, cold-chain solutions, and forward-looking industrial logistics.',
    primaryCtaText: 'Explore Venture Network',
    primaryCtaLink: '/ventures',
    secondaryCtaText: 'Partner With Brentra',
    secondaryCtaLink: '/careers#partner',
    badge: 'Pan-Bihar Distribution Reach',
    bgGradient: 'from-[#0A192F] via-[#102B3F] to-[#0A192F]',
    accentColor: '#00D2DF',
    iconName: 'HeartPulse',
    stats: { label: 'Active Retail Chemists', value: '1,200+' }
  }
];

export const DIRECTORS: Director[] = [
  {
    id: 'md',
    name: 'Shri Alok Kumar Verma',
    role: 'Managing Director',
    division: 'Strategy, Capital Allocation & Group Governance',
    focus: 'Corporate governance, capital allocation, long-term enterprise vision, making Brentra an economic powerhouse in Eastern India.',
    quote: 'Our core mandate is establishing institutional excellence across sectors—building transparent, dependable businesses that solve everyday infrastructure and lifestyle needs.',
    message: 'We founded Brentra Ventures with the firm conviction that Bihar deserves corporate conglomerates operating with the governance standards of Tata and the agility of modern tech startups. Every vertical under our umbrella stands for absolute accountability to the consumer.',
    initials: 'AV',
    accentColor: '#00D2DF'
  },
  {
    id: 'tech',
    name: 'Er. Ritesh Ranjan',
    role: 'Director – Technology & Digital Transformation',
    division: 'Software Engineering, AI Workflows & IT Solutions',
    focus: 'Software architecture, AI automation, seamless customer journey, and operational digitisation across all group companies.',
    quote: 'Technology is not an isolated unit at Brentra; it is the nervous system connecting our logistics, construction, and client delivery.',
    message: 'From real-time IoT tracking in our refrigerated FMCG trucks to proprietary estimation algorithms for ₹1,900/sq.ft turnkey homes, our engineering teams build software that drives real-world business efficiency and speed.',
    initials: 'RR',
    accentColor: '#38BDF8'
  },
  {
    id: 'realty',
    name: 'Sanjeev N. Singh',
    role: 'Director – Infrastructure, Realty & Materials',
    division: 'Civil Engineering, Turnkey Construction & Raw Material Supply',
    focus: 'Engineering integrity, the ₹1,900/sq.ft turnkey delivery promise, vendor management, and strict safety standards.',
    quote: 'We demystify real estate and construction. Delivering quality homes at predictable, fair pricing without compromise is our pledge to every family.',
    message: 'Home construction in Eastern India had been plagued by opaque pricing and indefinite contractor delays. Our standardized ₹1,900/sq.ft blueprint with premium TMT steel, branded modular interiors, and milestone-linked audits sets a new benchmark.',
    initials: 'SS',
    accentColor: '#C5A880'
  },
  {
    id: 'ops',
    name: 'Prabhat K. Choudhary',
    role: 'Director – Supply Chain, Services & Hospitality',
    division: 'Perishable Logistics, Facility Maintenance & Events Management',
    focus: 'Perishable logistics, cold-chain fulfillment, technician SLAs (Service Level Agreements), and experiential event execution.',
    quote: 'Reliability in daily services and food supplies requires relentless precision. We build trust by delivering freshness and prompt support on ground every single day.',
    message: 'Whether rushing an emergency AC technician to an office within 60 minutes or catering a 2,000-guest gala wedding with zero compromise on taste and hygiene, operational excellence is the heartbeat of our consumer-facing divisions.',
    initials: 'PC',
    accentColor: '#10B981'
  }
];

export const PARENT_STATS = [
  { label: 'Diversified Business Verticals', value: '7', suffix: ' Conglomerate Units', sub: 'Unified governance & leadership' },
  { label: 'Turnkey Construction Benchmark', value: 'Starting ₹1,900', suffix: ' / sq. ft.', sub: 'Standardized luxury turnkey guarantee' },
  { label: 'On-Demand Service Response', value: '<60', suffix: ' Mins', sub: 'Rapid technician TAT in Patna metro' },
  { label: 'Verified Crew & Sourced Goods', value: '100%', suffix: ' Certified', sub: 'Zero compromise on safety & quality' },
  { label: 'Happy Families & Businesses Served', value: '25,000+', suffix: '', sub: 'Across Patna & Bihar districts' },
  { label: 'Total Regional Workforce', value: '1,100+', suffix: ' Jobs Created', sub: 'Empowering local skilled talent' }
];

export const DAILY_RATES = [
  { item: 'Farm Fresh White Eggs (Per 100 Trays / 3000 Pcs)', rate: '₹14,400', unit: 'Commercial Wholesale', change: '+1.2%', status: 'Fresh Morning Batch' },
  { item: 'Broiler Chicken (Live Weight / Farm Gate)', rate: '₹118', unit: 'Per Kg Wholesale', change: '0.0%', status: 'Available' },
  { item: 'Hygienic Processed Chicken (Skinless Cut)', rate: '₹185', unit: 'Per Kg Pack', change: '-1.5%', status: 'In Cold Storage' },
  { item: 'Fresh Bihar River Rohu Fish (1.5 - 2.5kg size)', rate: '₹220', unit: 'Per Kg', change: '+2.0%', status: 'Daily River Catch' },
  { item: 'Premium Foxnut (Makhana) Jumbo 5-Suta', rate: '₹940', unit: 'Per Kg (50kg Bag)', change: 'Stable', status: 'Direct Mithila Farm' },
  { item: 'Brentra Gourmet Ice Cream (Bulk 4L Catering Tub)', rate: '₹480', unit: 'Per 4L Tub', change: 'Promo', status: '8 Gourmet Flavors' }
];

export const CONSTRUCTION_INCLUSIONS = [
  {
    phase: '1. Structural Engineering & Foundation',
    badge: 'Seismic Zone IV Safe',
    items: [
      'Tata Tiscon / Jindal Panther 550D Grade-A TMT Steel',
      'Ultratech / Ambuja 53-Grade High Early Strength Cement',
      'First-Class Kiln-Burned Red Clay Bricks (No fly-ash compromise)',
      'Sub-Structure Anti-Termite Soil Chemical Treatment',
      'Soil test report, structural engineer calculation sheet & architect drawings'
    ]
  },
  {
    phase: '2. Flooring, Finishes & Joinery',
    badge: 'Vitrified & Granite',
    items: [
      'Kajaria / Somany 4ft x 2ft Mirror-Polished Glazed Vitrified Tiles',
      'Black Galaxy / Jet Black Granite Kitchen Countertops with SS Sink',
      'Anti-skid matte ceramic tiles in all bathrooms and balconies',
      'Teak wood main entrance frame with designer veneer waterproof door',
      'UPVC 3-track sliding windows with mosquito mesh and Saint-Gobain glass'
    ]
  },
  {
    phase: '3. Electrical & Concealed Plumbing',
    badge: 'Finolex & Havells',
    items: [
      'Finolex / Polycab FRLS (Flame Retardant) concealed copper wiring',
      'Havells / Schneider modular switches with MCB distribution box',
      'Astral / Supreme CPVC & SWR anti-leak multi-layer plumbing lines',
      'Jaquar / Kohler CP bathroom fittings and wall-hung EWC fixtures',
      'Pre-installed AC copper conduits and solar geyser piping provisions'
    ]
  },
  {
    phase: '4. Turnkey Modular Interiors & Aesthetics',
    badge: 'Complete Living Ready',
    items: [
      'Full POP & Gypsum false ceiling design with dimmable warm LED strips',
      'Complete Marine-Ply modular kitchen layout with soft-close tandem drawers',
      'Provisioned custom master bedroom wardrobe carpentry layout',
      'Birla White putty 3-coat base with Asian Paints Royale Luxury Emulsion',
      'Weather-shield silicone-infused exterior facade coating'
    ]
  }
];
