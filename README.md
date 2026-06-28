# Wally Nassif Electrical Contracting — 50th Anniversary Homepage

A premium, single-page anniversary website built with **Next.js 15 (App Router) + TypeScript**.
Celebrating **50 Years of Electrical Excellence · 1976–2026**.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000  (development)
```

For a production build:

```bash
npm run build
npm run start
```

## Design

- **Palette:** Deep Navy Blue (trust) · Metallic Gold (anniversary) · White · Electric Blue accents — defined as CSS variables in [app/globals.css](app/globals.css).
- **Fonts:** Playfair Display (elegant serif headings) + Inter (clean sans body), loaded via `next/font`.
- **Anniversary badge / "50 Years" gold seal:** the animated SVG emblem in [components/Emblem.tsx](components/Emblem.tsx). A compact gold pill badge also lives in the header.

## Sections (in order)

1. **Hero** — gold "50 Years" emblem, headline, tagline, 3 CTAs (Free Estimate / Emergency / Commercial & Industrial)
2. **Anniversary Banner** — 1976–2026 · Half a Century of Experience
3. **Legacy** — "A Legacy Built One Customer at a Time" story
4. **Services** — Generators, EV Charging, Service Upgrades, New Construction, Remodeling, Maintenance, Emergency Repairs
5. **Timeline** — animated 1976 → 2026 milestones (the visual centerpiece)
6. **Why Clients Choose Us** — checklist
7. **Counters** — animated count-up numbers
8. **Experience quote + Thank You CTA**
9. **Footer** — contact details

## Things to customize for the client

These are placeholders — search and replace before going live:

- **Phone / email / service area** — in [components/Footer.tsx](components/Footer.tsx) and the `tel:` links in [components/ThankYou.tsx](components/ThankYou.tsx) and [components/Header.tsx](components/Header.tsx).
- **Hero photo (optional):** the hero currently uses a self-contained navy + circuit-grid + gold-glow background (no broken image links). To use a real photo of crew/switchgear/EV chargers, drop it at `public/hero.jpg` and uncomment the `style={{ backgroundImage: "url(/hero.jpg)" }}` line in [components/Hero.tsx](components/Hero.tsx).
- **Real photos** can also replace the emblem placeholder in the Legacy section if desired.
- **Dates in the timeline** ([components/Timeline.tsx](components/Timeline.tsx)) — confirm the exact milestone years with the client.

## Notes

- Fully responsive (desktop → mobile); the timeline collapses to a single rail on small screens.
- Respects `prefers-reduced-motion`.
- All content renders server-side (statically prerendered) for fast loads and SEO.
