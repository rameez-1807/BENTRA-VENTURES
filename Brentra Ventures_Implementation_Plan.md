# Brentra Ventures Website Redesign
## Implementation Plan & AI Coding-Agent Brief

**Version:** 1.0  
**Date:** 7 November 2026  
**Status:** Execution-ready draft; owner decisions are listed in Section 13  
**Repository:** https://github.com/rameez-1807/BENTRA-VENTURES  
**Current deployment listed by the repository:** https://bentra-ventures.vercel.app  
**Companion source documents:** PRD, TRD, App Flow, Backend Schema, UI/UX Design Document (all supplied by the project owner)

---

## 1. Executive direction

This is an **in-place redesign and hardening of the existing Brentra Ventures repository**, not a rewrite or a replacement project. Keep the current React 19, Vite, TypeScript, Tailwind CSS v4, React Router, Express and Supabase/PostgreSQL foundation. Preserve the existing business vertical pages, canonical destinations, quote capture and Brentra Facility booking journey, while improving the navigation, visual system, motion, content hierarchy, reliability, security and performance.

The immediate visible problem is the navigation. The current desktop header competes with a dense utility strip, shows Brentra Facility as a top-level destination while also listing it inside Services, and has a fixed 760 px menu containing only eight entries. Important divisions such as Fresh FMCG, Events & Hospitality and Healthcare & Ventures are missing from that menu. The mobile menu uses different labels and grouping. The router also sends unknown paths to the Home page, which hides broken links instead of giving users a proper 404.

The requested “$100 website” quality bar should be interpreted as **premium, agency-grade craft**, not as a monetary target. The finished site should feel cinematic and alive, but every moving object must explain a real Brentra business activity. Motion must never make navigation, prices, forms or booking harder to use.

**Order of work:**

1. Protect credentials, customer data and production booking/lead integrity.
2. Fix the navigation and establish one source of truth for site identity, routes and global contact information.
3. Build the responsive design system and global shell.
4. Redesign the Home page and then apply a reusable pattern to each vertical page.
5. Add purposeful, lightweight motion scenes and meaningful interaction states.
6. Validate every route and customer journey, then deploy safely.

## 2. Scope and non-negotiable constraints

### In scope

- Rework the desktop header, Services mega menu, mobile navigation, utility bar, footer and persistent contact actions.
- Redesign the Home page and the existing vertical pages using a consistent editorial/cinematic system.
- Add per-vertical SVG/CSS motion scenes, page transitions and scroll-aware reveals with device and reduced-motion fallbacks.
- Centralise global brand, contact, logo, schedule, domain and headline pricing values.
- Centralise route metadata, canonical paths, aliases, navigation labels and SEO data.
- Preserve the current quote modal, facility catalogue, cart, checkout, tracking and admin workflows while correcting their documented false-success, payment, OTP, data-exposure and demo-state defects.
- Harden Express endpoints and the Supabase schema using controlled, versioned migrations.
- Add automated tests, accessibility checks, performance budgets, analytics and operational monitoring.

### Out of scope unless separately approved

- Replacing the stack with Next.js, another framework or a new backend.
- Rebuilding the product as a customer-account platform.
- Adding a CMS, new business lines or unsupported services.
- Enabling real online payments before a payment provider is selected and integrated.
- A heavy 3D/WebGL hero at launch.
- Copying the layout, code, assets, brand identity or wording of SpaceX or CyArt.
- Inventing company metrics, customer reviews, certificates, client logos, warranties, dispatch guarantees or service-area coverage.

### Preservation rule

Do not delete or replace current page components, route aliases, pricing data, catalog data, booking components or API contracts until the replacement has been mapped, implemented and regression-tested. Work on a feature branch and use small, reviewable commits. Do not run a destructive database migration against production as part of a visual redesign task.

## 3. What was inspected and what is known

### Repository/source inspection

The public GitHub repository and its `main` branch source were inspected on 7 November 2026. The deployed Vercel URL was opened, but the live client-rendered page returned no readable page content in the available browser inspection. Therefore this plan does **not** claim that a full pixel-level browser audit of the production rendering has been completed. The implementation team must run the project locally and capture a browser baseline before changing the UI.

The following are source-level findings:

| Area | Current observation | Implementation consequence |
|---|---|---|
| Header | Utility strip contains long address, multiple phones and a promotional construction line. Main navigation has Home, About Us, Brentra Facility, Services & Rates, Contact Us and Our Partners. | Replace with one restrained utility row and the four-item primary navigation plus one main CTA defined in the PRD. |
| Services menu | The menu is fixed at 760 px and has eight entries. Brentra Facility is repeated outside and inside the menu. Several business divisions are missing. | Make Services the only entry point for business verticals; use the four approved clusters and responsive panel sizing. |
| Mobile navigation | Mobile labels differ from desktop labels and the hierarchy is different. | Generate desktop and mobile navigation from the same route/cluster data. |
| Keyboard access | The current menu is primarily driven by mouse enter/leave and click state. | Implement a disclosure menu with keyboard, focus, Escape, outside-click and touch support. |
| Routing | Existing aliases render page components directly; wildcard route renders Home. | Add canonical redirects and a real not-found route. Do not break old inbound links. |
| App composition | All page components are imported eagerly and quote-modal opening state is passed through page props. | Introduce route-level lazy loading and a shared quote context without changing the quote experience. |
| Dependencies/scripts | Current package scripts cover start, dev, build, preview and type-check. The motion and automated testing stack described in the TRD is not present in the inspected package manifest. | Add only the libraries needed for the approved design and quality gates; update CI with lint, tests and e2e checks. |
| API | The inspected server source contains credential defaults, wildcard CORS, unauthenticated lead/booking list handlers, in-memory fallback writes that still report success, client-trusted booking totals and plaintext OTP handling. | Treat security and booking integrity as a release blocker. Rotate exposed credentials before merely deleting them from source. |
| Live visual state | The deployed SPA could not be reliably inspected through the available web renderer. | The coding agent must inspect the running site in a real browser at the agreed viewport widths and record screenshots before implementation. |

Useful repository paths to inspect locally first:

