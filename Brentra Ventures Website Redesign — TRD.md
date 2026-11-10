# Brentra Ventures Website Redesign — TRD

Version 1.0 · 6 November 2026 · Status: Draft for review · Companion to the PRD v1.0 (FR-1 to FR-9 refer to its functional requirements)

Basis: the source code in github.com/rameez-1807/BENTRA-VENTURES, read on 6 November 2026. Nothing was run against the live site or the database.

## 1. Read first: security fixes before any redesign work

These come from the code and are independent of the redesign. S-1 and S-2 are live exposure, so they come first.

| ID | Severity | Finding | Required fix |
| --- | --- | --- | --- |
| S-1 | Critical | The database password, host and user are written into server.js as defaults, and into database/deploy\_schema.ts and deploy\_schema.js. The repo can be cloned without credentials. | Rotate the Supabase database password today. Remove every default, read secrets from environment variables only, and make the server refuse to start if they are missing. Treat the old password as compromised even after it is deleted from the files, because git history keeps it. The value is deliberately not repeated here. |
| S-2 | Critical | GET /api/leads and GET /api/bookings need no login and return up to 100 recent rows with SELECT \*: customer names, phone numbers, addresses and booking OTP codes. | Put both behind admin authentication. Never return otp\_code from a list endpoint. Return only the fields each screen needs. |
| S-3 | High | CORS allows every origin. The POST endpoints have no validation, rate limit or bot check. | Origin allow-list, schema validation (zod), express-rate-limit, a honeypot field, and Cloudflare Turnstile on the quote and booking forms. |
| S-4 | High | POST /api/bookings trusts the totalAmount sent by the browser. | Recompute the total on the server from facility\_services and the chosen add-ons. Ignore the client value. |
| S-5 | High | When a database write fails, both POST endpoints still answer 201 success and keep the record in server memory, which is lost on restart. The customer sees a confirmation but the lead may not exist. | Return 503 with a retry message, or write to a durable queue. Remove the in-memory arrays. |
| S-6 | Medium | The Admin dashboard opens from a button on the public Facility Services page with no login. It runs on in-page state today, so it exposes no server data, but it must be gated before it is connected to the API. | Move it to a protected /admin route behind login (decision TD-3) and remove the public button. |
| S-7 | Medium | .env is not in .gitignore. TLS certificate checking is off for the database (rejectUnauthorized: false). OTPs and IDs come from Math.random. The health endpoint reveals the Supabase project ID. | Add .env to .gitignore and commit a .env.example. Verify the database certificate. Use crypto.randomInt for OTPs and crypto.randomUUID for IDs. Drop the project ID from /api/health. |

Also turn on GitHub secret scanning and push protection for the repo.

## 2. Purpose and scope

This document says how the PRD will be built: architecture, libraries, data, API changes, performance engineering, security, CI/CD and testing. It does not repeat the product requirements.

In scope: the React front end, the Express API and the Supabase database. Out of scope: new business features, a CMS, native apps.

## 3. Current technical baseline

| Layer | Today | Notes |
| --- | --- | --- |
| Front end | React 19, Vite 8, TypeScript 6, Tailwind v4, react-router-dom 7, lucide-react | Single-page app, 15 page components, about 24 routes. TypeScript strict mode is off. |
| Hosting | Vercel with one rewrite of every path to index.html | One static title and description for every route, so link previews and per-page SEO are identical everywhere. |
| API | Express 5 in server.js, on Render (per the README) | /api/health, /api/leads, /api/bookings, /api/services, /api/categories, /api/technicians, /api/mandi-rates. |
| Database | Supabase PostgreSQL through the pg driver | Tables: leads, facility\_categories, facility\_services, technicians, customer\_reviews, facility\_bookings, mandi\_rates. A deploy script creates the schema and seeds it from front-end data. |
| Front end to API | QuoteModal calls /api/leads and CheckoutModal calls /api/bookings, using VITE\_API\_URL with the production Render URL as fallback | Only two screens call the API. Services, prices and technicians are read from src/data/facilityData.ts. |
| CI | GitHub Actions on Node 20: npm ci, type-check, build | No lint, no tests, no performance check. |
| Assets | public/ is 16 MB. The hero poster images are about 0.8 to 1.25 MB each, and two logo PNGs are about 0.9 MB each. | Six logo variants in total. |
| State | Local React state. onOpenQuoteModal is passed as a prop through every page. |  |

