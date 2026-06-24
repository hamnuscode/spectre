'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { faqs } from '@/data/site';

export function FaqAccordion() {
  const [query, setQuery] = useState('');
  const [cat, setCat] = useState('All');
  const [open, setOpen] = useState<number | null>(0);

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(faqs.map((f) => f.category)))],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return faqs.filter((f) => {
      const inCat = cat === 'All' || f.category === cat;
      const inText =
        !q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q);
      return inCat && inText;
    });
  }, [query, cat]);

  return (
    <div className="container-x">
      {/* Controls */}
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="relative w-full md:max-w-sm">
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(null);
            }}
            placeholder="Search questions…"
            aria-label="Search FAQs"
            className="w-full rounded-full border border-[var(--navy-tint)] bg-white/70 px-5 py-3 pl-11 text-sm outline-none transition-all focus:border-[var(--cyan)] focus:ring-2 focus:ring-[var(--cyan)]/25"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--cyan)]"
          >
            ⌕
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => {
                setCat(c);
                setOpen(null);
              }}
              data-cursor="hover"
              className={`rounded-full px-4 py-2 text-sm transition-all duration-300 ${
                cat === c
                  ? 'bg-navy text-white'
                  : 'prism-border text-navy hover:text-[var(--cyan)]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 && (
          <p className="rounded-2xl prism-border bg-white/70 p-8 text-center text-[var(--muted)]">
            No questions match that. Try another search, or{' '}
            <a href="/contact" className="text-[var(--cyan)] underline">
              ask us directly
            </a>
            .
          </p>
        )}
        {filtered.map((f, i) => {
          const isOpen = open === i;
          return (
            <div
              key={f.q}
              className="overflow-hidden rounded-2xl prism-border bg-white/80 backdrop-blur-sm"
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                data-cursor="hover"
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-display text-lg font-black text-navy">
                  {f.q}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  aria-hidden
                  className="shrink-0 text-[var(--cyan)]"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                      opacity: { duration: 0.22 },
                    }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 leading-relaxed text-ink/75">{f.a}</p>
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