- `src/components/Header.tsx`
- `src/App.tsx`
- `src/index.css`
- `src/components/QuoteModal.tsx`
- `src/components/facility/` (catalogue, cart, checkout, tracking and admin components)
- `src/pages/`
- `src/data/`
- `server.js`
- `database/deploy_schema.ts` and its JavaScript twin
- `index.html`, `vercel.json`, `package.json`, `.gitignore`, `.github/workflows/`

## 4. Design references: translate the principles, do not clone

### SpaceX — cinematic hierarchy and pacing

Use the public SpaceX site as inspiration for full-bleed imagery, confident display typography, compact navigation, generous negative space and a sequence of sections where each screen communicates one main idea with a clear action. Do not make every Brentra content block full-screen: pricing, inclusions, FAQs, forms and booking steps must remain readable and efficient.

**Brentra translation:** a cinematic Home hero; large, simple headlines; restrained header chrome; one vertical/business story at a time; image-led sections; a single dominant CTA per section; calm transitions between scenes.

### CyArt — technical storytelling and interactive data surfaces

The current public CyArt page presents a technical cybersecurity product through network/topology visualisation, telemetry-style labels, status indicators and interactive calculators/reports. The useful design lesson for Brentra is the **technical visual language**, not the cybersecurity subject matter.

**Brentra translation:** use an architectural grid, route maps, connected-node visuals, operational labels and interactive estimators only where they describe real Brentra services. For example, a verified Patna-to-district supply route, a construction package estimator, or a facility service process timeline. Do not import CyArt threat labels, cybersecurity claims, metrics or visual assets.

### Unified art direction

- Brand palette from the supplied UI/UX document: deep navy `#07111F` / `#0A192F`, warm gold `#C5A880` / `#D4AF37`, cyan `#0284C7`, white and light mist surfaces.
- Gold is a signal/accent, not a wallpaper colour. Use it sparingly for emphasis, progress and primary actions on dark backgrounds.
- Keep Outfit for display/headings and Plus Jakarta Sans for body text, self-hosted as specified.
- Use real project/facility/fleet/team photos where approved. When such media is unavailable, use custom lightweight SVG scenes rather than fabricated photographs or generic decorative particles.
- Keep a consistent visual language across all pages; individual verticals can have unique scene art, not unrelated colour systems.

## 5. Navigation and information architecture

### Required desktop header

The logo is the Home link. The primary navigation contains exactly:

1. **Services** — opens the grouped mega menu.
2. **About** — `/corporate-overview`.
3. **Careers & Partners** — `/careers` (Careers and Partners are two tabs within this page).
4. **Contact** — `/patna-hub`.
5. **Book a Service** — primary CTA, styled distinctly.

Place compact Call and WhatsApp icons beside the CTA where space permits. Keep the utility strip to one short row containing only owner-confirmed operating hours and one approved contact route; collapse or hide it on scroll as described in the PRD. Do not place a long office address or unconfirmed marketing claim in the header.

### Services mega-menu clusters

| Cluster | Entries |
|---|---|
| Home & Facility | Brentra Facility (featured card), RO Purifier & AMC, Water Tank Cleaning, Pest Control, Manpower & Housekeeping |
| Build & Realty | Turnkey Construction, Building Materials |
| Technology & Marketing | IT Solutions, Digital Marketing |
| Trade & Hospitality | Fresh FMCG, Events & Hospitality, Healthcare & Special Ventures |

The menu should show a useful one-line explanation and a starting price only when that price is confirmed. Give Brentra Facility one featured card and do not repeat it as a separate top-level item. Do not silently invent the Building Materials route: confirm the slug and page scope before exposing it as a live link.

### Desktop behaviour

- Full-width panel aligned to the header/container, not a hard-coded 760 px panel.
- Four clear cluster columns plus a Brentra Facility featured card on wide screens; graceful two-column or stacked presentation at intermediate widths.
- Opens on deliberate hover intent and on click/Enter; remains open while pointer moves into the panel.
- Closes on Escape, outside click, route navigation and focus leaving the menu where appropriate.
- Supports Tab/Shift+Tab and arrow navigation; returns focus to trigger when closed by Escape.
- Accurate `aria-expanded`, `aria-controls`, menu labels and visible focus state.
- Active route and active cluster are obvious without relying on colour alone.

### Mobile behaviour

- Compact header with logo, one Book/Quote CTA and menu button.
- Full-screen navigation overlay with the same four cluster names and exact same page labels as desktop.
- Services clusters are accordions; no dense two-level inline link wall.
- Fixed bottom action bar after the hero: Call, WhatsApp, Book. Hide the bar when an input is focused and respect mobile safe-area insets.
- Trap focus while the menu is open; Escape closes; focus returns to the menu button. Prevent body scrolling behind the overlay.

### Route and alias policy

Use one route registry as the source for page path, canonical path, alias paths, label, cluster, page title, description, navigation visibility, lazy component and quote vertical ID. Generate or validate navigation, canonical tags, sitemap and redirect configuration from that registry.

Canonical route list from the supplied PRD:

- `/facility-services`
- `/realty-infrastructure`
- `/it-solutions`
- `/manpower-housekeeping`
- `/ro-water-purifier`
- `/water-tank-cleaning`
- `/pest-control`
- `/digital-marketing`
- `/fresh-fmcg`
- `/events-hospitality`
- `/ventures`
- `/corporate-overview`
- `/patna-hub`
- `/careers`

Known aliases to redirect permanently as listed in the PRD: `/construction-services`, `/it-services`, `/manpower-services`, `/ro-services`, `/tank-cleaning`, `/pest-control-services`, `/marketing-services`, `/brentra-facility`, `/home-services`, `/urban-services`. Verify every current inbound route in the repo before enforcing redirects. Add a real 404 page for unknown paths. Confirm any additional Building Materials route before adding it.

## 6. Home page and vertical page experience

### Home page section order

