'use client';

import { testimonials } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TiltCard } from '@/components/ui/TiltCard';
import { Reveal } from '@/components/ui/Reveal';

export function Testimonials() {
  return (
    <section className="container-x py-20 lg:py-28">
      <SectionHeader
        eyebrow="What They Say"
        title={
          <>
            Brands that grew{' '}
            <span className="text-gradient">with Spectre.</span>
          </>
        }
        align="center"
      />
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={i} delay={i * 80}>
            <TiltCard glow={['navy', 'cyan', 'green'][i % 3] as 'navy'} className="h-full">
              <figure className="prism-border flex h-full flex-col rounded-2xl bg-white/80 p-6 backdrop-blur-sm">
                <span
                  aria-hidden
                  className="font-display text-5xl leading-none text-[var(--cyan)]"
                >
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 text-[0.98rem] leading-relaxed text-ink/80">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-[var(--navy-tint)] pt-4">
                  <div className="font-display text-base font-black text-navy">
                    {t.author}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[var(--muted)]">
                    {t.company}
                  </div>
                </figcaption>
              </figure>
            </TiltCard>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
