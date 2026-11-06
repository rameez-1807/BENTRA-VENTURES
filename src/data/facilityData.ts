import { ServiceCategory, ServiceItem, Technician, CustomerReview } from '../types/facility';

export const PATNA_LOCALITIES = [
  'Boring Road / Boring Canal Road',
  'Kankarbagh (Main Colony, Malahi Pakri)',
  'Bailey Road / Jagdeo Path / RPS More',
  'Danapur Cantt & Khagaul',
  'Patliputra Colony & Industrial Area',
  'Rajendra Nagar / Kadamkuan',
  'Saguna More & Gola Road',
  'Ashiana Nagar & Digha',
  'Fraser Road & Dak Bungalow',
  'Anisabad & Phulwari Sharif',
  'Gardanibagh & Chitragupta Nagar',
  'Hanuman Nagar & AG Colony',
  'Exhibition Road & Gandhi Maidan'
];

export const FACILITY_CATEGORIES: ServiceCategory[] = [
  {
    id: 'salon-men',
    name: "Men's Salon & Grooming",
    shortName: 'Men Salon',
    iconName: 'Scissors',
    startingPrice: 189,
    description: 'Hygienic salon experience at your home with single-use kits and sanitized equipment.',
    bannerImage: '/img-facility.jpg',
    servicesCount: 5
  },
  {
    id: 'salon-women',
    name: "Women's Salon & Spa",
    shortName: 'Women Salon',
    iconName: 'Sparkles',
    startingPrice: 299,
    description: 'Waxing, facial, pedicure, manicure, and hair care by certified beauticians.',
    bannerImage: '/img-events.jpg',
    servicesCount: 6
  },
  {
    id: 'ac-appliances',
    name: 'AC & Appliance Repair',
    shortName: 'AC & Appliances',
    iconName: 'Tv',
    startingPrice: 249,
    description: 'Expert foam-jet AC servicing, gas charging, washing machines & refrigerator repair.',
    bannerImage: '/img-facility.jpg',
    servicesCount: 7
  },
  {
    id: 'cleaning-pest',
    name: 'Cleaning & Pest Control',
    shortName: 'Deep Cleaning',
    iconName: 'ShieldAlert',
    startingPrice: 499,
    description: 'Mechanized deep bathroom, kitchen, sofa shampooing & certified odorless pest control.',
    bannerImage: '/img-tank-cleaning.jpg',
    servicesCount: 6
  },
  {
    id: 'electrician-plumber',
    name: 'Electrician, Plumber & Carpenter',
    shortName: 'Electrician & Plumber',
    iconName: 'Wrench',
    startingPrice: 79,
    description: 'Prompt doorstep electrical repairs, pipe leak fixes, sanitary fittings & woodwork.',
    bannerImage: '/img-manpower.jpg',
    servicesCount: 6
  },
  {
    id: 'ro-water-tank',
    name: 'RO Purifier & Tank Cleaning',
    shortName: 'RO & Water Tank',
    iconName: 'Droplets',
    startingPrice: 149,
    description: 'TDS testing, membrane overhaul, filter replacement & 6-step mechanized tank wash.',
    bannerImage: '/img-ro.jpg',
    servicesCount: 4
  },
  {
    id: 'painting-waterproof',
    name: 'Painting & Waterproofing',
    shortName: 'Painting & Walls',
    iconName: 'Paintbrush',
    startingPrice: 199,
    description: 'Interior wall painting, seepage detection, crack sealing & moisture proofing.',
    bannerImage: '/img-realty.jpg',
    servicesCount: 4
  },
  {
    id: 'commercial-facility',
    name: 'Commercial & Society AMC',
    shortName: 'Society & Office AMC',
    iconName: 'Building',
    startingPrice: 1499,
    description: 'Residential society housekeeping, corporate office sanitization & technical maintenance.',
    bannerImage: '/img-materials.jpg',
    servicesCount: 3
  }
];

