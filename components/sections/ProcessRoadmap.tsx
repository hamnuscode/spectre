'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { process } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';

export function ProcessRoadmap() {
  const [active, setActive] = useState(0);
  const pct = (active / (process.length - 1)) * 100;

  return (
    <section className="bg-offwhite py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="How We Work"
          title={
            <>
              A process that feels{' '}
              <span className="text-gradient">alive.</span>
            </>
          }
          intro="From first conversation to ongoing support — hover or tap each step to see how Spectre delivers."
        />

        {/* Step rail */}
        <div className="relative mt-16">
          {/* Base line */}
          <div className="absolute left-0 right-0 top-5 hidden h-0.5 bg-[var(--navy-tint)] md:block" />
          {/* Progress line */}
          <motion.div
            className="absolute left-0 top-5 hidden h-0.5 md:block"
            style={{ background: 'var(--grad-prism)' }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />

          <ol className="grid gap-6 md:grid-cols-5 md:gap-2">
            {process.map((step, i) => {
              const done = i <= active;
              return (
                <li key={step.id} className="relative">
                  <button
                    onClick={() => setActive(i)}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    data-cursor="hover"
                    aria-pressed={active === i}
                    className="flex w-full items-center gap-3 text-left md:flex-col md:items-start md:gap-4"
                  >
                    <span
                      className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 font-display text-sm font-black transition-all duration-300"
                      style={{
                        background: done ? 'var(--navy)' : '#fff',
                        borderColor: done ? 'var(--navy)' : 'var(--navy-tint)',
                        color: done ? '#fff' : 'var(--muted)',
                      }}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`font-display text-base font-black transition-colors duration-300 ${
                        active === i ? 'text-navy' : 'text-[var(--muted)]'
                      }`}
                    >
                      {step.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Active detail panel */}
        <div className="relative mt-10 min-h-[140px] overflow-hidden rounded-2xl prism-border bg-white/80 p-7 backdrop-blur-sm md:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={process[active].id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3">
                <span className="wordmark text-xs text-[var(--cyan)]">
                  Step {active + 1}
                </span>
                <span className="h-px flex-1 bg-[var(--navy-tint)]" />
              </div>
              <h3 className="mt-3 text-2xl">{process[active].title}</h3>
              <p className="mt-3 max-w-2xl leading-relaxed text-ink/70">
                {process[active].detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