1. **Cinematic hero:** one clear company promise, one supporting sentence, primary Book a Service CTA, secondary Explore Services CTA, subtle scroll cue. Use a blueprint grid and layered Patna/building skyline line art or an approved hero video.
2. **Proof strip:** up to four counters. Every number must be real, dated where relevant and owner-approved. If reliable figures do not exist, omit counters rather than invent them.
3. **Business verticals showcase:** one vertical per panel/screen, with concise outcome-led copy, one proof point (only if verified), starting price (only if confirmed), matching animated scene and the relevant CTA. On desktop use the progress rail and scroll-linked transitions; on mobile stack scene and text without scroll pinning.
4. **Brentra Facility booking strip:** prominent service entry cards with verified starting prices. Link directly to the existing catalogue/booking experience.
5. **Why Brentra:** four trust pillars, only with evidence for each warranty, certification, fulfilment or technician claim.
6. **How it works:** three-step process timeline.
7. **Social proof:** approved client logos/testimonials only. Hide this section when genuine material is not available.
8. **Leadership:** restyle the existing leadership block, retaining only approved names, titles and portraits.
9. **FAQ:** accessible accordion; concise real answers.
10. **Final CTA band:** Call, WhatsApp, Book a Service and/or Request a Quote.

### Vertical page template

Each business vertical should share a template:

- Hero with title, user outcome, matching scene/photo and one CTA.
- Price/rate strip where the owner has confirmed the value and unit.
- Service or solution breakdown with clear inclusions/exclusions.
- Process steps and delivery/engagement expectations.
- Proof/case study only when real and authorised.
- Three to five relevant FAQs.
- Two related vertical links.
- Sticky or floating CTA that opens the existing quote modal with the correct vertical pre-selected.

Do not make every page a duplicate long landing page. Vary the content modules according to the vertical while reusing typography, spacing, CTA, price and motion components.

### Content and conversion rules

- Use plain, confident, warm business language. Avoid inflated terms and vague corporate jargon.
- Keep phone, WhatsApp, address, business name, price and opening hours consistent across header, footer, structured data and forms.
- Use one main CTA per screen. Prefer “Book a Service”, “Get a Free Estimate”, “Request Wholesale Rates”, “Call Now” and “WhatsApp Us”.
- No fake success states, fake reviews, fake customer names, placeholder logos, invented counters or unverified service promises.
- Keep contact and careers/partner forms accessible and connected to the real leads API.

## 7. Motion and dynamic scene implementation

### Scene map

| Page/vertical | Scene concept | Interaction / movement | Guardrail |
|---|---|---|---|
| Home | Blueprint grid, layered skyline and route lines | Slow parallax drift; word reveal; subtle marquee of business vertical names | No particle wallpaper; static frame for low-tier and reduced-motion users |
| Construction & Building Materials | Isometric house/building and material layers | Foundation, structure, roof and finishes draw in as the user scrolls; material layers reveal in sequence | Do not make a cost estimator promise a final quote; label as indicative only if the owner approves it |
| IT Solutions | Connected nodes, network paths and restrained code fragments | Nodes connect on reveal and react subtly to fine-pointer movement | Decorative nodes are `aria-hidden`; no cursor effect on touch devices |
| Fresh FMCG | Stylised Bihar map, Patna hub and refrigerated truck | Truck moves along a verified route line; district markers appear | Use only verified service routes; no live GPS claim unless integrated |
| Facility / RO / Tank / Pest | AC fan, water ripple/tank fill, shield and service iconography | Fan rotates slowly; water fills/ripples; shield pulses once; status chip appears | “60-minute technician” or countdown only after dispatch SLA is confirmed and can be honoured |
| Manpower & Housekeeping | Individual figures assembling into a team | Figure silhouettes align into team formation on scroll | Do not imply headcount or deployment capacity without approval |
| Events & Hospitality | Stage silhouette and lighting beams | Soft beam sweeps; small, one-time confetti burst on intentional CTA interaction | Max 30 particles; respect reduced motion; no continuous celebration loop |
| Healthcare & Ventures | ECG line and temperature range motif | SVG trace draws/loops; temperature gauge animates on entry | Display 2–8°C only if the actual service/process and compliance basis are verified |

### Shared motion primitives

Build reusable `Reveal`, `Counter`, `Marquee`, `ScrollScene`, `MagneticButton` and `PageTransition` components/hooks. Each vertical scene should accept a normalised progress value and a reduced-motion/static flag. Prefer inline SVG and CSS; keep each scene component small and route-lazy-loaded.

### Engineering rules

- Use transform, opacity and SVG `stroke-dashoffset` for animation. Avoid layout-triggering animation of width, height, top or left.
- Use `IntersectionObserver` to pause scenes outside the viewport and pause all animation when the tab is hidden.
- Respect `prefers-reduced-motion`: scenes show their meaningful final/static state; disable parallax, magnetic cursor response, autoplay video and continuous loops.
- Detect low/mid/high device capability using the TRD signals; treat unsupported browser capability checks as unknown rather than assuming a low-end device.
- Low tier: static scenes only. Mid tier: lightweight SVG reveals without video/parallax. High tier: full approved scenes.
- If used, the hero video is muted, looped, inline, has a poster, is under 1.5 MB and does not autoplay under reduced motion or Save-Data.
- Skip WebGL/Three.js for launch unless a supplied, approved 3D asset clearly justifies it. Native scroll should remain functional; Lenis is optional and must not break hash links, focus, touch scrolling or reduced-motion behaviour.
- Motion is progressive enhancement. Content, CTAs and first interaction must work before any scene loads.

## 8. Front-end architecture and implementation map

Keep the existing stack. Do not introduce an app-wide rewrite. Suggested additions/refactors:

```text
src/
  config/
    site.ts                 # approved global brand/contact/domain/pricing facts
  routes.ts                 # canonical route registry, aliases, nav metadata, SEO
  components/
    nav/                    # Header, MegaMenu, MobileMenu, UtilityBar
    motion/                 # Reveal, Counter, Marquee, ScrollScene, MagneticButton
    layout/                 # PageShell, Section, StickyMobileActions
    shared/                 # CTA, PriceStrip, FAQ, TrustItem, ContactLinks
    facility/               # preserve and restyle current facility features
  scenes/
    HomeHeroScene.tsx
    ConstructionScene.tsx
    ITNetworkScene.tsx
    FMCGRouteScene.tsx
    FacilityScene.tsx
    ManpowerScene.tsx
    EventsScene.tsx
    VenturesScene.tsx
  data/
    verticals.ts            # approved page content and cluster configuration
    facilityData.ts         # catalogue data source as decided in TRD
  hooks/
    useReducedMotion.ts
    useDeviceTier.ts
    useScrollProgress.ts
  lib/
    analytics.ts
    validation.ts
    api.ts
```