export const FACILITY_SERVICES: ServiceItem[] = [
  // Men's Salon
  {
    id: 'srv-men-haircut',
    categoryId: 'salon-men',
    name: "Men's Expert Haircut & Styling",
    tagline: 'Professional haircut with neck shave & disposable styling cape',
    rating: 4.88,
    reviewsCount: 1420,
    durationMins: 35,
    price: 189,
    originalPrice: 249,
    discountPct: 24,
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
    description: 'Clean, mess-free haircut at home using sanitized scissors, trimmers, and a fresh disposable sheet. Stylist leaves your home clean.',
    included: [
      'Consultation & customized hair styling',
      'Full haircut using professional shears & trimmer',
      'Neck trim, razor line finishing & aftershave splash',
      '100% mess-cleanup after service'
    ],
    excluded: [
      'Hair wash with shampoo (add via add-on)'
    ],
    addOns: [
      { id: 'addon-beard-trim', name: 'Beard Shaping & Trim', price: 99, durationMins: 15 },
      { id: 'addon-head-massage', name: 'Ayurvedic 10-Min Head Massage', price: 129, durationMins: 10 },
      { id: 'addon-hair-color', name: 'L’Oréal Men Hair Color Application', price: 199, durationMins: 20 }
    ]
  },
  {
    id: 'srv-men-grooming-deluxe',
    categoryId: 'salon-men',
    name: 'Father & Son Haircut Duo Combo',
    tagline: '2 haircuts at home with premium styling and head massage',
    rating: 4.92,
    reviewsCount: 680,
    durationMins: 60,
    price: 329,
    originalPrice: 499,
    discountPct: 34,
    image: 'https://images.unsplash.com/photo-1622286342621-4bd786c2447c?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular Combo',
    description: 'Save big with our family grooming package. Includes two distinct haircuts with sanitized equipment and complimentary styling.',
    included: [
      'Two customized haircuts (adult + kid or two adults)',
      'Single-use aprons and sanitized clippers',
      'Mild relaxing head massage (5 mins each)',
      'Complete hair collection & floor cleanup'
    ],
    excluded: ['Hair spa treatments'],
    addOns: [
      { id: 'addon-face-detan', name: 'De-Tan Face Pack Scrub', price: 180, durationMins: 15 },
      { id: 'addon-beard-spa', name: 'Beard Spa & Steam', price: 149, durationMins: 15 }
    ]
  },
  {
    id: 'srv-men-beard-face',
    categoryId: 'salon-men',
    name: 'Royal Beard Styling + Charcoal De-Tan',
    tagline: 'Razor-sharp edging, hot towel press & instant glow pack',
    rating: 4.84,
    reviewsCount: 512,
    durationMins: 40,
    price: 249,
    originalPrice: 399,
    discountPct: 37,
    image: 'https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&w=600&q=80',
    badge: 'Trending',
    description: 'Sharp precision beard grooming paired with an activated charcoal de-tan treatment to combat Patna dust and sun exposure.',
    included: [
      'Precision beard shaping and trimming',
      'Hot towel steam therapy',
      'Charcoal cleansing scrub + de-tan face pack',
      'Organic beard oil massage'
    ],
    excluded: ['Full haircut'],
    addOns: [
      { id: 'addon-wax-nose-ear', name: 'Nose & Ear Waxing', price: 69, durationMins: 5 },
      { id: 'addon-haircut-add', name: 'Add Haircut to package', price: 149, durationMins: 25 }
    ]
  },

  // Women's Salon
  {
    id: 'srv-women-glow-facial',
    categoryId: 'salon-women',
    name: 'O3+ Instant Glow & Brightening Facial',
    tagline: 'Multi-step skin brightening, blackhead extraction & face massage',
    rating: 4.91,
    reviewsCount: 940,
    durationMins: 60,
    price: 899,
    originalPrice: 1499,
    discountPct: 40,
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
    badge: 'Top Rated',
    description: 'Transform dull skin with authentic O3+ brightening kit. Includes cleansing, exfoliation, steam, gentle extraction, lymphatic massage, and peel-off rubber mask.',
    included: [
      'Skin diagnosis & double cleansing',
      'Aroma steam & ultrasonic blackhead removal',
      'Firming massage with glow serum',
      'Alginate brightening peel-off mask'
    ],
    excluded: ['Threading or upper lip waxing'],
    addOns: [
      { id: 'addon-threading-duo', name: 'Eyebrow + Upper Lip Threading', price: 69, durationMins: 10 },
      { id: 'addon-manicure', name: 'Classic Rose Petal Manicure', price: 299, durationMins: 30 }
    ]
  },
  {
    id: 'srv-women-honey-waxing',
    categoryId: 'salon-women',
    name: 'Full Arms + Full Legs + Underarms Waxing',
    tagline: 'Painless RICA/Honey roll-on waxing with post-wax soothing gel',
    rating: 4.86,
    reviewsCount: 1120,
    durationMins: 50,
    price: 499,
    originalPrice: 799,
    discountPct: 37,
    image: 'https://images.unsplash.com/photo-1560750588-73207b1ef5b8?auto=format&fit=crop&w=600&q=80',
    badge: 'Monthly Must-Have',
    description: 'Gentle, skin-friendly waxing using premium disposable strips and hygienic temperature-controlled wax. Smooth, hair-free skin guaranteed.',
    included: [
      'Full arms waxing with disposable strips',
      'Full legs waxing up to thighs',
      'Underarms waxing with soothing powder',
      'Post-waxing cooling aloe vera rub'
    ],
    excluded: ['Bikini or stomach waxing'],
    addOns: [
      { id: 'addon-rica-upgrade', name: 'Upgrade to RICA White Chocolate Wax', price: 199, durationMins: 0 },
      { id: 'addon-pedicure', name: 'Deluxe Foot Pedicure & Scrub', price: 349, durationMins: 35 }
    ]
  },

  // AC & Appliance Repair
  {
    id: 'srv-ac-foam-jet',
    categoryId: 'ac-appliances',
    name: 'Power Jet AC Deep Cleaning (Split/Window)',
    tagline: 'High-pressure foam-jet indoor & outdoor coil wash, 2x cooling',
    rating: 4.93,
    reviewsCount: 2840,
    durationMins: 45,
    price: 599,
    originalPrice: 899,
    discountPct: 33,
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=600&q=80',
    badge: 'Summer Essential',
    description: 'Patna’s top-rated AC service. We use waterproof jacket covers to protect walls, spray antibacterial foam, and blast away deep grime with high-pressure water jets.',
    included: [
      'Indoor unit dismantle & filter wash',
      'High-pressure pump wash of cooling fins & blower wheel',
      'Outdoor condenser unit power spray',
      'Drain pipe blockage flush & gas pressure check',
      '30-day cooling & leak warranty'
    ],
    excluded: [
      'Refrigerant gas refill (chargeable as per PSI)',
      'Spare parts (capacitors, fan motor)'
    ],
    addOns: [
      { id: 'addon-ac-gas-topup', name: 'Gas Leak Check + Topup', price: 899, durationMins: 30 },
      { id: 'addon-anti-bacterial-spray', name: 'Anti-Mold Sanitization Coating', price: 99, durationMins: 5 },
      { id: 'addon-second-ac-discount', name: 'Add 2nd AC Service (Flat ₹100 Off)', price: 499, durationMins: 40 }
    ]
  },
  {
    id: 'srv-ac-gas-leak-refill',
    categoryId: 'ac-appliances',
    name: 'AC Gas Leak Detection & 100% Pure Refill',
    tagline: 'Nitrogen leak test, copper brazing & OEM pure gas charging (R32/R410/R22)',
    rating: 4.87,
    reviewsCount: 890,
    durationMins: 75,
    price: 1799,
    originalPrice: 2499,
    discountPct: 28,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
    badge: 'Fixed Rate Guarantee',
    description: 'Complete diagnostic of gas loss. Our technician pressure-tests the entire circuit, repairs copper leaks, and charges 100% virgin refrigerant with a 60-day warranty.',
    included: [
      'Electronic & soap bubble leak audit',
      'Copper tube brazing and flare nut tightening',
      'Full system vacuuming before charging',
      'OEM specified refrigerant refilling by weight'
    ],
    excluded: ['Compressor replacement'],
    addOns: [
      { id: 'addon-copper-pipe', name: 'Extra Copper Piping (per foot)', price: 280, durationMins: 10 }
    ]
  },
  {
    id: 'srv-washing-machine-repair',
    categoryId: 'ac-appliances',
    name: 'Washing Machine Inspection & Repair',
    tagline: 'Doorstep checkup for front/top load — spin, drainage or motor issues',
    rating: 4.81,
    reviewsCount: 620,
    durationMins: 45,
    price: 249,
    originalPrice: 399,
    discountPct: 37,
    image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80',
    description: 'Complete diagnosis for noisy drum, drainage block, power trip, or vibration issues across LG, Samsung, Whirlpool, Bosch, and IFB.',
    included: [
      'Comprehensive fault diagnosis',
      'Minor filter cleaning & inlet check',
      'Quotation for any spare replacement (adjusted against inspection fee)'
    ],
    excluded: ['Major spare parts like PCB or drum spider'],
    addOns: [
      { id: 'addon-wm-descaling', name: 'Full Tub Chemical Descaling', price: 349, durationMins: 30 }
    ]
  },

  // Cleaning & Pest Control
  {
    id: 'srv-bathroom-deep-clean',
    categoryId: 'cleaning-pest',
    name: 'Intense Bathroom Deep Cleaning',
    tagline: 'Hard water scale removal, tile scrubbing, mirror polish & disinfection',
    rating: 4.89,
    reviewsCount: 3100,
    durationMins: 60,
    price: 499,
    originalPrice: 799,
    discountPct: 37,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    badge: 'Bestseller',
    description: 'Tired of yellow stains and Patna hard-water mineral crust on tiles and taps? Our cleaners use mechanized single-disc scrubbing and industrial descalers.',
    included: [
      'Tile scrubbing & grout stain removal',
      'Acid-free chemical descaling of taps, shower head & jet spray',
      'WC commode inside-out descaling & sanitization',
      'Mirror, glass partition & washbasin streak-free polishing',
      'Floor drain de-clogging and deodorization'
    ],
    excluded: ['Ceiling painting or silicone resealing'],
    addOns: [
      { id: 'addon-exhaust-cleaning', name: 'Exhaust Fan Deep Degreasing', price: 99, durationMins: 15 },
      { id: 'addon-second-bathroom', name: 'Add 2nd Bathroom (Flat ₹150 Off)', price: 349, durationMins: 50 }
    ]
  },
  {
    id: 'srv-kitchen-deep-clean',
    categoryId: 'cleaning-pest',
    name: 'Modular Kitchen Chimney & Grease Cleaning',
    tagline: 'Degreasing gas stove, exhaust, wall tiles, countertops & cabinets',
    rating: 4.85,
    reviewsCount: 1450,
    durationMins: 90,
    price: 699,
    originalPrice: 1099,
    discountPct: 36,
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular',
    description: 'Eliminates stubborn oil grease from kitchen surfaces using food-safe chemical degreasers and steam vapor cleaning.',
    included: [
      'Kitchen chimney outer body & baffle filter degreasing',
      'Gas stove burners, knobs & back-splash tiles clean',
      'Cabinet exterior wiping and handles sanitization',
      'Sink descaling and drain pipe flush'
    ],
    excluded: ['Inside empty cabinet cleaning (available upon request)'],
    addOns: [
      { id: 'addon-fridge-clean', name: 'Refrigerator Interior Sanitization', price: 249, durationMins: 25 },
      { id: 'addon-chimney-motor', name: 'Full Chimney Motor Dismantle Wash', price: 399, durationMins: 45 }
    ]
  },
  {
    id: 'srv-sofa-carpet-shampoo',
    categoryId: 'cleaning-pest',
    name: 'Sofa Spa: Wet Shampooing & Vacuum Extraction',
    tagline: 'Deep injection-extraction foam wash for 3-seater sofa + 2 armchairs',
    rating: 4.90,
    reviewsCount: 880,
    durationMins: 75,
    price: 599,
    originalPrice: 999,
    discountPct: 40,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    description: 'Pulls out trapped dust mites, food stains, and odors from fabric sofas using Kärcher high-suction wet extraction.',
    included: [
      'Dry vacuuming to remove surface debris',
      'Fabric-safe foaming chemical scrub',
      'High-pressure hot extraction suction',
      'Fragrant deodorizer spray'
    ],
    excluded: ['Leather conditioning (separate service)'],
    addOns: [
      { id: 'addon-mattress-spa', name: 'King Size Mattress Dual-Side Deep Clean', price: 499, durationMins: 40 },
      { id: 'addon-carpet-spa', name: 'Living Room Carpet (5x7 ft) Shampoo', price: 399, durationMins: 30 }
    ]
  },
  {
    id: 'srv-pest-control-home',
    categoryId: 'cleaning-pest',
    name: 'Cockroach & Ant Herbal Gel Pest Control',
    tagline: '100% odorless Bayer Maxforce gel dots + crack spray, child safe',
    rating: 4.88,
    reviewsCount: 1670,
    durationMins: 40,
    price: 899,
    originalPrice: 1299,
    discountPct: 30,
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    badge: '90-Day Guarantee',
    description: 'No need to empty kitchen cabinets. We apply non-toxic German cockroach bait gel in hidden corners, hinges, and behind electronic appliances.',
    included: [
      'Bayer Maxforce gel dot placement in all kitchen nooks',
      'Targeted residual spray for drain traps and bathroom gullies',
      '90-day re-treatment warranty if pests return'
    ],
    excluded: ['Termite structural drilling'],
    addOns: [
      { id: 'addon-termite-spot', name: 'Termite Door Frame Drill & Inject', price: 399, durationMins: 30 }
    ]
  },

  // Electrician, Plumber & Carpenter
  {
    id: 'srv-electrician-visit',
    categoryId: 'electrician-plumber',
    name: 'Doorstep Electrician Visit & Diagnostics',
    tagline: 'Switch, socket, MCB trip, ceiling fan, LED wiring & fault detection',
    rating: 4.83,
    reviewsCount: 2210,
    durationMins: 30,
    price: 79,
    originalPrice: 149,
    discountPct: 47,
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=600&q=80',
    badge: 'Quick 60-Min',
    description: 'Certified ITI electricians arrive with multi-meters, insulated tools, and drill kit. Inspection fee adjusted into total repair cost.',
    included: [
      'Comprehensive wiring check & phase load testing',
      'Minor tightening of loose contacts & switches',
      'Transparent rate card quote for parts replacement'
    ],
    excluded: ['Heavy 3-phase industrial panel rewiring'],
    addOns: [
      { id: 'addon-fan-install', name: 'Ceiling Fan Installation / Replacement', price: 149, durationMins: 20 },
      { id: 'addon-switch-replace', name: 'Modular Switch/Socket Replacement (up to 2)', price: 99, durationMins: 15 },
      { id: 'addon-inverter-wiring', name: 'Inverter Connection & Battery Water Check', price: 249, durationMins: 30 }
    ]
  },
  {
    id: 'srv-plumber-leak-fix',
    categoryId: 'electrician-plumber',
    name: 'Plumbing Leak Repair & Tap Installation',
    tagline: 'Dripping tap, angle valve, flush cistern, washbasin waste pipe',
    rating: 4.82,
    reviewsCount: 1890,
    durationMins: 35,
    price: 119,
    originalPrice: 199,
    discountPct: 40,
    image: 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?auto=format&fit=crop&w=600&q=80',
    badge: 'Fixed Rates',
    description: 'Fix annoying water leaks and protect your walls from seepage. Background-checked plumbers equipped with heavy-duty pipe wrenches and Teflon sealant.',
    included: [
      'Inspection of tap washers, valves & cartridge stems',
      'Repair or replacement of standard bathroom/kitchen bib tap',
      'No-mess seal and water flow calibration'
    ],
    excluded: ['Concealed wall pipeline breaking'],
    addOns: [
      { id: 'addon-flush-tank-fix', name: 'Toilet Flush Tank Syphon & Ball Valve Fix', price: 199, durationMins: 25 },
      { id: 'addon-motor-pump-check', name: 'Water Submersible Pump Motor Diagnostic', price: 299, durationMins: 30 }
    ]
  },
  {
    id: 'srv-carpenter-home-fix',
    categoryId: 'electrician-plumber',
    name: 'Carpenter Door Lock, Hinge & Furniture Repair',
    tagline: 'Fix squeaky doors, hydraulic hinges, sofa leg repair & lock change',
    rating: 4.79,
    reviewsCount: 840,
    durationMins: 45,
    price: 199,
    originalPrice: 299,
    discountPct: 33,
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
    description: 'Skilled woodwork technicians for bed assembly, door adjustments, Godrej lock installations, and drawer channel replacements.',
    included: [
      'Hinge adjustment and door realignment',
      'Door stopper or handle fitting',
      'Precision screw tightening and wood glue touch-up'
    ],
    excluded: ['Custom heavy furniture fabrication from raw ply'],
    addOns: [
      { id: 'addon-main-door-lock', name: 'Mortise / Deadbolt Main Lock Fitting', price: 299, durationMins: 40 },
      { id: 'addon-curtain-rod', name: 'Curtain Rod Drilling & Mounting (Pair)', price: 149, durationMins: 20 }
    ]
  },

  // RO & Tank
  {
    id: 'srv-ro-complete-service',
    categoryId: 'ro-water-tank',
    name: 'Complete RO Water Purifier Service & TDS Tune',
    tagline: 'Sediment, Carbon, post-carbon flush, UV chamber cleaning & TDS check',
    rating: 4.90,
    reviewsCount: 1980,
    durationMins: 45,
    price: 399,
    originalPrice: 599,
    discountPct: 33,
    image: '/img-ro.jpg',
    badge: 'Pure Drinking Guarantee',
    description: 'Restore crisp, clean drinking water. Certified RO engineers calibrate input and output TDS levels, sanitize filter housing, and inspect booster pump pressure.',
    included: [
      'Housing sanitization & sediment flushing',
      'Pre-filter bowl clean & candle inspection',
      'Digital TDS meter calibration before and after',
      'Pump voltage and solenoid valve health check'
    ],
    excluded: ['Membrane or filter replacements (spare cost separate)'],
    addOns: [
      { id: 'addon-spun-filter', name: 'Replace 5-Micron Spun Candle', price: 149, durationMins: 5 },
      { id: 'addon-ro-membrane', name: 'Genuine 80 GPD Filmtec RO Membrane', price: 1199, durationMins: 20 }
    ]
  },
  {
    id: 'srv-tank-clean-mechanized',
    categoryId: 'ro-water-tank',
    name: '6-Step Mechanized Water Tank Cleaning (1,000L)',
    tagline: 'Sludge extraction, rotary brush scrubbing, high-pressure jet & UV scan',
    rating: 4.94,
    reviewsCount: 1320,
    durationMins: 60,
    price: 700,
    originalPrice: 1100,
    discountPct: 36,
    image: '/img-tank-cleaning.jpg',
    badge: '100% Bacteria-Free',
    description: 'Eliminates green algae, sludge, and contamination from rooftop Sintex or RCC water tanks using automated pumps, vacuuming, and UV antibacterial treatment.',
    included: [
      'Stage 1: Dewatering & bottom sludge slurry extraction',
      'Stage 2: High-pressure jet wash of walls & ceiling',
      'Stage 3: Rotary automated mechanical scrubbing',
      'Stage 4: Vacuum extraction of residual suspended dirt',
      'Stage 5: Eco-safe potassium permanganate anti-bacterial rinse',
      'Stage 6: Ultraviolet (UV) disinfection scan'
    ],
    excluded: ['Civil crack plastering'],
    addOns: [
      { id: 'addon-underground-sump', name: 'Add Underground Sump (up to 2,000L)', price: 699, durationMins: 45 }
    ]
  },

  // Painting & Waterproofing
  {
    id: 'srv-waterproof-inspection',
    categoryId: 'painting-waterproof',
    name: 'Wall Seepage & Waterproofing Laser Inspection',
    tagline: 'Thermal moisture meter scan, leakage root cause diagnosis & estimate',
    rating: 4.88,
    reviewsCount: 710,
    durationMins: 45,
    price: 199,
    originalPrice: 499,
    discountPct: 60,
    image: '/img-realty.jpg',
    badge: 'Scientific Inspection',
    description: 'Stop efflorescence and peeling paint. Our civil waterproofing engineer pinpoints concealed pipe leaks or external slab seepage with moisture meters.',
    included: [
      'Laser moisture mapping across infected walls',
      'Roof terrace & parapet wall crack audit',
      'Detailed diagnostic report with guaranteed fix quote'
    ],
    excluded: ['Actual chemical application'],
    addOns: [
      { id: 'addon-dr-fixit-coat', name: 'Emergency 10 sq ft Seepage Barrier Coating', price: 499, durationMins: 45 }
    ]
  },

  // Commercial & Society
  {
    id: 'srv-office-sanitization-deep',
    categoryId: 'commercial-facility',
    name: 'Corporate Office & Retail Store Deep Clean',
    tagline: 'Workstation sanitization, glass partitions, pantry & carpet wash',
    rating: 4.91,
    reviewsCount: 420,
    durationMins: 180,
    price: 1999,
    originalPrice: 2999,
    discountPct: 33,
    image: '/img-manpower.jpg',
    badge: 'Corporate Standard',
    description: 'Designed for Patna banks, IT offices, coaching institutes, and clinics. Team of 3 equipped with single disc scrubbers and industrial vacuum cleaners.',
    included: [
      'Floor scrubbing with non-marking neutral cleaners',
      'Streak-free glass door & window wipe',
      'Pantry washbasin, microwave, and fridge wiping',
      'Restroom hospital-grade disinfection'
    ],
    excluded: ['Data center server rack interiors'],
    addOns: [
      { id: 'addon-office-chairs', name: 'Shampoo 10 Ergonomic Office Chairs', price: 499, durationMins: 40 }
    ]
  }
];

