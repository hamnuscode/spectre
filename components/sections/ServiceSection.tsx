'use client';

import Link from 'next/link';
import type { Service } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import { ServiceIcon } from '@/components/ui/ServiceIcon';

const facet: Record<Service['accent'], string> = {
  navy: 'var(--navy)',
  cyan: 'var(--cyan)',
  green: 'var(--green)',
};

/**
 * Full per-service block on /services. Alternating zigzag layout: a text
 * column (number + icon, tagline, title, description, CTA) beside a
 * "what's included" card with a coloured top accent. Clean, no toggles.
 */
export function ServiceSection({
  service: s,
  index,
}: {
  service: Service;
  index: number;
}) {
  const c = facet[s.accent];
  const flip = index % 2 === 1;

  const text = (
    <Reveal className={flip ? 'lg:order-2' : ''}>
      <div className="flex items-center gap-4">
        <span className="font-display text-sm font-semibold text-[var(--muted)]/60">
          0{index + 1}
        </span>
        <span
          aria-hidden
          className="grid h-11 w-11 place-items-center rounded-xl"
          style={{ background: `color-mix(in srgb, ${c} 12%, white)`, color: c }}
        >
          <ServiceIcon slug={s.slug} />
        </span>
      </div>
      <p className="mt-6 italic text-[var(--muted)]">{s.tagline}</p>
      <h2 className="mt-2 text-[clamp(1.9rem,3.6vw,2.7rem)]">{s.name}</h2>
      <p className="mt-4 max-w-xl leading-relaxed text-[var(--muted)]">
        {s.detail}
      </p>
      <Link
        href={`/contact?service=${s.slug}`}
        data-cursor="hover"
        className="group mt-7 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-[var(--accent)]"
      >
        Start This Service
        <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">→</span>
      </Link>
    </Reveal>
  );

  const card = (
    <Reveal delay={80} className={flip ? 'lg:order-1' : ''}>
      <div className="relative overflow-hidden rounded-2xl bg-offwhite p-7 md:p-9">
        <span aria-hidden className="absolute inset-x-0 top-0 h-1" style={{ background: c }} />
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
          What&apos;s included
        </p>
        <ul className="mt-6 space-y-4">
          {s.included.map((inc) => (
            <li key={inc} className="flex items-center gap-3 text-[0.97rem] text-ink/80">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="shrink-0" aria-hidden>
                <path d="M21 12a9 9 0 1 1-2.6-6.3" />
                <path d="m8.5 11.5 2.5 2.5 5-5.5" />
              </svg>
              {inc}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );

  return (
    <section id={s.slug} className="scroll-mt-28 py-14 lg:py-20">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {text}
        {card}
      </div>
    </section>
  );
}
