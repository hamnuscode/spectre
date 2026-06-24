'use client';

import { motion } from 'framer-motion';

export function PageHero({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <header className="relative overflow-hidden pt-[calc(var(--nav-h)+3.5rem)]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{ background: 'var(--grad-prism-soft)' }}
      />
      <div className="container-x pb-14 lg:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow mb-5"
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.07 }}
          className="max-w-4xl text-[clamp(2.4rem,6vw,4.4rem)]"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.14 }}
            className="mt-6 max-w-2xl text-[1.12rem] leading-relaxed text-[var(--muted)]"
          >
            {intro}
          </motion.p>
        )}
      </div>
      <div
        aria-hidden
        className="h-[5vw] w-full bg-offwhite"
        style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }}
      />
    </header>
  );
}