export const MOCK_TECHNICIANS: Technician[] = [
  {
    id: 'tech-101',
    name: 'Rakesh Sharma',
    phone: '+91 90652 96294',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80',
    rating: 4.92,
    reviewsCount: 840,
    experienceYears: 7,
    jobsCompleted: 1420,
    specialization: 'Senior HVAC & AC Power Jet Expert',
    verified: true,
    vehicleNo: 'BR-01-EB-8842'
  },
  {
    id: 'tech-102',
    name: 'Suman Kumar Jha',
    phone: '+91 91421 44940',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    rating: 4.88,
    reviewsCount: 630,
    experienceYears: 5,
    jobsCompleted: 980,
    specialization: 'Lead Master Electrician & Home Automation',
    verified: true,
    vehicleNo: 'BR-01-DA-2041'
  },
  {
    id: 'tech-103',
    name: 'Sunita Devi',
    phone: '+91 70042 77962',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    rating: 4.95,
    reviewsCount: 1100,
    experienceYears: 8,
    jobsCompleted: 1850,
    specialization: 'Senior Esthetician & O3+ Skin Consultant',
    verified: true,
    vehicleNo: 'BR-01-CA-9912'
  },
  {
    id: 'tech-104',
    name: 'Amitabh Verma',
    phone: '+91 94300 88000',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    rating: 4.89,
    reviewsCount: 510,
    experienceYears: 6,
    jobsCompleted: 870,
    specialization: 'Water Purification & Membrane Specialist',
    verified: true,
    vehicleNo: 'BR-01-FF-1129'
  },
  {
    id: 'tech-105',
    name: 'Md. Tariq Anwar',
    phone: '+91 90652 96294',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    rating: 4.91,
    reviewsCount: 780,
    experienceYears: 9,
    jobsCompleted: 1340,
    specialization: 'Master Barber & Hair Stylist',
    verified: true,
    vehicleNo: 'BR-01-GH-4920'
  }
];

