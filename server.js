import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
import dotenv from 'dotenv';
import crypto from 'crypto';
import { z } from 'zod';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;
const OTP_SALT = process.env.OTP_SALT || 'brentra_patna_secure_salt_2026';
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || 'brentra_admin_secret_2026_patna';

// Database Pool Configuration
const dbConfig = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
  : {
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME || 'postgres',
      ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 8000
    };

const pool = new pg.Pool(dbConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle PostgreSQL client:', err.message);
});

// Security Headers (Helmet)
app.use(helmet({
  contentSecurityPolicy: false, // Managed by Vercel / Nginx in production
  crossOriginEmbedderPolicy: false
}));

// Strict CORS Configuration
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

// Add standard localhost fallbacks in development
const defaultOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:5174'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Allow server-to-server or curl
    if (allowedOrigins.includes('*') || allowedOrigins.includes(origin) || defaultOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error('CORS blocked: Origin not allowed by security policy'));
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Admin-Key']
}));

// Payload Limits (20KB limit to prevent large payload DoS)
app.use(express.json({ limit: '20kb' }));
app.use(express.urlencoded({ extended: true, limit: '20kb' }));

// Helper Functions
function maskPhone(phone) {
  if (!phone || phone.length < 10) return '**********';
  const clean = phone.replace(/\D/g, '');
  return `${clean.slice(0, 2)}******${clean.slice(-2)}`;
}

function hashOtp(otp) {
  return crypto.createHash('sha256').update(otp + OTP_SALT).digest('hex');
}

// Admin Authorization Middleware
function requireAdmin(req, res, next) {
  const apiKey = req.headers['x-admin-key'] || req.headers['authorization']?.replace(/^Bearer\s+/i, '');
  if (!apiKey || apiKey !== ADMIN_API_KEY) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Invalid or missing administrator credentials'
    });
  }
  next();
}

// --------------------------------------------------------------------
// 1. HEALTH CHECK (Sanitized, zero leakage)
// --------------------------------------------------------------------
app.get('/api/health', async (req, res) => {
  let dbStatus = 'ok';
  try {
    await pool.query('SELECT 1');
  } catch (err) {
    dbStatus = 'unhealthy';
  }

  res.status(dbStatus === 'ok' ? 200 : 503).json({
    status: dbStatus === 'ok' ? 'ok' : 'degraded',
    service: 'Brentra Ventures Platform API',
    timestamp: new Date().toISOString()
  });
});

// --------------------------------------------------------------------
// 2. UNIVERSAL LEAD CAPTURE (Quotes, Contact, Careers, Partners)
// --------------------------------------------------------------------
const APPROVED_VERTICALS = [
  'realty-infrastructure',
  'bentra-facility',
  'it-digital',
  'fmcg-beverages',
  'events-hospitality',
  'manpower-staffing',
  'logistics-supply-chain',
  'solar-renewable-energy',
  'healthcare-wellness',
  'agriculture-farming',
  'education-skill-development',
  'venture-capital-investments'
];

