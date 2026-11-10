# Brentra Ventures Website Redesign — PRD

Version 1.0 · 6 November 2026 · Status: Draft for review

Repo: github.com/rameez-1807/BENTRA-VENTURES · Stack: React 19, Vite, TypeScript, Tailwind v4, Express, Supabase

## 1. Summary

Brentra Ventures is a Patna-based multi-vertical company: construction and realty, IT, facility services, fresh FMCG, events, and healthcare/trade. The current site has strong content and a working quote/booking flow, but the navigation is disorganised, brand and contact data conflict across files, and the experience is static. This redesign delivers a cinematic, motion-rich site with a premium feel (the owner’s “$100 website” bar) while keeping existing routes, the booking engine and the pricing intact.

“$100 website” is treated here as: agency-grade look and feel. Section 10 turns it into measurable criteria.

## 2. Goals and non-goals

**Goals**

1. Rebuild the navigation so every vertical is reachable in three clicks or fewer, on desktop and mobile.
2. Make the whole site feel alive, with moving objects that are specific to each business (a truck on a Bihar route, a house drawing itself, an AC fan spinning), not generic particles.
3. Create one source of truth for brand name, prices, address and phone numbers.
4. Adopt a premium visual system, using the design principles of spacex.com and cyart.io as inspiration.
5. Stay fast on a mid-range Android phone over 4G.
6. Increase quote and booking submissions.

**Non-goals**

- Rewriting the backend or the booking engine.
- New business verticals or a CMS.
- Hindi translation (candidate for a later phase).
- Copying layouts, code or assets from any reference site.

## 3. Current-state audit

Based on reading the source code. A visual pass in the browser should confirm the layout items below.

**Navigation**

- Two bars stack at the top: a dark utility strip (hours, long address, guarantee line, two phones, WhatsApp) and the main header. The strip competes with the logo.
- Desktop order is Home, About Us, Brentra Facility, Services & Rates (mega menu), Contact Us, Our Partners.
- “Our Partners” links to /careers, which is a careers page. The mobile menu calls the same link “Partners & Careers”.
- The mega menu lists eight services but leaves out Fresh FMCG, Events & Hospitality, Healthcare & Ventures and Building Materials, which the homepage and hero present as core verticals.
- Brentra Facility appears twice: as a top-level link and inside the mega menu.
- The mega menu is a fixed 760px hover panel with no keyboard handling. Its entrance classes (animate-in, fade-in, slide-in-from-top-2) come from a plugin that is not in package.json, so the animation most likely does nothing.
- Labels differ between desktop and mobile (About Us vs Corporate Overview, Contact Us vs Patna Hub & Contact).
- About 24 routes serve 15 pages. Alias routes such as /construction-services and /realty-infrastructure render the same page with no canonical tag. The wildcard route shows the Home page instead of a 404.

**Brand and data consistency**

- The name appears as Bentra (repo, README), Brentra (site) and Ventra (logo files, README “Ventra Group”). The public folder holds at least six logo variants.
- Construction price is ₹1,900/sq.ft across the site, but the index.html meta description and the README diagram say ₹1,999.
- The JSON-LD in index.html gives “Brentra Corporate Towers, Bailey Road” and +91-94300-88000. The header shows “Preven Vila, Flat 34, New Khajoorbana, Patna – 800006” and 9065296294 / +91 91421 44940.
- Copy and prices are hard-coded inside page files of 500–900 lines each.

**Visual and motion**

- Light, white corporate theme built from card grids. The hero is a seven-slide poster carousel of static JPGs on a six-second timer.
- No animation library in the dependencies, no scroll-linked motion, and no visual identity per vertical beyond a colour dot.

## 4. Users and top tasks

- **Patna resident:** books AC, RO, tank cleaning or pest control. Wants visible prices, a fast slot and WhatsApp.
- **Home builder:** wants to understand the ₹/sq.ft package and request an estimate or site visit.
- **Business buyer** (hotels, cloud kitchens, institutions): wants wholesale FMCG, manpower, AMC, IT or events, plus proof of credibility and a quote.
- **Partner or job seeker:** wants to apply or propose a trade partnership.

Target: any user reaches the right service and starts a quote or booking in three clicks or fewer.

## 5. Information architecture and navigation

**Principle:** four top-level items plus one call-to-action. The logo is the Home link, so a separate Home item is dropped.

