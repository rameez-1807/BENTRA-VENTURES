# Brentra Ventures Website Redesign — Backend Schema Document

Version 1.0 · 7 November 2026 · Status: Draft for review · Companion to the PRD, TRD, UI/UX and App Flow documents

Basis: database/deploy\_schema.ts (and its .js twin), server.js, and the two browser calls that reach the API (QuoteModal and CheckoutModal). I did not connect to the live database, so what is deployed may differ from what the script creates. The target schema is a recommendation.

## 1. Read first: schema and data problems

| ID | Severity | Finding | Fix |
| --- | --- | --- | --- |
| D-1 | Critical | After switching Row Level Security on, the script adds policies that let everyone read leads and bookings, insert them, and update any booking. Supabase serves tables over its REST API to anyone holding the project’s public (anon) key, so a holder of that key could read every customer’s name, phone, address and OTP and edit any booking. The repo does not contain the anon key, and the front end never imports supabase-js (the package is installed but unused), so the exposure depends on where that key is. | Drop all ten policies now (SQL in section 7). The API connects straight to the database, not through that REST API, so dropping them should not affect it; test one lead and one booking afterwards. This corrects the TRD section 9 wording: RLS is already on, and the problem is the open policies. |
| D-2 | High | A booking confirmation does not depend on the API. The browser builds the booking itself, including a random technician and a random OTP, sends a reduced copy to the API without waiting, swallows any error, and shows success after 700 ms. The API then makes its own, different OTP. The database receives only name, phone, one joined address string, pincode, a list of service names, total, payment method and slot. Quantities, prices, add-ons, notes, promo code, fees, discount, alternate phone and technician never arrive. | The server creates the booking and the browser shows what the server returns (flow F2). Store the fields in section 4. |
| D-3 | High | The quote sheet shows a made-up reference (BV plus six random digits) when the request fails or the response is unexpected, so the visitor believes a lead was sent. | Show a reference only from a 201 response (flow F4). |
| D-4 | High | Demo data is seeded into the live tables: three sample leads with realistic names, phones and emails, a booking for a named customer already marked on\_the\_way, five mock technicians, four mock reviews (the table marks reviews as verified by default) and six fixed mandi rates. Re-running the script also overwrites category and service prices in the database with the values in the front-end code. | Seed demo data in development only. Delete the demo rows from production once you confirm none are real. Prices become editable in the database only (decision TD-4). |
| D-5 | Medium | A lead ID is six random digits, so a collision raises a unique-key error that the API treats as a database failure and hides behind its in-memory fallback. A booking ID is the last six digits of the clock, so it is guessable. The seeded booking uses a third format (BF-PAT-). | One ID scheme (section 5.2), generated with crypto and retried on collision. |
| D-6 | Medium | Status columns are free text and slot\_date is text (the API stores the word Today). The only indexes are primary keys. Bookings refer to technicians and services only through copied text. Deleting a category deletes its services (cascade). The OTP is stored as plain text. | Constraints, indexes, foreign keys and a hashed OTP, as in section 4. |

## 2. Current schema at a glance

| Table | Seeded rows | Purpose | Main problems |
| --- | --- | --- | --- |
| leads | 3 samples | Quote requests from the quote sheet | Seed statuses (NEW, IN\_PROGRESS, APPROVED) differ from the API default (PENDING\_REVIEW). Vertical is free text. Phone is required in the table but the API accepts email only. |
| facility\_categories | 8 | Salon men and women, AC and appliances, cleaning and pest, electrician and plumber, RO and water tank, painting and waterproofing, commercial facility | No sort or active flag. services\_count is a stored number that can drift. |
| facility\_services | 19 | Services with price, duration and JSONB included, excluded and add-ons | Cascade delete from category. No price check. Prices overwritten on re-seed. |
| technicians | 5 | Verified technicians | Mock data. No active flag. |
| customer\_reviews | 4 | Reviews on the Facility page | Service stored as text, date stored as text. |
| facility\_bookings | 1 | Doorstep bookings | See D-2, D-5 and D-6. |
| mandi\_rates | 6 | Patna wholesale and retail rates | One row per item with no history. No front-end code calls it. |

Only POST /api/leads and POST /api/bookings are called by the browser. The API also exposes services, categories, technicians and mandi-rates endpoints that no screen uses, because the catalogue is read from src/data/facilityData.ts (8 categories, 19 services, 5 technicians, 4 reviews and the promo codes).