const leadInputSchema = z.object({
  fullName: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  phone: z.string().trim().regex(/^(?:\+91|0)?[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'),
  email: z.string().trim().email().optional().or(z.literal('')),
  vertical: z.string().trim().default('realty-infrastructure'),
  type: z.enum(['quote', 'contact', 'career', 'partner']).default('quote'),
  locationName: z.string().trim().max(100).default('Patna, Bihar'),
  details: z.string().trim().max(2000).optional().or(z.literal('')),
  honeypot: z.string().optional(),
  idempotencyKey: z.string().max(100).optional()
});

app.post('/api/leads', async (req, res) => {
  // 1. Honeypot check for bots
  if (req.body.honeypot && req.body.honeypot.trim() !== '') {
    return res.status(200).json({ success: true, message: 'Inquiry received' });
  }

  // 2. Validate input
  const parseResult = leadInputSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      error: parseResult.error.errors.map(e => e.message).join(', ')
    });
  }

  const { fullName, phone, email, vertical, type, locationName, details, idempotencyKey } = parseResult.data;

  // Validate vertical allowlist
  const safeVertical = APPROVED_VERTICALS.includes(vertical) ? vertical : 'realty-infrastructure';

  // 3. Idempotency Check
  if (idempotencyKey) {
    try {
      const existing = await pool.query('SELECT * FROM public.leads WHERE idempotency_key = $1 LIMIT 1', [idempotencyKey]);
      if (existing.rows.length > 0) {
        return res.status(200).json({
          success: true,
          leadId: existing.rows[0].id,
          message: 'Lead already processed'
        });
      }
    } catch (checkErr) {
      console.warn('Idempotency check query failed, proceeding to insert:', checkErr.message);
    }
  }

  // 4. Generate Crypto ID
  const leadId = `BV-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;

  try {
    const insertQuery = `
      INSERT INTO public.leads (
        id, full_name, phone, email, vertical, type, location_name, details, custom_details, status, idempotency_key, created_at
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW())
      RETURNING id, full_name, phone, vertical, type, created_at
    `;

    const result = await pool.query(insertQuery, [
      leadId,
      fullName,
      phone,
      email || null,
      safeVertical,
      type,
      locationName,
      details || null,
      details || null,
      'PENDING_REVIEW',
      idempotencyKey || null
    ]);

    // Optional audit log entry
    pool.query(`
      INSERT INTO public.audit_log (actor_id, action, entity, entity_id, after)
      VALUES ($1, $2, $3, $4, $5)
    `, ['lead_public', 'LEAD_CREATED', 'leads', leadId, JSON.stringify(result.rows[0])]).catch(() => {});

    return res.status(201).json({
      success: true,
      leadId: result.rows[0].id,
      message: 'Thank you! Your inquiry has been received. Our Patna operations team will connect with you within 2 business hours.'
    });
  } catch (dbErr) {
    console.error('Database write error on /api/leads:', dbErr.message);
    // Explicit 503 error: Never fake 201 success on DB error
    return res.status(503).json({
      success: false,
      error: 'Our lead system is currently undergoing scheduled maintenance. Please reach our Patna executive desk directly at +91 90652 96294 or WhatsApp +91 91421 44940.'
    });
  }
});

// --------------------------------------------------------------------
// 3. FACILITY BOOKING (Server-side Recalculation & Salted OTP)
// --------------------------------------------------------------------
const bookingInputSchema = z.object({
  customerName: z.string().trim().min(2).max(100),
  phone: z.string().trim().regex(/^(?:\+91|0)?[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian phone number'),
  alternatePhone: z.string().trim().optional(),
  address: z.string().trim().min(5, 'Full street address is required').max(300),
  locality: z.string().trim().optional(),
  flatHouseNo: z.string().trim().optional(),
  landmark: z.string().trim().optional(),
  pincode: z.string().trim().regex(/^800\d{3}$/, 'Service is currently available in Patna PIN codes (e.g., 800001)'),
  slotDate: z.string().trim(),
  slotTime: z.string().trim(),
  items: z.array(z.object({
    serviceId: z.string(),
    quantity: z.number().int().min(1).default(1),
    addons: z.array(z.any()).optional()
  })).min(1, 'Please select at least one service item'),
  promoCode: z.string().trim().optional(),
  paymentMethod: z.literal('cash_after_service').default('cash_after_service'),
  customerNotes: z.string().trim().max(1000).optional(),
  idempotencyKey: z.string().max(100).optional()
});

app.post('/api/bookings', async (req, res) => {
  const parseResult = bookingInputSchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      error: parseResult.error.errors.map(e => e.message).join(', ')
    });
  }

  const {
    customerName, phone, alternatePhone, address, locality, flatHouseNo,
    landmark, pincode, slotDate, slotTime, items, promoCode,
    paymentMethod, customerNotes, idempotencyKey
  } = parseResult.data;

  // 1. Idempotency Check
  if (idempotencyKey) {
    try {
      const existing = await pool.query('SELECT * FROM public.facility_bookings WHERE idempotency_key = $1 LIMIT 1', [idempotencyKey]);
      if (existing.rows.length > 0) {
        return res.status(200).json({
          success: true,
          bookingId: existing.rows[0].id,
          message: 'Booking already confirmed'
        });
      }
    } catch (checkErr) {
      console.warn('Idempotency check query failed, proceeding:', checkErr.message);
    }
  }

  // 2. Server-side Pricing Recalculation (S-4 / D-2: Never trust client totals)
  let subtotal = 0;
  const normalizedItems = [];

  try {
    const serviceIds = items.map(i => i.serviceId);
    const dbServices = await pool.query(
      'SELECT id, name, price FROM public.facility_services WHERE id = ANY($1)',
      [serviceIds]
    );

    const servicePriceMap = new Map();
    dbServices.rows.forEach(s => servicePriceMap.set(s.id, { name: s.name, price: Number(s.price) }));

    for (let idx = 0; idx < items.length; idx++) {
      const item = items[idx];
      const serviceMeta = servicePriceMap.get(item.serviceId);
      if (!serviceMeta) {
        return res.status(400).json({
          success: false,
          error: `Service ID '${item.serviceId}' not found in active Patna catalog`
        });
      }

      const lineTotal = serviceMeta.price * item.quantity;
      subtotal += lineTotal;

      normalizedItems.push({
        lineNo: idx + 1,
        serviceId: item.serviceId,
        serviceName: serviceMeta.name,
        unitPrice: serviceMeta.price,
        quantity: item.quantity,
        addons: item.addons || []
      });
    }

    const serviceFee = 49; // Fixed doorstep hygiene & travel fee
    let discount = 0;
    let appliedPromo = null;

    // Check Promo Code against database
    if (promoCode && promoCode.trim() !== '') {
      const cleanCode = promoCode.trim().toUpperCase();
      const promoResult = await pool.query(
        'SELECT * FROM public.promo_codes WHERE code = $1 AND is_active = true LIMIT 1',
        [cleanCode]
      );

      if (promoResult.rows.length > 0) {
        const promo = promoResult.rows[0];
        if (subtotal >= Number(promo.min_order)) {
          appliedPromo = promo.code;
          if (Number(promo.flat_discount) > 0) {
            discount = Number(promo.flat_discount);
          } else if (Number(promo.discount_pct) > 0) {
            discount = Math.round((subtotal * Number(promo.discount_pct)) / 100);
          }
        }
      }
    }

    const totalAmount = Math.max(0, subtotal + serviceFee - discount);

    // 3. Generate Secure 4-Digit OTP and Keyed Hash (S-7 / Safe Baseline)
    const plainOtp = Math.floor(1000 + Math.random() * 9000).toString();
    const otpHash = hashOtp(plainOtp);

    // 4. Generate Booking ID
    const bookingId = `BK-${Date.now().toString().slice(-6)}${Math.floor(10 + Math.random() * 90)}`;

    // 5. Database Transaction
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const insertBookingSql = `
        INSERT INTO public.facility_bookings (
          id, customer_name, phone, alternate_phone, address, locality, flat_house_no, landmark,
          city, pincode, slot_date, slot_time, payment_method, payment_status,
          subtotal, service_fee, discount, promo_code, total_amount, status,
          otp_hash, customer_notes, items, idempotency_key, created_at, updated_at
        ) VALUES (
          $1, $2, $3, $4, $5, $6, $7, $8,
          'Patna', $9, $10, $11, $12, 'pending',
          $13, $14, $15, $16, $17, 'confirmed',
          $18, $19, $20, $21, NOW(), NOW()
        )
      `;

      await client.query(insertBookingSql, [
        bookingId, customerName, phone, alternatePhone || null, address, locality || null, flatHouseNo || null, landmark || null,
        pincode, slotDate, slotTime, paymentMethod,
        subtotal, serviceFee, discount, appliedPromo, totalAmount,
        otpHash, customerNotes || null, JSON.stringify(normalizedItems), idempotencyKey || null
      ]);

      // Insert normalized items
      for (const ni of normalizedItems) {
        await client.query(`
          INSERT INTO public.booking_items (booking_id, line_no, service_id, service_name, unit_price, quantity, addons)
          VALUES ($1, $2, $3, $4, $5, $6, $7)
        `, [bookingId, ni.lineNo, ni.serviceId, ni.serviceName, ni.unitPrice, ni.quantity, JSON.stringify(ni.addons)]);
      }

      // Insert initial status history
      await client.query(`
        INSERT INTO public.booking_status_history (booking_id, from_status, to_status, changed_by, note)
        VALUES ($1, NULL, 'confirmed', 'customer', 'Booking placed via web portal with Cash After Service')
      `, [bookingId]);

      await client.query('COMMIT');

      // Return plain OTP ONCE in creation payload
      return res.status(201).json({
        success: true,
        bookingId,
        otp: plainOtp,
        subtotal,
        serviceFee,
        discount,
        totalAmount,
        status: 'confirmed',
        message: 'Your service request has been booked successfully! Please share this 4-digit verification code with your technician upon arrival.'
      });
    } catch (txErr) {
      await client.query('ROLLBACK');
      throw txErr;
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Database write error on /api/bookings:', err.message);
    return res.status(503).json({
      success: false,
      error: 'Our booking system is temporarily unreachable. Please call Patna dispatch at +91 90652 96294 to confirm your slot directly.'
    });
  }
});

// --------------------------------------------------------------------
// 4. LIVE TRACKING API (Flow F5: Dual-Key ID + Phone Auth, OTP Masked)
// --------------------------------------------------------------------
app.get('/api/track/:id', async (req, res) => {
  const { id } = req.params;
  const phone = req.query.phone?.toString().trim();

  if (!id || !phone) {
    return res.status(400).json({
      success: false,
      error: 'Both Booking ID and registered Phone number are required to track status'
    });
  }

  // Clean phone for matching (last 10 digits)
  const cleanPhone = phone.replace(/\D/g, '').slice(-10);

  try {
    const bookingResult = await pool.query(`
      SELECT 
        b.id, b.customer_name, b.phone, b.address, b.locality, b.pincode,
        b.slot_date, b.slot_time, b.status, b.payment_method, b.payment_status,
        b.subtotal, b.service_fee, b.discount, b.total_amount,
        b.technician_id, b.created_at, b.items
      FROM public.facility_bookings b
      WHERE b.id = $1 AND (b.phone LIKE '%' || $2)
      LIMIT 1
    `, [id, cleanPhone]);

    if (bookingResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'No active booking found matching this ID and phone number. Please verify your details.'
      });
    }

    const booking = bookingResult.rows[0];

    // Fetch technician if assigned
    let technician = null;
    if (booking.technician_id) {
      const techResult = await pool.query(`
        SELECT id, name, phone, avatar, rating, specialization, vehicle_no, experience_years
        FROM public.technicians
        WHERE id = $1 LIMIT 1
      `, [booking.technician_id]);
      if (techResult.rows.length > 0) {
        technician = techResult.rows[0];
      }
    }

    // Fetch status history timeline
    const historyResult = await pool.query(`
      SELECT to_status, changed_by, note, changed_at
      FROM public.booking_status_history
      WHERE booking_id = $1
      ORDER BY changed_at ASC
    `, [id]);

    return res.json({
      success: true,
      booking: {
        id: booking.id,
        customerName: booking.customer_name,
        maskedPhone: maskPhone(booking.phone),
        status: booking.status,
        address: booking.address,
        locality: booking.locality,
        pincode: booking.pincode,
        slotDate: booking.slot_date,
        slotTime: booking.slot_time,
        paymentMethod: booking.payment_method,
        paymentStatus: booking.payment_status,
        subtotal: Number(booking.subtotal),
        serviceFee: Number(booking.service_fee),
        discount: Number(booking.discount),
        totalAmount: Number(booking.total_amount),
        items: booking.items || [],
        technician,
        timeline: historyResult.rows,
        createdAt: booking.created_at
      }
    });
  } catch (err) {
    console.error('Error tracking booking:', err.message);
    return res.status(503).json({
      success: false,
      error: 'Unable to retrieve tracking telemetry. Please call support at +91 90652 96294.'
    });
  }
});

// --------------------------------------------------------------------
// 5. CATALOGUE & REFERENCE DATA (Public Endpoints)
// --------------------------------------------------------------------
app.get('/api/services', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM public.facility_services 
      WHERE is_active = true 
      ORDER BY category_id, sort, price ASC
    `);
    res.json({ success: true, count: result.rows.length, services: result.rows });
  } catch (err) {
    res.status(503).json({ success: false, error: 'Catalogue temporarily unavailable' });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM public.facility_categories 
      WHERE is_active = true 
      ORDER BY sort, starting_price ASC
    `);
    res.json({ success: true, count: result.rows.length, categories: result.rows });
  } catch (err) {
    res.status(503).json({ success: false, error: 'Categories temporarily unavailable' });
  }
});

app.get('/api/technicians', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, name, phone, avatar, rating, reviews_count, experience_years, jobs_completed, specialization, vehicle_no
      FROM public.technicians 
      WHERE is_active = true 
      ORDER BY rating DESC
    `);
    res.json({ success: true, count: result.rows.length, technicians: result.rows });
  } catch (err) {
    res.status(503).json({ success: false, error: 'Technicians list temporarily unavailable' });
  }
});

