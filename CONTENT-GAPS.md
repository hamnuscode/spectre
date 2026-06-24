# Content: extracted vs. written

Source: `spectrets.com-20230704-144109-crpj1e.wpress` (All-in-One WP Migration
export of the original Spectre Tech Services WordPress site — Astra + Elementor,
built on the "Eunoia" template kit). The SQL dump + `uploads/` were unpacked and
mined for real copy.

## ✅ Extracted from the `.wpress` (real Spectre content)

- **Brand identity** — name "Spectre Tech Services", domain `spectrets.com`,
  tagline direction, admin email domain.
- **Positioning copy** — verbatim or lightly edited from the export:
  - "We help brands and companies stand out in the digital age."
  - "We are a group of diverse and expert minds, who understand that brands need
    to delight and reward if they're going to earn the right to talk with people."
  - "We partner with the best-in-their-fields and fastest-growing global brands
    to consistently create superior customer experiences."
  - "We are always there for our clients, providing 24/7 support."
  - The team-roster sentence (account managers, media buyers, designers, content
    writers, creative heads, chartered accountants, financial analysts, web
    developers, tech support staff, client onboarding & success specialists).
- **Service descriptions** — the five services' copy is built from real extracted
  text:
  - **Tech Support** — the SaaS-B2B / subscription-renewal support narrative,
    24/7 client-success team, "gateway between user and developer".
  - **Web Development** — "understand the audience's problems, then design the
    content/marketing solution"; organic-ranking / on-page SEO language.
  - **Marketing** — "the cream of digital marketing experts", paid-advertising /
    bid-optimisation / keyword-expansion copy, whitehat SEO + monthly reports,
    Digital PR + LinkedIn B2B lead-gen.
  - **Accounting Services** — the Chartered Accountants paragraph (transaction
    coding, AP/AR, payroll, management financial reporting).
- **Process language** — "understand the audience first", "targeted traffic and
  performance", "allowing our team to focus on strategic growth and expansion".
- **Stats** — 25+ clients, 98% satisfaction, 3+ years (per the brief; consistent
  with the site's "Our Company by Number" section).
- **Contact numbers** — `+1 (780) 953-9476` and `+1 (917) 997-1124`, recovered
  from the database (template placeholder `+(62)21-…` discarded).
- **Logo** — the supplied `Light BG - PNG.png`, used in the navbar/footer/favicon.

## ✍️ Written on-brand (gap-filled — flagged here)

- **HR Outsourcing service** — the brief's five services include HR Outsourcing,
  but the original site sold Tech Support, Web/App Dev, Marketing/SEO, Digital
  Marketing and Accounting (no HR page existed). Its copy is **newly written**,
  consistent with Spectre's "diverse and expert minds / outsourced function"
  voice. Replace with real HR service details when available.
- **Client names in the trusted-by marquee** — `Carbon Inc.`, `Hasto Tech`,
  `Avontur Inc.`, `Spora Tech` came from the template's portfolio kit (not
  confirmed real Spectre clients); `Nimbus Cloud`, `Vertex Labs`,
  `Meridian Group`, `Helio Systems` are invented placeholders. Swap for real
  client logos/names.
- **Testimonials** — the export's testimonials were template/lorem and the DB's
  free-text was dominated by SEO spam comments, so the three quotes are
  **written on-brand** with generic attributions ("Operations Lead, SaaS-B2B
  client"). Replace with real, attributed testimonials.
- **Open roles (`/careers`)** — no jobs existed in the export. The four listed
  roles are **invented**, derived from the real team-roster sentence. The
  "General application" path is always available regardless.
- **FAQs** — assembled from real service facts in the export, but the Q&A
  *wording* is newly written (the site had a sparse template FAQ).
- **Office card / location** — presented as "Global · Remote-first" with an
  illustrative CSS radar (no real street address was reliably extractable; the
  DB contained injected spam addresses). Add a real address if there is one.
- **Social links** — point to platform homepages as placeholders; wire to real
  Spectre profiles.
- **Team member names** (Rogelio C Jost, Michael Picco, Melinda Tan in the
  export) were **template placeholders** and were intentionally **not** used.

## 🗑️ Deliberately excluded

The database carried heavy SEO-spam comment injection (e.g. "Eric / Talk With
Web Visitor", `*.ru` addresses, solar-panel and gas-price spam). None of it is
real Spectre content and all of it was excluded.
