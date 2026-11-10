import { EventItem, HospitalityPackage, EventTestimonial, PastEventMedia } from '../types/events';

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'evt-tech-summit-2026',
    title: 'Eastern India Tech & Industrial Conclave 2026',
    slug: 'eastern-india-tech-industrial-conclave-2026',
    category: 'Conferences',
    date: '2026-11-28',
    endDate: '2026-11-29',
    time: '09:00 AM – 06:30 PM IST',
    location: 'Gyan Bhawan, Gandhi Maidan, Patna',
    status: 'Upcoming',
    capacity: 1200,
    priceTier: '₹4,999 – ₹18,500 Delegate Passes',
    featuredImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The premier flagship convention for technology pioneers, renewable energy investors, and infrastructure leaders across Eastern India. Featuring 4K P2.6 curved video walls, bilateral boardroom suites, live global broadcast streaming, and 5-star executive banquet catering managed by Brentra Ventures.',
    highlights: [
      'Turnkey AV rigging with 30ft x 12ft curved P2.6 Ultra-HD LED backdrop',
      'Simultaneous multilingual translation pods & digital badge RFID turnstiles',
      'VVIP delegates lounge with customized executive barista & chef brigade',
      'Live nationwide telecast & digital attendee networking mobile app'
    ],
    isFeatured: true,
    itinerary: [
      { time: '09:00 AM', activity: 'Registration & Continental Welcome Breakfast in Executive Atrium' },
      { time: '10:15 AM', activity: 'Inaugural Keynote: Digital Transformation in Bihar & Eastern Corridors' },
      { time: '01:00 PM', activity: '5-Course Gourmet Networking Luncheon & B2B Exhibition Walk' },
      { time: '03:30 PM', activity: 'Investor Panel & Venture Capital Fireside Chat' },
      { time: '06:00 PM', activity: 'Gala Awards Ceremony & Champagne Networking High Tea' }
    ],
    venueDetails: {
      name: 'Gyan Bhawan International Convention Centre',
      address: 'North of Gandhi Maidan, Fraser Road Area',
      city: 'Patna, Bihar',
      landmark: 'Opposite historic Gandhi Maidan Pavilion',
      capacity: 1500
    },
    organizer: 'Brentra Ventures Corporate Events & IT Division'
  },
  {
    id: 'evt-royal-mauryan-wedding',
    title: 'The Royal Mauryan Heritage Wedding & Sangeet Gala',
    slug: 'royal-mauryan-heritage-wedding-sangeet-gala',
    category: 'Luxury Hospitality',
    date: '2026-12-14',
    endDate: '2026-12-16',
    time: '04:00 PM Onwards',
    location: 'Patna Heritage Lawns & Riverfront Pavilion',
    status: 'Upcoming',
    capacity: 1800,
    priceTier: 'Bespoke Turnkey Royal Decor',
    featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An ethereal celebration inspired by the timeless opulence of Patliputra grandeur. Featuring a 45ft revolving hydraulic floral varmala stage, a sacred crystal-lit riverfront mandap with 10,000 imported Dutch roses, and an imperial 7-course royal feast prepared by master chefs.',
    highlights: [
      'Hydraulic 360-degree revolving floral varmala stage with cold pyro reveals',
      'Vrindavan-inspired sacred Vedic mandap floating on reflective water body',
      'Royal Rajasthani & Awadhi interactive live counters alongside traditional Bihari Bhoj',
      'Sufi orchestra & celebrity Bollywood artist live performance audio rigging'
    ],
    isFeatured: true,
    itinerary: [
      { time: '04:00 PM', activity: 'Shehnai & Welcome Drink Reception at the Imperial Archway' },
      { time: '06:00 PM', activity: 'Groom Baraat Arrival with Royal Brass Band & Synchronized Pyrotechnics' },
      { time: '07:30 PM', activity: 'Hydraulic Varmala Ceremony & Aerial Drone Rose Shower' },
      { time: '08:30 PM', activity: 'Grand Royal Banquet Dinner with 12 Live Cooking Stations' },
      { time: '11:00 PM', activity: 'Sacred Vedic Pheras in Crystal Mandap overlooking Ganges breeze' }
    ],
    venueDetails: {
      name: 'Patna Heritage Lawns & Riverfront Pavilion',
      address: 'Danapur-Khagaul Riverfront Boulevard',
      city: 'Patna, Bihar',
      landmark: 'Near Digha-Danapur Marine Drive Overlook',
      capacity: 2500
    },
    organizer: 'Brentra Luxury Events & Wedding Architecture'
  },
  {
    id: 'evt-leadership-gala-2026',
    title: 'Bihar Global Investors & Leadership Gala Dinner',
    slug: 'bihar-global-investors-leadership-gala-dinner',
    category: 'Corporate Galas',
    date: '2026-12-22',
    time: '07:00 PM – 11:30 PM IST',
    location: 'Hotel Maurya Grand Crystal Ballroom, Patna',
    status: 'Upcoming',
    capacity: 450,
    priceTier: 'Exclusive Corporate By-Invitation',
    featuredImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An elite black-tie corporate evening bringing together enterprise CEOs, state cabinet leaders, and international venture partners. Features Michelin-style plated service, jazz acoustic trio, and bespoke corporate hospitality suites.',
    highlights: [
      'Silver-service seated banquet with personalized menu monogramming',
      'High-security biometric check-in and private VIP holding suites',
      'Crystal chandelier illumination with dynamic architectural mood lighting',
      'Commemorative brass awards and personalized luxury gift hampers'
    ],
    isFeatured: false,
    itinerary: [
      { time: '07:00 PM', activity: 'Arrival Cocktails, Hors d’oeuvres & Red Carpet Media Wall' },
      { time: '08:00 PM', activity: 'Welcome Address by Chief Patron & Economic Milestone Showcase' },
      { time: '09:00 PM', activity: 'Plated 5-Course State Banquet Dinner with Acoustic Jazz' },
      { time: '10:30 PM', activity: 'Enterprise Honors & Strategic Partnership Announcements' }
    ],
    venueDetails: {
      name: 'Hotel Maurya Grand Crystal Ballroom',
      address: 'South Gandhi Maidan, Frazer Road',
      city: 'Patna, Bihar',
      landmark: 'Next to Maurya Complex',
      capacity: 500
    },
    organizer: 'Brentra Ventures Hospitality & VIP Management'
  },
  {
    id: 'evt-biotech-expo-2027',
    title: 'Eastern India Healthcare & MedTech Expo 2027',
    slug: 'eastern-india-healthcare-medtech-expo-2027',
    category: 'Exhibitions',
    date: '2027-01-18',
    endDate: '2027-01-20',
    time: '10:00 AM – 07:00 PM IST',
    location: 'Patliputra Exhibition Arena, Bailey Road',
    status: 'Upcoming',
    capacity: 3500,
    priceTier: 'Exhibitor Stalls & Public Passes',
    featuredImage: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A multi-acre international exhibition showcasing clinical innovations, diagnostics, and pharmaceutical equipment with custom modular booth architecture fabricated by Brentra Facility & Infrastructure.',
    highlights: [
      '120+ custom aluminum Octanorm and bespoke wooden designer stalls',
      'Industrial grade 3-phase power distribution and redundant climate control',
      'Online visitor badge kiosks with contactless QR ticket validation',
      'Hospitality cafeteria serving 2,500 meals daily with strict FSSAI compliance'
    ],
    isFeatured: false,
    itinerary: [
      { time: '10:00 AM', activity: 'Exhibition Floor Opens to Trade Delegates & Medical Directors' },
      { time: '11:30 AM', activity: 'Live Robotics Surgery Demonstrations & AV Screenings' },
      { time: '02:00 PM', activity: 'Medical Procurement B2B Networking Sessions' },
      { time: '05:00 PM', activity: 'Innovation in Rural Healthcare Roundtable' }
    ],
    venueDetails: {
      name: 'Patliputra Exhibition Ground & Trade Pavilion',
      address: 'Near Saguna More, Bailey Road',
      city: 'Patna, Bihar',
      landmark: 'Opposite High Court Sports Complex',
      capacity: 5000
    },
    organizer: 'Brentra Ventures Infrastructure & Events Division'
  },
  {
    id: 'evt-sufi-riverfront-night',
    title: 'Bespoke Riverfront Sangeet & Mystic Sufi Night',
    slug: 'bespoke-riverfront-sangeet-mystic-sufi-night',
    category: 'Private Events',
    date: '2026-11-20',
    time: '06:30 PM – 11:30 PM IST',
    location: 'Ganga Kinar Lawns, Kurji, Patna',
    status: 'Upcoming',
    capacity: 600,
    priceTier: 'Bespoke Private Host',
    featuredImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An intimate, mystical evening featuring warm amber fairy canopies, plush royal diwan seating, authentic Awadhi kebabs on charcoal sigris, and an acclaimed Sufi ensemble performing under open stars.',
    highlights: [
      'Bohemian Rajasthani low diwan seating with Persian silk floor carpets',
      'Interactive live sigri counters: Galouti kebabs, Roomali rotis & saffron Phirni',
      'Warm Edison bulb hanging arrays with zero-latency Meyer Sound acoustics',
      'Customized mocktail apothecary bar and fresh royal Paan lounge'
    ],
    isFeatured: false,
    itinerary: [
      { time: '06:30 PM', activity: 'Guest Welcome with Zafrani Chai & Rose Water Mist' },
      { time: '07:30 PM', activity: 'Live Qawwali & Acoustic Sufi Set 1' },
      { time: '09:00 PM', activity: 'Awadhi Dastarkhwan Dinner Spread with Live Sigris' },
      { time: '10:15 PM', activity: 'High-Energy Bollywood Fusion & Family Dance Celebration' }
    ],
    venueDetails: {
      name: 'Ganga Kinar Riverside Pavilion',
      address: 'Main Canal Road, Kurji Ghat',
      city: 'Patna, Bihar',
      landmark: 'Riverfront Marine Drive Link',
      capacity: 800
    },
    organizer: 'Brentra Boutique Private Celebrations'
  },
  {
    id: 'evt-automotive-dealer-conclave',
    title: 'Annual Eastern India Automotive Dealer Conclave & Awards',
    slug: 'annual-eastern-india-automotive-dealer-conclave',
    category: 'Corporate Galas',
    date: '2026-09-18',
    time: '05:00 PM – 10:30 PM IST',
    location: 'Hotel Maurya Ballroom, Patna',
    status: 'Past',
    capacity: 400,
    priceTier: 'Enterprise Corporate Package',
    featuredImage: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A benchmark event celebrating top vehicle dealerships with 360-degree vehicle stage reveals, synchronized pyrotechnic fountains, and high-impact digital multimedia awards presentations.',
    highlights: [
      'Reinforced vehicle platform capable of holding 2.5-ton SUVs on stage',
      'Precision synchronized beam lighting and haze stage effects',
      'Executive 4-course banquet with customized dealer crest desserts',
      'Complete event video wrap reel delivered within 12 hours'
    ],
    isFeatured: false,
    itinerary: [
      { time: '05:00 PM', activity: 'Arrival & Interactive Car Simulator Lounge' },
      { time: '06:30 PM', activity: 'New Flagship EV Unveiling on Hydraulic Revolving Turntable' },
      { time: '08:00 PM', activity: 'National Sales Awards & Trophy Distribution' },
      { time: '09:15 PM', activity: 'Gourmet Dinner & Live Fusion Band' }
    ],
    venueDetails: {
      name: 'Hotel Maurya Ballroom',
      address: 'South Gandhi Maidan, Patna',
      city: 'Patna, Bihar',
      capacity: 500
    },
    organizer: 'Brentra Corporate Production'
  },
  {
    id: 'evt-bihar-cultural-symposium',
    title: 'Magadh Heritage & Cultural Literary Symposium',
    slug: 'magadh-heritage-cultural-literary-symposium',
    category: 'Conferences',
    date: '2026-08-12',
    time: '10:00 AM – 05:00 PM IST',
    location: 'Bihar Museum Auditorium, Bailey Road',
    status: 'Past',
    capacity: 650,
    priceTier: 'Cultural Grant / Public Academic',
    featuredImage: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A distinguished gathering of historians, authors, and sociologists discussing ancient Magadha civil engineering and art traditions, supported by acoustic clarity and heritage thematic stagecraft.',
    highlights: [
      'Acoustic surround setup optimized for clear vocal speech capture',
      'Thematic terracotta and brass backdrop honoring Nalanda architecture',
      'Bilingual simultaneous transcription display',
      'Traditional Mithila Makhana and organic Herbal Tea catering'
    ],
    isFeatured: false,
    itinerary: [
      { time: '10:00 AM', activity: 'Vedic Chanting & Lamp Lighting by Cultural Scholars' },
      { time: '11:15 AM', activity: 'Panel: Urban Planning in Ancient Pataliputra' },
      { time: '01:30 PM', activity: 'Traditional Bihari Sattvic Bhoj' },
      { time: '03:00 PM', activity: 'Open Poetry Recital & Book Releases' }
    ],
    venueDetails: {
      name: 'Bihar Museum Auditorium',
      address: 'Jawaharlal Nehru Marg, Bailey Road',
      city: 'Patna, Bihar',
      capacity: 700
    },
    organizer: 'Brentra Heritage & Cultural Trust'
  },
  {
    id: 'evt-state-diplomatic-banquet',
    title: 'State Banquet & Diplomatic Gala Dinner',
    slug: 'state-banquet-diplomatic-gala-dinner',
    category: 'Luxury Hospitality',
    date: '2026-07-25',
    time: '07:30 PM – 11:00 PM IST',
    location: 'Patna Executive Club, Bailey Road',
    status: 'Past',
    capacity: 450,
    priceTier: '₹1,450 / Plate Silver Service',
    featuredImage: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A flawless 7-course multi-cuisine diplomatic gala dinner executed under strict hygiene and protocol specifications for foreign trade delegates and cabinet officials.',
    highlights: [
      'Strict FSSAI 5-star temperature-controlled gourmet supply chain',
      'Personalized silver service with white-gloved culinary stewards',
      'Live Champaran Handi Meat, Awadhi Dum Biryani & Artisanal Gelato lounges',
      'Bespoke royal livery uniform for entire 80-member hospitality crew'
    ],
    isFeatured: false,
    itinerary: [
      { time: '07:30 PM', activity: 'Ceremonial Guard of Honor & Welcome Aperitifs' },
      { time: '08:15 PM', activity: 'Cultural Sitar Recital & Toast by Chief Secretary' },
      { time: '09:00 PM', activity: '7-Course Curated Silver-Plated Degustation Menu' }
    ],
    venueDetails: {
      name: 'Patna Executive Club',
      address: 'Bailey Road Corridor',
      city: 'Patna, Bihar',
      capacity: 500
    },
    organizer: 'Brentra Gourmet Catering & VIP Hospitality'
  }
];

