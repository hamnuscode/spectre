'use client';

import { motion } from 'framer-motion';
import { GlowyWavesHero } from '@/components/ui/glowy-waves-hero-shadcnui';
import { Globe } from '@/components/ui/Globe';
import { Button } from '@/components/ui/Button';
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
  return (
    <section className="relative overflow-hidden bg-[var(--navy-deep)] text-white">
      {/* Kept wave-lines animation as the hero background */}
      <div aria-hidden className="absolute inset-0">
        <GlowyWavesHero className="!min-h-0 h-full !rounded-none" />
      </div>
      <div aria-hidden className="absolute inset-0 bg-[var(--navy-deep)]/40" />

      <div className="container-x relative z-10 grid items-start gap-10 pb-16 pt-[calc(var(--nav-h)+3rem)] lg:grid-cols-12 lg:gap-8 lg:pb-24">
        {/* LEFT — content */}
        <motion.div variants={container} initial="hidden" animate="show" className="lg:col-span-7">
          <motion.p variants={item} className="mb-5 text-xs font-semibold uppercase tracking-[0.26em] text-[var(--green)]">
            Tech · Web · Marketing · Finance · People
          </motion.p>
          <motion.h1 variants={item} className="text-white text-[clamp(2.6rem,6.5vw,4.8rem)] leading-[1.02]">
            We help brands{' '}
            <span className="bg-gradient-to-r from-[var(--cyan)] to-[var(--green)] bg-clip-text text-transparent">
              stand out
            </span>{' '}
            in the digital age.
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
        </motion.div>

        {/* RIGHT — glass cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
          className="space-y-6 lg:col-span-5 lg:mt-6"
        >
          {/* Stats card with globe */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <div className="flex items-center gap-5">
              <div className="h-24 w-24 shrink-0">
                <Globe />
              </div>
              <div>
                <div className="text-3xl font-bold tracking-tight text-white">25+</div>
                <div className="text-sm text-white/55">Global Clients</div>
              </div>
            </div>

            <div className="mt-7 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-white/55">Client Satisfaction</span>
                <span className="font-medium text-white">98%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-[var(--cyan)] to-[var(--green)]"
                  initial={{ width: 0 }}
                  animate={{ width: '98%' }}
                  transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.8 }}
                />
              </div>
            </div>

            <div className="my-6 h-px w-full bg-white/10" />

            <div className="grid grid-cols-3 gap-2 text-center">
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

          {/* Trusted marquee card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 py-7 backdrop-blur-xl">
            <h3 className="mb-5 px-7 text-sm font-medium text-white/55">
              Trusted by industry leaders
            </h3>
            <div
              className="relative flex overflow-hidden"
              style={{
                maskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
                WebkitMaskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
              }}
            >
              <div className="flex shrink-0 animate-marquee items-center gap-10 px-5" style={{ ['--marquee-duration' as string]: '32s' }}>
                {track.map((name, i) => (
                  <span key={i} className="whitespace-nowrap text-lg font-bold tracking-tight text-white/40">
                    {name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