Implementation notes:

- Create a single `site.ts` configuration for legal/display name, one selected logo, official domain, address, office hours, phone numbers, WhatsApp number, social links and approved headline prices.
- Keep detailed facility catalogue and per-service pricing in one declared catalogue source. Follow the TRD decision that the catalogue data file generates database seed content; do not independently hard-code a second set of prices in page components.
- Create a `QuoteProvider` / `useQuote()` context to replace passing `onOpenQuoteModal` through every page. Preserve query-param support for shared quote links (`?quote=vertical-id`).
- Build a route registry and derive the header/footer links, page metadata, aliases, canonical URLs and sitemap from it. Validate duplicate paths and alias collisions in unit tests.
- Use `React.lazy` and `Suspense` for vertical routes and scene chunks.
- Use React 19 page metadata support or the approved build-time prerender method from TRD. Prefer prerendering the 14 public canonical pages if it works with the deployment setup and is covered by CI.
- Self-host Outfit and Plus Jakarta Sans. Remove Google Fonts runtime dependency.
- Add a tested image pipeline for AVIF/WebP/fallback variants; use width/height/aspect-ratio to prevent layout shift.
- Add new packages only after checking peer-dependency compatibility with the exact installed React, Vite, TypeScript and Tailwind versions.

## 9. Backend, booking and database work

Visual work cannot go live while known critical data-security and booking-integrity problems remain.

### Immediate security actions (before redesign deployment)

1. **Rotate the Supabase database credential that is present in the public repository.** Assume the old credential is compromised. Removing a value from the current file is not enough because Git history can retain it.
2. Remove all credential defaults from `server.js`, `database/deploy_schema.ts` and the JavaScript twin. Read secrets from environment variables only; fail startup if required variables are missing.
3. Check the repository history, Vercel/Render environment variables and Supabase connection settings. Replace the credential everywhere it is legitimately used. Enable GitHub secret scanning and push protection.
4. Add `.env` and environment-specific files to `.gitignore`; commit `.env.example` with key names only and safe placeholder values.
5. Protect `GET /api/leads` and `GET /api/bookings` with admin authentication before connecting them to the Admin UI. Never include OTP values in list endpoints.
6. Remove public RLS policies that expose leads/bookings or permit public booking updates. First confirm a backup and test that the Express service's direct database connection still works after policy changes.
7. Do not expose database project identifiers or raw SQL/database errors from `/api/health` or other public responses.

### API hardening

- Express security headers (`helmet`), small JSON body limit, one consistent JSON error format, request IDs and graceful shutdown.
- CORS allow-list from `ALLOWED_ORIGINS`, not `*`.
- Zod validation on server-side request boundaries; client validation is for user experience only.
- Rate limits, honeypot and Cloudflare Turnstile verification for quote and booking forms.
- No in-memory fallback for persistent leads/bookings. A database write failure returns a truthful `503` and keeps the form/cart state for retry. A notification failure must not undo an already saved lead or booking.
- Use cryptographic IDs/OTP generation; add idempotency keys to prevent duplicate submissions.
- Recompute booking amounts on the server from catalogue service IDs, quantity and allowed add-ons. Never trust `totalAmount` from the browser.
- Validate future date, slot capacity and served pincode on the server. Return a clear conflict when a slot is no longer available.
- Admin endpoints require Supabase Auth session, allow-listed admin profiles and MFA. Use least-privilege roles and audit all admin status, assignment and price changes.
- Public catalogue endpoints return only active and public fields with a short cache. Technician personal data is returned only for the customer's own assigned booking where permitted.

### Booking behaviour to preserve and correct

Preserve the user journey: service category → service detail → cart → three-step checkout → server confirmation → tracking → completion/review. Correct the misleading behaviours documented in the App Flow and TRD:

- Booking confirmation must come from the API's successful durable database response, not a browser-side timer or optimistic fake confirmation.
- Keep a cart after validation/network/server failure; empty it only after a successful confirmed booking.
- Use one server-generated 4-digit door OTP, return it once to the customer, store only its keyed hash, limit failed attempts and never expose it in admin booking lists or normal tracking responses.
- Remove the client-generated/random technician assignment. Admin assigns a real technician.
- Remove the simulated phone OTP step unless a real SMS/WhatsApp provider is integrated.
- Until a payment gateway is selected and implemented, offer **cash after service only**. Do not label UPI/card orders as paid without a real payment transaction.
- Remove the public demo status dropdown and gate the Admin dashboard behind authentication.
- Tracking lookup uses booking ID plus phone, rate-limited, and must not reveal whether a wrong ID or wrong phone exists (same not-found response).
- Follow the single forward status lifecycle and persist every change in `booking_status_history`.

### Lead and contact flow

- Quote, Contact, Careers and Partners forms submit to the appropriate lead type and preserve source path, UTM values and consent timestamp.
- Display a reference ID only when the API returns a genuine `201` with the persisted lead ID.
- On failure, preserve all entered values and show retry, phone and WhatsApp options.
- Ensure consent is required, validated server-side and explained through the privacy notice.

### Database migration strategy

Use the 14-table target model described in the supplied Backend Schema Document while retaining the seven existing table names. Add the new catalogue, request, operations and reference tables as versioned SQL migrations (not an unversioned schema script run in production).

Target groups:

- **Catalogue:** `facility_categories`, `facility_services`, `promo_codes`, `service_areas`
- **Requests:** `verticals`, `leads`, `facility_bookings`, `booking_items`, `booking_status_history`, `customer_reviews`
- **Operations:** `technicians`, `admin_profiles`, `audit_log`
- **Reference:** `mandi_rates`

Migration sequence:

