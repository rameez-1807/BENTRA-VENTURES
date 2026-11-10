# Brentra Ventures Website Redesign — App Flow Document

Version 1.0 · 7 November 2026 · Status: Draft for review · Companion to the PRD, TRD and UI/UX Design Document

Basis: the source code of github.com/rameez-1807/BENTRA-VENTURES (routes, QuoteModal, CheckoutModal, LiveTrackingModal, AdminDashboardModal, server.js). Notes marked Current describe what the code does today. Everything else is the Target for the redesign. Nothing was tested in a browser.

## 1. How to read this document

Each flow has an ID (F1 to F8), a goal, an actor, a table of steps (what the user does, what the system does, where it goes next), failure paths, analytics events and acceptance criteria. Section 7 lists the places where the current code differs from the target.

**Actors**

- **Visitor:** anyone on the site. There are no customer accounts today.
- **Customer:** a visitor who has made a booking. A booking is identified by its ID and the phone number used.
- **Admin (operations):** staff who handle leads and bookings.
- **Technician:** has no screen in this release. Admin assigns and updates on their behalf.
- **System:** the React front end on Vercel, the Express API on Render, the Supabase database, the bot check (Turnstile) and optional owner notifications.

## 2. App map and flow catalogue

The public app has one shell (header, footer, mobile action bar) around these destinations: Home, the service pages grouped in four clusters, About, Careers & Partners, Contact, legal pages and a 404 page. Two overlays can open on top of any page: the quote sheet and, on the Brentra Facility page, the cart, checkout and tracking sheets. Admin lives on a separate protected route.

&#91;embedded content: app map · header, four clusters, two overlays\]

Services opens four clusters. Home & Facility leads to the booking sheets, and the other three open the quote sheet.

| ID | Flow | Actor | Starts at | Ends when |
| --- | --- | --- | --- | --- |
| F1 | Discover and navigate | Visitor | Any page | A service page is open |
| F2 | Book a facility service | Visitor, then Customer | Facility page, Services menu, Home | Booking confirmed |
| F3 | Track a booking | Customer | Confirmation or Facility page | Service completed and rated |
| F4 | Request a quote or estimate | Visitor | Any Get a Quote button | Lead reference shown |
| F5 | Booking lifecycle | System and Admin | New booking | Completed or cancelled |
| F6 | Operations | Admin | /admin | Leads and bookings processed |
| F7 | Contact, careers and partner forms | Visitor | Contact or Careers & Partners | Form submitted |
| F8 | Errors and edge cases | All | Any step | User recovers or is routed to a person |

## 3. Flows

### F1. Discover and navigate

Goal: reach the right service page in three clicks or fewer. Entry points: Home, a search result, a WhatsApp link, or an old alias URL.

| Step | User does | System does | Next |
| --- | --- | --- | --- |
| 1 | Arrives on any URL | Alias URLs get a permanent redirect to the canonical route. Page title, description and canonical tag are set. Unknown URLs show the 404 page. | 2 |
| 2 | Opens Services (hover with 120 ms delay, click, or Enter on desktop; menu button on mobile) | Mega menu opens with focus management. On mobile, a full-screen menu opens with the clusters as accordions. | 3 |
| 3 | Picks a service | Route changes with a 250 ms fade. Scroll resets to top and focus moves to the page heading. | 4 |
| 4 | Reads the price strip and chooses an action | Brentra Facility services go to F2. Other verticals open the quote sheet (F4). Call and WhatsApp open the phone dialler or wa.me. | F2, F4 or external |

Back and forward restore the previous page and scroll position. Events: nav\_open, nav\_click, vertical\_view, call\_click, whatsapp\_click.

Acceptance: from Home, every canonical service page is reachable in three clicks or fewer by mouse, touch and keyboard. A deep link opens the right page and a copied link opens the same page for someone else.

### F2. Book a facility service

Goal: a customer books a technician visit with no account. Actor: Visitor becoming Customer.

&#91;embedded content: F2 booking flow · 7 steps, 1 server check\]

If the server check fails, the customer returns to the payment step with the cart and details kept.

