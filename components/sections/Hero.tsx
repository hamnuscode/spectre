'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { SplineScene } from '@/components/ui/SplineScene';
import { BackgroundPaths } from '@/components/ui/BackgroundPaths';
import { clients } from '@/data/site';

// Robot scene ported from the Greply project hero.
const ROBOT_SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export function Hero() {
  const track = [...clients, ...clients];
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const yRobot = useTransform(scrollYProgress, [0, 1], [0, -24]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-offwhite text-ink"
    >
      {/* Visible brand gradient washes */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 60% at 82% 18%, rgba(39,183,207,0.22), transparent 70%), radial-gradient(55% 55% at 8% 92%, rgba(43,215,127,0.18), transparent 72%), radial-gradient(50% 50% at 50% 0%, rgba(7,48,109,0.10), transparent 70%)',
        }}
      />
      {/* Animated floating background paths */}
      <BackgroundPaths tone="light" />

      <div className="container-x relative z-10 flex flex-1 items-center">
        <div className="grid w-full items-center gap-10 pb-12 pt-[calc(var(--nav-h)+2rem)] lg:grid-cols-12 lg:gap-8">
          {/* LEFT — content */}
          <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-6">
            <motion.p variants={item} className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--accent)]">
              Tech · Web · Marketing · Finance · People
            </motion.p>
            <motion.h1 variants={item} className="text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[1.02]">
              We help brands <span className="text-gradient">stand out</span> in the digital age.
            </motion.h1>
            <motion.p variants={item} className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-[var(--muted)]">
              Spectre partners with the fastest-growing global brands — uniting
              tech support, web development, marketing, accounting and HR under one
              roof, engineered for measurable growth.
            </motion.p>
            <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
              <Button href="/contact" variant="primary">
                Get a Quote
              </Button>
              <Button href="/services" variant="secondary">
                Explore Services
              </Button>
            </motion.div>
          </motion.div>

          {/* RIGHT — bare robot, no box */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
            className="lg:col-span-6"
          >
            {/* Robot floats free — transparent container, just enough overflow
                clip to crop the Spline watermark. revealAfter skips the
                start-up zoom-out so only the settled pose is shown. */}
            <motion.div
              style={{ y: yRobot }}
              className="relative h-[480px] overflow-hidden sm:h-[600px] lg:h-[680px]"
            >
              <SplineScene
                scene={ROBOT_SCENE_URL}
                revealAfter={1500}
                className="absolute inset-x-0 top-0 h-[calc(100%+90px)] w-full"
              />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Trusted-by strip — full-width chip marquee */}
      <div className="relative z-10 border-t border-[var(--navy-tint)]/70 bg-white/40 py-6 backdrop-blur-sm">
        <div className="container-x mb-4 flex items-center gap-4">
          <span aria-hidden className="h-px flex-1 bg-[var(--navy-tint)]" />
          <span className="wordmark text-[0.7rem] text-[var(--muted)]">Trusted By</span>
          <span aria-hidden className="h-px flex-1 bg-[var(--navy-tint)]" />
        </div>
        <div
          className="relative flex overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <div className="flex shrink-0 animate-marquee items-center gap-4 pr-4" style={{ ['--marquee-duration' as string]: '36s' }}>
            {track.map((name, i) => (
              <span
                key={i}
                className="whitespace-nowrap rounded-xl border border-[var(--navy-tint)] bg-white/70 px-6 py-2.5 text-sm font-semibold text-navy/70 shadow-[0_8px_24px_-18px_rgba(7,48,109,0.4)] backdrop-blur-sm"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
