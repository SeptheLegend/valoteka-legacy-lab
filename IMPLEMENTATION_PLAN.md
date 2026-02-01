# IMPLEMENTATION_PLAN.md  
Project: Valoteka Legacy Lab – Booking Flow  
Stack: React 18 + Vite + TypeScript + shadcn-ui + Tailwind CSS  
Author: GitHub Copilot  
Date: 2025-12-30  

---

## 1. Context & Goals (project-specific)

**Current state**
- Landing page lives in `src/pages/Index.tsx`.
- Two CTAs already exist:
  – Hero button “Join 200+ early-access members” (scrolls to wait-list).
  – Sticky nav “Get Early Access”.
- No booking/demo calendar yet.

**Business goal**
Replace the generic wait-list with a **15-min demo booking flow** that lets merchants pick a slot and automatically creates a calendar event + email to `hi@valoteka.com`.

**Success criteria**
- ≥ 70 % of users who open the modal complete a booking.
- Lighthouse perf score stays ≥ 90.
- Zero new runtime dependencies (use shadcn-ui components only).

---

## 2. User Experience Flow (React router & shadcn-ui)

1. **Entry points (reuse existing buttons)**
   - Hero CTA and nav CTA both open the same modal instead of scrolling to wait-list.
   - Keep wording: “Book free demo” (copy change only).

2. **Modal behaviour (shadcn Dialog)**
   - Use `<Dialog open={open} onOpenChange={setOpen}>` from `src/components/ui/dialog.tsx`.
   - Backdrop dimmed, ESC + click-outside close enabled.
   - Mobile: full-screen sheet (`<Sheet>`) for thumb ergonomics.

3. **Form inside modal (shadcn Form + React-Hook-Form)**
   Required fields:
   - firstName (string)
   - email (string, email format)
   - date (Date)
   - time (string from dropdown)

   Optional:
   - company
   - notes (textarea, 140 char)

   Real-time inline errors via `shadcn FormMessage`.

4. **Calendar picker**
   - Use `shadcn Calendar` component (already installed via `src/components/ui/calendar.tsx`).
   - Disable past dates, Sundays, and any date > 21 days ahead.
   - Disabled dates styled with `data-disabled`.

5. **Time-slot dropdown**
   - Populate 09:00, 10:00, 11:00, 14:00, 15:00, 16:00 (30 min each).
   - Remove already-booked slots by querying internal mock state (see §4).

6. **Submission & feedback**
   - Loading spinner via `shadcn Button loading state`.
   - On success replace form with `shadcn Alert` (green) + checkmark icon.
   - Auto-close after 4 s or manual close.

---

## 3. File / Component Mapping

New files to create (follow existing aliases):
- `src/components/sections/BookingModal.tsx`   ← Dialog/Sheet wrapper
- `src/components/sections/BookingForm.tsx`    ← Form + Calendar
- `src/hooks/useBookingSlots.ts`               ← fetch & cache available slots
- `src/lib/bookingAPI.ts`                      ← postBooking() wrapper
- `src/types/booking.ts`                       ← TypeScript types

Modify existing:
- `src/pages/Index.tsx`   – replace onClick scroll with openDialog(state)
- `src/components/layout/Navbar.tsx` – same openDialog call

No new pages; keeps single-page feel.

---

## 4. Functional Requirements (dev-ready)

- **FR-1** `<BookingModal>` opens on any “Book free demo” click.
- **FR-2** Form validated with React-Hook-Form + zod schema; submit disabled until valid.
- **FR-3** Calendar picker uses `shadcn Calendar`; blocked days passed via props.
- **FR-4** Internal mock calendar:
  – Memory: `Map<YYYY-MM-DDTHH:MM, boolean>` inside `useBookingSlots`.
  – Persist: optional write to `.vercel/kv` (or local JSON) – out of MVP scope.
- **FR-5** On submit:
  a) POST `/api/book` (Vite proxy to Netlify function or Vercel serverless).
  b) Body: `{name, email, company, notes, datetime, timezone}`.
  c) 201 → success UI; 409 → “Slot just taken”; 5xx → generic error.
- **FR-6** Email: serverless function sends via SendGrid (or Nodemailer) to `hi@valoteka.com` + optional calendar invite file (`.ics`) attachment.

---

## 5. Key Design Decisions

1. **Required**: firstName, email, date, time.
2. **Slots**: 30 min, weekdays 09-11 & 14-16 only.
3. **Availability**: all slots open by default; booked only after 201 response.
4. **Failure**:
   - 409 → inline message “Pick another slot”.
   - 5xx → toast (`shadcn Toaster`) “Sorry, please email us”.
5. **Confirmation**: in-modal success + auto-close; no redirect.
6. **Reschedule**: future feature; mention in email reply.

---

## 6. Calendar & Email Integration (High-Level)

**General**
Event object:
- title: `Valoteka Demo – {firstName}`
- start: selected ISO datetime
- end: start +30 min
- attendees: [userEmail, hi@valoteka.com]
- description: company + notes + Zoom link (placeholder).

**Google Calendar (future)**
– OAuth2 service account → `calendar.events.insert`.

**Outlook (future)**
– Azure app → MS Graph `POST /me/events`.

Both adapters expose `createCalendarEvent(event)`; no front-end change needed.

---

## 7. Non-Functional Requirements

- **Performance**: ≤ 35 KB new gzipped JS; no external calendar libs.
- **Accessibility**: Focus trapped inside modal, aria labels, WCAG 2.1 AA.
- **Responsive**: Sheet on ≤ 640 px, Dialog above.
- **Security**: `.env` for SendGrid key; serverless only (no client secrets).
- **Browser**: Evergreen + Safari 13+.

---

## 8. Quick Dev Checklist

- [ ] Scaffold components with `shadcn-cli` (Dialog, Form, Calendar, Button, Toast).
- [ ] Write zod schema & default values.
- [ ] Mock API route (`/api/book.ts`) → return 201 or 409.
- [ ] Wire CTAs in `Index.tsx` & `Navbar.tsx` to `setOpen(true)`.
- [ ] Style with existing Tailwind tokens (slate + orange accent).
- [ ] Lighthouse audit → 90+ perf, 100 accessibility.

---

*Notes:* This plan purposefully avoids introducing new runtime dependencies and keeps the UX contained to a modal/sheet. Server work (email/calendar) is serverless and protected via secrets; that backend work should be implemented and tested in staging before enabling production.
