-- ====================================================================
-- Migration 03: Seed Reference & Baseline Data
-- Reference: Backend Schema Document §3–§4, TRD §9, Section 13 Safe Baseline
-- Verticals, Service Areas, Promos, Catalog, Technicians, Admin, Mandi
-- ====================================================================

-- 1. Verticals Seed (12 Approved Pillars)
INSERT INTO public.verticals (id, label, is_active, sort) VALUES
  ('realty-infrastructure', 'Realty, Architecture & Construction', true, 1),
  ('bentra-facility', 'Home & Facility Services', true, 2),
  ('it-digital', 'Enterprise IT & Digital Solutions', true, 3),
  ('fmcg-beverages', 'FMCG, Food & Beverages', true, 4),
  ('events-hospitality', 'Events, Media & Luxury Hospitality', true, 5),
  ('manpower-staffing', 'Security & Manpower Solutions', true, 6),
  ('logistics-supply-chain', 'Supply Chain & Warehousing', true, 7),
  ('solar-renewable-energy', 'Green Tech & Renewable Energy', true, 8),
  ('healthcare-wellness', 'Healthcare & Diagnostic Services', true, 9),
  ('agriculture-farming', 'Agri-Commodities & Farm Produce', true, 10),
  ('education-skill-development', 'Vocational Training & Skill Academy', true, 11),
  ('venture-capital-investments', 'Strategic Seed Capital & Incubation', true, 12)
ON CONFLICT (id) DO UPDATE SET
  label = EXCLUDED.label,
  is_active = EXCLUDED.is_active,
  sort = EXCLUDED.sort;

-- 2. Service Areas (Patna Pincodes)
INSERT INTO public.service_areas (pincode, area_name, is_active) VALUES
  ('800001', 'Patna GPO, Station & Fraser Road', true),
  ('800002', 'Secretariat & High Court', true),
  ('800003', 'Kankarbagh Main & Malahi Pakri', true),
  ('800004', 'Patna City & Jhauganj', true),
  ('800005', 'Gulzarbagh & Gaighat', true),
  ('800006', 'New Khajoorbana & Mahendru', true),
  ('800007', 'Begampur & Marufganj', true),
  ('800008', 'Patna Sahib & Chowk', true),
  ('800009', 'Anisabad Central', true),
  ('800010', 'Sadaquat Ashram & Kurji', true),
  ('800011', 'Phulwari Sharif Main', true),
  ('800012', 'Danapur Cantt', true),
  ('800013', 'Digha & Digha Ghat', true),
  ('800014', 'Danapur Bazar & Khagaul Road', true),
  ('800015', 'Khagaul Junction', true),
  ('800020', 'Kankarbagh South & Chiraiyatand', true),
  ('800023', 'Anisabad & Beur', true),
  ('800024', 'Khagaul & Saguna More', true),
  ('800025', 'Phulwari Sharif & AIIMS Road', true),
  ('800026', 'AIIMS Patna & Walmi', true),
  ('800028', 'Patliputra Colony & Boring Road', true)
ON CONFLICT (pincode) DO UPDATE SET
  area_name = EXCLUDED.area_name,
  is_active = EXCLUDED.is_active;

-- 3. Promo Codes
INSERT INTO public.promo_codes (code, label, discount_pct, flat_discount, min_order, is_active) VALUES
  ('BRENTRAFIRST', '₹100 Off on your first service', 0, 100, 299, true),
  ('BRENTRA50', '₹50 Flat Off on orders above ₹249', 0, 50, 249, true),
  ('PATNA50', '10% Off on orders above ₹499', 10, 0, 499, true),
  ('SUPERCARE', '₹150 Flat Off on orders above ₹999', 0, 150, 999, true),
  ('FESTIVE100', '₹100 Festive Off on orders above ₹499', 0, 100, 499, true)
ON CONFLICT (code) DO UPDATE SET
  label = EXCLUDED.label,
  discount_pct = EXCLUDED.discount_pct,
  flat_discount = EXCLUDED.flat_discount,
  min_order = EXCLUDED.min_order,
  is_active = EXCLUDED.is_active;

