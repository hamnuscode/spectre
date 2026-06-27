'use client';

import { motion } from 'framer-motion';
import { CountUp } from '@/components/ui/CountUp';

/**
 * Skinny dark stats band — sits under "What We Do". Animated counters on a
 * deep-navy strip, with a subtle brand gradient wash, icon tiles per stat,
 * and hairline separators. The whole row reveals on scroll into view.
 */
const stats = [
  {
    to: 25,
    suffix: '+',
    v: '',
    l: 'Global Clients',
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
      </>
    ),
  },
  {
    to: 98,
    suffix: '%',
    v: '',
    l: 'Satisfaction',
    icon: (
      <>
        <path d="M3 17l6-6 4 4 7-7" />
        <path d="M17 8h4v4" />
      </>
    ),
  },
  {
    to: 3,
    suffix: '+',
    v: '',
    l: 'Years',
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />,
  },
  {
    to: 0,
    suffix: '',
    v: '24/7',
    l: 'Support',
    icon: (
      <>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </>
    ),
  },
  {
    to: 5,
    suffix: '',
    v: '',
    l: 'Disciplines',
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
      </>
    ),
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
};

export function StatsStrip() {
  return (
    <section className="relative overflow-hidden bg-[var(--navy-deep)] text-white">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(50% 120% at 15% 50%, rgba(39,183,207,0.18), transparent 70%), radial-gradient(50% 120% at 85% 50%, rgba(43,215,127,0.16), transparent 70%)',
        }}
      />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="container-x relative z-10 grid grid-cols-2 gap-x-6 gap-y-10 py-16 text-center sm:grid-cols-3 lg:grid-cols-5 lg:py-24"
      >
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            variants={item}
            className={
              i > 0
                ? 'lg:border-l lg:border-white/10'
                : undefined
            }
          >
            <span
              aria-hidden
              className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-white/[0.06] text-[var(--cyan)] ring-1 ring-white/10"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                {s.icon}
              </svg>
            </span>
            <div className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              {s.v ? s.v : <CountUp to={s.to} suffix={s.suffix} />}
            </div>
            <div className="mt-2 text-xs uppercase tracking-wider text-white/55">{s.l}</div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
