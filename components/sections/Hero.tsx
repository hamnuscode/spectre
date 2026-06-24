'use client';

import { motion } from 'framer-motion';
import { Stage3D } from '@/components/three/Stage3D';
import { Button } from '@/components/ui/Button';
import { TrustedBy } from './TrustedBy';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-[calc(var(--nav-h)+3rem)]">
      <div className="container-x grid items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6 lg:pb-24">
        {/* Content side */}
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p variants={item} className="eyebrow mb-5">
            Tech · Web · Marketing · Finance · People
          </motion.p>

          <motion.h1
            variants={item}
            className="text-[clamp(2.6rem,7vw,5rem)] leading-[1.02]"
          >
            We help brands{' '}
            <span className="relative whitespace-nowrap">
              <span className="text-gradient">stand out</span>
            </span>{' '}
            in the digital age.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-[var(--muted)]"
          >
            Spectre partners with the fastest-growing global brands — uniting
            tech support, web development, marketing, accounting and HR under
            one roof, engineered for measurable growth.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <Button href="/contact">Get a Quote</Button>
            <Button href="/services" variant="secondary">
              Explore Services
            </Button>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-12 flex items-center gap-8 text-sm text-[var(--muted)]"
          >
            <Stat n="25+" l="Global clients" />
            <span className="h-8 w-px bg-[var(--navy-tint)]" />
            <Stat n="98%" l="Satisfaction" />
            <span className="h-8 w-px bg-[var(--navy-tint)]" />
            <Stat n="24/7" l="Support" />
          </motion.div>
        </motion.div>

        {/* 3D side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative flex justify-center lg:justify-end"
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 m-auto h-3/4 w-3/4 rounded-full opacity-60 blur-3xl"
            style={{ background: 'var(--grad-prism-soft)' }}
          />
          <Stage3D variant="hero" />
        </motion.div>
      </div>

      {/* Trusted-by marquee — lives in the hero */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="container-x pb-16 lg:pb-20"
      >
        <TrustedBy />
      </motion.div>

      {/* Angular section divider */}
      <div
        aria-hidden
        className="h-[6vw] w-full bg-offwhite"
        style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%, 0 100%)' }}
      />
    </section>
  );
}

function Stat({ n, l }: { n: string; l: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-black text-navy">{n}</div>
      <div className="text-xs uppercase tracking-wider">{l}</div>
    </div>
  );
}