## 4. Target architecture and decisions

Keep the stack. There is no rewrite. The redesign adds the following.

| Concern | Decision | Reason |
| --- | --- | --- |
| Framework | Keep Vite, React 19, TypeScript, Tailwind v4, react-router-dom 7 | Working, current, and the booking flow depends on it |
| Motion | Add the motion package (Framer Motion) | Scroll-linked and layout animation with reduced-motion support built in |
| Smooth scroll | Lenis, desktop only, off under reduced motion | Cinematic feel without hurting touch devices |
| 3D | Optional three and @react-three/fiber in a lazy chunk (decision TD-2) | Only if a real asset justifies the weight |
| Page metadata | React 19 native title and meta tags, plus build-time prerender (TD-1) | Fixes identical titles and link previews |
| Fonts | @fontsource-variable packages for Outfit and Plus Jakarta Sans | Self-hosted, no Google Fonts request |
| Validation | zod on both client and server | One schema per form |
| Images | sharp build script producing AVIF, WebP and JPEG fallbacks | Cuts hero weight by roughly an order of magnitude |
| Quality | ESLint (typescript-eslint, react-hooks, jsx-a11y), Prettier, Vitest, Testing Library, Playwright, axe | Currently none of these exist |

## 5. Front-end design

**5.1 Folder structure.** Keep src/pages and src/components. Add src/routes.ts, src/config/site.ts, src/components/nav/, src/components/motion/, src/scenes/ (one SVG scene per vertical), src/hooks/ and src/lib/ (validators, analytics wrapper). Move hard-coded page copy and prices into src/data/.

**5.2 One route registry (FR-1, FR-3, FR-6).** A single array in src/routes.ts describes every page: path, aliases, label, nav cluster, title, description, lazy component and whether it appears in the nav. Everything else is derived from it: the router, the header and footer menus, canonical tags, sitemap.xml, the redirect block of vercel.json (generated by a build script, permanent redirects placed before the SPA rewrite) and the prerender list. A unit test fails the build on a duplicate path or alias.

**5.3 Site config (FR-2).** src/config/site.ts holds brand name, legal name, one logo asset (SVG preferred), tagline, phone numbers, WhatsApp number, address, hours, domain, social links and the headline prices (construction per sq.ft, facility starting price, and so on). A Vite transformIndexHtml plugin writes index.html meta tags and the JSON-LD from this file, so the page and the search-engine data cannot drift apart again.

**5.4 Quote context.** Replace the onOpenQuoteModal prop that runs through all 15 pages with a QuoteProvider and a useQuote() hook exposing openQuote(vertical). Behaviour of the modal does not change (FR-7).

**5.5 Design tokens.** Define colours, fluid type scale (clamp), spacing, radii, easing and durations in a Tailwind v4 @theme block. Brand values: navy 950 #07111F, navy 900 #0A192F, navy 700 #1E3E62, gold #C5A880 and #D4AF37, cyan #0284C7, and the existing ease cubic-bezier(0.16, 1, 0.3, 1). Remove class names that need tailwindcss-animate, which is not installed.

**5.6 Navigation component.** Build it as a headless, accessible disclosure menu: button with aria-expanded and aria-controls, hover-intent delay of 120 ms, Esc and outside-click close, arrow-key movement inside the panel, focus returned to the trigger on close. Mobile uses a full-screen dialog with a focus trap and a sticky bottom bar (Call, WhatsApp, Book). On every route change, scroll to top and move focus to the page heading.

## 6. Motion engineering