1. Back up and confirm restore access.
2. Rotate secrets and harden access policies.
3. Create new tables/columns and indexes additively.
4. Backfill legacy dates and booking fields safely; keep historical item snapshots read-only where reconstruction is impossible.
5. Run old and new reads only as needed during transition; switch API writes to the new schema.
6. Add/validate constraints after data verification.
7. Remove obsolete columns and demo rows only after confirming they are not real business records and after a release has no reads from them.
8. Keep the migration runner separate from the runtime database user; runtime role must not change schema.

Use database transactions for booking + item rows + initial status-history row. Preserve price snapshots at time of sale. Use actual date/time columns for appointment slots. Hash OTPs; enforce status checks and foreign keys; index tracking/admin query fields.

## 10. Delivery phases and gates

The phases below are sequential delivery gates. The day ranges in the PRD are indicative estimates, not commitments; security fixes, data cleanup, owner responses and testing can change actual duration.

### Phase 0 — Baseline, credential response and data decisions

**Tasks**

- Create a feature branch and record commit hash/current deployed version.
- Install using the lockfile and run existing type-check/build without changing files; record failures.
- Run current app locally and capture Desktop 1440/1280/1024 and Mobile 768/480/360 screenshots. Inspect header, mega menu, mobile menu, Home, representative vertical page, quote modal, Facility catalogue/cart/checkout/tracking.
- Record console/network/API errors and check responsive overflow.
- Rotate exposed Supabase credential; replace env configuration and add `.env.example`.
- Restrict leads/bookings list access, review RLS policies, remove unsafe production exposure and verify database backup/restore process.
- Ask owner to confirm brand spelling/logo, price, official contact set, domain and unverified proof claims.
- Freeze the accepted routes, aliases, booking behaviours and target cluster navigation in a route matrix.

**Exit gate**

- No exposed credential remains valid.
- Lead/booking read endpoints are no longer public.
- Database backup exists and migration/rollback approach is agreed.
- Baseline screenshots and route inventory exist.
- Blocking brand/contact/price values are either confirmed or safely omitted from public surfaces until confirmation.

### Phase 1 — Navigation, routing and content foundations

**Tasks**

- Create `site.ts`, `routes.ts` and shared vertical/cluster configuration.
- Rebuild `Header`, `UtilityBar`, `MegaMenu`, `MobileMenu` and `StickyMobileActions` using one source of nav data.
- Remove separate Brentra Facility top-level tab; add all approved clusters and the Facility featured card.
- Implement keyboard/touch/outside/Escape/focus behaviour and active page/cluster indication.
- Replace mobile labels with the desktop canonical labels and cluster hierarchy.
- Add real 404, permanent alias redirects and canonical metadata.
- Replace hard-coded contact details and duplicate top-line data with config references.
- Replace quote-modal prop drilling with `QuoteProvider`; add `?quote=` deep-link behaviour.
- Update header/footer and unit tests for route uniqueness and alias integrity.

**Exit gate**

- All approved verticals reachable in three clicks or fewer on mobile and desktop.
- No duplicated Brentra Facility nav entry.
- No clipped/wrapped/overflowing header at agreed test widths.
- Keyboard-only navigation and focus management pass.
- Every old alias redirects to the intended canonical URL; unknown URL shows 404.

### Phase 2 — Design system and global shell

**Tasks**

- Implement colour, typography, spacing, grid, radius, border, elevation and motion tokens.
- Self-host Outfit and Plus Jakarta Sans.
- Build reusable buttons, cards, price strips, trust pillars, FAQ, CTA bands, breadcrumbs, toast, skeleton and offline components.
- Rework Footer into Services / Company / Contact / Legal columns.
- Add skip link, visible focus styles, reduced-motion hook and touch-target sizing.
- Add `Reveal`, `Counter`, `Marquee`, `ScrollScene`, `MagneticButton` and `PageTransition` with static fallbacks.
- Add analytics wrapper with privacy-safe events; never send names, phone numbers or addresses.

**Exit gate**

- Shared components are in use on the header, footer and at least one page.
- Colours and typography match the approved tokens and contrast rules.
- No motion is required for content comprehension or CTA access.
- Reduced-motion users receive static but complete content.

### Phase 3 — Home page and scene system

**Tasks**

- Replace static seven-slide poster carousel with a single purposeful cinematic hero or approved lightweight media sequence.
- Implement Home sections in the approved order: hero, proof strip, vertical showcase, Facility strip, why Brentra, process, genuine social proof, leadership, FAQ, final CTA.
- Implement the scroll progress rail and desktop scroll scenes; stack scenes on mobile.
- Build reusable SVG scene contract and first scene families.
- Use verified route and company data; omit any section whose proof data is not available.

**Exit gate**

- The Home page has a consistent premium visual hierarchy and all sections use real copy/data.
- Hero and scenes load progressively and do not delay first interaction.
- Every scene pauses off-screen and has a reduced-motion/static state.
- No unsupported claim or fake number is present.

### Phase 4 — Vertical page rollout

**Tasks**

- Implement shared vertical page template.
- Convert each existing vertical page to template modules without losing its unique content, pricing/inclusions, route or quote context.
- Create scenes for Construction/Materials, IT, Fresh FMCG, Facility/RO/Tank/Pest, Manpower, Events and Ventures.
- Add related vertical links, FAQs, page metadata and CTA prefill.
- Add approved media and image optimisation pipeline.

**Exit gate**

- All canonical routes render their correct page and unique content.
- Every page has one main CTA and valid metadata/canonical URL.
- Starting prices and operational claims are confirmed or omitted.
- Page/scene chunks load only when required.

### Phase 5 — API, booking, Admin and database reliability

**Tasks**

- Implement validation, CORS allow-list, security middleware, rate limits, Turnstile and honeypot checks.
- Remove fake in-memory success fallback and client-trusted totals.
- Add idempotency for lead and booking creation.
- Apply versioned database migrations and new schema constraints/indexes.
- Implement safe tracking, booking cancellation, status-history and customer review flows.
- Implement Supabase Auth allow-listed Admin access, MFA, roles and audit log.
- Add Leads view, booking search/filter/pagination, technician assignment and validated status updates.
- Disable online payment choices until a real gateway is integrated.

**Exit gate**