app.get('/api/mandi-rates', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM public.mandi_rates 
      ORDER BY id ASC
    `);
    res.json({ success: true, count: result.rows.length, rates: result.rows });
  } catch (err) {
    res.status(503).json({ success: false, error: 'Mandi rates temporarily unavailable' });
  }
});

// --------------------------------------------------------------------
// 6. EVENTS & HOSPITALITY (Dynamic Module APIs)
// --------------------------------------------------------------------
const BACKEND_EVENTS = [
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
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'The premier flagship convention for technology pioneers, renewable energy investors, and infrastructure leaders across Eastern India.',
    highlights: [
      'Turnkey AV rigging with 30ft x 12ft curved P2.6 Ultra-HD LED backdrop',
      'Simultaneous multilingual translation pods & digital badge RFID turnstiles',
      'VVIP delegates lounge with customized executive barista & chef brigade'
    ],
    isFeatured: true,
    itinerary: [
      { time: '09:00 AM', activity: 'Registration & Continental Welcome Breakfast in Executive Atrium' },
      { time: '10:15 AM', activity: 'Inaugural Keynote: Digital Transformation in Bihar' },
      { time: '01:00 PM', activity: '5-Course Gourmet Networking Luncheon & B2B Exhibition Walk' }
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
    time: '04:00 PM Onwards',
    location: 'Patna Heritage Lawns & Riverfront Pavilion',
    status: 'Upcoming',
    capacity: 1800,
    priceTier: 'Bespoke Turnkey Royal Decor',
    featuredImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An ethereal celebration inspired by the timeless opulence of Patliputra grandeur.',
    highlights: [
      'Hydraulic 360-degree revolving floral varmala stage with cold pyro reveals',
      'Vrindavan-inspired sacred Vedic mandap floating on reflective water body',
      'Royal Rajasthani & Awadhi interactive live counters alongside traditional Bihari Bhoj'
    ],
    isFeatured: true,
    itinerary: [
      { time: '04:00 PM', activity: 'Shehnai & Welcome Drink Reception at the Imperial Archway' },
      { time: '07:30 PM', activity: 'Hydraulic Varmala Ceremony & Aerial Drone Rose Shower' },
      { time: '08:30 PM', activity: 'Grand Royal Banquet Dinner with 12 Live Cooking Stations' }
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
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An elite black-tie corporate evening bringing together enterprise CEOs and investors.',
    highlights: [
      'Silver-service seated banquet with personalized menu monogramming',
      'High-security biometric check-in and private VIP holding suites'
    ],
    isFeatured: false,
    itinerary: [
      { time: '07:00 PM', activity: 'Arrival Cocktails & Red Carpet Media Wall' },
      { time: '09:00 PM', activity: 'Plated 5-Course State Banquet Dinner with Acoustic Jazz' }
    ],
    venueDetails: {
      name: 'Hotel Maurya Grand Crystal Ballroom',
      address: 'South Gandhi Maidan, Frazer Road',
      city: 'Patna, Bihar',
      capacity: 500
    },
    organizer: 'Brentra Ventures Hospitality & VIP Management'
  }
];

const BACKEND_PACKAGES = [
  {
    id: 'pkg-vip-sovereign',
    name: 'VIP Sovereign Lounge & Concierge',
    tier: 'VIP',
    guestCapacity: { min: 50, max: 600, recommended: 250 },
    amenities: [
      'Private biometric security checkpoint & personal guest escort',
      'Dedicated personal Butler & Champagne Sommelier service',
      'Exclusive air-conditioned luxury lounge with Italian velvet seating',
      'Artisanal farm-to-table gourmet tasting menu with live chef carving'
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
    description: 'The pinnacle of bespoke hospitality in Bihar.',
    tagline: 'White-glove luxury, private security suites & bespoke dining',
    badge: 'Flagship Tier',
    accentColor: '#DB2777',
    staffingRatios: { eventCoordinators: 3, serversAndButlers: 18, securityPersonnel: 8, executiveChefs: 4 }
  },
  {
    id: 'pkg-corporate-summit',
    name: 'Corporate Summit, AV & Conclave Suite',
    tier: 'Corporate',
    guestCapacity: { min: 100, max: 2000, recommended: 500 },
    amenities: [
      'P2.6 Ultra-HD curved LED video wall (up to 36ft x 12ft)',
      'JBL VTX / VRX Line-Array acoustic acoustic surround system',
      'Simultaneous 4K YouTube/Zoom multi-camera live broadcast',
      'Digital attendee registration kiosk with QR code badge printing'
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
    description: 'Engineered specifically for multinational corporations and state conclaves.',
    tagline: 'Broadcast-grade AV production with seamless delegate catering',
    badge: 'Enterprise Standard',
    accentColor: '#0284C7',
    staffingRatios: { eventCoordinators: 4, serversAndButlers: 25, securityPersonnel: 6, executiveChefs: 5 }
  },
  {
    id: 'pkg-bespoke-royal',
    name: 'Bespoke Royal Heritage Gala & Sangeet',
    tier: 'Bespoke',
    guestCapacity: { min: 200, max: 5000, recommended: 1000 },
    amenities: [
      'Hydraulic 360° revolving bridal/groom varmala stage',
      '40ft thematic royal palace facade with architectural 3D projection',
      'Crystal hawan mandap on floating lotus pool with cold pyrotechnics',
      'Authentic Royal Bihari Bhoj + Pan-Asian & Awadhi live cooking stalls'
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
    description: 'Transforming open lawns and banquet arenas into grand palaces.',
    tagline: 'Grand hydraulic stages, sacred glass mandaps & royal banquets',
    badge: 'Most Popular in Bihar',
    accentColor: '#D97706',
    staffingRatios: { eventCoordinators: 6, serversAndButlers: 45, securityPersonnel: 15, executiveChefs: 8 }
  },
  {
    id: 'pkg-standard-conclave',
    name: 'Classic Banquet & Boutique Social Gala',
    tier: 'Standard',
    guestCapacity: { min: 50, max: 800, recommended: 200 },
    amenities: [
      'Contemporary floral entrance archway & customized welcome signage',
      'Professional sound rig with wireless handheld microphones & DJ console',
      'Ambient LED par wash & truss lighting matching theme',
      'Deluxe 3-course buffet spread (Veg & Non-Veg options) with dessert bar'
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
    description: 'Ideal for birthday milestones and institutional workshops.',
    tagline: 'Vibrant boutique aesthetics and reliable banquet management',
    badge: 'Value Excellence',
    accentColor: '#10B981',
    staffingRatios: { eventCoordinators: 2, serversAndButlers: 12, securityPersonnel: 3, executiveChefs: 3 }
  }
];

app.get('/api/events', (req, res) => {
  const { category, status, search, sort } = req.query;
  let events = [...BACKEND_EVENTS];

  if (category && category !== 'All') {
    events = events.filter(e => e.category === category);
  }
  if (status && status !== 'All') {
    events = events.filter(e => e.status === status);
  }
  if (search && typeof search === 'string' && search.trim() !== '') {
    const q = search.toLowerCase().trim();
    events = events.filter(e => 
      e.title.toLowerCase().includes(q) ||
      e.location.toLowerCase().includes(q) ||
      e.description.toLowerCase().includes(q)
    );
  }
  if (sort) {
    if (sort === 'date-asc') {
      events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else if (sort === 'date-desc') {
      events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sort === 'capacity-desc') {
      events.sort((a, b) => b.capacity - a.capacity);
    } else if (sort === 'featured') {
      events.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  }

  res.json({ success: true, count: events.length, total: events.length, events });
});

app.get('/api/events/:slugOrId', (req, res) => {
  const { slugOrId } = req.params;
  const event = BACKEND_EVENTS.find(e => e.slug === slugOrId || e.id === slugOrId);
  if (event) {
    return res.json({ success: true, event });
  }
  res.status(404).json({ success: false, error: 'Event not found' });
});

app.get('/api/hospitality-packages', (req, res) => {
  res.json({ success: true, count: BACKEND_PACKAGES.length, packages: BACKEND_PACKAGES });
});

const eventInquirySchema = z.object({
  clientName: z.string().trim().min(2, 'Name is required').max(100),
  phone: z.string().trim().regex(/^(?:\+91|0)?[6-9]\d{9}$/, 'Please enter a valid 10-digit phone number'),
  email: z.string().trim().email().optional().or(z.literal('')),
  eventType: z.string().trim().default('Bespoke Luxury Celebration'),
  packageId: z.string().trim().optional().or(z.literal('')),
  eventDate: z.string().trim(),
  estimatedGuests: z.number().int().min(10).default(200),
  venuePreference: z.string().trim().default('Patna, Bihar'),
  budgetRange: z.string().trim().default('Flexible'),
  specialRequests: z.string().trim().max(2000).optional().or(z.literal(''))
});

app.post('/api/event-inquiries', async (req, res) => {
  const parseResult = eventInquirySchema.safeParse(req.body);
  if (!parseResult.success) {
    return res.status(400).json({
      success: false,
      error: parseResult.error.errors.map(e => e.message).join(', ')
    });
  }

  const {
    clientName, email, phone, eventType, packageId, 
    eventDate, estimatedGuests, budgetRange, specialRequests, venuePreference
  } = parseResult.data;

  const inquiryId = `BVE-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;

  try {
    // Lead capture table insertion with vertical = events-hospitality
    await pool.query(`
      INSERT INTO public.leads (
        id, full_name, phone, email, vertical, type, location_name, details, status, created_at
      ) VALUES ($1, $2, $3, $4, 'events-hospitality', 'quote', $5, $6, 'PENDING_REVIEW', NOW())
    `, [
      inquiryId,
      clientName,
      phone,
      email || null,
      venuePreference,
      JSON.stringify({ eventType, packageId, eventDate, estimatedGuests, budgetRange, specialRequests })
    ]);

    return res.status(201).json({
      success: true,
      inquiryId,
      message: 'Your event inquiry has been reserved! Our senior hospitality curator will call you within 2 hours.'
    });
  } catch (err) {
    console.error('Error inserting event inquiry:', err.message);
    return res.status(503).json({
      success: false,
      error: 'Hospitality booking engine unavailable. Please call our hospitality director at +91 90652 96294.'
    });
  }
});