| Step | User does | System does | Next |
| --- | --- | --- | --- |
| 1 | Opens the Brentra Facility page and picks a category (AC, RO, tank cleaning, pest control and the others in the catalogue) | Shows the services in that category with price, original price, discount, duration, rating and badge | 2 |
| 2 | Opens a service and chooses quantity and add-ons | Shows included and excluded items and reviews. Add to cart updates the cart button count. | 3 |
| 3 | Opens the cart | Shows items, subtotal, service fee, discount and promo code. Checkout is disabled while the cart is empty. | 4 |
| 4 | Checkout step 1 of 3: picks a date and time slot | Offers the next available dates and fixed time slots. Past or full slots cannot be picked. | 5 |
| 5 | Step 2 of 3: enters name, mobile, optional alternate mobile, locality, flat or house number, landmark, city, pincode and notes | Validates each field on blur (rules in section 5). | 6 |
| 6 | Step 3 of 3: chooses how to pay and confirms | Shows the total again and the cancellation policy line. | 7 |
| 7 | Presses Confirm | Button disables and shows a spinner. The browser sends the booking with an idempotency key. The server checks the items and slot, recomputes the total, creates the booking and the OTP, and stores it. | 8 or F8 |
| 8 | Sees the confirmation | Shows booking ID, slot, address summary and the OTP once, with the line: share this code with the technician only at the door. Offers Track booking, Call and WhatsApp. The cart is emptied. | F3 |

Current: the checkout has a phone OTP step with no SMS service behind it, and the UPI and card options mark the order as paid although no payment gateway exists (section 7).

Events: booking\_start (first item added), booking\_step (1, 2, 3), booking\_confirm, booking\_fail.

Acceptance: given a cart with items, when the user completes the three steps and the API returns 201, then the confirmation shows the booking ID and OTP, the cart is empty, and a repeated tap on Confirm does not create a second booking.

### F3. Track a booking

Goal: the customer sees where the booking stands and can rate the service. Entry points: the confirmation screen, a My bookings button on the Facility page, or a tracking link with the booking ID.

| Step | User does | System does | Next |
| --- | --- | --- | --- |
| 1 | Opens tracking. If the booking is not in this browser, enters booking ID and phone number. | Looks the booking up through the API. The ID and phone must both match, and lookups are rate limited. | 2 |
| 2 | Views the status timeline | Shows Confirmed, Pro assigned, On the way, In progress, Completed, with the current step highlighted | 3 |
| 3 | Views technician, slot and payment | Shows technician name, photo, rating, vehicle number and verified badge once assigned, plus the OTP and the payment status. A Call technician button appears. | 4 |
| 4 | Optionally cancels | Allowed until 2 hours before the slot, with no fee. Asks for confirmation and a reason. | F5 |
| 5 | After completion, rates the service | Stars and an optional comment are saved against the booking. Shows a thank-you. | End |

Current: tracking reads bookings held in the browser, and its footer has a status dropdown meant for demos that any visitor can use (section 7).

Events: track\_open, track\_cancel, review\_submit.

Acceptance: when Admin changes the status, the customer sees the new status on their own device within 30 seconds of opening or refreshing the tracking screen.

### F4. Request a quote or estimate

Goal: capture a lead from any vertical in under a minute. Actor: Visitor. This flow also serves construction estimates and wholesale FMCG requests.

&#91;embedded content: F4 quote flow · 4 steps, 1 save check\]

A failed save keeps what the customer typed, so they can send again or call.

| Step | User does | System does | Next |
| --- | --- | --- | --- |
| 1 | Presses any Get a Quote, Free Estimate or Request Rates button | Opens the quote sheet (bottom sheet on mobile, centred modal on desktop) with the vertical pre-selected and focus on the first field | 2 |
| 2 | Fills name, mobile, optional email, vertical, location (Patna, Bihar by default) and details | Validates on blur. Honeypot field stays hidden. | 3 |
| 3 | Ticks consent and presses Send | Button shows a spinner. The invisible bot check runs. The browser sends the lead with the page path and any UTM values. | 4 or F8 |
| 4 | Sees the result | Shows a check animation, the reference ID (BV-XXXXXX), what happens next, and a WhatsApp link. Closing returns the user to the same page and position. | End |

Current: the modal reports success even when the database write fails (section 7).

Events: quote\_open, quote\_field\_error, quote\_submit, quote\_fail.

Acceptance: given valid input, when the API returns 201, then the reference ID is shown and a lead row exists. Given a 503, then the typed data is kept and a retry and a phone number are offered.

### F5. Booking lifecycle

Goal: one clear set of statuses that Admin, the customer and the database all agree on.