- **Primitives (FR-9):** Reveal, Counter, Marquee, ScrollScene (exposes scroll progress), MagneticButton, PageTransition. Hooks: useReducedMotion, useInView, useDeviceTier.
- **Scene contract:** each vertical scene is one component in src/scenes that takes a progress value and a reduced flag. It renders inline SVG of at most 20 KB gzip, shows a meaningful static final frame when reduced is true, and ships inside its page chunk.
- **Allowed properties:** transform, opacity and SVG stroke-dashoffset (pathLength drawing). No animation of width, height, top or left. will-change only while an animation runs.
- **Device tiers:** useDeviceTier returns low, mid or high from prefers-reduced-motion, Save-Data, coarse pointer, hardwareConcurrency and deviceMemory. APIs that Safari lacks count as unknown, not low. Low tier gets static scenes and no parallax, video or WebGL.
- **Pause rules:** IntersectionObserver pauses anything off-screen, and the document visibility state pauses everything in a background tab.
- **Hero video:** muted, loop, playsinline, poster image, preload metadata, 8 seconds or less, under 1.5 MB (H.264 plus WebM). It autoplays only on mid and high tiers and never under Save-Data.
- **3D (only if TD-2 approves it):** lazy chunk of 200 KB gzip or less, loaded after LCP via requestIdleCallback, desktop high tier only, device pixel ratio capped at 1.5, frame loop on demand when nothing moves.
- **Scrolling:** Lenis must keep the existing hash-link scrolling working (App.tsx scrolls to element ids today).
- **Route transitions:** opacity only, 250 ms or less, never delaying focus or scroll reset.

## 7. Performance engineering

**Budgets**

| Item | Budget |
| --- | --- |
| Initial JavaScript | 200 KB gzip or less |
| Per-route chunk | 80 KB gzip or less |
| CSS | 40 KB gzip or less |
| Mobile LCP image | 120 KB or less |
| Home page weight on first load | 1.5 MB or less, excluding lazy video |
| Web fonts | 2 files |
| Core Web Vitals (PRD §10) | LCP 2.5 s or less, CLS under 0.1, INP under 200 ms |

**Actions**

1. Image pipeline: scripts/optimize-images.mjs with sharp creates 480, 960 and 1600 px AVIF, WebP and JPEG variants in public/img/. Replace the roughly 1 MB posters and the 0.9 MB logos. Use SVG for the logo. Every image gets width and height, loading lazy (except LCP), and the LCP image gets fetchpriority high.
2. Remove the Google Fonts links from index.html and use the self-hosted variable fonts with font-display swap. Preload the headline font.
3. Route-level React.lazy with Suspense. Vite manualChunks for react, motion and three so they cache separately.
4. Import lucide-react icons by name only.
5. Vercel headers: immutable long-term cache for hashed assets and /img, short cache for HTML.
6. rollup-plugin-visualizer locally and Lighthouse CI budgets in the pipeline (section 11).
7. Warm the API: if the Render service sleeps when idle, call /api/health on first load so the first form submission is not slow. Forms show a submitting state, a 20-second timeout and a retry.

## 8. API and backend requirements

| Endpoint | Required change |
| --- | --- |
| GET /api/health | Return status and timestamp only. No project ID, no database error text. |
| POST /api/leads | Validate with zod: name 2 to 100 characters, Indian mobile number (optional +91, ten digits starting 6 to 9), optional valid email, vertical from the allow-list of vertical IDs, details 1000 characters or fewer, consent flag required. Honeypot and Turnstile token. Rate limit about 5 per minute per IP. Generate the lead ID with crypto. Respond 201 with the ID only, not the submitted personal data. |
| GET /api/leads | Admin only, paginated, status filter. |
| PATCH /api/leads/:id | New, admin only. Status values: PENDING\_REVIEW, CONTACTED, QUOTED, WON, LOST. |
| POST /api/bookings | Validate item IDs against facility\_services and the slot. Compute the total on the server. Generate the OTP with crypto.randomInt and return it once, in this response, to the customer. |
| GET /api/bookings | Admin only, paginated, phone partly masked, otp\_code omitted. |
| GET /api/services, /api/categories, /api/technicians, /api/mandi-rates | Public read-only with Cache-Control s-maxage of 60. Do not return raw error messages in 500 responses (they do today). |

