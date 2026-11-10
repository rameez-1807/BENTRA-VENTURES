# Brentra Ventures Website Redesign — UI/UX Design Document

Version 1.0 · 7 November 2026 · Status: Draft for review · Companion to the PRD (what) and the TRD (how)

Basis: the source code of github.com/rameez-1807/BENTRA-VENTURES (components, tokens, pages). The live site was not viewed in a browser. For spacex.com only page metadata could be retrieved, so the references below are general, widely known patterns, not a screen-by-screen study. For cyart.io, searches returned nothing that describes its design, so nothing from it is assumed here (see Section 12).

## 1. Design principles

1. **One message per screen.** Each full-screen section says one thing and offers one action.
2. **Motion explains.** Every moving object shows something true about that business (a refrigerated truck on a Bihar route means cold-chain delivery). No decorative particles.
3. **Price and next step are always in reach.** Starting prices are visible, each view has one primary action, and phone, WhatsApp and Book are one tap away on mobile.
4. **Dark for drama, light for decisions.** Hero, showcase and footer are dark and immersive. Anything a visitor must read carefully or fill in (prices, FAQs, forms) sits on a light surface.
5. **Light enough for 4G.** The look must degrade gracefully on a mid-range phone (TRD section 6 and 7).
6. **Local and credible.** Patna and Bihar specifics, real people and places, verified claims, plain language.

**Reference principles borrowed (not copied):** full-viewport sections, very large and tight headlines, restrained navigation, cinematic imagery, generous negative space, a header that stays out of the way. No layout, code or asset is taken from any reference site.

## 2. Users and key journeys

| Journey | Path | Target |
| --- | --- | --- |
| Book an AC or home service (Patna resident) | Landing or hero chip, then Services, then Brentra Facility, category, service, cart, checkout (address, slot, confirm), confirmation | Cart reached in 4 taps or fewer. Checkout in three short steps inside a bottom sheet on mobile. |
| Get a construction estimate (home builder) | Home showcase or Services, Build & Realty, Turnkey Construction, price strip, inclusions, Get a Free Estimate, quote sheet pre-filled with the vertical | Quote submitted in 3 clicks or fewer from the Home page |
| Wholesale or institutional buyer | Services, Trade & Hospitality, Fresh FMCG (or Manpower, Events), business section, Request Wholesale Rates | Same quote sheet with an optional company name field |
| Partner or job seeker | Careers & Partners, choose tab, form | Form reached in 2 clicks |

Success state for every journey: a confirmation that shows a reference ID, what happens next and how to reach a person.

## 3. Information architecture

**Sitemap**

- Home
- Services: Home & Facility (Brentra Facility, RO Purifier & AMC, Water Tank Cleaning, Pest Control, Manpower & Housekeeping); Build & Realty (Turnkey Construction, Building Materials); Technology & Marketing (IT Solutions, Digital Marketing); Trade & Hospitality (Fresh FMCG, Events & Hospitality, Healthcare & Special Ventures)
- About (Corporate Overview)
- Careers & Partners (two tabs)
- Contact (Patna Hub)
- Privacy Policy and Terms (new, linked from the footer)
- 404

**Desktop header:** logo (also the Home link), four items (Services, About, Careers & Partners, Contact), gold Book a Service button, phone and WhatsApp icons. A 36 px utility bar above it shows hours and phone only, and hides on scroll.

**Mega menu:** a full-width panel under the header, content width 1280 px, four columns (one per cluster) plus a featured card on the right for Brentra Facility (photo, Technician in about 60 minutes, Book now). Each item has a 24 px icon, a name, a one-line description and a From price where one exists.

**Mobile menu:** 56 px header with logo and menu button. The menu opens full-screen with 28 px links, Services as an accordion of the four clusters, and the Call, WhatsApp and Book bar pinned at the bottom.

## 4. Visual language

**4.1 Colour.** Contrast ratios were calculated against WCAG 2.2.

| Token | Hex | Use | Contrast |
| --- | --- | --- | --- |
| Ink 950 | #07111F | Page background on dark sections | White text on it: 18.9:1 |
| Navy 900 | #0A192F | Dark surfaces, and text on light | On white: 17.6:1 |
| Navy 700 | #1E3E62 | Secondary dark surface, borders | Decorative |
| Gold 400 | #C5A880 | Accent and button fill on dark | On Ink 950: 8.4:1. Navy text on it: 7.8:1. Never text on white (2.3:1). |
| Gold 500 | #D4AF37 | Highlights, price accents on dark | On Ink 950: 9.0:1 |
| Bronze 600 (new) | #8A6D3B | Gold-family text on light | On white: 4.9:1 |
| Cyan 600 | #0284C7 | Fills and icons | On Ink 950: 4.6:1. On white as text: 4.1:1, which fails. |
| Sky 400 (new) | #38BDF8 | Links and focus ring on dark | On Ink 950: 8.8:1 |
| Cyan 700 (new) | #0369A1 | Links and focus ring on light | On white: 5.9:1 |
| Mist 300 (new) | #9FB3C8 | Secondary text on dark | On Ink 950: 8.8:1 |
| Slate 500 (new) | #5B6B7F | Secondary text on light | On white: 5.5:1 |
| Paper and Mist 50 | #FFFFFF, #F4F6F9 | Light sections, alternating | Navy 900 text above 15:1 |

