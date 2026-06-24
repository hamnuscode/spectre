/**
 * Single source of truth for Spectre services.
 * Drives: home services grid, /services page, and all service dropdowns.
 * Copy sourced from the spectrets.com .wpress export where available
 * (see CONTENT-GAPS.md for what was extracted vs. written on-brand).
 */

export type ServiceSlug =
  | 'tech-support'
  | 'web-development'
  | 'marketing'
  | 'accounting'
  | 'hr-outsourcing';

export interface Service {
  slug: ServiceSlug;
  name: string;
  tagline: string;
  /** Short label used in dropdowns */
  short: string;
  description: string;
  /** Longer paragraph for the dedicated services page */
  detail: string;
  included: string[];
  outcomes: string[];
  /** Accent used for the prism facet on this service */
  accent: 'navy' | 'cyan' | 'green';
}

export const services: Service[] = [
  {
    slug: 'tech-support',
    name: 'Tech Support',
    short: 'Tech Support',
    tagline: 'White-glove SaaS support, around the clock.',
    description:
      "Customer support is the safety net for your clients — and the gateway between user and developer. Spectre's SaaS Tech Support team keeps your subscription-renewal models stable, responsive, and loved.",
    detail:
      "You create an awesome product, spend a little on marketing, acquire new users — and then they get stuck somewhere. That's where Spectre's SaaS Tech Support Services come in. From minimum-response-time guarantees to driving monthly subscription renewals, our tech support and client-success team works 24/7. Tech support is also where new product ideas are born: we feed real user friction back into your roadmap and data management.",
    included: [
      '24/7 multi-channel support (chat, email, ticketing)',
      'Subscription renewal & churn-reduction workflows',
      'Onboarding & client-success specialists',
      'Maintenance & uptime monitoring for renewal-based models',
      'Structured product feedback loop to your dev team',
    ],
    outcomes: [
      'Minimum response-time SLAs',
      'Higher renewal & retention rates',
      'Lower support cost per ticket',
    ],
    accent: 'cyan',
  },
  {
    slug: 'web-development',
    name: 'Web Development',
    short: 'Web Development',
    tagline: 'Sites and applications engineered to convert.',
    description:
      'We start by understanding your audience\'s problems, then design the content, build, and experience that works best for them — fast, responsive, and ranked.',
    detail:
      "Spectre's web developers, designers, and content team build websites and applications around a single question: what does your audience actually need? We improve the way your website ranks in organic search, practising and refining each page's appearance and performance. Every build is responsive, accessible, and tuned for measurable conversion — not vanity metrics.",
    included: [
      'Custom website & web-application development',
      'Responsive, accessible, SEO-ready front-ends',
      'Conversion-focused UX & content design',
      'On-page SEO and Core Web Vitals optimisation',
      'Ongoing maintenance & iterative improvement',
    ],
    outcomes: [
      'Improved organic search ranking',
      'Faster, conversion-optimised pages',
      'Scalable, maintainable codebase',
    ],
    accent: 'navy',
  },
  {
    slug: 'marketing',
    name: 'Marketing',
    short: 'Marketing',
    tagline: 'The cream of digital marketing experts.',
    description:
      'A more engaging way to reach your audience — with the added advantages of cost-effectiveness, wider reach, easy targeting, flexibility, and measurement.',
    detail:
      "At Spectre we have the cream of digital marketing experts, with deep experience across the foundational elements of paid advertising. Bid optimisations, keyword expansion, breaking out different products, talking to different audiences — it's all done by talented humans. Our SEO specialists grow your organic rankings safely with whitehat methods and monthly reporting, and our Digital PR services amplify everything, delivering tremendous results when paired with a strong SEO game plan.",
    included: [
      'Paid advertising & bid optimisation (PPC)',
      'Whitehat SEO with monthly reporting',
      'Digital PR & LinkedIn B2B lead generation',
      'Content, creative & brand strategy',
      'Audience segmentation & performance analytics',
    ],
    outcomes: [
      'More qualified, targeted traffic',
      'Higher organic rankings, safely',
      'Better customer engagement & ROI',
    ],
    accent: 'green',
  },
  {
    slug: 'accounting',
    name: 'Accounting Services',
    short: 'Accounting Services',
    tagline: 'Chartered accountants who free you to grow.',
    description:
      'A team of highly qualified Chartered Accountants who handle your day-to-day financial operations — so you can focus on strategic growth and expansion.',
    detail:
      "Spectre's Chartered Accountants handle your day-to-day transaction coding, accounts payable, accounts receivable, payroll, management financial reporting, and other financial matters. By taking the books off your plate, we let your team focus on strategic growth and expansion — with accurate, audit-ready numbers behind every decision.",
    included: [
      'Day-to-day transaction coding & bookkeeping',
      'Accounts payable & accounts receivable',
      'Payroll processing',
      'Management financial reporting',
      'Audit-ready records & compliance support',
    ],
    outcomes: [
      'Accurate, timely financials',
      'Reduced finance overhead',
      'More time for strategic growth',
    ],
    accent: 'navy',
  },
  {
    slug: 'hr-outsourcing',
    name: 'HR Outsourcing',
    short: 'HR Outsourcing',
    tagline: 'The people function, handled — so you can scale.',
    description:
      'From hiring and onboarding to payroll and people operations, Spectre runs your HR function with the same diverse, expert minds behind our other services.',
    detail:
      "Spectre is a group of diverse and expert minds — account managers, designers, writers, chartered accountants, developers, and client-success specialists. We extend that bench into your business as a fully outsourced HR function: recruitment, onboarding, payroll coordination, compliance, and ongoing people operations. You get a senior team delivering customised services without the cost of building one in-house.",
    included: [
      'Recruitment & candidate screening',
      'Onboarding & employee lifecycle management',
      'Payroll coordination & benefits administration',
      'HR compliance & policy documentation',
      'Ongoing people-operations support',
    ],
    outcomes: [
      'Faster, better hiring',
      'Compliant, consistent HR ops',
      'Lower cost than an in-house team',
    ],
    accent: 'cyan',
  },
];

export const serviceBySlug = (slug: string) =>
  services.find((s) => s.slug === slug);

export const serviceOptions = services.map((s) => ({
  value: s.slug,
  label: s.short,
}));
