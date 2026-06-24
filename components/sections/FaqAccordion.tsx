'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqs } from '@/data/site';

/** Clean, minimal FAQ accordion — a centered single column with hairline
 *  dividers and a smooth expand. No search/filter clutter. */
export function FaqAccordion() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="container-x">
      <div className="mx-auto max-w-3xl">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q} className="border-b border-[var(--navy-tint)]">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                data-cursor="hover"
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[1.05rem] font-medium text-navy">{f.q}</span>
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isOpen ? 'border-[var(--accent)] bg-[var(--accent)] text-white' : 'border-[var(--navy-tint)] text-navy'
                  }`}
                  aria-hidden
                >
                  <motion.svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </motion.svg>
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ height: { duration: 0.32, ease: [0.16, 1, 0.3, 1] }, opacity: { duration: 0.22 } }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-12 leading-relaxed text-[var(--muted)]">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