- A failed DB write cannot show success.
- Double submit cannot create duplicates.
- Client-supplied booking totals cannot change the server-computed total.
- Public clients cannot list or update leads/bookings.
- OTP is not stored or listed in plaintext.
- Admin can manage the intended lifecycle and actions are audited.

### Phase 6 — QA, performance, release and handover

**Tasks**

- Add/complete Vitest, Testing Library, axe, Playwright and API tests.
- Test all flows: navigation, quotes, contact/careers/partner forms, booking, tracking, cancellation, review, admin and failure recovery.
- Test Chrome, Safari/WebKit, Edge and Firefox where available; mobile emulation and real Android/iPhone review.
- Optimize fonts, images, scene chunking and route-level code splitting.
- Run Lighthouse CI and web-vitals measurement; fix budget regressions.
- Verify Vercel redirects/headers/SEO, Render environment variables, Supabase migrations and production API origin.
- Deploy preview, owner review, production release, smoke test, rollback readiness and update README/runbook/CHANGELOG.

**Exit gate**

- All critical tests pass; axe has zero critical/serious issues on core routes.
- No console errors, fake content or known security blocker remains.
- Performance targets are met or any exception is documented and approved.
- Booking/quote production smoke tests succeed end-to-end.
- Owner signs off the final header, Home page, contact details and pricing.

## 11. Testing and acceptance criteria

### Navigation and responsive layout

- Test widths: 360, 480, 768, 1024, 1280, 1440 and 1536 px.
- No horizontal page overflow, clipping, overlap or unexpected line wrapping.
- All Services clusters are visible and all canonical pages are reachable in three clicks or fewer.
- Desktop and mobile labels are identical; active state is correct.
- Mouse, touch and keyboard flows work; Escape/outside click/route change close open menus.
- 320 px reflow and 200% zoom do not introduce horizontal scrolling.

### Customer flows

- Quote success: only a real `201` response displays the persisted lead reference.
- Quote failure: typed data remains; user gets retry/call options.
- Booking success: server response contains booking ID, one-time OTP, slot and server total; only then does the cart clear.
- Booking failure, duplicate tap, changed price, full slot, out-of-area pincode and offline cases preserve user input and show a clear recovery path.
- Tracking requires ID + phone, is rate limited and does not reveal secrets.
- Admin status changes move only through allowed transitions and create history/audit entries.

### Security and data

- No secret in source, Git history remains treated as compromised until credentials are rotated.
- No public RLS policies expose leads, bookings, OTPs, technicians or audit records.
- Admin APIs reject missing/expired/non-admin sessions.
- Public response bodies omit internal errors and unnecessary personal data.
- API validates every input and recomputes totals/slot availability server-side.
- Backups and at least one restore drill are confirmed.

### Performance targets from PRD/TRD

| Metric | Target |
|---|---:|
| Lighthouse mobile performance | 90 or higher |
| LCP | 2.5 s or less |
| CLS | under 0.1 |
| INP | under 200 ms |
| Initial JavaScript | 200 KB gzip or less |
| Per-route JavaScript chunk | 80 KB gzip or less |
| CSS | 40 KB gzip or less |
| Mobile LCP image | 120 KB or less |
| Home first-load weight (excluding lazy video) | 1.5 MB or less |
| Warm API p95 response | under 400 ms |

Use Lighthouse CI and real-user web-vitals measurements; do not treat local desktop Lighthouse as proof of mid-range Android 4G performance.

### Accessibility

- WCAG 2.2 AA goal across all public routes and booking/quote/admin flows.
- Contrast-safe colour pairs from the UI/UX specification.
- Visible keyboard focus; skip-to-content; semantic landmarks/headings; accessible accordions and dialogs.
- Form labels, autocomplete, `inputMode="tel"`, associated error text and announced status messages.
- 44 × 44 px minimum interactive targets.
- Any animation longer than five seconds has a pause mechanism or is replaced with a static state under reduced motion.

## 12. Release and deployment checklist

- [ ] Feature branch reviewed and merged through pull request.
- [ ] Production database backup is available and restore process verified.
- [ ] Supabase credentials rotated; runtime env variables updated; no secrets committed.
- [ ] Vercel production domain and approved canonical domain are confirmed.
- [ ] Render API environment variables set; production CORS allow-list is exact.
- [ ] Database migrations applied using deploy-only credential; runtime role cannot alter schema.
- [ ] Admin account allow-list and MFA verified.
- [ ] Turnstile keys and analytics ID configured per environment.
- [ ] Vercel aliases, headers, canonical URLs, sitemap and robots checked.
- [ ] Preview deployment tested on target viewports; owner has approved key screens.
- [ ] Quote and booking smoke tests completed against production with safe test data.
- [ ] Monitoring, uptime check and DB-write failure alerts enabled.
- [ ] README, environment setup, migration runbook and CHANGELOG updated.
- [ ] Rollback artifact and rollback owner identified.

## 13. Owner decisions required before final production content

The supplied documents intentionally leave these unresolved. The agent must not guess or silently reconcile them.

