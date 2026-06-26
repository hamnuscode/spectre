'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Stage3D } from '@/components/three/Stage3D';
import { BackgroundPaths } from '@/components/ui/BackgroundPaths';
import { GeometricShapes } from '@/components/ui/GeometricShapes';
import { CountUp } from '@/components/ui/CountUp';
import { clients } from '@/data/site';

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
  const yStats = useTransform(scrollYProgress, [0, 1], [0, -56]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center overflow-hidden bg-offwhite text-ink"
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
      {/* Morphing geometric shapes */}
      <GeometricShapes opacity={0.4} />

      <div className="container-x relative z-10 grid w-full items-center gap-10 pb-12 pt-[calc(var(--nav-h)+2rem)] lg:grid-cols-12 lg:gap-8">
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

          {/* Trust marquee */}
          <motion.div variants={item} className="mt-12">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--muted)]/60">
              Trusted by industry leaders
            </p>
            <div
              className="relative flex overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 12%, black 88%, transparent)',
              }}
            >
              <div className="flex shrink-0 animate-marquee items-center gap-10 pr-10" style={{ ['--marquee-duration' as string]: '34s' }}>
                {track.map((name, i) => (
                  <span key={i} className="whitespace-nowrap text-base font-bold tracking-tight text-navy/35">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — CPU + stats glass cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="space-y-6 lg:col-span-6"
        >
          {/* CPU in a glass box */}
          <motion.div
            style={{ y: yRobot }}
            className="glass relative grid h-[320px] place-items-center overflow-hidden rounded-3xl shadow-[0_40px_90px_-50px_rgba(7,48,109,0.55)] sm:h-[360px]"
          >
            <div className="absolute inset-0 opacity-70">
              <GeometricShapes opacity={0.35} />
            </div>
            <div className="relative h-full w-full">
              <Stage3D variant="cpu" className="h-full w-full" />
            </div>
          </motion.div>

          {/* Stats card */}
          <motion.div style={{ y: yStats }} className="glass rounded-3xl p-7 shadow-[0_30px_70px_-45px_rgba(7,48,109,0.5)]">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold tracking-tight text-navy">
                  <CountUp to={25} suffix="+" />
                </div>
                <div className="text-sm text-[var(--muted)]">Global Clients</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold tracking-tight text-navy">
                  <CountUp to={98} suffix="%" />
                </div>
                <div className="text-sm text-[var(--muted)]">Satisfaction</div>
              </div>
            </div>
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-[var(--navy-tint)]">
              <motion.div
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--cyan), var(--green))' }}
                initial={{ width: 0 }}
                whileInView={{ width: '98%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-[var(--navy-tint)] pt-5 text-center">
              {[
                { to: 3, suffix: '+', v: '', l: 'Years' },
                { to: 0, suffix: '', v: '24/7', l: 'Support' },
                { to: 5, suffix: '', v: '', l: 'Disciplines' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-xl font-bold text-navy">
                    {s.v ? s.v : <CountUp to={s.to} suffix={s.suffix} />}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-[var(--muted)]/70">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