Rules: gold is a signal, not wallpaper, so it covers 10% of a screen or less. The primary button is gold with navy text on dark, and navy with white text on light. Success, warning and error colours must each meet 4.5:1 and always come with an icon and words, never colour alone.

**4.2 Typography.** Outfit for display and headings, Plus Jakarta Sans for body (both self-hosted, per the TRD).

| Role | Size, mobile to desktop | Weight | Line height | Tracking |
| --- | --- | --- | --- | --- |
| Display (hero) | 40 to 96 px | 700 | 1.0 | -0.03em |
| H1 | 36 to 64 px | 700 | 1.05 | -0.02em |
| H2 | 28 to 44 px | 600 | 1.15 | -0.015em |
| H3 | 20 to 28 px | 600 | 1.25 | -0.01em |
| Body large | 18 to 20 px | 400 | 1.6 | 0 |
| Body | 16 to 17 px | 400 | 1.6 | 0 |
| Eyebrow and labels | 12 to 13 px, uppercase | 600 | 1.4 | +0.12em |
| Price numerals | 28 to 48 px, tabular figures | 700 | 1.1 | 0 |

Maximum line length 68 characters. Display sizes use fluid clamp values. If Hindi is added, use Noto Sans Devanagari with a line height of 1.7.

**4.3 Space and grid.** 4 px base unit with steps 4, 8, 12, 16, 24, 32, 48, 64, 96, 128. Content width 1280 px, media may bleed to 1440 px. Grid: 4 columns on mobile, 8 on tablet, 12 on desktop. Gutters 20, 32 and 48 px. Section padding top and bottom: between 72 and 144 px, scaling with width.

**4.4 Shape and depth.** Radius 12 px for inputs and chips, 20 px for cards, 28 px for hero media, full pill for buttons. Hairline borders: white at 10% on dark, #E2E8F0 on light. No shadows on dark. On light, a soft two-layer shadow in navy at 12%. The scrolled header uses a blurred ink background at 72% with a solid fallback.

**4.5 Imagery and icons.** Real photography of Patna sites, uniformed technicians, trucks and facilities, graded to one navy-leaning look. A navy gradient scrim sits behind text, strong enough that text stays at 4.5:1 against the worst frame. Avoid stock handshakes and generic skylines. Icons come from one set (lucide), 24 px, 1.5 px stroke. No text baked into images.

## 5. Global components

| Component | Specification |
| --- | --- |
| Header | 72 px, transparent over the hero, solid after 24 px of scroll, hides on scroll down and returns on scroll up (desktop). Link hover: gold underline slides in over 200 ms. Active: gold with a 2 px underline. Focus: 2 px ring, 3 px offset. |
| Buttons | Primary, secondary (1.5 px outline) and text button with arrow. Height 48 px, 56 px in the hero, pill shape. Hover lifts 2 px, press scales to 0.98, loading shows a spinner at the same width, disabled sets aria-disabled and 50% opacity. |
| Mobile action bar | 64 px plus safe area, three equal buttons (Call, WhatsApp, Book). Appears after the hero, hides while a form field is focused. |
| Vertical card | 16:10 image, name, one line of value, From price, arrow. The whole card is the link. Hover: image scales 1.04 and the arrow moves 4 px. |
| Price strip | Large numeral, unit, three inclusion bullets, one button. Light surface. |
| Quote form | Fields: name, mobile (primary), email (optional), vertical (pre-filled), location, details, consent checkbox. Labels always visible. Validation on blur with the message and an icon under the field. Bottom sheet at 92% height on mobile with a drag handle, centred 560 px modal on desktop. Focus is trapped and returned on close. |
| Quote result | Success: check mark animation, reference ID, what happens next, and a WhatsApp link. Failure: typed data is kept, clear message, retry and call options. |
| Booking flow (Brentra Facility) | Keep the current structure (categories, service list, cart drawer, checkout, live tracking) and restyle it with the new tokens. The cart button stays visible with a count. The confirmation shows the booking ID and the OTP prominently with the line: share this code with the technician only at the door. |
| Footer | Dark. Four columns (Services, Company, Contact, Legal), one address and one phone set, legal name and copyright. The promo lines and long address strip are removed. |
| Feedback | Skeleton placeholders for lists loaded from the API. Toasts at the bottom centre for 4 seconds with aria-live polite. An offline banner when the connection drops. |
| 404 page | Dark, large 404, a short friendly line, links to Home and Services. |