| Decision | Conflict / missing detail | Safe implementation until confirmed |
|---|---|---|
| Brand spelling and legal name | Repository/readme and logo naming varies among Bentra, Brentra and Ventra. | Use a config key and keep current display string provisional; do not rename assets or legal references globally until approval. |
| Final logo | Multiple logo variants exist. | Select one approved SVG/wordmark; keep existing logo until owner signs off. |
| Construction price | Current code and PRD mention ₹1,900/sq.ft; README/index metadata mention ₹1,999/sq.ft. | Do not publish a new authoritative price until confirmed; source all prices centrally. |
| Official address | Header and structured data/README describe different Patna addresses. | Use only an owner-confirmed address; remove conflicting variants from the public UI and JSON-LD. |
| Official phone/WhatsApp | Header, README and structured data contain different phone sets. | Use one owner-confirmed phone/WhatsApp set from `site.ts`. |
| Canonical domain | Vercel host and a branded domain are both referenced. | Confirm production domain before final canonical, sitemap and JSON-LD values. |
| CyArt design specifics | The reference has a technical product aesthetic; owner has not specified which exact element to emulate. | Use abstract technical storytelling and interactive data visualisation; do not copy content or cyber-security-specific design elements. |
| Building Materials | Entry appears in target clusters but its route and exact page content are not final. | Keep out of production navigation until slug/content is approved. |
| Proof metrics | Counts, clients, reviews, warranties and certifications need evidence. | Hide unsupported proof sections/claims. |
| Service ETA | A 60-minute technician phrase appears in proposed navigation/content. | Do not promise or count down to 60 minutes until the service SLA is confirmed. |
| Healthcare cold chain | 2–8°C motif is proposed. | Use only where operating capability and compliance are confirmed. |
| Service area | Served pincodes are not supplied. | Do not accept a booking outside the validated configured list; publish coverage only after owner supplies it. |
| Cancellation/refunds | The proposed two-hour cancellation rule needs operational approval. | Do not publish policy language until confirmed. |
| Online payment | No real gateway is integrated. | Cash after service only. |
| OTP notifications | SMS/WhatsApp provider not selected. | Keep technician door OTP in server-confirmed booking flow; no fake pre-checkout phone OTP. |
| Admin access | Staff allow-list is not supplied. | Require named admin accounts and MFA before production Admin access. |
| Retention | Lead/booking retention period is undecided. | Obtain owner/legal guidance and document retention before launch. |
| Analytics | GA4, Plausible or PostHog not selected. | Implement provider-neutral wrapper; activate only after approval. |
| Real media | Approved project/fleet/team photography not supplied. | Use custom SVG and licensed/approved media; never invent customer/project photographs. |

## 14. Copy-paste master prompt for the coding agent

Use the following as the implementation prompt after attaching the five companion specifications and granting the coding agent access to the existing repository.

> **ROLE**  
> Act as a senior product designer, React/TypeScript architect, motion designer, accessibility engineer and application security engineer. You are modifying an existing production-oriented website. Work carefully, inspect before changing, and prove each stage with tests and screenshots.
>
> **PROJECT**  
> Existing repository: https://github.com/rameez-1807/BENTRA-VENTURES  
> Existing deployed site listed by the repo: https://bentra-ventures.vercel.app  
> Design references: https://www.spacex.com/ and https://www.cyart.io/  
> Source specifications attached: PRD, TRD, App Flow Document, Backend Schema Document and UI/UX Design Document. These documents define the intended product and are the primary requirements. This task is to implement them in the current repository, not to generate replacement documents or start a new project.
>
> **PRIMARY OBJECTIVE**  
> Fix the current navigation/header because the tabs are poorly arranged, inconsistent between desktop and mobile, duplicated and incomplete. Then redesign the entire site so it feels premium, cinematic, responsive and dynamic, with animated objects that are directly relevant to each Brentra business vertical. Aim for an agency-grade “$100 website” finish while maintaining clarity, trust, conversion and excellent performance.
>
> **FIRST: AUDIT THE EXISTING REPOSITORY**  
> 1. Inspect the full repository, current branch, package scripts, installed dependencies, routes, assets, shared components, all page components, API calls, server handlers, schema scripts, environment handling and deployment configuration.  
> 2. Run the project locally before editing. Capture screenshots at 360, 480, 768, 1024, 1280, 1440 and 1536 px for the header, Services menu, Home page, representative vertical page and key quote/booking screens. Record console errors, failed network requests, overflow and broken interactions.  
> 3. Compare the actual rendered pages with the attached PRD and UI/UX document. Record differences before implementation. Do not claim visual testing unless the browser was actually run.  
> 4. Do not delete or replace existing business logic, page content, pricing, route aliases or booking components until you understand their dependencies and have a regression test plan.
>
> **REFERENCE INSPIRATION — NO COPYING**  
> - From SpaceX: take cinematic full-bleed storytelling, strong typography, restrained navigation, large negative space, clear section hierarchy and one strong message/action per scene.  
> - From CyArt: take a technical visual language such as grids, connected nodes, route/topology diagrams, system-status labels and interactive data surfaces. Translate these into real Brentra use cases; do not copy cyber-security messaging, layouts, code, images or brand assets.  
> - Preserve Brentra's approved navy/gold/cyan identity and the typography specified in the UI/UX document. Use real approved photography or custom SVG scenes. Avoid generic particles and meaningless animation.
>
> **NAVIGATION REQUIREMENTS**  
> - Logo is the Home link. Top-level desktop navigation is exactly Services, About, Careers & Partners, Contact, plus a distinct Book a Service CTA. Remove the separate top-level Brentra Facility tab because it belongs inside Services as a featured item.  
> - Services mega menu has four groups: Home & Facility; Build & Realty; Technology & Marketing; Trade & Hospitality. Include every approved vertical from the PRD. Feature Brentra Facility in a clear card.  
> - Generate desktop and mobile navigation from the same route/cluster data. Use identical labels. Mobile opens a full-screen overlay with accordions and a sticky Call / WhatsApp / Book bar.  
> - Menu must work with hover intent, click/touch, Enter/Space, Tab/Shift+Tab, arrow navigation where appropriate, Escape, outside click, route change and correct focus return. Use correct ARIA state and visible focus.  
> - Do not use a fixed-width menu that clips at common laptop widths. Test the six required widths.
>
> **MOTION REQUIREMENTS**  
> Build reusable Reveal, Counter, Marquee, ScrollScene, MagneticButton and PageTransition primitives. Use lightweight inline SVG/CSS scenes: blueprint skyline for Home; drawing house/material layers for Construction; connected nodes for IT; refrigerated truck on verified Bihar routes for Fresh FMCG; AC fan/water ripple/tank/shield for Facility/RO/Tank/Pest; assembling team for Manpower; sweeping stage lights for Events; ECG/temperature motif for Healthcare/Ventures. Keep each movement meaningful and tied to real service content.  
> Animate primarily transform, opacity and SVG stroke-dashoffset. Pause scenes off-screen and when the document is hidden. Respect prefers-reduced-motion, Save-Data and low-end devices. Mobile must use stacked scenes instead of scroll-pinned panels. No WebGL/Three.js at launch unless a real approved model justifies it. No motion may block content, keyboard access or first interaction.
>
> **FRONT-END ARCHITECTURE**  
> Keep React 19, Vite, TypeScript, Tailwind v4 and React Router. Build a central `site.ts` config, one route registry, shared vertical/cluster data, a QuoteProvider/useQuote hook, route-level React.lazy loading, metadata/canonical support and a real 404. Generate aliases/redirects and sitemap from the route registry where practical. Self-host Outfit and Plus Jakarta Sans. Move hard-coded content/prices into data/config and ensure there is one authoritative source for each value. Add dependencies only after checking compatibility with the current lockfile and runtime versions.
>
> **PRESERVE AND CORRECT BUSINESS FLOWS**  
> Preserve quote, contact, careers, partner and Brentra Facility category → detail → cart → three-step checkout → confirmation → tracking → review journeys. Do not change the user-facing business process without recording why. However, correct known defects: no fake quote/booking success, no in-memory storage fallback reported as success, no client-trusted booking totals, no client-generated technician, no demo status dropdown in production, no public Admin access, no simulated phone OTP without an SMS provider and no UPI/card payment marked paid without a real gateway. Until a gateway exists, use cash after service only. Keep cart and form data on failure; clear cart only after a durable successful server response.
>
> **SECURITY IS A BLOCKER, NOT OPTIONAL POLISH**  
> The inspected public server source contains a database credential fallback. Treat that credential as compromised: rotate it immediately, remove all defaults from tracked files and Git history as appropriate, use environment variables only, and configure GitHub secret scanning/push protection. Protect lead and booking list endpoints with Supabase Auth allow-listed Admin access and MFA. Remove unsafe public RLS policies after backup and verification. Use CORS allow-list, Helmet, Zod validation, rate limiting, Turnstile, honeypot, request IDs and safe error responses. Store only a keyed OTP hash, return the OTP once, never expose it in list/tracking endpoints, and audit admin actions.
>
> **API/DATABASE**  
> Use versioned additive SQL migrations based on the supplied Backend Schema Document. Back up before migration. Keep old table names, add target relations/indexes/checks/foreign keys, store slot dates/times as real date/time values, preserve sale-time price snapshots, and use transactions for booking + items + status history. Recompute totals server-side. Implement idempotency keys, service-area/pincode and slot checks. Remove demo rows only after confirming they are not real. Runtime DB credentials must not have schema-alter permissions. A database failure must return 503 and never fabricate success.
>
> **CONTENT INTEGRITY**  
> Do not guess brand spelling/legal name, logo, construction price, official address/phone set, production domain, service area, operating hours, guarantees, certifications, statistics, testimonials, client logos, dispatch ETA or cancellation/refund terms. The documents identify conflicts: Brentra/Bentra/Ventra; ₹1,900 vs ₹1,999 per sq.ft.; different Patna addresses and phone sets. Put these values in one config and leave uncertain claims out until the owner confirms them. Do not show a 60-minute service promise or 2–8°C capability unless the owner verifies it. Do not add a Building Materials route until its slug and page scope are approved.
>
> **QUALITY GATES**  
> Add lint, type-check, unit tests, Testing Library/axe, Playwright end-to-end tests, API tests and Lighthouse CI. Test navigation, route aliases, 404, quote success/failure, booking success/failure, duplicate submission, full slot, changed price, out-of-area pincode, tracking privacy and Admin authorization. Meet the supplied performance targets: mobile Lighthouse 90+, LCP ≤2.5 s, CLS <0.1, INP <200 ms, initial JS ≤200 KB gzip, per-route chunk ≤80 KB gzip, CSS ≤40 KB gzip and LCP image ≤120 KB where achievable. Meet WCAG 2.2 AA goals and test 320 px reflow/200% zoom.
>
> **WORKING METHOD**  
> Implement in small phases: (0) baseline/security, (1) route and navigation foundation, (2) design system/global shell, (3) Home and scene primitives, (4) vertical pages, (5) API/database/Admin hardening, (6) QA/deployment. After each phase, run relevant tests and capture screenshots at target widths. Keep a CHANGELOG and document any deviation from the specifications. Do not remove existing features merely to make the design easier. Do not deploy to production or run destructive production migrations without explicit approval and a verified backup.
>
> **FINAL DELIVERABLE**  
> A polished responsive Brentra Ventures site in the existing repository; consistent desktop/mobile navigation; purposeful vertical-specific motion; preserved and reliable quote/booking journeys; protected Admin and customer data; correct routing/SEO; automated test coverage; performance/accessibility evidence; and an updated README/runbook. At the end, report the files changed, tests run and results, pages/widths verified, known limitations and all owner decisions still outstanding. Never claim a test or visual inspection that was not performed.