export const MOCK_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    customerName: 'Anand Prakash',
    locality: 'Boring Road, Patna',
    serviceName: 'Power Jet AC Deep Cleaning',
    rating: 5,
    date: 'Yesterday',
    comment: 'Technician Rakesh arrived in 40 mins with high-pressure jet pump and protective covers. My Daikin split AC cools like new now. Outstanding service!',
    verifiedBooking: true
  },
  {
    id: 'rev-2',
    customerName: 'Priya Shrivastava',
    locality: 'Kankarbagh, Patna',
    serviceName: 'O3+ Instant Glow Facial & Waxing',
    rating: 5,
    date: '3 days ago',
    comment: 'Extremely hygienic and courteous beautician. Sealed single-use kit was opened right in front of me. Saved me a trip through Patna traffic.',
    verifiedBooking: true
  },
  {
    id: 'rev-3',
    customerName: 'Dr. Vikash Ranjan',
    locality: 'Bailey Road (RPS More)',
    serviceName: "Men's Expert Haircut & Styling",
    rating: 5,
    date: '1 week ago',
    comment: 'Super convenient! Haircut was precise, stylist was disciplined and cleaned every single stray hair from the floor. Highly recommended for busy professionals.',
    verifiedBooking: true
  },
  {
    id: 'rev-4',
    customerName: 'Naveen Sinha',
    locality: 'Rajendra Nagar, Patna',
    serviceName: '6-Step Water Tank Cleaning',
    rating: 5,
    date: '2 weeks ago',
    comment: 'Our 1,000L rooftop tank had heavy sludge. The UV scan and high-pressure jet removed all yellow stains. Great to have this level of service in Patna.',
    verifiedBooking: true
  }
];

export const PROMO_CODES: { [code: string]: { discountPct?: number; flatDiscount?: number; minOrder: number; label: string } } = {
  'BRENTRAFIRST': { flatDiscount: 100, minOrder: 299, label: '₹100 Off on your first service' },
  'PATNA50': { discountPct: 10, minOrder: 499, label: '10% Off on orders above ₹499' },
  'SUPERCARE': { flatDiscount: 150, minOrder: 999, label: '₹150 Flat Off on orders above ₹999' }
};