## 6. Page blueprints

**6.1 Home**

| # | Section | Layout and content | Motion | Action |
| --- | --- | --- | --- | --- |
| 1 | Hero | Full screen (100svh), dark. Display headline, one supporting line, two buttons, vertical chips along the bottom. | Blueprint grid and skyline in three parallax layers, headline reveals word by word, scroll cue | Book a Service |
| 2 | Proof strip | Four counters. Numbers must be real and confirmed by the owner. | Counters tick on entry | None |
| 3 | Verticals showcase | One vertical per screen. Left: eyebrow, H2, two lines, From price, button. Right: its animated scene. A seven-tick progress rail on the side. | Scenes scrub with scroll, panels cross-fade | Per-vertical button |
| 4 | Brentra Facility strip | Light. Six service tiles with From prices and an ETA chip. | Tiles reveal in a stagger | Pick a service |
| 5 | Why Brentra | Light. Four trust pillars. Every claim (warranty, certification, verified technicians) needs an owner-confirmed source. | Icons draw in | None |
| 6 | How it works | Three-step timeline | Connecting line draws on scroll | Get a quote |
| 7 | Social proof | Testimonials and client logos with real names. If none exist yet, the section is left out rather than faked. | Gentle carousel | None |
| 8 | Leadership | Existing four-director block restyled as a portrait grid | Role reveals on hover and focus | None |
| 9 | FAQ | Light accordion, first item open | Height animation | None |
| 10 | Final call to action | Dark band: Call, WhatsApp, Book a Service | Magnetic buttons on desktop | Book a Service |

**6.2 Vertical page template.** Hero scene at 60 to 80% of screen height with H1, price chip and button; price strip; included and not included; process steps; proof (before and after photos where they exist); three to five FAQs; two related verticals; a sticky button (mobile bar, or a floating Get a Quote on desktop once the hero is passed).

**6.3 Contact (Patna Hub).** Two columns: address, phones, hours and WhatsApp on the left, the form on the right. The map sits below as a click-to-load embed to save weight. All contact data comes from the single site config.

**6.4 Careers & Partners.** Two tabs on one page. Careers: open roles or a general application. Partners: business name, what you supply, city.

**6.5 About (Corporate Overview).** Story, timeline, leadership, and certifications only if real and documented.

## 7. Motion design

**Tokens**

| Token | Value | Used for |
| --- | --- | --- |
| Instant | 100 ms | Press feedback |
| Fast | 200 ms | Hover, small reveals |
| Base | 350 ms | Reveals, menus, sheets |
| Slow | 600 ms | Section transitions |
| Hero | 900 ms | First-load hero choreography |
| Ease out | cubic-bezier(0.16, 1, 0.3, 1) | Entrances |
| Ease in | cubic-bezier(0.7, 0, 0.84, 0) at 150 to 200 ms | Exits |

Linear easing only for continuous loops. Stagger is 60 ms with no more than 8 items.

**Patterns:** reveal (fade and rise 24 px, once), scroll scrub (scroll position drives SVG drawing and movement), parallax up to 12% of element height, hover lift 2 px, press scale 0.98, magnetic buttons (fine pointer only, pull up to 8 px), counters (1.2 s ease out), route transition (opacity, 250 ms).

**Scene storyboards.** Eight scene families cover all verticals so cost stays low.

| Scene | Start | Behaviour | End frame (also the reduced-motion frame) |
| --- | --- | --- | --- |
| Hero | Blueprint grid on ink with a faint skyline outline | Grid drifts, three skyline layers parallax, ambient loop of about 40 s | Skyline complete, windows glowing gold |
| Construction and Materials | Empty plot with dimension lines | Scroll draws foundation, frame, walls, roof, windows; the per sq.ft price label rises | Finished house in gold line art |
| Facility, RO, Tank, Pest | AC unit, water tank, shield | Fan blades spin about 1.2 s per turn, tank level rises with scroll, shield pulses once | Each object in its finished state with an ETA chip |
| IT and Digital | Scattered nodes | Edges connect one by one, nodes lean toward the cursor within 120 px, bars and a line chart grow for marketing | Connected network |
| Fresh FMCG | Stylised Bihar outline with the Patna hub | Truck travels along a route line to five district points, a 2 to 8 degree C label appears | Route complete, truck at the last stop |
| Events and Hospitality | Dark stage | Light beams sweep, a burst of at most 30 confetti pieces on button press | Beams at rest |
| Healthcare and Ventures | Flat line | ECG trace draws and loops | Steady pulse line |
| Manpower | Single figure | Figures join into a team formation | Full team |

