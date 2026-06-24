'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot';
import { clients } from '@/data/site';

const ROBOT_SCENE_URL = 'https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode';

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

// Thin diagonal lines that grow / vanish on the hero sides.
const LINES = [
  { side: 'right', top: '8%', off: '4%', h: '38%', delay: 0, color: 'var(--cyan)' },
  { side: 'right', top: '30%', off: '9%', h: '30%', delay: 1.4, color: 'var(--green)' },
  { side: 'right', top: '0%', off: '14%', h: '26%', delay: 2.6, color: 'rgba(255,255,255,0.5)' },
  { side: 'left', top: '14%', off: '4%', h: '34%', delay: 0.8, color: 'var(--green)' },
  { side: 'left', top: '40%', off: '9%', h: '30%', delay: 2.0, color: 'var(--cyan)' },
  { side: 'left', top: '4%', off: '13%', h: '24%', delay: 3.4, color: 'rgba(255,255,255,0.45)' },
];

export function Hero() {
  const track = [...clients, ...clients];
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[var(--navy-deep)] text-white">
      {/* Animated diagonal accent lines on the sides */}
      <div aria-hidden className="absolute inset-0 overflow-hidden">
        {LINES.map((l, i) => (
          <span
            key={i}
            className="absolute w-px origin-top"
            style={{
              top: l.top,
              height: l.h,
              background: l.color,
              transform: `rotate(${l.side === 'right' ? 28 : -28}deg)`,
              animation: `growline 6s ease-in-out ${l.delay}s infinite`,
              ...(l.side === 'right' ? { right: l.off } : { left: l.off }),
            }}
          />
        ))}
      </div>

      <div className="container-x relative z-10 grid w-full items-center gap-10 pb-12 pt-[calc(var(--nav-h)+2rem)] lg:grid-cols-12 lg:gap-8">
        {/* LEFT — content */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-6">
          <motion.p variants={item} className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--green)]">
            Tech · Web · Marketing · Finance · People
          </motion.p>
          <motion.h1 variants={item} className="text-white text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[1.02]">
            We help brands <span className="text-[var(--green)]">stand out</span> in the digital age.
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-white/65">
            Spectre partners with the fastest-growing global brands — uniting
            tech support, web development, marketing, accounting and HR under one
            roof, engineered for measurable growth.
          </motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <Button href="/contact" variant="primary" className="!bg-white !text-navy hover:!bg-white/90">
              Get a Quote
            </Button>
            <Button href="/services" className="!border-white/20 !bg-white/5 !text-white backdrop-blur-sm hover:!bg-white/10">
              Explore Services
            </Button>
          </motion.div>

          {/* Trust marquee */}
          <motion.div variants={item} className="mt-12">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
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
                  <span key={i} className="whitespace-nowrap text-base font-bold tracking-tight text-white/35">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT — robot + stats glass cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="space-y-6 lg:col-span-6"
        >
          {/* Robot in glassmorphic box */}
          <div className="relative h-[320px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl sm:h-[360px]">
            <InteractiveRobotSpline scene={ROBOT_SCENE_URL} className="absolute inset-0 h-full w-full" />
            <div aria-hidden className="absolute bottom-0 right-0 h-12 w-40 rounded-tl-2xl bg-white/5 backdrop-blur-xl" />
          </div>

          {/* Stats card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold tracking-tight text-white">25+</div>
                <div className="text-sm text-white/55">Global Clients</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold tracking-tight text-white">98%</div>
                <div className="text-sm text-white/55">Satisfaction</div>
              </div>
            </div>
            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-[var(--green)]"
                initial={{ width: 0 }}
                animate={{ width: '98%' }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
              />
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-5 text-center">
              {[
                ['3+', 'Years'],
                ['24/7', 'Support'],
                ['5', 'Disciplines'],
              ].map(([v, l]) => (
                <div key={l}>
                  <div className="text-xl font-bold text-white">{v}</div>
                  <div className="text-[10px] uppercase tracking-wider text-white/45">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
