import type { Metadata } from 'next';
import { services } from '@/data/services';
import { site } from '@/data/site';
import { ServiceSection } from '@/components/sections/ServiceSection';
import { Testimonials } from '@/components/sections/Testimonials';
import { Stage3D } from '@/components/three/Stage3D';

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
      {/* Hero with 3D accent */}
      <header className="relative overflow-hidden pt-[calc(var(--nav-h)+3rem)]">
        <div className="container-x grid items-center gap-10 pb-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow mb-5">What We Do</p>
            <h1 className="text-[clamp(2.4rem,5.6vw,4rem)]">
              Services engineered for{' '}
              <span className="text-gradient">measurable growth.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-[var(--muted)]">
              Five disciplines under one roof. Explore each below — what&apos;s
              included, the outcomes you can expect, and where it fits your
              business.
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <Stage3D variant="ico" />
          </div>
        </div>
      </header>

      {/* Quick anchor nav */}
      <nav
        aria-label="Services"
        className="container-x flex flex-wrap gap-2 pb-6"
      >
        {services.map((s) => (
          <a
            key={s.slug}
            href={`#${s.slug}`}
            data-cursor="hover"
            className="rounded-full border border-[var(--navy-tint)] px-4 py-2 text-sm text-navy transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
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

      <Testimonials />
    </>
  );
}
