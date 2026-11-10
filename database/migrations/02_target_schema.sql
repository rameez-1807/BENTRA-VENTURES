-- ====================================================================
-- Migration 02: Target 14-Table Architecture & Model Sync
-- Reference: Backend Schema Document §3–§4, TRD §9
-- Domains: Catalogue, Requests, Operations, Reference
-- ====================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------------------
-- DOMAIN 1: CATALOGUE TABLES
-- --------------------------------------------------------------------

-- 1.1 Verticals Allow-List Table
CREATE TABLE IF NOT EXISTS public.verticals (
  id VARCHAR(100) PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  sort INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.2 Service Areas (Pincodes served in Patna)
CREATE TABLE IF NOT EXISTS public.service_areas (
  pincode VARCHAR(10) PRIMARY KEY,
  area_name VARCHAR(255) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.3 Promo Codes Table
CREATE TABLE IF NOT EXISTS public.promo_codes (
  code VARCHAR(50) PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  discount_pct NUMERIC DEFAULT 0,
  flat_discount NUMERIC DEFAULT 0,
  min_order NUMERIC DEFAULT 0,
  valid_from TIMESTAMPTZ DEFAULT NOW(),
  valid_to TIMESTAMPTZ,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 1.4 Facility Categories (Update with sort and active flags)
CREATE TABLE IF NOT EXISTS public.facility_categories (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  short_name VARCHAR(100),
  icon_name VARCHAR(100),
  starting_price NUMERIC NOT NULL,
  description TEXT,
  banner_image TEXT,
  services_count INT DEFAULT 0,
  sort INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.facility_categories ADD COLUMN IF NOT EXISTS sort INT DEFAULT 0;
ALTER TABLE public.facility_categories ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- 1.5 Facility Services (Update with active flags and price checks)
CREATE TABLE IF NOT EXISTS public.facility_services (
  id VARCHAR(100) PRIMARY KEY,
  category_id VARCHAR(100) REFERENCES public.facility_categories(id) ON DELETE RESTRICT,
  name VARCHAR(255) NOT NULL,
  tagline TEXT,
  rating NUMERIC DEFAULT 4.8,
  reviews_count INT DEFAULT 0,
  duration_mins INT DEFAULT 30,
  price NUMERIC NOT NULL CHECK (price >= 0),
  original_price NUMERIC,
  discount_pct INT DEFAULT 0,
  image TEXT,
  badge VARCHAR(100),
  description TEXT,
  included JSONB DEFAULT '[]'::jsonb,
  excluded JSONB DEFAULT '[]'::jsonb,
  add_ons JSONB DEFAULT '[]'::jsonb,
  sort INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.facility_services ADD COLUMN IF NOT EXISTS sort INT DEFAULT 0;
ALTER TABLE public.facility_services ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- --------------------------------------------------------------------
-- DOMAIN 2: REQUESTS & ORDERS TABLES
-- --------------------------------------------------------------------

-- 2.1 Leads Table (Universal lead capture for quotes, contact, careers, partners)
CREATE TABLE IF NOT EXISTS public.leads (
  id VARCHAR(50) PRIMARY KEY,
  type VARCHAR(50) DEFAULT 'quote' CHECK (type IN ('quote', 'contact', 'career', 'partner')),
  vertical VARCHAR(100) DEFAULT 'realty-infrastructure',
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255),
  location_name VARCHAR(255) DEFAULT 'Patna, Bihar',
  details TEXT,
  custom_details TEXT, -- Backward compatibility alias
  status VARCHAR(50) DEFAULT 'PENDING_REVIEW' CHECK (status IN ('PENDING_REVIEW', 'CONTACTED', 'QUOTED', 'WON', 'LOST')),
  assigned_to UUID,
  admin_notes TEXT,
  source_path VARCHAR(255),
  utm JSONB DEFAULT '{}'::jsonb,
  consent_at TIMESTAMPTZ DEFAULT NOW(),
  idempotency_key VARCHAR(100) UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS type VARCHAR(50) DEFAULT 'quote';
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS details TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS assigned_to UUID;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS admin_notes TEXT;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS source_path VARCHAR(255);
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS utm JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS idempotency_key VARCHAR(100);

-- 2.2 Facility Bookings Table
CREATE TABLE IF NOT EXISTS public.facility_bookings (
  id VARCHAR(50) PRIMARY KEY,
  customer_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  alternate_phone VARCHAR(50),
  address TEXT, -- Legacy combined string
  locality VARCHAR(255),
  flat_house_no VARCHAR(255),
  landmark VARCHAR(255),
  city VARCHAR(100) DEFAULT 'Patna',
  pincode VARCHAR(20) DEFAULT '800001',
  slot_date DATE,
  slot_time VARCHAR(100), -- Legacy slot string
  slot_start TIME,
  slot_end TIME,
  slot_label VARCHAR(100),
  payment_method VARCHAR(50) DEFAULT 'cash_after_service' CHECK (payment_method IN ('cash_after_service', 'upi_online', 'card_online')),
  payment_status VARCHAR(50) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  subtotal NUMERIC DEFAULT 0,
  service_fee NUMERIC DEFAULT 49,
  discount NUMERIC DEFAULT 0,
  promo_code VARCHAR(50),
  total_amount NUMERIC NOT NULL,
  status VARCHAR(50) DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'pro_assigned', 'on_the_way', 'in_progress', 'completed', 'cancelled')),
  technician_id VARCHAR(100),
  technician_name VARCHAR(255),
  technician_phone VARCHAR(50),
  otp_code VARCHAR(10), -- Legacy plaintext OTP
  otp_hash VARCHAR(255), -- Secure SHA-256 / keyed hash
  otp_attempts INT DEFAULT 0,
  otp_used_at TIMESTAMPTZ,
  customer_notes TEXT,
  cancelled_by VARCHAR(50),
  cancel_reason TEXT,
  utm JSONB DEFAULT '{}'::jsonb,
  consent_at TIMESTAMPTZ DEFAULT NOW(),
  idempotency_key VARCHAR(100) UNIQUE,
  items JSONB DEFAULT '[]'::jsonb, -- Historical JSON snapshot
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS alternate_phone VARCHAR(50);
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS locality VARCHAR(255);
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS flat_house_no VARCHAR(255);
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS landmark VARCHAR(255);
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS slot_start TIME;
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS slot_end TIME;
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS slot_label VARCHAR(100);
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS otp_hash VARCHAR(255);
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS otp_attempts INT DEFAULT 0;
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS otp_used_at TIMESTAMPTZ;
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS cancelled_by VARCHAR(50);
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS cancel_reason TEXT;
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS utm JSONB DEFAULT '{}'::jsonb;
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS consent_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE public.facility_bookings ADD COLUMN IF NOT EXISTS idempotency_key VARCHAR(100);

-- 2.3 Normalized Booking Items Table
CREATE TABLE IF NOT EXISTS public.booking_items (
  booking_id VARCHAR(50) REFERENCES public.facility_bookings(id) ON DELETE CASCADE,
  line_no SMALLINT NOT NULL,
  service_id VARCHAR(100),
  service_name VARCHAR(255) NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  quantity SMALLINT DEFAULT 1 CHECK (quantity > 0),
  addons JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (booking_id, line_no)
);

-- 2.4 Booking Status Audit History (Flow F5 tracking)
CREATE TABLE IF NOT EXISTS public.booking_status_history (
  id SERIAL PRIMARY KEY,
  booking_id VARCHAR(50) REFERENCES public.facility_bookings(id) ON DELETE CASCADE,
  from_status VARCHAR(50),
  to_status VARCHAR(50) NOT NULL,
  changed_by VARCHAR(100) DEFAULT 'system',
  note TEXT,
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2.5 Customer Reviews Table
CREATE TABLE IF NOT EXISTS public.customer_reviews (
  id SERIAL PRIMARY KEY,
  booking_id VARCHAR(50) UNIQUE REFERENCES public.facility_bookings(id) ON DELETE SET NULL,
  service_id VARCHAR(100),
  customer_name VARCHAR(255) NOT NULL,
  locality VARCHAR(255),
  rating INT DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- DOMAIN 3: OPERATIONS & AUDIT TABLES
-- --------------------------------------------------------------------

-- 3.1 Technicians Table
CREATE TABLE IF NOT EXISTS public.technicians (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  avatar TEXT,
  rating NUMERIC DEFAULT 4.9,
  reviews_count INT DEFAULT 0,
  experience_years INT DEFAULT 3,
  jobs_completed INT DEFAULT 0,
  specialization VARCHAR(255),
  verified BOOLEAN DEFAULT TRUE,
  vehicle_no VARCHAR(50),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.technicians ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT TRUE;

-- 3.2 Admin Profiles
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  user_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username VARCHAR(100) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'ops' CHECK (role IN ('admin', 'ops')),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3.3 Audit Log (Append-only security log)
CREATE TABLE IF NOT EXISTS public.audit_log (
  id SERIAL PRIMARY KEY,
  actor_id VARCHAR(100) NOT NULL,
  action VARCHAR(100) NOT NULL,
  entity VARCHAR(100) NOT NULL,
  entity_id VARCHAR(100) NOT NULL,
  before JSONB,
  after JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- --------------------------------------------------------------------
-- DOMAIN 4: REFERENCE TABLES
-- --------------------------------------------------------------------

-- 4.1 Mandi Rates (Historical tracking enabled)
CREATE TABLE IF NOT EXISTS public.mandi_rates (
  id SERIAL PRIMARY KEY,
  commodity VARCHAR(100) NOT NULL,
  unit VARCHAR(50) NOT NULL,
  wholesale_rate NUMERIC NOT NULL,
  retail_rate NUMERIC NOT NULL,
  trend VARCHAR(20) DEFAULT 'stable' CHECK (trend IN ('up', 'down', 'stable')),
  rate_date DATE DEFAULT CURRENT_DATE,
  updated_by VARCHAR(100),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.mandi_rates ADD COLUMN IF NOT EXISTS rate_date DATE DEFAULT CURRENT_DATE;
ALTER TABLE public.mandi_rates ADD COLUMN IF NOT EXISTS updated_by VARCHAR(100);

-- --------------------------------------------------------------------
-- INDEXES & PERFORMANCE OPTIMIZATION
-- --------------------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_type_created ON public.leads (type, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON public.facility_bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON public.facility_bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_phone_id ON public.facility_bookings (phone, id);
CREATE INDEX IF NOT EXISTS idx_bookings_slot_date ON public.facility_bookings (slot_date);

CREATE INDEX IF NOT EXISTS idx_booking_items_booking ON public.booking_items (booking_id);
CREATE INDEX IF NOT EXISTS idx_status_history_booking ON public.booking_status_history (booking_id);
CREATE INDEX IF NOT EXISTS idx_mandi_commodity_date ON public.mandi_rates (commodity, rate_date DESC);

