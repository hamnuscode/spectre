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
        intro="Click any service to expand what's included. Most clients combine two or more — that's where the work compounds."
      />

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((s, i) => {
          const isOpen = open === s.slug;
          return (
            <Reveal key={s.slug} delay={i * 60}>
              <TiltCard glow={s.accent} className="h-full">
                <button
                  onClick={() => setOpen(isOpen ? null : s.slug)}
                  aria-expanded={isOpen}
                  data-cursor="hover"
                  className="prism-border flex h-full w-full flex-col rounded-2xl bg-white/80 p-6 text-left backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <span
                      aria-hidden
                      className="grid h-11 w-11 place-items-center rounded-xl text-white"
                      style={{
                        background: facet[s.accent],
                        clipPath:
                          'polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%)',
                      }}
                    >
                      <span className="font-display text-lg font-black">
                        {s.name[0]}
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-2xl font-light text-[var(--muted)]"
                      aria-hidden
                    >
                      +
                    </motion.span>
                  </div>

                  <h3 className="mt-5 text-xl">{s.name}</h3>
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
                        <p className="mt-4 text-sm leading-relaxed text-ink/70">
                          {s.description}
                        </p>
                        <p className="mt-4 text-xs font-medium uppercase tracking-wider text-[var(--cyan)]">
                          What&apos;s included
                        </p>
                        <ul className="mt-3 space-y-2">
                          {s.included.map((inc) => (
                            <li
                              key={inc}
                              className="flex gap-2.5 text-sm text-ink/75"
                            >
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
                </button>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