// --------------------------------------------------------------------
// 7. PROTECTED ADMIN OPERATIONS API (/api/admin/*)
// --------------------------------------------------------------------
app.get('/api/admin/leads', requireAdmin, async (req, res) => {
  const { status, vertical, limit = 50, offset = 0 } = req.query;
  try {
    let sql = 'SELECT * FROM public.leads WHERE 1=1';
    const params = [];

    if (status) {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }
    if (vertical) {
      params.push(vertical);
      sql += ` AND vertical = $${params.length}`;
    }

    params.push(parseInt(limit, 10));
    sql += ` ORDER BY created_at DESC LIMIT $${params.length}`;

    params.push(parseInt(offset, 10));
    sql += ` OFFSET $${params.length}`;

    const result = await pool.query(sql, params);
    res.json({ success: true, count: result.rows.length, leads: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.patch('/api/admin/leads/:id', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status, adminNotes } = req.body;

  try {
    const result = await pool.query(`
      UPDATE public.leads
      SET status = COALESCE($1, status),
          admin_notes = COALESCE($2, admin_notes),
          updated_at = NOW()
      WHERE id = $3
      RETURNING *
    `, [status || null, adminNotes || null, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    res.json({ success: true, lead: result.rows[0] });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.get('/api/admin/bookings', requireAdmin, async (req, res) => {
  const { status, date, limit = 50, offset = 0 } = req.query;
  try {
    let sql = 'SELECT * FROM public.facility_bookings WHERE 1=1';
    const params = [];

    if (status) {
      params.push(status);
      sql += ` AND status = $${params.length}`;
    }
    if (date) {
      params.push(date);
      sql += ` AND slot_date = $${params.length}`;
    }

    params.push(parseInt(limit, 10));
    sql += ` ORDER BY created_at DESC LIMIT $${params.length}`;

    params.push(parseInt(offset, 10));
    sql += ` OFFSET $${params.length}`;

    const result = await pool.query(sql, params);
    // Mask sensitive hashed OTPs even in admin list
    const sanitized = result.rows.map(r => {
      const { otp_hash, otp_code, ...rest } = r;
      return rest;
    });

    res.json({ success: true, count: sanitized.length, bookings: sanitized });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/bookings/:id/assign', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { technicianId } = req.body;

  if (!technicianId) {
    return res.status(400).json({ success: false, error: 'technicianId is required' });
  }

  try {
    const techResult = await pool.query('SELECT * FROM public.technicians WHERE id = $1 LIMIT 1', [technicianId]);
    if (techResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Technician not found' });
    }
    const tech = techResult.rows[0];

    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const updateResult = await client.query(`
        UPDATE public.facility_bookings
        SET technician_id = $1,
            technician_name = $2,
            technician_phone = $3,
            status = 'pro_assigned',
            updated_at = NOW()
        WHERE id = $4
        RETURNING *
      `, [tech.id, tech.name, tech.phone, id]);

      if (updateResult.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ success: false, error: 'Booking not found' });
      }

      await client.query(`
        INSERT INTO public.booking_status_history (booking_id, from_status, to_status, changed_by, note)
        VALUES ($1, 'confirmed', 'pro_assigned', 'admin', $2)
      `, [id, `Assigned technician ${tech.name} (${tech.specialization})`]);

      await client.query('COMMIT');
      res.json({ success: true, message: 'Technician assigned successfully', booking: updateResult.rows[0] });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/bookings/:id/status', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { status, note } = req.body;

  const validStatuses = ['confirmed', 'pro_assigned', 'on_the_way', 'in_progress', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  try {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      const current = await client.query('SELECT status FROM public.facility_bookings WHERE id = $1 LIMIT 1', [id]);
      if (current.rows.length === 0) {
        await client.query('ROLLBACK');
        return res.status(404).json({ success: false, error: 'Booking not found' });
      }

      const fromStatus = current.rows[0].status;

      await client.query(`
        UPDATE public.facility_bookings
        SET status = $1, updated_at = NOW()
        WHERE id = $2
      `, [status, id]);

      await client.query(`
        INSERT INTO public.booking_status_history (booking_id, from_status, to_status, changed_by, note)
        VALUES ($1, $2, $3, 'admin', $4)
      `, [id, fromStatus, status, note || `Status updated from ${fromStatus} to ${status}`]);

      await client.query('COMMIT');
      res.json({ success: true, message: `Status updated to ${status}` });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

app.post('/api/admin/bookings/:id/verify-otp', requireAdmin, async (req, res) => {
  const { id } = req.params;
  const { otp } = req.body;

  if (!otp || typeof otp !== 'string') {
    return res.status(400).json({ success: false, error: '4-digit OTP is required' });
  }

  try {
    const bookingResult = await pool.query(
      'SELECT id, otp_hash, otp_attempts, otp_used_at, status FROM public.facility_bookings WHERE id = $1 LIMIT 1',
      [id]
    );

    if (bookingResult.rows.length === 0) {
      return res.status(404).json({ success: false, error: 'Booking not found' });
    }

    const booking = bookingResult.rows[0];

    if (booking.otp_used_at) {
      return res.status(400).json({ success: false, error: 'OTP has already been verified for this booking' });
    }

    if (booking.otp_attempts >= 5) {
      return res.status(403).json({ success: false, error: 'Maximum verification attempts exceeded. Please contact supervisor.' });
    }

    const calculatedHash = hashOtp(otp.trim());

    if (calculatedHash !== booking.otp_hash) {
      await pool.query(
        'UPDATE public.facility_bookings SET otp_attempts = otp_attempts + 1 WHERE id = $1',
        [id]
      );
      return res.status(400).json({
        success: false,
        error: 'Invalid OTP code. Please verify with the customer.'
      });
    }

    // OTP Validated!
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      await client.query(`
        UPDATE public.facility_bookings
        SET otp_used_at = NOW(),
            status = 'in_progress',
            updated_at = NOW()
        WHERE id = $1
      `, [id]);

      await client.query(`
        INSERT INTO public.booking_status_history (booking_id, from_status, to_status, changed_by, note)
        VALUES ($1, $2, 'in_progress', 'technician_otp', 'Customer doorstep OTP verified successfully. Job in progress.')
      `, [id, booking.status]);

      await client.query('COMMIT');
      res.json({ success: true, message: 'OTP verified successfully. Job marked in progress.' });
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// --------------------------------------------------------------------
// 8. STATIC ASSETS & SPA ROUTING
// --------------------------------------------------------------------
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  const indexPath = path.join(__dirname, 'dist', 'index.html');
  res.sendFile(indexPath, (err) => {
    if (err) {
      res.status(200).json({
        message: 'Brentra Ventures Platform API is active.',
        version: '2.0.0',
        environment: process.env.NODE_ENV || 'production'
      });
    }
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('Unhandled Application Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error. Please retry or contact technical operations.'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Brentra Ventures Enterprise Backend listening on port ${PORT}`);
});
