# Bahaa Nedjma — Portfolio

A single-page, highly interactive portfolio for **Bahaa Nedjma**, Social Media Manager & Content Strategist. Built to feel like a **living social media command center** — animated dashboards, an interactive phone mockup, DM-style testimonials, scroll-driven growth animations, and a live-style analytics dashboard, all in a dark, premium visual identity.

**Fully static. No backend, no database, no API keys.** Contact routes through `mailto:`, WhatsApp, `tel:`, and Calendly links.

---

## Tech stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) + TypeScript, **static export** (`output: "export"`) |
| Styling | Tailwind CSS v4 (design tokens live in `app/globals.css` under `@theme`) |
| Animation | Framer Motion |
| Charts | Recharts |
| PDF viewer | react-pdf (pdf.js) |
| Icons | lucide-react (UI) + simple-icons (brand logos) |
| Fonts | Plus Jakarta Sans (headings) + Inter (body), via `next/font` |

---

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build & deploy

```bash
npm run build      # runs `prebuild` (cert images) → type-checks → static-exports to ./out
```

> `prebuild` runs `scripts/generate-cert-images.mjs`, which renders every certificate PDF
> in `public/certifications/` to a high-res PNG in `public/certifications/generated/`.
> Run it on its own with `npm run generate:certs`. It uses `@napi-rs/canvas` + pdf.js —
> both already installed — so hosts that run `npm run build` (Vercel/Netlify) regenerate
> the images automatically.

The build produces a fully static site in **`./out`**. Deploy it anywhere:

- **Vercel** — import the repo; zero config (it detects Next.js). Or drag-drop `./out` in the dashboard.
- **Netlify** — build command `npm run build`, publish directory `out`.
- **Any static host / CDN** — upload the contents of `./out`.

> Preview the exported site locally with any static server, e.g. `npx serve out`.

---

## 📝 What to edit (everything is in one file)

**`lib/constants.ts` is the single source of truth.** Names, stats, links, testimonials, certifications, tools, chart data — all of it lives here, typed and commented. You can update the entire site without touching component code. Every fake demo value is flagged with a `// PLACEHOLDER:` comment.

### The most common edits

| I want to change… | Edit this in `lib/constants.ts` |
|---|---|
| Name, role, tagline, hero copy | `PROFILE` |
| WhatsApp / email / phone / **Calendly link** / LinkedIn / socials | `CONTACT` |
| Hero dashboard numbers (Reach, Engagement, Followers…) | `HERO_STATS` |
| About paragraphs & stat strip | `ABOUT_PARAGRAPHS`, `ABOUT_STATS` |
| Services / content-type cards | `SERVICES` |
| Process steps, "Why me" points | `PROCESS_STEPS`, `WHY_ME` |
| Platforms, tools, skills | `PLATFORMS`, `TOOLS`, `SKILLS` |
| Case-study titles, clients, result stats, **PDF paths** | `CASE_STUDIES` |
| Phone-mockup client tabs | `PHONE_ACCOUNTS` (map 1:1 to `CASE_STUDIES`) |
| Analytics chart data | `REACH_GROWTH`, `ENGAGEMENT_TREND`, `AUDIENCE_GROWTH`, `CONTENT_SPLIT`, `CONTENT_PERFORMANCE` |
| Testimonials (DM bubbles) | `TESTIMONIALS` |
| **Client Work** projects (name, role, stats, screenshots, contributions) | `CLIENT_PROJECTS` |
| Certifications (title, issuer, `pdfPath`, `imagePath`) | `CERTIFICATIONS` (auto-scrolling marquee → full-screen image) |
| Strategy Canvas sticky notes | `STRATEGY_NOTES` |
| "What happens after you hire me" steps | `AFTER_HIRE_STEPS` |
| Floating notification messages | `NOTIFICATIONS` |
| Scroll "follower growth" milestones | `GROWTH_MILESTONES` |

### Add the real profile photo

1. Drop a square photo in `public/avatar/` (e.g. `public/avatar/bahaa.jpg`).
2. In `lib/constants.ts`, set `PROFILE.avatar` to that path (e.g. `"/avatar/bahaa.jpg"`).

A branded SVG monogram (`public/avatar/bahaa.svg`) ships as the stand-in. The avatar frame can be switched between a circle and a rounded square via the `shape` prop on `<Avatar>` in `components/about/About.tsx`.

### Swap the real case-study PDFs

Replace these two files (keep the same filenames, or update the `pdf:` paths in `CASE_STUDIES`):

```
public/case-studies/case-study-1-placeholder.pdf
public/case-studies/case-study-2-placeholder.pdf
```

The PDF viewer renders them inline in a scrollable dark panel. (The pdf.js worker and font/cmap assets live in `public/` — `pdf.worker.min.mjs`, `standard_fonts/`, `cmaps/` — leave them in place.)