## 3. Target data model

Fourteen tables in four groups. The seven existing table names are kept, so the migration is additive.

- **Catalogue:** facility\_categories, facility\_services, promo\_codes, service\_areas
- **Requests:** verticals, leads, facility\_bookings, booking\_items, booking\_status\_history, customer\_reviews
- **Operations:** technicians, admin\_profiles, audit\_log
- **Reference:** mandi\_rates

## 4. Target tables

**4.1 leads** (quote, contact, careers and partner forms)

| Column | Type | Rules |
| --- | --- | --- |
| id | text, primary key | BV- plus 8 characters (section 5.2) |
| type | text | quote, contact, career or partner (CHECK) |
| vertical | text, foreign key to verticals.id | Required when type is quote, otherwise null |
| full\_name | text | 2 to 100 characters, required |
| phone | text | E.164, +91 then 10 digits starting 6 to 9, required |
| email | text | Optional, stored lower-case |
| location\_name | text | Default Patna, Bihar |
| details | text | 1000 characters or fewer (replaces custom\_details) |
| status | text | PENDING\_REVIEW, CONTACTED, QUOTED, WON or LOST (CHECK), default PENDING\_REVIEW |
| assigned\_to | uuid, null | admin\_profiles.user\_id |
| admin\_notes | text | 2000 characters or fewer |
| source\_path | text | Page where the form was opened |
| utm | jsonb | utm\_source, utm\_medium, utm\_campaign, utm\_term, utm\_content |
| consent\_at | timestamptz | Required, set by the server |
| idempotency\_key | text, unique | From the browser; a repeated key returns the first result |
| created\_at, updated\_at | timestamptz | Default now(); updated\_at set by a trigger |

Indexes: created\_at descending; status; (type, created\_at descending).

**4.2 facility\_bookings**

| Column | Type | Rules |
| --- | --- | --- |
| id | text, primary key | BK- plus 8 characters |
| customer\_name | text | Required |
| phone, alternate\_phone | text | E.164; alternate is optional |
| locality, flat\_house\_no, landmark | text | Locality and flat or house number required |
| city | text | Default Patna |
| pincode | text | 6 digits, must exist in service\_areas |
| slot\_date | date | A real date (today’s text value is no longer stored) |
| slot\_start, slot\_end | time | From the fixed slot list, plus slot\_label text for display |
| payment\_method | text | cash\_after\_service now; CHECK also allows upi\_online and card\_online for later |
| payment\_status | text | pending or paid (CHECK). Set to paid only by the server after a recorded payment. |
| subtotal, service\_fee, discount, total\_amount | numeric(10,2) | Computed by the server. Total = subtotal + fee − discount. |
| promo\_code | text, null | Foreign key to promo\_codes.code |
| status | text | confirmed, pro\_assigned, on\_the\_way, in\_progress, completed or cancelled (CHECK), default confirmed |
| technician\_id | text, null | Foreign key to technicians.id; replaces the copied name and phone |
| otp\_hash | text | Keyed hash of the code. The plain code is shown once in the response. |
| otp\_attempts, otp\_used\_at | smallint, timestamptz | Locks after 5 wrong tries; records when the code was accepted |
| customer\_notes | text | 500 characters or fewer |
| cancelled\_by, cancel\_reason | text, null | customer or admin, and why |
| utm, consent\_at, idempotency\_key | as in leads |  |
| created\_at, updated\_at | timestamptz | Default now(); trigger on update |

Indexes: created\_at descending; status; slot\_date; (phone, id) for tracking lookups.

**4.3 booking\_items** replaces the items JSONB column for new bookings.

| Column | Type | Rules |
| --- | --- | --- |
| booking\_id | text | Foreign key to facility\_bookings.id |
| line\_no | smallint | Primary key together with booking\_id |
| service\_id | text | Foreign key to facility\_services.id |
| service\_name | text | Copied at the time of sale |
| unit\_price | numeric(10,2) | Copied at the time of sale, so later price edits do not change history |
| quantity | smallint | Greater than 0, maximum set by the owner |
| addons | jsonb | Chosen add-ons with their prices at the time of sale |

**4.4 The other tables**