&#91;embedded content: F5 booking statuses · 5 forward steps, 3 cancel paths\]

Red arrows are cancellations. Everything else moves forward, one status at a time.

| From | Event | To | By | Side effects |
| --- | --- | --- | --- | --- |
| (new) | Booking accepted by the server | confirmed | System | Owner notified, customer sees the confirmation |
| confirmed | Technician assigned | pro\_assigned | Admin | Customer notified with technician details |
| pro\_assigned | Technician leaves | on\_the\_way | Admin | Customer notified |
| on\_the\_way | Customer gives the OTP at the door and it matches | in\_progress | Admin or technician | OTP marked used |
| in\_progress | Work finished | completed | Admin or technician | Payment recorded as paid, rating prompt shown |
| confirmed, pro\_assigned | Customer or Admin cancels | cancelled | Customer (free until 2 hours before the slot) or Admin | Slot released, reason stored |
| on\_the\_way | Admin cancels with a reason | cancelled | Admin | Customer notified |

Rules: statuses only move forward as shown, nothing is skipped, and every change records time and who made it. The type also has a pending status that the server never uses today. Keep it only if online payment is added, where an order stays pending until payment succeeds.

### F6. Operations (Admin)

Goal: process every lead and booking quickly. Actor: Admin. Replaces the public Admin button on the Facility page.

| Step | Admin does | System does | Next |
| --- | --- | --- | --- |
| 1 | Opens /admin | Without a valid session, shows the login screen. Allow-listed accounts with multi-factor sign-in only. | 2 |
| 2 | Opens Orders | Lists bookings newest first with status filter and search by ID, customer name, locality or service. Shows totals: bookings, revenue, active dispatches, completed jobs. | 3 |
| 3 | Opens a booking and assigns a technician | Shows the technician list with rating and specialisation. Saving sets pro\_assigned and notifies the customer. | 4 |
| 4 | Updates the status along F5 | Validates the transition and writes an audit entry | 2 |
| 5 | Opens Leads (new tab) | Lists leads with phone partly masked until opened. Status: PENDING\_REVIEW, CONTACTED, QUOTED, WON, LOST. Notes field. | 2 |
| 6 | Opens Catalog and edits a price | Saves through the API with an audit entry. New prices apply to new bookings only. | 2 |
| 7 | Opens Team | Lists technicians with jobs completed and rating | 2 |

Failure paths: expired session returns to login with the page kept; a status change that is not allowed shows the reason and changes nothing.

### F7. Contact, careers and partner forms

Goal: every other form works like F4. The Contact page form uses the contact vertical. Careers & Partners has two tabs: Careers (name, mobile, email, role of interest, optional CV link) and Partners (business name, what you supply, city, mobile). All three post to the same leads endpoint with a type value, and the leads list in Admin can filter by it. Success, failure and validation behave exactly as in F4. The map on the Contact page loads only after a click.

### F8. Errors and edge cases

| Situation | Detected by | User sees | System does |
| --- | --- | --- | --- |
| API unreachable or slow | No response after 20 seconds | Message that the request did not go through, a retry button, the phone number | Keeps typed data and the cart |
| Backend waking up after idle | First request over 5 seconds | Still working message | A health call at page load warms the service |
| Validation failure | Client rules, then server rules | Field-level messages with icon and text | Server returns 400 with the failing fields |
| Too many requests | HTTP 429 | Try again in a minute, or call us | Rate limit in the API |
| Database write failed | HTTP 503 | Same as unreachable, never a fake success | Logs and alerts the owner |
| Double tap on submit | Button state and idempotency key | One confirmation | Server returns the first result for a repeated key |
| Price changed since adding to cart | Server total differs from the cart | Price updated notice with the new total before confirming | Uses the server total |
| Slot taken or in the past | Server slot check | Pick another slot message, slot list refreshed | Booking not created |
| Address outside the service area | Pincode check against the owner’s served-pincode list | We currently serve Patna message with the phone number | Booking not created |
| Offline | Browser offline event | Banner at the top, submit disabled | Resumes when back online |
| Unknown or old URL | Router | 404 page, or a redirect for known aliases | Logs the missed URL |
| JavaScript off or slow | Prerendered HTML | Readable page with working call and WhatsApp links | None |
| Admin session expired | 401 from the API | Login screen, then back to the same page | Clears the session |

## 4. System sequences