**Reduced motion and device tiers.** With reduced motion on, every scene shows its end frame, reveals are instant, and parallax, magnetic buttons, smooth scroll and counters are off (counters show final values). Videos show their poster. By tier: high runs everything; mid runs scenes and reveals but no video, parallax or 3D; low shows static end frames only. The hero video has a visible pause button.

## 8. Content and voice

- **Voice:** confident, warm, plain. Short sentences. Today’s copy includes phrases such as Institutional Secretariat desk and multi-vertical master service agreements; rewrite these in everyday language.
- **Headline formula:** outcome plus place, for example a home built right in Patna. Prices are quoted only after the owner confirms them (PRD open question 2).
- **Button labels:** Book a Service, Get a Free Estimate, Call Now, WhatsApp Us, Request Wholesale Rates. Avoid Submit.
- **Microcopy:** phone error: Enter a 10-digit mobile number. Success: Request received. Your reference is BV-XXXXXX. We will call you on the number you gave. Failure: We could not send that. Your details are still here, so try again or call us.
- **Formats:** rupee symbol with Indian grouping (₹1,25,000), phone numbers as +91 XXXXX XXXXX.
- **Rules:** no placeholder text, no testimonials or certifications that are not real, alt text describes what the image shows, and layouts allow 30% longer text for a future Hindi version.

## 9. Accessibility (WCAG 2.2 AA)

- Use only the colour pairs in section 4.1. Never Gold 400 or Cyan 600 as text on white.
- Focus ring 2 px with a 3 px offset (Sky 400 on dark, Cyan 700 on light), never removed.
- Touch targets at least 44 by 44 px, which is stricter than the WCAG minimum.
- Skip-to-content link first. Menu keys: Enter and Space open, Esc closes, arrows move. Modals trap focus and return it.
- Text over media always has a scrim and is checked against the worst frame. Any motion that runs longer than 5 seconds has a pause control.
- Forms: visible labels, error text with an icon, aria-describedby, autocomplete attributes, tel input mode for phone fields.
- Scenes are decorative (aria-hidden); the same meaning is in the section text. Heading order is never skipped.
- Layout reflows at 320 px width and at 200% zoom without horizontal scrolling.

## 10. Responsive behaviour

Test widths: 360, 480, 768, 1024, 1280, 1536.

| Element | Below 768 | 768 to 1023 | 1024 and up |
| --- | --- | --- | --- |
| Header | Logo and menu button | Same | Full navigation |
| Services menu | Accordion in full-screen menu | Accordion | Mega menu panel |
| Hero headline | 40 to 48 px, 2 to 3 lines | About 64 px | 80 to 96 px |
| Showcase | Stacked: scene above copy, each scene plays when in view, no pinning | Stacked | Pinned panels with side progress rail |
| Card grids | 1 column | 2 columns | 3 to 4 columns |
| Action bar | Shown after the hero | Shown | Floating Get a Quote instead |
| Hero media | Poster image only | Video on mid and high tiers | Video on mid and high tiers |
| Quote and checkout | Bottom sheet | Bottom sheet | Centred modal |

## 11. Design QA checklist

1. Every colour pair used on screen appears in the section 4.1 table.
2. Header and menus pass the PRD navigation criteria at all six widths.
3. One primary button per view, and it is always visible without scrolling on mobile.
4. No layout shift when images, fonts or scenes load.
5. Every scene has a working end frame under reduced motion.
6. Every animation uses a motion token from section 7.
7. Forms show correct states: empty, focus, error, loading, success, failure.
8. Keyboard-only run through each journey in section 2 succeeds.
9. No placeholder text, fake numbers or unverified claims anywhere.
10. Contact details, brand name and prices match the site config exactly.
11. Tested on a low-end Android phone on 4G and on an iPhone.

## 12. Open questions and next steps

**Open questions**

1. cyart.io: which parts do you like (colour, layout, animation, 3D)? Two or three screenshots would settle this and let the document name specific patterns.
2. Brand spelling, final logo, construction price and official contact details (the same open items as the PRD).
3. Do real photos and videos of projects, fleet and team exist? Without them the scenes carry more of the look.
4. Real proof points: project counts, years, testimonials, certifications.
5. Is a Hindi version planned?

**Next steps:** approve this document, then turn the header, mega menu and Home hero into a visual mock-up for review, then start Phase 0 of the TRD. The four new colour tokens (Bronze 600, Sky 400, Cyan 700, Mist 300 and Slate 500) go into the Tailwind theme block described in TRD section 5.5.