export const HOSPITALITY_PACKAGES: HospitalityPackage[] = [
  {
    id: 'pkg-vip-sovereign',
    name: 'VIP Sovereign Lounge & Concierge',
    tier: 'VIP',
    guestCapacity: {
      min: 50,
      max: 600,
      recommended: 250
    },
    amenities: [
      'Private biometric security checkpoint & personal guest escort',
      'Dedicated personal Butler & Champagne Sommelier service',
      'Exclusive air-conditioned luxury lounge with Italian velvet seating',
      'Artisanal farm-to-table gourmet tasting menu with live chef carving',
      'High-speed private Wi-Fi network & VIP charging pods',
      'Dedicated valet parking bay with priority exit access'
    ],
    priceEstimate: {
      baseRate: 95000,
      perGuestRate: 2200,
      currency: 'INR',
      displayStarting: '₹95,000 + ₹2,200/guest',
      unitLabel: 'VIP All-Inclusive'
    },
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    availabilityStatus: 'Available',
    description: 'The pinnacle of bespoke hospitality in Bihar. Designed for high-net-worth families, international dignitaries, and luxury wedding hosts who require uncompromised privacy, exquisite aesthetics, and elite hospitality.',
    tagline: 'White-glove luxury, private security suites & bespoke dining',
    badge: 'Flagship Tier',
    accentColor: '#DB2777',
    staffingRatios: {
      eventCoordinators: 3,
      serversAndButlers: 18,
      securityPersonnel: 8,
      executiveChefs: 4
    }
  },
  {
    id: 'pkg-corporate-summit',
    name: 'Corporate Summit, AV & Conclave Suite',
    tier: 'Corporate',
    guestCapacity: {
      min: 100,
      max: 2000,
      recommended: 500
    },
    amenities: [
      'P2.6 Ultra-HD curved LED video wall (up to 36ft x 12ft)',
      'JBL VTX / VRX Line-Array acoustic acoustic surround system',
      'Simultaneous 4K YouTube/Zoom multi-camera live broadcast',
      'Digital attendee registration kiosk with QR code badge printing',
      'Continental networking breakfasts & 5-course executive buffet lunch',
      'Zero-feedback wireless Shure lapels & gooseneck podium microphones'
    ],
    priceEstimate: {
      baseRate: 49999,
      perGuestRate: 950,
      currency: 'INR',
      displayStarting: '₹49,999 Base Rigging + ₹950/guest',
      unitLabel: 'Corporate Full Day'
    },
    previewImage: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
    availabilityStatus: 'Available',
    description: 'Engineered specifically for multinational corporations, state conclaves, medical expos, and dealer assemblies demanding zero downtime, crystalline acoustics, and punctual execution.',
    tagline: 'Broadcast-grade AV production with seamless delegate catering',
    badge: 'Enterprise Standard',
    accentColor: '#0284C7',
    staffingRatios: {
      eventCoordinators: 4,
      serversAndButlers: 25,
      securityPersonnel: 6,
      executiveChefs: 5
    }
  },
  {
    id: 'pkg-bespoke-royal',
    name: 'Bespoke Royal Heritage Gala & Sangeet',
    tier: 'Bespoke',
    guestCapacity: {
      min: 200,
      max: 5000,
      recommended: 1000
    },
    amenities: [
      'Hydraulic 360° revolving bridal/groom varmala stage',
      '40ft thematic royal palace facade with architectural 3D projection',
      'Crystal hawan mandap on floating lotus pool with cold pyrotechnics',
      'Authentic Royal Bihari Bhoj + Pan-Asian & Awadhi live cooking stalls',
      'Instagrammable neon hashtag photo zones & floral swing gazebos',
      'VIP lounge diwan seating with Persian rugs & vintage brass lanterns'
    ],
    priceEstimate: {
      baseRate: 149999,
      perGuestRate: 1450,
      currency: 'INR',
      displayStarting: '₹1,49,999 Stage & Decor + ₹1,450/guest',
      unitLabel: 'Turnkey Royal Experience'
    },
    previewImage: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=800&q=80',
    availabilityStatus: 'Limited Slots',
    description: 'Transforming open lawns and banquet arenas into grand Mauryan and Rajasthani palaces. Complete turnkey management from wedding card stationery to bride entry drones and fireworks.',
    tagline: 'Grand hydraulic stages, sacred glass mandaps & royal banquets',
    badge: 'Most Popular in Bihar',
    accentColor: '#D97706',
    staffingRatios: {
      eventCoordinators: 6,
      serversAndButlers: 45,
      securityPersonnel: 15,
      executiveChefs: 8
    }
  },
  {
    id: 'pkg-standard-conclave',
    name: 'Classic Banquet & Boutique Social Gala',
    tier: 'Standard',
    guestCapacity: {
      min: 50,
      max: 800,
      recommended: 200
    },
    amenities: [
      'Contemporary floral entrance archway & customized welcome signage',
      'Professional sound rig with wireless handheld microphones & DJ console',
      'Ambient LED par wash & truss lighting matching corporate/wedding palette',
      'Deluxe 3-course buffet spread (Veg & Non-Veg options) with dessert bar',
      'Uniformed banquet service staff & water refill stations',
      'On-site event coordinator coordinating timings and stage itinerary'
    ],
    priceEstimate: {
      baseRate: 34999,
      perGuestRate: 750,
      currency: 'INR',
      displayStarting: '₹34,999 Base + ₹750/guest',
      unitLabel: 'Cost-Effective Production'
    },
    previewImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=800&q=80',
    availabilityStatus: 'Available',
    description: 'Ideal for birthday milestones, Haldi/Mehendi soirees, anniversary gatherings, and institutional workshops requiring polished professionalism at transparent rates.',
    tagline: 'Vibrant boutique aesthetics and reliable banquet management',
    badge: 'Value Excellence',
    accentColor: '#10B981',
    staffingRatios: {
      eventCoordinators: 2,
      serversAndButlers: 12,
      securityPersonnel: 3,
      executiveChefs: 3
    }
  }
];

