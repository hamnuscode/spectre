'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { Service } from '@/data/services';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

const facet: Record<Service['accent'], string> = {
  navy: 'var(--navy)',
  cyan: 'var(--cyan)',
  green: 'var(--green)',
};

/** Full per-service block on /services. Reuses the click-to-expand pattern. */
export function ServiceSection({
  service: s,
  index,
}: {
  service: Service;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  const flip = index % 2 === 1;

  return (
    <section id={s.slug} className="scroll-mt-28 bg-white py-16 lg:py-24">
      <div className="container-x grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Visual facet */}
        <Reveal className={flip ? 'lg:order-2' : ''}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl prism-border bg-offwhite">
            <div aria-hidden className="absolute inset-0 bg-offwhite" />
            <div
              aria-hidden
              className="absolute right-6 top-6 h-20 w-20 opacity-20"
              style={{
                background: facet[s.accent],
                clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
              }}
            />
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2"
              style={{
                background: facet[s.accent],
                clipPath:
                  'polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%)',
                opacity: 0.92,
              }}
            />
            <span className="absolute left-6 top-6 wordmark text-xs text-navy/50">
              0{index + 1}
            </span>
          </div>
        </Reveal>

        {/* Copy */}
        <div className={flip ? 'lg:order-1' : ''}>
          <Reveal>
            <p className="eyebrow mb-3">{s.tagline}</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)]">{s.name}</h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="mt-4 leading-relaxed text-ink/75">{s.detail}</p>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.outcomes.map((o) => (
                <span
                  key={o}
                  className="rounded-full bg-offwhite px-3 py-1.5 text-xs font-medium text-navy"
                >
                  {o}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="mt-7 overflow-hidden rounded-2xl prism-border bg-white/80">
              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                data-cursor="hover"
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-display text-base font-black text-navy">
                  What&apos;s included
                </span>
                <motion.span
                  animate={{ rotate: open ? 45 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-2xl font-light text-[var(--muted)]"
                  aria-hidden
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.25 },
                    }}
                    className="overflow-hidden"
                  >
                    <ul className="space-y-2.5 px-5 pb-5">
                      {s.included.map((inc) => (
                        <li key={inc} className="flex gap-2.5 text-sm text-ink/75">
                          <span
                            aria-hidden
                            className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45"
                            style={{ background: facet[s.accent] }}
                          />
                          {inc}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-7">
              <Button href={`/contact?service=${s.slug}`}>
                Enquire about {s.name}
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