**Applies to every endpoint**

- helmet, express.json with a 20 KB limit, a JSON 404 for unknown /api paths, and one error shape: an error object with code and message.
- CORS allow-list from ALLOWED\_ORIGINS (production domain, Vercel preview pattern, localhost).
- Structured logging (pino) with phone numbers and addresses redacted, a request ID on every log line, graceful shutdown.
- Database SSL with the Supabase CA certificate instead of rejectUnauthorized false.
- Pick one front-end host. The README says Vercel, so remove the static-file and SPA fallback from server.js unless Render also serves the build.
- Target p95 response under 400 ms when warm.
- Optional but recommended: notify the owner by email or WhatsApp when a lead or booking arrives, so conversions are not lost in a table nobody reads.

## 9. Data requirements

- **Migrations:** replace deploy\_schema.ts and .js with versioned SQL migrations (for example supabase/migrations) run from CI with a deploy-only credential. Seeding is a separate step.
- **Row Level Security:** enable RLS on every table. Supabase exposes tables through its REST API with a public key, so with RLS on and no public policies only the server’s direct connection can read them.
- **Catalogue source (TD-4):** facilityData.ts is the editable source for the redesign, and the seed SQL is generated from it so the database and the front end cannot disagree.
- **Constraints and indexes:** CHECK constraints for status columns. Indexes on leads(created\_at desc), leads(status), facility\_bookings(created\_at desc), facility\_bookings(status) and the slot date.
- **Booking slot:** the API defaults appointmentDate to the text Today. Confirm the type of slot\_date and store a real date plus a slot start and end time. Keep the display label in the UI.
- **Price snapshot:** each booking keeps the unit prices it was sold at in its items JSON, so later catalogue changes do not alter history.
- **New lead columns:** source page, UTM fields and consent\_at timestamp.
- **Retention:** the owner decides how long leads and bookings are kept (for example anonymise after 24 months). Confirm Supabase backups are on.

## 10. Security and privacy beyond section 1

- Security headers in vercel.json: Content-Security-Policy (self, the API origin, the analytics host, the map embed), HSTS, X-Content-Type-Options, Referrer-Policy and Permissions-Policy.
- Admin login (TD-3) with an allow-list and multi-factor authentication.
- Dependabot weekly and npm audit in CI, failing on high severity.
- Consent checkbox and notice on the quote and booking forms, plus privacy policy and terms pages linked from the footer. India’s Digital Personal Data Protection Act 2023 covers personal data of people in India. The owner should confirm the exact obligations with a lawyer; this is not legal advice.
- No third-party scripts beyond analytics, Turnstile and the map.

## 11. Build, environments and CI/CD

**Environments:** local, a Vercel preview for every pull request, and production. A staging API is optional.

| Variable | Where | Purpose |
| --- | --- | --- |
| VITE\_API\_URL | Front end | API base URL. No production fallback hard-coded in components. |
| VITE\_TURNSTILE\_SITE\_KEY | Front end | Bot check |
| VITE\_ANALYTICS\_ID | Front end | Analytics |
| DATABASE\_URL (or DB\_HOST, DB\_PORT, DB\_USER, DB\_PASSWORD, DB\_NAME) | Server | No defaults; startup fails if missing |
| ALLOWED\_ORIGINS | Server | CORS allow-list |
| TURNSTILE\_SECRET | Server | Verify bot-check tokens |
| Admin auth variables | Server | Depend on TD-3 |

**Pipeline (GitHub Actions):** npm ci, lint, type-check, unit tests, build, Playwright end-to-end tests against the built site, Lighthouse CI on the mobile preset with the section 7 budgets, npm audit. Branch protection on main requires every step to pass. Confirm the Node version Vite 8 requires and align the workflow, which uses Node 20 today.

