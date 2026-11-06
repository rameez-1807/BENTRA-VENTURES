import pg from 'pg';
import { FACILITY_CATEGORIES, FACILITY_SERVICES, MOCK_TECHNICIANS, MOCK_REVIEWS } from '../src/data/facilityData.ts';

const client = new pg.Client({
  host: 'aws-0-ap-southeast-1.pooler.supabase.com',
  port: 5432,
  user: 'postgres.xcckrdfkkqreggehypuh',
  password: 'BENTRA@2056',
  database: 'postgres',
  ssl: { rejectUnauthorized: false }
});

async function run() {
  console.log('Connecting to Supabase PostgreSQL at aws-0-ap-southeast-1.pooler.supabase.com:5432...');
  await client.connect();
  console.log('✅ Connected to Supabase PostgreSQL successfully!');

  // 1. Create Schema
  console.log('Creating database schema tables...');
  await client.query(`
    -- Enable UUID extension
    CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

    -- 1. Leads Table (QuoteModal submissions)
    CREATE TABLE IF NOT EXISTS public.leads (
      id VARCHAR(50) PRIMARY KEY,
      full_name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      email VARCHAR(255),
      vertical VARCHAR(100) NOT NULL,
      location_name VARCHAR(255) DEFAULT 'Patna, Bihar',
      custom_details TEXT,
      status VARCHAR(50) DEFAULT 'PENDING_REVIEW',
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 2. Facility Categories
    CREATE TABLE IF NOT EXISTS public.facility_categories (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      short_name VARCHAR(100),
      icon_name VARCHAR(100),
      starting_price NUMERIC NOT NULL,
      description TEXT,
      banner_image TEXT,
      services_count INT DEFAULT 0,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 3. Facility Services
    CREATE TABLE IF NOT EXISTS public.facility_services (
      id VARCHAR(100) PRIMARY KEY,
      category_id VARCHAR(100) REFERENCES public.facility_categories(id) ON DELETE CASCADE,
      name VARCHAR(255) NOT NULL,
      tagline TEXT,
      rating NUMERIC DEFAULT 4.8,
      reviews_count INT DEFAULT 0,
      duration_mins INT DEFAULT 30,
      price NUMERIC NOT NULL,
      original_price NUMERIC,
      discount_pct INT DEFAULT 0,
      image TEXT,
      badge VARCHAR(100),
      description TEXT,
      included JSONB DEFAULT '[]'::jsonb,
      excluded JSONB DEFAULT '[]'::jsonb,
      add_ons JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 4. Technicians
    CREATE TABLE IF NOT EXISTS public.technicians (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      avatar TEXT,
      rating NUMERIC DEFAULT 4.9,
      reviews_count INT DEFAULT 0,
      experience_years INT DEFAULT 5,
      jobs_completed INT DEFAULT 0,
      specialization VARCHAR(255),
      verified BOOLEAN DEFAULT TRUE,
      vehicle_no VARCHAR(100),
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 5. Customer Reviews
    CREATE TABLE IF NOT EXISTS public.customer_reviews (
      id VARCHAR(100) PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      locality VARCHAR(255),
      service_name VARCHAR(255),
      rating INT DEFAULT 5,
      review_date VARCHAR(100),
      comment TEXT,
      verified_booking BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 6. Facility Bookings (Doorstep Service Orders)
    CREATE TABLE IF NOT EXISTS public.facility_bookings (
      id VARCHAR(100) PRIMARY KEY,
      customer_name VARCHAR(255) NOT NULL,
      phone VARCHAR(50) NOT NULL,
      alternate_phone VARCHAR(50),
      locality VARCHAR(255),
      flat_house_no VARCHAR(255),
      landmark VARCHAR(255),
      city VARCHAR(100) DEFAULT 'Patna',
      pincode VARCHAR(20) DEFAULT '800001',
      slot_date VARCHAR(50),
      slot_time VARCHAR(100),
      payment_method VARCHAR(50) DEFAULT 'cash_after_service',
      payment_status VARCHAR(50) DEFAULT 'pending',
      subtotal NUMERIC DEFAULT 0,
      service_fee NUMERIC DEFAULT 49,
      discount NUMERIC DEFAULT 0,
      promo_code VARCHAR(50),
      total_amount NUMERIC NOT NULL,
      status VARCHAR(50) DEFAULT 'confirmed',
      technician_id VARCHAR(100),
      technician_name VARCHAR(255),
      technician_phone VARCHAR(50),
      otp_code VARCHAR(10),
      customer_notes TEXT,
      items JSONB DEFAULT '[]'::jsonb,
      created_at TIMESTAMPTZ DEFAULT NOW(),
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 7. Daily Fresh FMCG Mandi Rates (Patna)
    CREATE TABLE IF NOT EXISTS public.mandi_rates (
      id SERIAL PRIMARY KEY,
      commodity VARCHAR(100) NOT NULL,
      unit VARCHAR(50) NOT NULL,
      wholesale_rate NUMERIC NOT NULL,
      retail_rate NUMERIC NOT NULL,
      trend VARCHAR(20) DEFAULT 'stable',
      updated_at TIMESTAMPTZ DEFAULT NOW()
    );

    -- 8. Enable Row Level Security (RLS) on all public tables
    ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.facility_categories ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.facility_services ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.facility_bookings ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.mandi_rates ENABLE ROW LEVEL SECURITY;

    -- Create open access policies for public web access
    DROP POLICY IF EXISTS "Public read leads" ON public.leads;
    CREATE POLICY "Public read leads" ON public.leads FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
    CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);

    DROP POLICY IF EXISTS "Public read categories" ON public.facility_categories;
    CREATE POLICY "Public read categories" ON public.facility_categories FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public read services" ON public.facility_services;
    CREATE POLICY "Public read services" ON public.facility_services FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public read technicians" ON public.technicians;
    CREATE POLICY "Public read technicians" ON public.technicians FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public read reviews" ON public.customer_reviews;
    CREATE POLICY "Public read reviews" ON public.customer_reviews FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Public read bookings" ON public.facility_bookings;
    CREATE POLICY "Public read bookings" ON public.facility_bookings FOR SELECT USING (true);
    DROP POLICY IF EXISTS "Public insert bookings" ON public.facility_bookings;
    CREATE POLICY "Public insert bookings" ON public.facility_bookings FOR INSERT WITH CHECK (true);
    DROP POLICY IF EXISTS "Public update bookings" ON public.facility_bookings;
    CREATE POLICY "Public update bookings" ON public.facility_bookings FOR UPDATE USING (true);

    DROP POLICY IF EXISTS "Public read mandi" ON public.mandi_rates;
    CREATE POLICY "Public read mandi" ON public.mandi_rates FOR SELECT USING (true);
  `);

  console.log('✅ Schema created successfully!');

  // 2. Seed Facility Categories
  console.log(`Seeding ${FACILITY_CATEGORIES.length} facility categories...`);
  for (const cat of FACILITY_CATEGORIES) {
    await client.query(`
      INSERT INTO public.facility_categories (id, name, short_name, icon_name, starting_price, description, banner_image, services_count)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        short_name = EXCLUDED.short_name,
        starting_price = EXCLUDED.starting_price,
        description = EXCLUDED.description;
    `, [cat.id, cat.name, cat.shortName, cat.iconName, cat.startingPrice, cat.description, cat.bannerImage, cat.servicesCount]);
  }

  // 3. Seed Facility Services
  console.log(`Seeding ${FACILITY_SERVICES.length} facility services...`);
  for (const s of FACILITY_SERVICES) {
    await client.query(`
      INSERT INTO public.facility_services (id, category_id, name, tagline, rating, reviews_count, duration_mins, price, original_price, discount_pct, image, badge, description, included, excluded, add_ons)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      ON CONFLICT (id) DO UPDATE SET
        name = EXCLUDED.name,
        price = EXCLUDED.price,
        original_price = EXCLUDED.original_price,
        description = EXCLUDED.description;
    `, [
      s.id,
      s.categoryId,
      s.name,
      s.tagline || '',
      s.rating || 4.8,
      s.reviewsCount || 100,
      s.durationMins || 30,
      s.price,
      s.originalPrice || s.price,
      s.discountPct || 0,
      s.image || '',
      s.badge || '',
      s.description || '',
      JSON.stringify(s.included || []),
      JSON.stringify(s.excluded || []),
      JSON.stringify(s.addOns || [])
    ]);
  }

  // 4. Seed Technicians
  console.log(`Seeding ${MOCK_TECHNICIANS.length} technicians...`);
  for (const t of MOCK_TECHNICIANS) {
    await client.query(`
      INSERT INTO public.technicians (id, name, phone, avatar, rating, reviews_count, experience_years, jobs_completed, specialization, verified, vehicle_no)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      ON CONFLICT (id) DO NOTHING;
    `, [t.id, t.name, t.phone, t.avatar, t.rating, t.reviewsCount, t.experienceYears, t.jobsCompleted, t.specialization, t.verified, t.vehicleNo]);
  }

  // 5. Seed Customer Reviews
  console.log(`Seeding ${MOCK_REVIEWS.length} customer reviews...`);
  for (const r of MOCK_REVIEWS) {
    await client.query(`
      INSERT INTO public.customer_reviews (id, customer_name, locality, service_name, rating, review_date, comment, verified_booking)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      ON CONFLICT (id) DO NOTHING;
    `, [r.id, r.customerName, r.locality, r.serviceName, r.rating, r.date, r.comment, r.verifiedBooking]);
  }

  // 6. Seed Mandi Rates (Patna)
  console.log('Seeding daily Mandi rates...');
  const mandiItems = [
    { commodity: 'Mithila Grade-A Makhana', unit: '1 Kg', wholesale: 620, retail: 840, trend: 'up' },
    { commodity: 'Farm Brown Eggs (Tray of 30)', unit: '1 Tray', wholesale: 175, retail: 210, trend: 'stable' },
    { commodity: 'Fresh River Rohu / Katla', unit: '1 Kg', wholesale: 220, retail: 280, trend: 'stable' },
    { commodity: 'Dressed Farm Poultry Broiler', unit: '1 Kg', wholesale: 145, retail: 190, trend: 'down' },
    { commodity: 'Ventra Artisanal Gourmet Kulfi', unit: '10 Pack', wholesale: 350, retail: 500, trend: 'stable' },
    { commodity: 'Pure Mustard Oil (Kachhi Ghani)', unit: '15 Ltr Tin', wholesale: 2150, retail: 2450, trend: 'up' }
  ];

  for (const m of mandiItems) {
    await client.query(`
      INSERT INTO public.mandi_rates (commodity, unit, wholesale_rate, retail_rate, trend)
      VALUES ($1, $2, $3, $4, $5);
    `, [m.commodity, m.unit, m.wholesale, m.retail, m.trend]);
  }

  // 7. Seed Sample Leads
  console.log('Seeding sample leads...');
  await client.query(`
    INSERT INTO public.leads (id, full_name, phone, email, vertical, location_name, custom_details, status)
    VALUES 
      ('BV-849201', 'Vikramaditya Roy', '+91 94300 88000', 'vikram.roy@patnarealty.in', 'realty-infrastructure', 'Bailey Road, Patna', 'Inquiry for ₹1,999/sq.ft turnkey duplex construction on 2400 sq.ft plot.', 'APPROVED'),
      ('BV-912042', 'Pooja Kashyap', '+91 98350 12345', 'pooja@startuppatna.org', 'it-solutions', 'Patliputra Colony, Patna', 'Need full-stack web and mobile application for logistics dispatch.', 'IN_PROGRESS'),
      ('BV-773821', 'Er. Rajesh Ranjan', '+91 91234 56789', 'rajesh.ranjan@biharinfra.com', 'facility-services', 'Kankarbagh, Patna', 'Corporate facility AMC contract inquiry for 4-floor commercial complex.', 'NEW')
    ON CONFLICT (id) DO NOTHING;
  `);

  // 8. Seed Initial Booking
  console.log('Seeding initial active booking...');
  await client.query(`
    INSERT INTO public.facility_bookings (
      id, customer_name, phone, locality, flat_house_no, landmark, city, pincode,
      slot_date, slot_time, payment_method, payment_status, subtotal, service_fee,
      discount, promo_code, total_amount, status, technician_id, technician_name,
      technician_phone, otp_code, customer_notes, items
    ) VALUES (
      'BF-PAT-92041', 'Dr. Alok Verma', '+91 94300 88000', 'Boring Road / Boring Canal Road',
      'Flat 402, Anand Heights', 'Near Alankar Jewellers', 'Patna', '800001',
      'Today', '03:00 PM - 05:00 PM (Evening)', 'cash_after_service', 'pending',
      599, 49, 0, NULL, 648, 'on_the_way', 'tech-101', 'Rakesh Sharma',
      '+91 90652 96294', '4921', 'Please call before arriving',
      '[{"serviceId": "srv-ac-foam-jet", "serviceName": "Power Jet AC Deep Cleaning (Split/Window)", "price": 599, "quantity": 1, "addons": []}]'::jsonb
    ) ON CONFLICT (id) DO NOTHING;
  `);

  console.log('\n=========================================');
  console.log('🎉 ALL 7 SUPABASE TABLES CREATED & SEEDED!');
  console.log('=========================================');
  
  // Verify Counts
  const leadsCount = await client.query('SELECT count(*) FROM public.leads');
  const catCount = await client.query('SELECT count(*) FROM public.facility_categories');
  const srvCount = await client.query('SELECT count(*) FROM public.facility_services');
  const techCount = await client.query('SELECT count(*) FROM public.technicians');
  const bookCount = await client.query('SELECT count(*) FROM public.facility_bookings');
  const mandiCount = await client.query('SELECT count(*) FROM public.mandi_rates');

  console.log(`📊 Summary of Deployed Tables:`);
  console.log(`- public.leads: ${leadsCount.rows[0].count} rows`);
  console.log(`- public.facility_categories: ${catCount.rows[0].count} rows`);
  console.log(`- public.facility_services: ${srvCount.rows[0].count} rows`);
  console.log(`- public.technicians: ${techCount.rows[0].count} rows`);
  console.log(`- public.facility_bookings: ${bookCount.rows[0].count} rows`);
  console.log(`- public.mandi_rates: ${mandiCount.rows[0].count} rows`);

  await client.end();
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
