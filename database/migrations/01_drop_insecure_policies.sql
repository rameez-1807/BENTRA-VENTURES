-- ====================================================================
-- Migration 01: Drop Insecure Public Row Level Security (RLS) Policies
-- Reference: Backend Schema Document §1 (D-1), TRD §1 (S-1, S-2)
-- Purpose: Prevent unauthorized public REST access to sensitive tables.
-- ====================================================================

DO $$
BEGIN
  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'leads') THEN
    ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read leads" ON public.leads;
    DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'facility_categories') THEN
    ALTER TABLE public.facility_categories ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read categories" ON public.facility_categories;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'facility_services') THEN
    ALTER TABLE public.facility_services ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read services" ON public.facility_services;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'technicians') THEN
    ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read technicians" ON public.technicians;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'customer_reviews') THEN
    ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read reviews" ON public.customer_reviews;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'facility_bookings') THEN
    ALTER TABLE public.facility_bookings ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read bookings" ON public.facility_bookings;
    DROP POLICY IF EXISTS "Public insert bookings" ON public.facility_bookings;
    DROP POLICY IF EXISTS "Public update bookings" ON public.facility_bookings;
  END IF;

  IF EXISTS (SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'mandi_rates') THEN
    ALTER TABLE public.mandi_rates ENABLE ROW LEVEL SECURITY;
    DROP POLICY IF EXISTS "Public read mandi" ON public.mandi_rates;
  END IF;
END $$;