| Table | Columns | Notes |
| --- | --- | --- |
| verticals | id, label, is\_active, sort | Allow-list for quotes. Rows: realty-infrastructure, it-solutions, facility-services, manpower-housekeeping, ro-water-purifier, water-tank-cleaning, pest-control, digital-marketing, plus new fresh-fmcg, events-hospitality, ventures and building-materials (slug to confirm). |
| facility\_categories | id, name, short\_name, icon\_name, starting\_price, description, banner\_image, sort, is\_active | services\_count is dropped and computed. Deleting a category with services is refused. |
| facility\_services | id, category\_id, name, tagline, rating, reviews\_count, duration\_mins, price, original\_price, discount\_pct, image, badge, description, included, excluded, add\_ons, is\_active, sort | Price CHECK of 0 or more. Price edits go to audit\_log. |
| technicians | id, name, phone, avatar, rating, reviews\_count, experience\_years, jobs\_completed, specialization, verified, vehicle\_no, is\_active | The public API returns name, photo, rating and vehicle number only for an assigned booking. |
| service\_areas | pincode (primary key), area\_name, is\_active | The owner’s served-pincode list (App Flow F8). |
| promo\_codes | code (primary key), label, discount\_pct, flat\_discount, min\_order, valid\_from, valid\_to, is\_active | Exactly one of discount\_pct or flat\_discount. Replaces the codes held in the browser. |
| booking\_status\_history | id, booking\_id, from\_status, to\_status, changed\_by, changed\_at, note | One row per change (flow F5), written in the same transaction as the status update. |
| customer\_reviews | id, booking\_id (unique, null), service\_id, customer\_name, locality, rating 1 to 5, comment, is\_published, created\_at | Verified means booking\_id is set. Mock rows are removed. New reviews wait for approval. |
| mandi\_rates | id, commodity, unit, wholesale\_rate, retail\_rate, trend (up, down or stable), rate\_date, updated\_by | Unique on (commodity, rate\_date) keeps history. The API returns the latest row per commodity. |
| admin\_profiles | user\_id (Supabase Auth user), full\_name, role (admin or ops), is\_active | No passwords stored here (decision TD-3). |
| audit\_log | id, actor\_id, action, entity, entity\_id, before, after, at | Append-only. Written for price edits, status changes, technician assignment and lead status changes. |

## 5. Conventions

**5.1 Types.** Timestamps are timestamptz in UTC, shown in IST. Money is numeric(10,2) in rupees, never a float. Phone numbers are E.164 text. Text columns have length checks. Booleans are not null with defaults. The unused uuid-ossp extension is dropped, and uuids use gen\_random\_uuid().

**5.2 IDs.** Leads use BV- and bookings use BK-, each followed by 8 characters from a secure random source, in an alphabet without I, L, O or U. The API retries up to three times on a collision and never derives an ID from the clock. Catalogue IDs stay readable slugs such as srv-ac-foam-jet and tech-101. The seeded BF-PAT-92041 booking is deleted.

**5.3 Statuses.** Allowed values are enforced by CHECK constraints. The API enforces the order in flow F5, and every change adds a booking\_status\_history row.

**5.4 Personal data**

| Data | Class | Who can read it | Kept |
| --- | --- | --- | --- |
| Name, phone, email, address | Personal | Admin; the customer with booking ID and phone | Owner decides (suggested: anonymise after 24 months) |
| OTP | Secret | Nobody after creation; only the hash is stored | Until used |
| Admin notes | Internal | Admin | As the lead or booking |
| Technician phone | Personal | Admin; the customer for their own booking | While the technician is active |
| utm, source\_path | Low | Admin | No limit |

## 6. API schemas

Every error uses one shape: an error object with code, message and, for validation, a fields map. Success bodies never echo personal data.

| Endpoint | Auth | Request | Success | Errors |
| --- | --- | --- | --- | --- |
| POST /api/leads | Bot-check token and an Idempotency-Key header | type, vertical, fullName, phone, email, locationName, details, consent (true), sourcePath, utm, turnstileToken, and a hidden website field that must be empty | 201 with id and createdAt | 400 validation\_failed, 403 bot\_check\_failed, 429 rate\_limited, 503 store\_unavailable |
| POST /api/bookings | Same | customer (fullName, phone, alternatePhone, locality, flatHouseNo, landmark, pincode), items (serviceId, quantity, addonIds), slot (date, start), paymentMethod, promoCode, notes, consent, turnstileToken | 201 with id, otp (shown once), total, slot, status | 400, 403, 409 slot\_unavailable, 422 outside\_service\_area, 429, 503 |
| GET /api/track/:id?phone= | Phone must match; rate limited | none | 200 with status, slot, items, total, paymentStatus and, once assigned, technician (name, photo, rating, vehicleNo, phone). Never the OTP. | 404 not\_found (also for a wrong phone), 429 |
| POST /api/bookings/:id/cancel | ID and phone | reason | 200 with status cancelled | 409 not\_cancellable |
| POST /api/reviews | ID and phone | bookingId, rating, comment | 201 | 409 already\_reviewed, 422 not\_completed |
| GET /api/services, /api/categories, /api/mandi-rates | Public | none | 200, active rows only, cached 60 seconds | none |

