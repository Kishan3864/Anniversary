# Wally Nassif Electrical Contracting Service — 50th Anniversary Site

A premium, single-page 50th-anniversary website (**1976–2026**) built with
**Next.js 15 (App Router) + TypeScript**, styled to match the company's real
brand identity. All content — logo, colors, services, contact details, and
license — is the company's genuine information (sourced from
[nassifelectric.com](https://www.nassifelectric.com/)).

## Run it

```bash
npm install
npm run dev      # http://localhost:3000  (development)
```

Production (static export → `out/`):

```bash
npm run build    # outputs a fully static site into ./out
```

The site is a **static export** (`output: "export"`) — `out/` can be served by
any web server (nginx/Apache/CDN), no Node process required.

## Brand identity (from the official logo)

- **Royal blue `#0909D8`** — primary
- **Bright green `#4AE224`** — accent / anniversary highlight (replaces the old gold)
- **White**
- Real logo: [public/wally-nassif-logo.png](public/wally-nassif-logo.png)
- Fonts: Playfair Display (headings) + Inter (body)

## Real business information used

- **Wally Nassif Electrical Contracting Service** — "The Trusted Electrician"
- Tagline: *Powering South Florida with Reliability and Expertise Since 1976*
- Founder: **Wally Nassif** · Established **1976**
- Address: **6112 Washington Rd, West Palm Beach, FL 33405**
- Phone: **(561) 582-2600** · Email: **info@nassifelectric.com**
- License: **EC13001410** — Florida Statewide Licensed Unlimited Electrical
  Contractor · Licensed · Insured · Bonded
- Service area: Greater South Florida (Palm Beach County & surrounding)

## Sections (in order)

1. **Header** — topbar (phone/email/license), real logo, nav, Request Service CTA
2. **Hero** — "Celebrating 50 Years of Powering South Florida" + 50-Years emblem
3. **Anniversary banner** — 1976–2026
4. **Our Story** — real company history + logo
5. **Services** — the 8 real services with real descriptions & bullet points
6. **Timeline** — 1976 → 2026 milestones (animated)
7. **Why Choose Us** — the real "why choose us" points
8. **By the Numbers** — 50+ years, since 1976, 24/7, 100% licensed
9. **Experience quote + Request Service CTA** (with click-to-call)
10. **Footer** — real address, contact, license, service area

## Optional enhancements for later

- **Hero photo:** the hero uses a self-contained brand-blue background (no broken
  image links). To use a real photo of the crew / switchgear / EV install, drop
  it at `public/hero.jpg` and uncomment the `backgroundImage` line in
  [components/Hero.tsx](components/Hero.tsx).
- **Testimonials / Featured Projects:** can be added once real, approved customer
  quotes and project photos are supplied (intentionally not fabricated).

## Notes

- Fully responsive; timeline collapses to a single rail on mobile.
- Respects `prefers-reduced-motion`; SEO metadata + branded favicon included.
- All links are real: `tel:` and `mailto:` use the real phone/email.