## 15. Source documents and reference links

### Owner-provided project documents

- `Brentra Ventures Website Redesign — PRD.md` (v1.0, 6 November 2026)
- `Brentra Ventures Website Redesign — TRD.md` (v1.0, 6 November 2026)
- `Brentra Ventures Website Redesign — App Flow Document.md` (v1.0, 7 November 2026)
- `Brentra Ventures Website Redesign — Backend Schema Document.md` (v1.0, 7 November 2026)
- `Brentra Ventures Website Redesign — UI UX Design Document.md` (v1.0, 7 November 2026)

### Public repository / reference sites inspected

- Repository overview and README: https://github.com/rameez-1807/BENTRA-VENTURES
- Current header source: https://raw.githubusercontent.com/rameez-1807/BENTRA-VENTURES/main/src/components/Header.tsx
- Current application routes: https://raw.githubusercontent.com/rameez-1807/BENTRA-VENTURES/main/src/App.tsx
- Current API server source: https://raw.githubusercontent.com/rameez-1807/BENTRA-VENTURES/main/server.js
- Current package manifest: https://raw.githubusercontent.com/rameez-1807/BENTRA-VENTURES/main/package.json
- SpaceX: https://www.spacex.com/
- CyArt: https://www.cyart.io/
- Listed live deployment: https://bentra-ventures.vercel.app/

**Inspection limitation:** the public repository source was readable, but the live Vercel page did not expose extractable rendered content in the available browser inspection. The coding agent must perform the required browser-based baseline review before implementation.

---

**Implementation principle:** make Brentra feel like one confident, connected enterprise brand. The website should move with purpose, guide users clearly, tell the story of each business and remain trustworthy when the animation is turned off.
