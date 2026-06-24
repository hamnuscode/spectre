/**
 * Open roles. The .wpress export had no careers/job listings, so these are
 * tasteful, on-brand placeholders derived from the team roster Spectre
 * describes on its About page (see CONTENT-GAPS.md). The "General
 * application" path always exists in the form regardless of this list.
 */
export interface Role {
  title: string;
  team: string;
  type: string;
  location: string;
  blurb: string;
}

export const roles: Role[] = [
  {
    title: 'SaaS Tech Support Specialist',
    team: 'Client Success',
    type: 'Full-time',
    location: 'Remote',
    blurb:
      'Be the safety net for our SaaS-B2B clients — minimum response times, renewals, and a feedback loop to product.',
  },
  {
    title: 'Frontend Web Developer',
    team: 'Web Development',
    type: 'Full-time',
    location: 'Hybrid',
    blurb:
      'Build fast, accessible, conversion-focused websites and applications for fast-growing global brands.',
  },
  {
    title: 'Performance Marketing Manager',
    team: 'Marketing',
    type: 'Full-time',
    location: 'Remote',
    blurb:
      'Own paid media, bid optimisation and audience strategy — whitehat, measurable, human.',
  },
  {
    title: 'Chartered Accountant',
    team: 'Accounting',
    type: 'Full-time',
    location: 'Hybrid',
    blurb:
      'Handle transaction coding, AP/AR, payroll and management reporting for our outsourced finance clients.',
  },
];