### Certifications (auto-scrolling marquee)

The Certifications section is an infinite, hover-to-pause marquee of certificate **images**
(rendered from the source PDFs). Clicking a card opens it full-screen with prev/next
navigation and a link to the original PDF. Under `prefers-reduced-motion` it falls back to a
static grid.

To add / replace a certificate:

1. Drop the PDF in `public/certifications/`.
2. Run `npm run generate:certs` (or just `npm run build`) to render the PNG into
   `public/certifications/generated/`. The output filename is the slugified PDF name.
3. Add/update the matching row in `CERTIFICATIONS` (`pdfPath` = the PDF, `imagePath` =
   `/certifications/generated/<slug>.png`).

Duplicate uploads are skipped via a small `SKIP` list in `scripts/generate-cert-images.mjs`.

### Client Work screenshots & stats

`CLIENT_PROJECTS` in `lib/constants.ts` drives the **Client Work** section (expandable cards —
inline on desktop, bottom-sheet on mobile). Each project's `screenshots[]` point at images in
`public/projects/` or `public/case-studies/`, and `stats[]` are shown as number tiles only when
non-empty (leave `[]` to hide the row). Tutoriland's screenshots were extracted from the work-exp
deck; add real screenshots/stats for the other projects by dropping images in `public/projects/`
and referencing them here.

### Brand logos (platforms & tools)

Real logos are rendered from the `simple-icons` package via `components/ui/BrandLogo.tsx`, keyed by the brand `name` in `PLATFORMS` / `TOOLS`. A few brands simple-icons dropped for trademark reasons (LinkedIn, Canva, CapCut, ChatGPT) use inline fallbacks in that file; any unknown name (e.g. "VN Editor") falls back to an initials badge — drop a real logo there if you have one.

### Real Calendly link

Set `CONTACT.calendly` in `lib/constants.ts`. It's wired to every "Book a Call" button and the contact card.

### Real phone-mockup content

The phone shows generic placeholder feeds (colored gradient posts) per client tab in `PHONE_ACCOUNTS`. To use real screenshots, edit `components/phone/PhoneFeed.tsx` and swap the gradient tiles for `<img>` elements pointing at images you add to `public/`.

---

## Design tokens

Colors, fonts, radii, and shadows are defined once in `app/globals.css` under `@theme` and exposed as Tailwind utilities (`bg-navy`, `text-amber`, `border-hairline`, etc.). Change a value there and it updates everywhere.

| Token | Value | Use |
|---|---|---|
| `navy` / `navy-dark` | `#001D3D` / `#00142B` | backgrounds (alternating) |
| `surface` / `hairline` | `#0A2A4D` / `#1E3A5F` | cards / 1px borders |
| `amber` | `#FFB627` | primary accent / CTAs |
| `teal` | `#2EC4B6` | data / secondary accent |
| `success` | `#3DDC97` | positive metrics |
| `ink` / `muted` | `#F5F7FA` / `#9FB3C8` | text |

---

## Accessibility & performance

- **`prefers-reduced-motion` is respected globally** — counters snap, the floating-notification system is disabled, and marquee/scroll animations stop.
- Interactive elements are keyboard-navigable with amber focus rings.
- Recharts and the react-pdf viewer are **lazy-loaded** (`dynamic(..., { ssr: false })`) since they're heavy and below the fold.
- Mobile-first layouts throughout (the phone mockup, dashboard grid, and DM testimonials each have dedicated single-column layouts).

---

## Project structure

```
app/
  layout.tsx           fonts + metadata
  page.tsx             assembles all sections in order
  globals.css          design tokens (@theme) + base styles
components/
  layout/              Navbar, Footer, ScrollGrowthBar
  hero/                Hero, DashboardCard, useCountUp
  phone/               PhoneMockup, PhoneFeed, PhoneStoryOverlay
  about/               About, Avatar
  services/            ServicesGrid, ServiceCard
  process/             ProcessTimeline
  whyme/               WhyMeGrid
  platforms/           PlatformsSection (platforms + tools marquee + skills)
  notifications/       NotificationSystem
  casestudies/         CaseStudiesSection, CaseStudyPdfViewer
  analytics/           AnalyticsSection, AnalyticsCharts
  testimonials/        DmTestimonials, DmConversation
  certifications/      CertificationsGrid
  contact/             ContactSection
  ui/                  Section, Reveal, BrandIcons
lib/
  constants.ts         ⭐ ALL editable content
public/
  avatar/              profile photo (SVG placeholder)
  case-studies/        placeholder PDFs
  pdf.worker.min.mjs, standard_fonts/, cmaps/   (pdf.js assets — leave in place)
```