**Desktop header:** Services (mega menu) · About · Careers & Partners · Contact · \[Book a Service\]. A small phone/WhatsApp icon pair sits beside the button. The utility strip is reduced to one line (hours and phone) and hides on scroll.

**Mega menu, grouped in four clusters**

| Cluster | Items |
| --- | --- |
| Home & Facility | Brentra Facility (featured card: “Technician in 60 min”), RO Purifier & AMC, Water Tank Cleaning, Pest Control, Manpower & Housekeeping |
| Build & Realty | Turnkey Construction, Building Materials |
| Technology & Marketing | IT Solutions, Digital Marketing |
| Trade & Hospitality | Fresh FMCG, Events & Hospitality, Healthcare & Special Ventures |

**Mobile:** full-screen overlay with large type, clusters as accordions, and a sticky bottom bar with Call, WhatsApp and Book.

**Canonical routes:** /facility-services, /realty-infrastructure, /it-solutions, /manpower-housekeeping, /ro-water-purifier, /water-tank-cleaning, /pest-control, /digital-marketing, /fresh-fmcg, /events-hospitality, /ventures, /corporate-overview, /patna-hub, /careers.

**Redirected aliases (301 in vercel.json):** /construction-services, /it-services, /manpower-services, /ro-services, /tank-cleaning, /pest-control-services, /marketing-services, /brentra-facility, /home-services, /urban-services.

**Navigation acceptance criteria**

- Opens on hover with a 120 ms intent delay and on click or Enter. Closes on Esc, outside click and route change.
- Fully keyboard operable with visible focus and correct aria-expanded and aria-controls.
- No overflow or wrapping at 360, 768, 1024, 1280 and 1440 px widths.
- The active page is highlighted at both top level and cluster level.
- Labels are identical on desktop and mobile.

## 6. Visual direction

The two references are used for principles, not for copying.

- **Full-viewport sections, one message per screen** (the SpaceX approach), with large, tight headline type and generous negative space.
- **Restrained chrome:** a transparent header over the hero that becomes solid on scroll, and minimal text in the bar.
- **Cinematic imagery:** muted looping video or high-quality photography replaces the static poster carousel.
- **cyart.io:** the owner has named it as a reference. The specific patterns to adopt are an open question (Section 13).