**Admin endpoints** all need a valid admin session and sit under /api/admin. They supersede the admin paths in TRD section 8.

| Endpoint | Purpose |
| --- | --- |
| GET /api/admin/leads, PATCH /api/admin/leads/:id | List with filters; change status, notes and assignee |
| GET /api/admin/bookings | List with filters and search |
| POST /api/admin/bookings/:id/assign | Body: technicianId; sets pro\_assigned |
| POST /api/admin/bookings/:id/status | Body: to, note; checks the allowed transition |
| POST /api/admin/bookings/:id/verify-otp | Body: code; on a match sets in\_progress |
| PATCH /api/admin/services/:id | Price and active flag; writes audit\_log |
| GET /api/admin/technicians | Technician list with workload |

## 7. Migration plan

Each step can be undone until step 7.

1. **Today:** rotate the database password (TRD S-1) and drop the ten open policies. Then submit one test lead and one test booking to confirm the API still works.
2. Create a migrator role for schema changes and an app role that can only insert, select and update the tables it needs, with no right to change the schema. Move to versioned SQL migrations (TRD section 9).
3. Delete the demo rows (three sample leads, BF-PAT-92041, mock technicians, mock reviews) after you confirm none are real.
4. Add the new tables and nullable columns. Fill verticals, service\_areas and promo\_codes from your data and the front-end constants.
5. Backfill. Old slot\_date text becomes a date using created\_at for words such as Today. Old bookings keep their items column, read-only, because it holds names only and cannot be rebuilt into booking\_items.
6. Switch the API to the new columns and run for a week. Add each constraint as NOT VALID, then VALIDATE after the backfill.
7. Drop the old columns (technician\_name, technician\_phone, custom\_details, services\_count) after one release with no reads.

Step 1 SQL, run in the Supabase SQL editor:

```sql
DROP POLICY IF EXISTS "Public read leads" ON public.leads;
DROP POLICY IF EXISTS "Public insert leads" ON public.leads;
DROP POLICY IF EXISTS "Public read categories" ON public.facility_categories;
DROP POLICY IF EXISTS "Public read services" ON public.facility_services;
DROP POLICY IF EXISTS "Public read technicians" ON public.technicians;
DROP POLICY IF EXISTS "Public read reviews" ON public.customer_reviews;
DROP POLICY IF EXISTS "Public read bookings" ON public.facility_bookings;
DROP POLICY IF EXISTS "Public insert bookings" ON public.facility_bookings;
DROP POLICY IF EXISTS "Public update bookings" ON public.facility_bookings;
DROP POLICY IF EXISTS "Public read mandi" ON public.mandi_rates;
```

If the front end later reads the catalogue straight from Supabase, add a read-only policy on the catalogue tables only, never on leads, bookings or technicians.

## 8. Checks before release

- No policy lets the anon or authenticated role read or write leads, bookings, booking\_items, technicians or audit\_log.
- The app role cannot run schema changes.
- Every status column has a CHECK, and the foreign keys above exist.
- The tracking lookup and the admin lists use their indexes (EXPLAIN).
- Booking creation tests: a taken slot gives 409, a client-supplied total is ignored, a repeated Idempotency-Key returns the same booking.
- One restore from a backup has been tried.

## 9. Open questions

1. OTP storage: hashed (recommended) means staff verify the code in Admin rather than reading it from the table. Agreed?
2. How long are leads and bookings kept?
3. The exact vertical list and the slug for Building Materials.
4. Is an email-only lead acceptable (the API allows it today), or is a mobile number required?
5. What is the service fee (the code defaults to 49) and who changes it?
6. Which pincodes are served?
7. The real cancellation and refund policy.
