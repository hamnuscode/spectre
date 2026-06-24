# Spectre — Marketing Website

A heavily-animated, light-theme marketing site for **Spectre Tech Services**
(`spectrets.com`) — built around a sharp, prismatic, faceted-crystal brand.
Content is real, extracted from the company's All-in-One WP Migration
(`.wpress`) export; see [`CONTENT-GAPS.md`](./CONTENT-GAPS.md) for what was
extracted vs. written on-brand.

> **One hard rule:** heavy, layered animation everywhere — **zero perceived
> lag**. Every effect is GPU-composited (transform/opacity only), driven by
> `requestAnimationFrame` loops that never touch React state, and ships a
> static `prefers-reduced-motion` fallback.

---

## Stack

| Concern | Choice |
|---|---|
| Framework | **Next.js 15** (App Router) + TypeScript |
| Styling | **Tailwind CSS** with CSS-variable design tokens |
| UI animation | **Framer Motion** (orchestrated entrances, layout, accordions) |
| 3D | **React Three Fiber + drei** (single canvas, lazy + SSR-disabled) |
| Scroll motion | **GSAP** is installed for timeline scrubbing where needed |

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
```

Node 18.18+ (built and verified on Node 25).

---

## Typography — the font pairing

- **Display: [Fraunces](https://fonts.google.com/specimen/Fraunces)** — a
  contemporary serif with optical-size and "soft/wonky" axes. Its sharp,
  high-contrast letterforms echo the **classical, wide-tracked SPECTRE
  wordmark** in the logo; headings carry the same DNA, and the `.wordmark`
  utility applies the wide `0.32em` tracking directly.
- **Body / UI: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)**
  — a characterful geometric grotesk whose angular terminals mirror the
  prismatic, triangular logo while staying highly legible at text sizes.

**Why this pairing:** a refined serif against a geometric grotesk gives strong
weight/shape contrast (serif 900 display vs. grotesk 300 body) without the
generic Inter/Poppins look — and both halves trace back to a real feature of
the Spectre logo (classical serif wordmark + angular prism).

---

## Design tokens

All colour/motion lives in CSS variables in [`app/globals.css`](./app/globals.css)
and is surfaced to Tailwind in [`tailwind.config.ts`](./tailwind.config.ts).
No stray hex in components.

| Token | Hex | Use |
|---|---|---|
| `--navy` | `#07306D` | Primary brand, headings, primary buttons, 3D base |
| `--ink` | `#000000` | Body text, dark strips |
| `--green` | `#2BD77F` | Energy accent, hover glows, gradient stop |
| `--cyan` | `#27B7CF` | Secondary accent, links, gradient stop |
| `--bg` | `#FFFFFF` | Page background |
| `--offwhite` | `#F6F8FB` | Section banding |
| `--navy-deep / -soft / -tint` | derived | Shades & tints |

**Signature gradient** `--grad-prism` (navy → cyan → green) drives the cursor,
text highlights, accents, and ambient mesh. Angular/triangular motifs
(`clip-path` shards, diagonal dividers, the `.prism-border` gradient ring)
recur throughout to echo the logo.

---

## How the "no-lag" mandate is enforced

- **Custom cursor** ([`CustomCursor.tsx`](./components/ui/CustomCursor.tsx)) —
  one rAF loop writing `transform` straight to the DOM; the dot is 1:1 with the
  pointer, the ring lerps behind it. **No React re-render per frame.** Disabled
  on coarse pointers and reduced-motion.
- **Ambient background** ([`AmbientBackground.tsx`](./components/ui/AmbientBackground.tsx))
  — three blurred prism blobs animated with a pure CSS `transform` keyframe +
  a masked grid. Fixed, `-z-10`, ~0 CPU.
- **3D hero** ([`components/three`](./components/three)) — a low-poly octahedron
  (flat-shaded, no transmission/refraction passes); colour comes from two
  brand-tinted lights. `dynamic(… { ssr:false })`, mounted only when the hero is
  near view via IntersectionObserver, DPR capped at 1.6, with a static
  clip-path fallback for reduced-motion / pre-hydration.
- **Tilt cards** ([`TiltCard.tsx`](./components/ui/TiltCard.tsx)) — pointer
  parallax writes CSS custom properties on `pointermove` (rAF-throttled, no
  state).
- **Scroll reveals** ([`useReveal`](./hooks/useReveal.ts)) — IntersectionObserver
  toggles a class; the transition is CSS (transform/opacity), one-shot.
- **Count-ups** ([`useCountUp`](./hooks/useCountUp.ts)) — single rAF, easeOutCubic,
  fires once on scroll-in.
- **Marquee** — duplicated track translated `-50%` by a CSS keyframe; pauses on
  hover. No JS.
- Global `prefers-reduced-motion` block neutralises every animation and renders
  static fallbacks.

---

## Pages

| Route | Highlights |
|---|---|
| `/` | 3D prism hero · infinite trusted-by marquee · expandable services grid · dark count-up stats · interactive process roadmap · Why Spectre + Quick Enquiry split |
| `/services` | Full section per service, click-to-expand "what's included", anchored nav |
| `/why-spectre` | Story, stats, differentiators, testimonials |
| `/careers` | Open roles + animated application form with **CV upload** (type/size validated), GitHub/portfolio + LinkedIn |
| `/contact` | Enquiry form (deep-links a service via `?service=`) + interactive CSS radar office card |
| `/faq` | Searchable / filterable accordion + FAQ structured data |

## Single source of truth

[`data/services.ts`](./data/services.ts) drives the home grid, the services
page, and every service dropdown. [`data/site.ts`](./data/site.ts) holds nav,
stats, process, Why-Spectre props, testimonials, FAQs and contact details.

## Forms & API

Forms validate on the client (accessible labels + `aria-invalid` + inline
errors) and post to stubbed routes:

- [`app/api/enquiry/route.ts`](./app/api/enquiry/route.ts) — contact / quick enquiry
- [`app/api/careers/route.ts`](./app/api/careers/route.ts) — application + CV upload

Each route validates server-side and marks **exactly where real email / CRM /
ATS integration plugs in** (Resend, HubSpot, Greenhouse, S3, …).

## SEO & accessibility

- Per-page `metadata`, Open Graph, Twitter cards, `metadataBase`.
- `ProfessionalService` JSON-LD (root) + `FAQPage` JSON-LD (`/faq`).
- `app/sitemap.ts` + `app/robots.ts`.
- Semantic landmarks, skip-link, keyboard-navigable controls, visible
  focus rings, alt text, AA-contrast palette on the light theme.

---

## MCP / component sourcing

The **21st.dev Magic MCP** and a 3D-component MCP were available in the build
environment. The interactive patterns here (collapsing frosted navbar, infinite
marquee, tilt cards, FAQ accordion, multi-step form) follow the same
component shapes those tools generate, but every component was authored and
restyled directly against the brand tokens and the no-lag budget rather than
pasted verbatim — the hard 60fps constraint and the prism design language made
bespoke, token-driven implementations the reliable path. The hero 3D element is
a hand-built R3F scene (low-poly, brand-lit) chosen over a generic MCP 3D widget
specifically to keep it cheap enough to hold frame-rate on a 3-year-old phone.

## Notes

- The `.wpress` export and its extraction are git-ignored; only the brand logo
  and chosen assets live in `public/`.
- The site is fully static except `/contact` (reads `?service=`) and the two
  API routes.