export const EVENT_TESTIMONIALS: EventTestimonial[] = [
  {
    id: 'tst-1',
    clientName: 'Dr. Alok Verma & Smt. Sunita Verma',
    role: 'Parents of the Bride',
    companyOrFamily: 'Verma Family Heritage Wedding, Patna',
    eventTitle: 'The Royal Mauryan Heritage Wedding',
    eventCategory: 'Luxury Hospitality',
    rating: 5,
    quote: 'Brentra Ventures transformed the Danapur riverfront lawns into an absolute wonderland. The hydraulic revolving varmala stage and 40ft floral entrance left our 1,400 guests spellbound. Not a single hitch in 3 days!',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    date: 'December 2025'
  },
  {
    id: 'tst-2',
    clientName: 'Rajiv Shekhar',
    role: 'Director of Corporate Affairs',
    companyOrFamily: 'Eastern India Renewable Energy Consortium',
    eventTitle: 'Eastern India Tech & Industrial Conclave',
    eventCategory: 'Conferences',
    rating: 5,
    quote: 'Executing an 800-delegate summit with zero acoustic lag, curved 4K LED backdrops, and seamless VIP security is rare in Patna. Brentra operates with military discipline and unmatched AV infrastructure.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
    date: 'November 2025'
  },
  {
    id: 'tst-3',
    clientName: 'Pratibha Sinha',
    role: 'Vice President HR',
    companyOrFamily: 'Magadh FinTech Corp',
    eventTitle: 'Annual Corporate Awards & Gala Dinner',
    eventCategory: 'Corporate Galas',
    rating: 5,
    quote: 'From custom laser trophies to 5-star plated catering, the evening felt like something in Mumbai or Singapore. The team handled our 350 executives with supreme grace.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    date: 'January 2026'
  },
  {
    id: 'tst-4',
    clientName: 'Vikramaditya Shahi',
    role: 'Host & Sangeet Planner',
    companyOrFamily: 'Shahi Royal Sangeet Night',
    eventTitle: 'Bespoke Riverfront Sangeet & Mystic Sufi Night',
    eventCategory: 'Private Events',
    rating: 5,
    quote: 'The Sufi ambiance, warm fairy lights, and live Awadhi sigri counters created the most magical night of our lives. Brentra takes hospitality to a completely different level.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80',
    date: 'October 2025'
  }
];