-- 4. Facility Categories
INSERT INTO public.facility_categories (id, name, short_name, icon_name, starting_price, description, banner_image, services_count, sort, is_active) VALUES
  ('salon-men', 'Men''s Salon & Grooming', 'Men Salon', 'Scissors', 189, 'Hygienic salon experience at your home with single-use kits and sanitized equipment.', '/img-facility.jpg', 5, 1, true),
  ('salon-women', 'Women''s Salon & Spa', 'Women Salon', 'Sparkles', 299, 'Waxing, facial, pedicure, manicure, and hair care by certified beauticians.', '/img-events.jpg', 6, 2, true),
  ('ac-appliances', 'AC & Appliance Repair', 'AC & Appliances', 'Tv', 249, 'Expert foam-jet AC servicing, gas charging, washing machines & refrigerator repair.', '/img-facility.jpg', 7, 3, true),
  ('cleaning-pest', 'Cleaning & Pest Control', 'Deep Cleaning', 'ShieldAlert', 499, 'Mechanized deep bathroom, kitchen, sofa shampooing & certified odorless pest control.', '/img-tank-cleaning.jpg', 6, 4, true),
  ('electrician-plumber', 'Electrician, Plumber & Carpenter', 'Electrician & Plumber', 'Wrench', 79, 'Prompt doorstep electrical repairs, pipe leak fixes, sanitary fittings & woodwork.', '/img-manpower.jpg', 6, 5, true),
  ('ro-water-tank', 'RO Purifier & Tank Cleaning', 'RO & Water Tank', 'Droplets', 149, 'TDS testing, membrane overhaul, filter replacement & 6-step mechanized tank wash.', '/img-ro.jpg', 4, 6, true),
  ('painting-waterproof', 'Painting & Waterproofing', 'Painting & Walls', 'Paintbrush', 199, 'Interior wall painting, seepage detection, crack sealing & moisture proofing.', '/img-realty.jpg', 4, 7, true),
  ('commercial-facility', 'Commercial & Society AMC', 'Society & Office AMC', 'Building', 1499, 'Residential society housekeeping, corporate office sanitization & technical maintenance.', '/img-materials.jpg', 3, 8, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  short_name = EXCLUDED.short_name,
  icon_name = EXCLUDED.icon_name,
  starting_price = EXCLUDED.starting_price,
  description = EXCLUDED.description,
  banner_image = EXCLUDED.banner_image,
  services_count = EXCLUDED.services_count,
  sort = EXCLUDED.sort,
  is_active = EXCLUDED.is_active;

-- 5. Technicians
INSERT INTO public.technicians (id, name, phone, avatar, rating, reviews_count, experience_years, jobs_completed, specialization, verified, vehicle_no, is_active) VALUES
  ('tech-101', 'Rakesh Kumar Sharma', '+91 90652 96294', 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=300&q=80', 4.94, 642, 7, 1120, 'HVAC & Inverter AC Specialist', true, 'BR-01-BK-2044', true),
  ('tech-102', 'Sunita Devi', '+91 91421 44940', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80', 4.97, 890, 8, 1450, 'Certified Aesthetician & Bridal Expert', true, 'BR-01-CL-8931', true),
  ('tech-103', 'Manoj Paswan', '+91 90652 96294', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80', 4.88, 430, 5, 780, 'Deep Cleaning & Mechanized Sanitation', true, 'BR-01-DM-7812', true),
  ('tech-104', 'Amitabh Verma', '+91 91421 44940', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80', 4.89, 510, 6, 870, 'Water Purification & Membrane Specialist', true, 'BR-01-FF-1129', true),
  ('tech-105', 'Md. Tariq Anwar', '+91 90652 96294', 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80', 4.91, 780, 9, 1340, 'Master Barber & Hair Stylist', true, 'BR-01-GH-4920', true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  phone = EXCLUDED.phone,
  avatar = EXCLUDED.avatar,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count,
  experience_years = EXCLUDED.experience_years,
  jobs_completed = EXCLUDED.jobs_completed,
  specialization = EXCLUDED.specialization,
  verified = EXCLUDED.verified,
  vehicle_no = EXCLUDED.vehicle_no,
  is_active = EXCLUDED.is_active;

-- 6. Facility Services Sample Baseline
INSERT INTO public.facility_services (id, category_id, name, tagline, rating, reviews_count, duration_mins, price, original_price, discount_pct, image, badge, description, included, excluded, add_ons, sort, is_active) VALUES
  ('ac-foam-jet-service', 'ac-appliances', 'Power Jet AC Deep Cleaning (Split/Window)', '2X deeper cooling with 100% mess-free 2-in-1 indoor & outdoor pressure wash', 4.93, 1420, 45, 499, 699, 28, '/img-facility.jpg', 'Bestseller', 'Intensive cleaning of cooling coils, blower wheel, drain tray & outdoor unit condenser using high-pressure foam jet.', '["Indoor unit foam-jet wash", "Outdoor condenser pressure cleaning", "Drain tray sludge extraction", "Post-service cooling test"]'::jsonb, '["Gas leak repair", "Compressor replacement"]'::jsonb, '[{"name": "Anti-Bacterial Spray Coat", "price": 99}]'::jsonb, 1, true),
  ('tank-6step-cleaning', 'ro-water-tank', '6-Step Mechanized Water Tank Cleaning (Up to 1000L)', 'Scientific UV sterilization, sludge pump out & high-pressure jet disinfection', 4.95, 930, 60, 699, 999, 30, '/img-tank-cleaning.jpg', 'Patna Top Pick', 'Complete water tank decontamination using mechanized rotary sludge vacuum, antibacterial chemical spray, and UV disinfection lamp.', '["Mechanized sludge removal", "High-pressure jet wash", "UV radiation sterilization", "Antibacterial spray coat"]'::jsonb, '["Structural crack repair", "Plumbing pipe overhaul"]'::jsonb, '[{"name": "Pipe Flush Disinfection", "price": 149}]'::jsonb, 2, true),
  ('sofa-deep-cleaning', 'cleaning-pest', 'Sofa Spa & Fabric Deep Extraction (3-Seater)', 'Industrial wet extraction removing deep stains, mites and allergens', 4.88, 620, 50, 449, 599, 25, '/img-facility.jpg', 'Popular', 'Dry vacuuming followed by professional foam injection and industrial extraction pump to restore sofa fabric sheen.', '["Dry vacuum debris removal", "Stain spot pre-treatment", "Shampoo injection", "High-power extraction drying"]'::jsonb, '["Fabric re-upholstery", "Leather tear repair"]'::jsonb, '[{"name": "Additional Single Seat", "price": 149}]'::jsonb, 3, true),
  ('ro-repair-service', 'ro-water-tank', 'RO Purifier Complete Health Check & Service', 'TDS analysis, filter flushing, pre-sediment replace check & pump test', 4.89, 780, 40, 249, 349, 28, '/img-ro.jpg', 'Essential', 'Complete diagnostic check of input water TDS, membrane efficiency, booster pump pressure, and electrical solenoid valves.', '["TDS test before & after", "Sediment filter flushing", "Carbon block inspection", "Booster pump pressure check"]'::jsonb, '["RO Membrane replacement cost", "Pump replacement cost"]'::jsonb, '[{"name": "Sediment Filter Cartridge Replacement", "price": 199}]'::jsonb, 4, true),
  ('men-haircut-groom', 'salon-men', 'Men''s Elite Haircut, Beard Shape & Head Massage', 'Precision haircut and styling with disposable hygienic cape & sanitized tools', 4.92, 1100, 45, 299, 399, 25, '/img-events.jpg', 'Trending', 'Stylist-curated haircut matching face profile, beard shaping with razor edging, and a revitalizing herbal head massage.', '["Precision styling haircut", "Beard trim & razor line-up", "Sanitized single-use apron & blades", "Herbal cooling head massage"]'::jsonb, '["Hair chemical coloring"]'::jsonb, '[{"name": "Charcoal Blackhead Peel", "price": 99}]'::jsonb, 5, true),
  ('switch-board-repair', 'electrician-plumber', 'Switchboard Repair, MCB & Short Circuit Fix', 'Prompt doorstep electrical diagnosis with certified technician & multimeter', 4.87, 540, 30, 99, 149, 33, '/img-manpower.jpg', 'Doorstep Fast', 'Inspection of burnt switches, tripping MCBs, loose earthing, or faulty socket connections with safety isolation.', '["Socket or switch replacement diagnosis", "MCB trip root-cause detection", "Wire loose-contact tightening"]'::jsonb, '["Cost of new switches or MCBs"]'::jsonb, '[{"name": "Heavy App Socket Installation", "price": 149}]'::jsonb, 6, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  tagline = EXCLUDED.tagline,
  rating = EXCLUDED.rating,
  reviews_count = EXCLUDED.reviews_count,
  duration_mins = EXCLUDED.duration_mins,
  price = EXCLUDED.price,
  original_price = EXCLUDED.original_price,
  discount_pct = EXCLUDED.discount_pct,
  image = EXCLUDED.image,
  badge = EXCLUDED.badge,
  description = EXCLUDED.description,
  included = EXCLUDED.included,
  excluded = EXCLUDED.excluded,
  add_ons = EXCLUDED.add_ons,
  sort = EXCLUDED.sort,
  is_active = EXCLUDED.is_active;

-- 7. Admin Profiles
INSERT INTO public.admin_profiles (username, full_name, role, is_active) VALUES
  ('admin', 'Brentra Senior Admin', 'admin', true),
  ('ops_patna', 'Brentra Patna Ops Lead', 'ops', true)
ON CONFLICT (username) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active;

-- 8. Mandi Rates Reference Data
INSERT INTO public.mandi_rates (commodity, unit, wholesale_rate, retail_rate, trend, rate_date, updated_by) VALUES
  ('Wheat (Sharbati / Lokwan)', 'Quintal (100 kg)', 2450, 2750, 'stable', CURRENT_DATE, 'ops_patna'),
  ('Basmati Rice (Pusa 1121)', 'Quintal (100 kg)', 4200, 4800, 'up', CURRENT_DATE, 'ops_patna'),
  ('Mustard Seeds (Yellow)', 'Quintal (100 kg)', 5850, 6400, 'stable', CURRENT_DATE, 'ops_patna'),
  ('Maize (Yellow Corn)', 'Quintal (100 kg)', 2100, 2350, 'down', CURRENT_DATE, 'ops_patna'),
  ('Potato (Jyoti Fresh)', 'Quintal (100 kg)', 1350, 1600, 'up', CURRENT_DATE, 'ops_patna'),
  ('Red Onion (Nashik Quality)', 'Quintal (100 kg)', 2200, 2600, 'down', CURRENT_DATE, 'ops_patna'),
  ('Tur / Arhar Dal (Polished)', 'Quintal (100 kg)', 12800, 14200, 'stable', CURRENT_DATE, 'ops_patna'),
  ('Chana Dal (Desi)', 'Quintal (100 kg)', 6900, 7800, 'stable', CURRENT_DATE, 'ops_patna');

