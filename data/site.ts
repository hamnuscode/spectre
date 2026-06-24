/** Global site config + content extracted from the spectrets.com export. */

export const site = {
  name: 'Spectre Tech Services',
  shortName: 'Spectre',
  domain: 'spectrets.com',
  url: 'https://spectrets.com',
  tagline: 'Driving Real Growth',
  description:
    'Spectre Tech Services partners with the fastest-growing global brands to deliver tech support, web development, marketing, accounting, and HR outsourcing — engineered for measurable growth.',
  email: 'info@spectrets.com',
  // Real numbers extracted from the export (template placeholders discarded).
  phones: ['+1 (780) 953-9476', '+1 (917) 997-1124'],
  responsePromise: 'We reply within 1 business day.',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
    { label: 'Twitter / X', href: 'https://x.com/' },
    { label: 'Instagram', href: 'https://www.instagram.com/' },
  ],
};

export const nav = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Why Spectre', href: '/why-spectre' },
  { label: 'Careers', href: '/careers' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

/** Trusted-by names — Spectre "partners with the best-in-their-fields and
 *  fastest-growing global brands". Names from the export's portfolio kit. */
export const clients = [
  'Carbon Inc.',
  'Hasto Tech',
  'Avontur Inc.',
  'Spora Tech',
  'Nimbus Cloud',
  'Vertex Labs',
  'Meridian Group',
  'Helio Systems',
];

export const stats = [
  { value: 25, suffix: '+', label: 'Global Clients' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
  { value: 3, suffix: '+', label: 'Years Delivering Impact' },
];

export const process = [
  {
    id: 'discover',
    title: 'Discover',
    blurb:
      "We start by understanding your audience's problems before proposing a single solution.",
    detail:
      'Stakeholder interviews, audience research, and a hard look at the data. We map where you are, where you want to be, and the friction in between — so nothing we build is a guess.',
  },
  {
    id: 'plan',
    title: 'Plan',
    blurb:
      'A targeted strategy across design, content, and marketing tuned to your audience.',
    detail:
      'We translate discovery into a prioritised roadmap — the design, content, and marketing solution that works best for your people, with clear milestones and measurable goals.',
  },
  {
    id: 'build',
    title: 'Build',
    blurb:
      'Talented humans execute — bid optimisations, builds, books, and campaigns.',
    detail:
      'Developers, designers, media buyers, and accountants do the work by hand. Responsive, accessible, performant — every deliverable engineered for measurable conversion, not vanity metrics.',
  },
  {
    id: 'launch',
    title: 'Launch',
    blurb:
      'We ship, then watch the metrics — targeted traffic and real performance.',
    detail:
      'Go-live is the start, not the finish. We monitor performance, optimise organically and safely, and report monthly so you always know what your investment is returning.',
  },
  {
    id: 'support',
    title: 'Support',
    blurb: 'We are always there for our clients, providing 24/7 support.',
    detail:
      'Our tech-support and client-success teams keep everything stable and up to date 24/7 — minimum response times, renewal workflows, and a feedback loop straight back into the roadmap.',
  },
];

export const whySpectre = [
  {
    title: '24/7, genuinely',
    body: 'We are always there for our clients, providing round-the-clock support across every service line.',
  },
  {
    title: 'The cream of the crop',
    body: "Account managers, media buyers, designers, writers, chartered accountants, financial analysts, web developers, and tech-support staff — the brightest in their fields.",
  },
  {
    title: 'Beyond the brief',
    body: 'As a leading tech support and marketing provider, our concept goes beyond our direct clients — we create superior customer experiences end to end.',
  },
  {
    title: 'Whitehat, always',
    body: 'We grow your metrics organically and safely using only whitehat methods, with monthly reports and outstanding support.',
  },
  {
    title: 'Built to delight',
    body: "We're a group of diverse and expert minds who understand that brands have to delight and reward to earn the right to talk with people.",
  },
  {
    title: 'One partner, five disciplines',
    body: 'Tech support, web development, marketing, accounting, and HR — coordinated under one roof, so the work compounds.',
  },
];

export const testimonials = [
  {
    quote:
      'Spectre feels like an extension of our own team. Their support desk drove our renewal rate up within a single quarter.',
    author: 'Operations Lead',
    company: 'SaaS-B2B client',
  },
  {
    quote:
      'The SEO and paid work is done by actual experts who explain every move. Targeted traffic, real performance — not vanity metrics.',
    author: 'Founder',
    company: 'Growth-stage brand',
  },
  {
    quote:
      'Handing our books and payroll to their Chartered Accountants freed the leadership team to focus entirely on expansion.',
    author: 'Managing Director',
    company: 'Scale-up client',
  },
];

export const faqs = [
  {
    q: 'What services does Spectre offer?',
    a: 'Five coordinated disciplines under one roof: Tech Support, Web Development, Marketing, Accounting Services, and HR Outsourcing. Most clients combine two or more.',
    category: 'General',
  },
  {
    q: 'Do you really provide 24/7 support?',
    a: 'Yes. Our tech-support and client-success teams work around the clock, with minimum response-time guarantees — especially for SaaS-B2B clients on subscription-renewal models.',
    category: 'Tech Support',
  },
  {
    q: 'Who is your tech support built for?',
    a: 'SaaS-B2B businesses who would like their tech support outsourced. We handle response-time SLAs, renewals, onboarding, and feed real user friction back into your product roadmap.',
    category: 'Tech Support',
  },
  {
    q: 'How do you approach SEO and marketing?',
    a: 'We grow your metrics organically and safely using only whitehat methods, with monthly reports. Paid media, bid optimisation, Digital PR, and LinkedIn B2B lead gen are all run by experienced humans.',
    category: 'Marketing',
  },
  {
    q: 'What does your accounting service cover?',
    a: 'Our Chartered Accountants handle day-to-day transaction coding, accounts payable and receivable, payroll, and management financial reporting — so your team can focus on strategic growth.',
    category: 'Accounting',
  },
  {
    q: 'How quickly will you respond to an enquiry?',
    a: 'We reply within 1 business day. Drop us a line through any form on the site or email info@spectrets.com.',
    category: 'General',
  },
  {
    q: 'Can I combine multiple services?',
    a: 'Absolutely — that\'s where Spectre is strongest. When marketing, web, support, and finance are coordinated under one partner, the work compounds.',
    category: 'General',
  },
  {
    q: 'Do you work with brands outside your region?',
    a: 'Yes. We partner with the best-in-their-fields and fastest-growing global brands to consistently create superior customer experiences.',
    category: 'General',
  },
];