**System:** keep the brand navy (#0A192F, #07111F), gold (#C5A880 / #D4AF37) and cyan (#0284C7). Hero and showcase sections go dark and immersive. Price tables, FAQs and forms stay on light surfaces for readability. Keep Outfit for headings and Plus Jakarta Sans for body, self-hosted rather than loaded from Google Fonts. Headlines are large (clamp 40–96 px) with tight tracking.

## 7. Motion and dynamic elements

**Per-vertical moving objects**

| Area | Moving object | Behaviour |
| --- | --- | --- |
| Home hero | Blueprint grid and skyline layers | Slow parallax drift, headline word-by-word reveal, vertical chips on a marquee |
| Construction & Realty | Isometric house wireframe | Draws itself as the user scrolls (SVG stroke), then fills in layers: frame, walls, interiors, matching the package inclusions |
| IT Solutions | Network nodes and code fragments | Nodes connect and react to the cursor |
| Fresh FMCG | Refrigerated truck | Travels a route line from the Patna hub to Bihar districts; egg and fish icons float |
| Facility, RO, Tank | Spinning AC fan, water ripple | Technician ETA pin counts down to “60 min” |
| Events & Hospitality | Light beams and confetti | Beams sweep across; confetti bursts on the CTA |
| Healthcare & Ventures | ECG pulse line and 2–8°C gauge | Continuous pulse; gauge animates on entry |

**Global behaviours:** animated stat counters, scroll progress bar, section reveals, magnetic CTA buttons, route page transitions, and a sticky vertical progress rail on the Home showcase.

**Rules**

- Animate transform and opacity only, targeting 60 fps on a mid-range phone.
- Honour prefers-reduced-motion with a static fallback for every scene.
- Pause anything off-screen (IntersectionObserver).
- Any WebGL/Three.js hero is optional, desktop-only and lazy-loaded.
- Motion never blocks content or delays the first interaction.

## 8. Page requirements

**Home sections, in order:** full-viewport hero → impact stats → scroll-driven verticals showcase (one vertical per screen with its animated scene, starting price, proof point and CTA) → Brentra Facility booking strip → why Brentra (10-year warranty, verified technicians, FSSAI-tested supply) → process → client logos and testimonials → leadership → FAQ → final CTA band.

**Vertical page template:** animated hero scene, price strip, inclusions, process steps, FAQ, sticky CTA that opens the existing quote modal pre-filled with the vertical.

**Contact (Patna Hub):** one official address and phone set, map, and a form that posts to the existing API.

**Careers & Partners:** split into two tabs on one page, matching the new nav label.

**Footer:** four columns (Services, Company, Contact, Legal), with the long address and promo lines removed.

## 9. Functional requirements

- **FR-1** New header, mega menu and mobile menu per Section 5.
- **FR-2** A single config file (src/config/site.ts) holds brand name, logo paths, phones, address, hours and headline prices. Every component reads from it. The index.html meta and JSON-LD are aligned to the same values.
- **FR-3** 301 redirects for alias routes, plus a canonical tag on each page.
- **FR-4** A real 404 page replaces the wildcard-to-Home behaviour.
- **FR-5** Route-level code splitting with React.lazy.
- **FR-6** Per-page title, description and Open Graph tags.
- **FR-7** The quote and booking modal, cart, tracking and admin dashboard keep their current behaviour and are restyled only.
- **FR-8** Analytics events: quote\_open, quote\_submit, call\_click, whatsapp\_click, vertical\_view.
- **FR-9** Motion primitives (Reveal, Counter, Marquee, ScrollScene) and one SVG scene per vertical.

## 10. Non-functional requirements and quality bar

- **Performance:** LCP ≤ 2.5 s on 4G mid-range Android, CLS < 0.1, INP < 200 ms, Lighthouse mobile performance ≥ 90. Initial JS ≤ 200 KB gzip. Images in AVIF/WebP with srcset. Hero video muted, under 1.5 MB, with a poster fallback.
- **Accessibility:** WCAG 2.2 AA, including contrast on dark sections and visible focus.
- **SEO:** Lighthouse SEO ≥ 95, valid JSON-LD, sitemap and robots.
- **Browsers:** last two versions of Chrome, Safari, Edge and Firefox, plus Android Chrome.
- **“$100 website” bar:** consistent spacing and type scale, no layout shift, no placeholder or lorem content, every interactive element has hover, focus and active states, and no console errors.

## 11. Technical approach

Keep Vite, React 19 and Tailwind v4. Add the motion package (Framer Motion) for UI and scroll animation, and optionally Lenis for smooth scrolling. Add three and @react-three/fiber only if a 3D hero is approved. Do not rely on tailwindcss-animate.

Suggested structure: src/config/site.ts, src/components/nav/*, src/components/motion/*, src/scenes/\* (one SVG scene per vertical). Move hard-coded page data into data files, delete unused logo variants, and lazy-load pages.

## 12. Phases (indicative, one developer using an AI coding agent)

- **Phase 0, fix and clean (1–2 days):** navigation restructure, single source of truth, redirects, 404, JSON-LD alignment.
- **Phase 1, design system and shell (3–4 days):** tokens, type, header, footer, mobile menu, motion primitives.
- **Phase 2, Home (4–5 days):** hero, verticals showcase, stats, trust, FAQ.
- **Phase 3, vertical pages (5–7 days):** page template and the seven scenes.
- **Phase 4, polish and QA (3–4 days):** performance, accessibility, cross-device testing.

## 13. Success metrics, risks and open questions

**Metrics**

- Five of five test users find any vertical in three clicks or fewer.
- Quote and booking submissions up 30% against a baseline captured before launch.
- The performance and accessibility targets in Section 10 are met.

**Risks**

- Heavy motion on low-end phones. Mitigation: reduced-motion fallback, lazy scenes, a performance budget.
- Dark hero versus readability of price tables. Mitigation: light content surfaces.
- No real photos or video of sites, fleet or team. Mitigation: use SVG scenes and licensed stock until real assets exist.

**Open questions for the owner**

1. Is the spelling Brentra or Bentra, and which logo is final?
2. Is the construction price ₹1,900 or ₹1,999 per sq.ft?
3. Which address and which phone numbers are official?
4. What exactly do you like on cyart.io (colour, layout, animation, 3D)?
5. Do you have real photos or video of projects, the fleet and the team?
6. Is a Hindi version needed soon?
7. Which domain is production: bentra-ventures.vercel.app or brentraventures.com?
