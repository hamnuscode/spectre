'use client';

import { stats } from '@/data/site';
import { useCountUp } from '@/hooks/useCountUp';
import { Reveal } from '@/components/ui/Reveal';

export function StatsStrip() {
  return (
    <section className="relative overflow-hidden bg-ink py-12 text-white lg:py-16">
      {/* Solid navy block + angular facet corner (no gradients) */}
      <div aria-hidden className="absolute inset-0 bg-[var(--navy-deep)] opacity-60" />
      <div
        aria-hidden
        className="absolute -right-24 -top-24 h-64 w-64 bg-navy/40"
        style={{ clipPath: 'polygon(50% 0, 100% 60%, 60% 100%, 0 40%)' }}
      />
      <div aria-hidden className="absolute left-0 top-0 h-1 w-full bg-cyan" />

      <div className="container-x relative grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <Reveal>
            <p className="eyebrow mb-2 text-[var(--green)]">{`// Driving Real Growth`}</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-white text-[clamp(1.7rem,3.4vw,2.5rem)]">
              Numbers we&apos;re proud to stand behind.
            </h2>
          </Reveal>
        </div>

        <div className="grid gap-8 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90}>
              <StatItem value={s.value} suffix={s.suffix} label={s.label} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="relative">
      <div
        aria-hidden
        className="absolute -left-3 top-1 h-12 w-1 rounded-full bg-cyan"
      />
      <div className="pl-3">
        <div className="font-display text-[clamp(2.4rem,5vw,3.4rem)] font-semibold leading-none text-white">
          <span ref={ref}>{current}</span>
          <span className="text-gradient on-dark">{suffix}</span>
        </div>
        <div className="mt-2 text-xs uppercase tracking-[0.18em] text-white/65">
          {label}
        </div>
      </div>
    </div>
  );
}
