'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { services, type Service } from '@/data/services';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';
import { cn } from '@/lib/utils';

const facet: Record<Service['accent'], string> = {
  navy: 'var(--navy)',
  cyan: 'var(--cyan)',
  green: 'var(--green)',
};

/**
 * "What We Do" — a full-width editorial disclosure list. Each service is a
 * large numbered row; clicking expands it in place to a two-column detail
 * (overview + outcomes on the left, "what's included" on the right). One row
 * open at a time; height animates smoothly. Hover shifts the row colour and
 * reveals its accent facet. No gradients, transform/opacity motion only.
 */
export function ServicesGrid() {
  const [open, setOpen] = useState<string | null>(services[0].slug);

  return (
    <section id="services" className="container-x py-20 lg:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader
          eyebrow="What We Do"
          title={
            <>
              Five disciplines,{' '}
              <span className="text-gradient">one partner.</span>
            </>
          }
        />
        <Reveal>
          <p className="max-w-xs text-sm leading-relaxed text-[var(--muted)] md:text-right">
            Open any service to see what&apos;s included. Most clients combine
            two or more — that&apos;s where the work compounds.
          </p>
        </Reveal>
      </div>

      <div className="mt-12 border-t border-[var(--navy-tint)]">
        {services.map((s, i) => {
          const isOpen = open === s.slug;
          return (
            <Reveal key={s.slug}>
              <div
                className={cn(
                  'group border-b border-[var(--navy-tint)] transition-colors duration-300',
                  isOpen ? 'bg-offwhite' : 'hover:bg-offwhite/60'
                )}
              >
                {/* Row header */}
                <button
                  onClick={() => setOpen(isOpen ? null : s.slug)}
                  aria-expanded={isOpen}
                  data-cursor="hover"
                  className="relative flex w-full items-center gap-5 py-7 pl-5 pr-4 text-left md:gap-8 md:py-8 md:pl-8"
                >
                  {/* Active accent bar */}
                  <span
                    aria-hidden
                    className={cn(
                      'absolute left-0 top-1/2 h-0 w-1 -translate-y-1/2 transition-all duration-300',
                      isOpen ? 'h-2/3' : 'group-hover:h-1/3'
                    )}
                    style={{ background: facet[s.accent] }}
                  />
                  <span className="w-10 shrink-0 font-display text-lg font-medium text-[var(--muted)]">
                    0{i + 1}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-[clamp(1.5rem,3.4vw,2.5rem)] font-bold leading-tight text-navy">
                      {s.name}
                    </span>
                    <span
                      className={cn(
                        'mt-1 hidden text-sm text-[var(--muted)] transition-opacity duration-300 sm:block',
                        isOpen ? 'opacity-0' : 'opacity-100'
                      )}
                    >
                      {s.tagline}
                    </span>
                  </span>

                  {/* Facet + toggle */}
                  <span
                    aria-hidden
                    className={cn(
                      'hidden h-9 w-9 shrink-0 transition-all duration-300 md:block',
                      isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    )}
                    style={{
                      background: facet[s.accent],
                      clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
                    }}
                  />
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-[var(--navy-tint)] text-xl font-light text-navy"
                    aria-hidden
                  >
                    +
                  </motion.span>
                </button>

                {/* Expanding detail */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                        opacity: { duration: 0.3 },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="grid gap-8 pb-10 pl-5 pr-4 md:grid-cols-[1.1fr_1fr] md:gap-14 md:pl-[4.5rem] md:pr-8">
                        <div>
                          <p className="text-[1.02rem] leading-relaxed text-ink/75">
                            {s.description}
                          </p>
                          <div className="mt-6 flex flex-wrap gap-2">
                            {s.outcomes.map((o) => (
                              <span
                                key={o}
                                className="rounded-full border border-[var(--navy-tint)] bg-white px-3 py-1.5 text-xs font-medium text-navy"
                              >
                                {o}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--cyan)]">
                            What&apos;s included
                          </p>
                          <ul className="mt-4 grid gap-y-2.5 sm:grid-cols-2 sm:gap-x-6">
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
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