Both submissions follow the same path: browser, Vercel front end, Express API, Supabase. The API calls the bot check for forms, validates the body, writes one row, and answers with the new ID. A failed write returns 503 and never a success. After a successful write the API may notify the owner by email or WhatsApp, and a failure of that notification never blocks the customer. Booking creation additionally reads facility\_services to recompute the total and checks the slot before writing.

&#91;embedded content: booking request · 4 participants, 9 messages\]

A failed insert returns 503. The API never reports success without a saved row.

## 5. Validation and state rules

| Field | Rule | Error message |
| --- | --- | --- |
| Name | 2 to 100 characters | Enter your name |
| Mobile | Indian mobile: optional +91, then 10 digits starting 6 to 9 | Enter a 10-digit mobile number |
| Email | Optional, valid format | Enter a valid email address |
| Details | 1000 characters or fewer | Please shorten your message |
| Pincode | 6 digits and on the served-pincode list | We currently serve Patna only |
| Address | Locality and flat or house number required | Add your locality and house number |
| Slot | A future date and an open time slot | Pick another time slot |
| Consent | Must be ticked | Please agree to be contacted |

Cart rules: a quantity of at least 1 per line; add-ons belong to one line; the cart is kept in the browser until checkout succeeds; the maximum quantity per service is set by the owner. Prices shown are always checked against the server at confirmation.

## 6. Routing and navigation rules

- Canonical routes and alias redirects follow the route registry in TRD section 5.2.
- The quote sheet can be opened by a link with a query value such as ?quote=realty-infrastructure, so a pre-filled quote link can be shared on WhatsApp. Closing it removes the value.
- Existing in-page hash links keep working, and plain hash views follow the TRD rule.
- UTM values in the entry URL are kept for the session and saved with the lead or booking.
- Opening a sheet moves focus into it and closing returns focus to the button that opened it.
- Back closes an open sheet before it leaves the page.

## 7. Current behaviour that differs from the target

| ID | Current (from the code) | Target |
| --- | --- | --- |
| G-1 | Tracking and the Admin dashboard run on in-browser state. A status change made by Admin never reaches the customer’s device. | Tracking through a lookup endpoint (booking ID plus phone, rate limited). Admin through protected API calls for list, assign technician and change status. These extend TRD section 8. |
| G-2 | UPI and card choices set the order to paid with no payment gateway. | Offer cash after service only until a gateway is integrated. |
| G-3 | Checkout step 2 has a phone OTP step, but the server has no SMS service. | Remove it, or add a real SMS or WhatsApp provider. The technician OTP at the door stays. |
| G-4 | The tracking footer has a status dropdown labelled for demo and testing. | Remove it from production builds. |
| G-5 | The server creates every booking as confirmed. The pending status is never used. | Keep confirmed, drop pending unless online payment is added. |
| G-6 | The quote modal opens from component state only. | Also open from the ?quote query value. |
| G-7 | Leads can only be read through the API, with no screen for them. | Add the Leads tab to Admin (F6). |
| G-8 | A failed database write still answers success. | Return 503 (TRD S-5). |
| G-9 | Pincode defaults to 800001 and I did not find a check against a served-area list. | Validate against the owner’s list. |

## 8. Analytics event map

| Flow | Events | Properties |
| --- | --- | --- |
| F1 | nav\_open, nav\_click, vertical\_view, call\_click, whatsapp\_click | item, cluster, vertical, source page |
| F2 | booking\_start, booking\_step, booking\_confirm, booking\_fail | service IDs, step, total, error code |
| F3 | track\_open, track\_cancel, review\_submit | status, rating |
| F4 and F7 | quote\_open, quote\_field\_error, quote\_submit, quote\_fail | vertical, field, error code, UTM values |
| F6 | admin\_login, status\_change, price\_change | from, to (no personal data) |
| All | web-vitals, js\_error | metric, route |

No event carries a name, phone number or address.

## 9. Open questions

1. Will online payment be added? If so, which gateway, and how should pending orders and refunds work?
2. Which SMS or WhatsApp provider will send booking and technician notifications?
3. Who are the technicians and how are they told about a job, since they have no screen here?
4. What is the real cancellation and refund policy? The current screen says no fee until 2 hours before the slot.
5. Which pincodes does Brentra Facility serve?
6. What response time can be promised on a quote, and who owns follow-up?
7. Which staff accounts need Admin access?