export const PAST_EVENT_MEDIA: PastEventMedia[] = [
  {
    id: 'pem-1',
    title: 'Grand Floral Mandap with Lotus Water Pool',
    category: 'Luxury Hospitality',
    imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
    location: 'Patna Heritage Lawns',
    date: 'Dec 2025',
    caption: 'Turnkey architectural mandap built using 15,000 fresh imported carnations & roses.',
    attendees: '1,500 Guests'
  },
  {
    id: 'pem-2',
    title: 'Curved 4K P2.6 LED Wall & Acoustic Rigging',
    category: 'Conferences',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=900&q=80',
    location: 'Gyan Bhawan, Patna',
    date: 'Nov 2025',
    caption: '30ft x 12ft curved LED video wall with zero-latency digital switching.',
    attendees: '850 Delegates'
  },
  {
    id: 'pem-3',
    title: 'Awadhi & Bihari Gourmet Live Chef Brigade',
    category: 'Luxury Hospitality',
    imageUrl: 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80',
    location: 'Executive Club, Bailey Road',
    date: 'Oct 2025',
    caption: '12 live cooking counters featuring Champaran handi & authentic Awadhi kebabs.',
    attendees: '2,000 Banqueters'
  },
  {
    id: 'pem-4',
    title: 'Hydraulic 360° Stage with Synchronized Pyro',
    category: 'Private Events',
    imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80',
    location: 'Danapur Riverfront',
    date: 'Dec 2025',
    caption: 'Cold spark pyrotechnics and hydraulic elevation for bridal couple entrance.',
    attendees: '1,100 Guests'
  },
  {
    id: 'pem-5',
    title: 'Annual Automobile Dealer Launch & Awards',
    category: 'Corporate Galas',
    imageUrl: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=900&q=80',
    location: 'Hotel Maurya Grand Ballroom',
    date: 'Sep 2025',
    caption: 'Reinforced stage reveal for 2.5-ton SUVs with moving beam light arrays.',
    attendees: '400 Partners'
  },
  {
    id: 'pem-6',
    title: 'MedTech Innovation Exhibition Pavilion',
    category: 'Exhibitions',
    imageUrl: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=900&q=80',
    location: 'Patliputra Grounds, Bailey Road',
    date: 'Aug 2025',
    caption: '120 custom aluminum modular stalls with independent climate zones.',
    attendees: '3,200 Attendees'
  }
];

