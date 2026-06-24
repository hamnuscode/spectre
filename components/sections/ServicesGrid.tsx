'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { services, type Service } from '@/data/services';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { TiltCard } from '@/components/ui/TiltCard';
import { Reveal } from '@/components/ui/Reveal';

const facet: Record<Service['accent'], string> = {
  navy: 'var(--navy)',
  cyan: 'var(--cyan)',
  green: 'var(--green)',
};

/**
 * "What We Do" — a grid of 3D tilt cards. Hovering draws brand-coloured
 * border lines around the card (4 edges animate in via scale transforms,
 * staggered to trace the outline). Clicking expands the card in place to
 * reveal the overview + "what's included" (smooth height animation).
 */
export function ServicesGrid() {
  const [open, setOpen] = useState<string | null>(services[0].slug);

  return (
    <section id="services" className="container-x py-20 lg:py-28">
      <SectionHeader
        eyebrow="What We Do"
        title={
          <>
            Five disciplines,{' '}
            <span className="text-gradient">one partner.</span>
          </>
        }
        intro="Hover to trace a card, click to open it. Most clients combine two or more — that's where the work compounds."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const isOpen = open === s.slug;
          const c = facet[s.accent];
          return (
            <Reveal key={s.slug} delay={i * 60}>
              <TiltCard glow={s.accent} className="h-full">
                <button
                  onClick={() => setOpen(isOpen ? null : s.slug)}
                  aria-expanded={isOpen}
                  data-cursor="hover"
                  className="group/card relative flex h-full w-full flex-col rounded-2xl border border-[var(--navy-tint)] bg-white/85 p-6 text-left backdrop-blur-sm"
                >
                  {/* Animated hover border lines (draw around the card) */}
                  <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl">
                    <i
                      className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 group-hover/card:scale-x-100"
                      style={{ background: c }}
                    />
                    <i
                      className="absolute right-0 top-0 h-full w-px origin-top scale-y-0 transition-transform delay-150 duration-300 group-hover/card:scale-y-100"
                      style={{ background: c }}
                    />
                    <i
                      className="absolute bottom-0 right-0 h-px w-full origin-right scale-x-0 transition-transform delay-300 duration-300 group-hover/card:scale-x-100"
                      style={{ background: c }}
                    />
                    <i
                      className="absolute bottom-0 left-0 h-full w-px origin-bottom scale-y-0 transition-transform delay-[450ms] duration-300 group-hover/card:scale-y-100"
                      style={{ background: c }}
                    />
                  </span>

                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden
                      className="grid h-12 w-12 place-items-center text-white"
                      style={{
                        background: c,
                        clipPath: 'polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%)',
                      }}
                    >
                      <span className="font-display text-lg font-semibold">
                        {s.name[0]}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="grid h-8 w-8 place-items-center rounded-full border border-[var(--navy-tint)] text-lg font-light text-navy"
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </div>

                  <h3 className="mt-5 text-2xl">{s.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                    {s.tagline}
                  </p>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          height: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
                          opacity: { duration: 0.25 },
                        }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-sm leading-relaxed text-ink/75">
                          {s.description}
                        </p>
                        <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                          What&apos;s included
                        </p>
                        <ul className="mt-3 space-y-2">
                          {s.included.map((inc) => (
                            <li key={inc} className="flex gap-2.5 text-sm text-ink/75">
                              <span
                                aria-hidden
                                className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45"
                                style={{ background: c }}
                              />
                              {inc}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
