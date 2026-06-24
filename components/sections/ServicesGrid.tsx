'use client';

import Link from 'next/link';
import { services, type Service } from '@/data/services';
import { TiltCard } from '@/components/ui/TiltCard';
import { Reveal } from '@/components/ui/Reveal';

const facet: Record<Service['accent'], string> = {
  navy: 'var(--navy)',
  cyan: 'var(--cyan)',
  green: 'var(--green)',
};

/** Line icon per service. */
const icons: Record<string, React.ReactNode> = {
  'tech-support': (
    <>
      <path d="M4 13v-1a8 8 0 0 1 16 0v1" />
      <rect x="2.5" y="13" width="4" height="6" rx="1.4" />
      <rect x="17.5" y="13" width="4" height="6" rx="1.4" />
      <path d="M20 19a4 4 0 0 1-4 3h-2" />
    </>
  ),
  'web-development': <path d="m8 9-3 3 3 3m8-6 3 3-3 3M13.5 6l-3 12" />,
  marketing: (
    <>
      <path d="M3 11v2a1 1 0 0 0 1 1h2l4 4V6L6 10H4a1 1 0 0 0-1 1Z" />
      <path d="M14 8a4 4 0 0 1 0 8" />
    </>
  ),
  accounting: (
    <>
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 7h8M8 11h2m4 0h2M8 15h2m4 0h2" />
    </>
  ),
  'hr-outsourcing': (
    <>
      <circle cx="9" cy="8" r="3" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 7.5a3 3 0 0 1 0 5.4M17.5 20a5.5 5.5 0 0 0-3-4.9" />
    </>
  ),
};

/**
 * "What We Do" — five service cards (3 + 2 centered). 3D tilt with animated
 * hover border-lines. Clicking a card does NOT expand — it routes to that
 * service's section on the Services page.
 */
export function ServicesGrid() {
  return (
    <section id="services" className="container-x py-20 lg:py-28">
      {/* Header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Reveal>
            <p className="eyebrow mb-4">What We Do</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-[clamp(2rem,4.6vw,3.4rem)] leading-[1.05]">
              Five disciplines.
              <br />
              <span className="text-gradient">One focused team.</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={120}>
          <Link
            href="/services"
            data-cursor="hover"
            className="group inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--accent)]"
          >
            All Services
            <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </Reveal>
      </div>

      {/* Cards: 3 per row on lg, last 2 centered via flex-wrap */}
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {services.map((s, i) => {
          const c = facet[s.accent];
          return (
            <Reveal
              key={s.slug}
              delay={i * 60}
              className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <TiltCard glow={s.accent} className="h-full">
                <Link
                  href={`/services#${s.slug}`}
                  data-cursor="hover"
                  className="group/card relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--navy-tint)] bg-white/85 p-7 backdrop-blur-sm"
                >
                  {/* hover border lines */}
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl">
                    <i className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover/card:scale-x-100" style={{ background: c }} />
                    <i className="absolute right-0 top-0 h-full w-px origin-top scale-y-0 transition-transform delay-150 duration-300 group-hover/card:scale-y-100" style={{ background: c }} />
                    <i className="absolute bottom-0 right-0 h-px w-full origin-right scale-x-0 transition-transform delay-300 duration-300 group-hover/card:scale-x-100" style={{ background: c }} />
                    <i className="absolute bottom-0 left-0 h-full w-px origin-bottom scale-y-0 transition-transform delay-[450ms] duration-300 group-hover/card:scale-y-100" style={{ background: c }} />
                  </span>

                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden
                      className="grid h-12 w-12 place-items-center rounded-xl transition-colors duration-300"
                      style={{ background: `color-mix(in srgb, ${c} 12%, white)`, color: c }}
                    >
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                        {icons[s.slug]}
                      </svg>
                    </span>
                    <span className="font-display text-sm text-[var(--muted)]/50">
                      0{i + 1}
                    </span>
                  </div>

                  <h3 className="mt-7 text-xl">{s.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                    {s.description.length > 110
                      ? s.tagline
                      : s.description}
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[var(--accent)] opacity-0 transition-all duration-300 group-hover/card:opacity-100">
                    Explore
                    <span aria-hidden className="transition-transform duration-300 group-hover/card:translate-x-1">→</span>
                  </span>
                </Link>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