**TypeScript:** strict mode is off now. New folders (nav, motion, scenes, config, lib) are strict from day one through a tsconfig.strict.json that CI also checks. Legacy pages are moved to strict page by page.

**Repo hygiene:** delete unused logo variants (keep one SVG logo, a favicon and a 1200 by 630 share image), add .env.example, update the README, keep a CHANGELOG.

## 12. Testing

- **Unit (Vitest):** route registry (no duplicate paths, every alias redirects), site config (one price, one phone set), form validators.
- **Component (Testing Library and axe):** header and mega menu keyboard behaviour, aria attributes, mobile focus trap.
- **End to end (Playwright, Chromium, WebKit, mobile emulation):** every canonical route reachable in three clicks or fewer, quote submit success and failure with the API mocked, booking checkout, alias redirect, 404 page.
- **Accessibility:** axe on every route with zero critical or serious issues.
- **API (supertest):** validation, authentication, rate limiting, server-side total recomputation, no OTP in list responses.
- **Performance:** Lighthouse CI against the PRD §10 targets.
- **Visual and device:** screenshots of header and Home at 360, 768, 1024, 1280 and 1440 px, plus one low-end Android on 4G and one iPhone.

## 13. Observability

- A small track(event, props) wrapper sends the FR-8 events (quote\_open, quote\_submit, call\_click, whatsapp\_click, vertical\_view) so the analytics provider can change (TD-6).
- The web-vitals library reports LCP, CLS and INP.
- Error tracking (for example Sentry) on the front end and the API.
- An uptime check on /api/health every 5 minutes with an alert.
- An alert whenever lead or booking storage fails (the case S-5 hides today).

## 14. Task breakdown by PRD phase

| Phase | Technical tasks | Done when |
| --- | --- | --- |
| 0 Fix and clean | S-1 to S-7, routes.ts, site.ts, generated redirects, 404, JSON-LD from config, QuoteProvider | Password rotated, no secret in the repo, list endpoints protected, one price and one contact set everywhere |
| 1 Shell | Tokens, fonts, header, mega menu, mobile menu, footer, motion primitives, device tiers, ESLint, Prettier, Vitest, Playwright, CI | PRD §5 navigation criteria pass in end-to-end and axe tests |
| 2 Home | Image pipeline, hero, scroll showcase, stats, FAQ, prerender if TD-1 is approved | Home meets the section 7 budgets in Lighthouse CI |
| 3 Vertical pages | Page template, the scenes, lazy loading, analytics events | Every route passes axe and budgets, reduced motion verified |
| 4 Polish | Performance tuning, cross-browser and real-device pass, README and runbook | PRD §10 targets met |

## 15. Decisions needed

| ID | Decision | Options | Recommendation |
| --- | --- | --- | --- |
| TD-1 | Prerender public pages? | Keep the SPA and set metadata in the browser, or prerender the 14 canonical public routes at build | Prerender. It is cheap and fixes per-page titles and link previews. |
| TD-2 | 3D hero? | SVG, CSS and video only, or add a lazy three.js scene | SVG, CSS and video for launch. Add 3D only if a real model or asset exists. |
| TD-3 | Admin authentication | Supabase Auth with an allow-list and multi-factor, or a shared admin key header | Supabase Auth. Use the key header only as a stop-gap this week for S-2. |
| TD-4 | Catalogue source | facilityData.ts generates the database seed, or the database is the source and the front end fetches it | The first option for the redesign. Revisit later. |
| TD-5 | Video hosting | In the repo or CDN for an 8-second hero loop, or a video host for anything longer | Hero loop only in the repo. Nothing larger goes into git. |
| TD-6 | Analytics tool | GA4, Plausible or PostHog | Owner’s choice. GA4 if the marketing vertical already runs ads. |
| TD-7 | API host | Stay on Render, or move to serverless functions | Stay. Revisit if cold starts hurt form conversion. |
