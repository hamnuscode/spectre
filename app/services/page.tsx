import type { Metadata } from 'next';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { PageHero } from '@/components/sections/PageHero';
import { CtaBand } from '@/components/sections/CtaBand';
import { ServiceSection } from '@/components/sections/ServiceSection';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'Tech Support, Web Development, Marketing, Accounting and HR Outsourcing — five coordinated disciplines from Spectre Tech Services.',
  openGraph: {
    title: `Services — ${site.shortName}`,
    description:
      'Five coordinated disciplines: Tech Support, Web Development, Marketing, Accounting and HR Outsourcing.',
  },
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="What We Do"
        title={
          <>
            Services engineered for{' '}
            <span className="text-gradient">measurable growth.</span>
          </>
        }
        intro="Five disciplines under one roof. Explore each below — what's included, the outcomes you can expect, and where it fits your business."
      />

      {/* Quick anchor nav */}
      <nav
        aria-label="Services"
        className="container-x -mt-2 flex flex-wrap gap-2 pb-6"
      >
        {services.map((s) => (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            data-cursor="hover"
            className="prism-border rounded-full px-4 py-2 text-sm text-navy transition-colors hover:text-[var(--cyan)]"
          >
            {s.name}
          </a>
        ))}
      </nav>

      <div className="divide-y divide-[var(--navy-tint)]">
        {services.map((s, i) => (
          <ServiceSection key={s.slug} service={s} index={i} />
        ))}
      </div>

      <CtaBand />
    </>
  );
}
