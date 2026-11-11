-- ====================================================================
-- Migration 04: Safe Public Row Level Security (RLS) Policies
-- Enables public web clients to read catalogue & submit quotes/bookings
-- ====================================================================

-- 1. Enable RLS on all tables
ALTER TABLE IF EXISTS public.verticals ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.service_areas ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.promo_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.facility_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.facility_services ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.mandi_rates ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.customer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.facility_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.booking_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.booking_status_history ENABLE ROW LEVEL SECURITY;

-- 2. Public Read Policies for Catalog & Reference Tables
DROP POLICY IF EXISTS "Public read verticals" ON public.verticals;
CREATE POLICY "Public read verticals" ON public.verticals FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read service_areas" ON public.service_areas;
CREATE POLICY "Public read service_areas" ON public.service_areas FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read promo_codes" ON public.promo_codes;
CREATE POLICY "Public read promo_codes" ON public.promo_codes FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read categories" ON public.facility_categories;
CREATE POLICY "Public read categories" ON public.facility_categories FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read services" ON public.facility_services;
CREATE POLICY "Public read services" ON public.facility_services FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read technicians" ON public.technicians;
CREATE POLICY "Public read technicians" ON public.technicians FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "Public read mandi" ON public.mandi_rates;
CREATE POLICY "Public read mandi" ON public.mandi_rates FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public read reviews" ON public.customer_reviews;
CREATE POLICY "Public read reviews" ON public.customer_reviews FOR SELECT USING (true);

-- 3. Public Insert Policies for Leads & Bookings
DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
CREATE POLICY "Public insert leads" ON public.leads FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public read leads" ON public.leads;
CREATE POLICY "Public read leads" ON public.leads FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert bookings" ON public.facility_bookings;
CREATE POLICY "Public insert bookings" ON public.facility_bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public read bookings" ON public.facility_bookings;
CREATE POLICY "Public read bookings" ON public.facility_bookings FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public insert booking_items" ON public.booking_items;
CREATE POLICY "Public insert booking_items" ON public.booking_items FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public read booking_items" ON public.booking_items;
CREATE POLICY "Public read booking_items" ON public.booking_items FOR SELECT USING (true);
