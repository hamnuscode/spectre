'use client';

import { stats } from '@/data/site';
import { useCountUp } from '@/hooks/useCountUp';
import { Reveal } from '@/components/ui/Reveal';

export function StatsStrip() {
  return (
    <section className="relative overflow-hidden bg-ink py-20 text-white lg:py-28">
      {/* Prismatic accent glows */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-70"
        style={{
          background:
            'radial-gradient(40vw 40vw at 15% 20%, rgba(7,48,109,0.55), transparent 60%), radial-gradient(36vw 36vw at 85% 80%, rgba(39,183,207,0.22), transparent 60%)',
        }}
      />
      <div
        aria-hidden
        className="absolute left-0 top-0 h-1 w-full"
        style={{ background: 'var(--grad-prism)' }}
      />

      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow mb-3 text-[var(--green)]">{`// Driving Real Growth`}</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="max-w-2xl text-white text-[clamp(2rem,4.4vw,3.2rem)]">
            Numbers we&apos;re proud to stand behind.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-3">
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
        className="absolute -left-3 top-1 h-12 w-1 rounded-full"
        style={{ background: 'var(--grad-prism)' }}
      />
      <div className="pl-3">
        <div className="font-display text-[clamp(3rem,7vw,4.6rem)] font-black leading-none text-white">
          <span ref={ref}>{current}</span>
          <span className="text-gradient">{suffix}</span>
        </div>
        <div className="mt-3 text-sm uppercase tracking-[0.18em] text-white/60">
          {label}
        </div>
      </div>
    </div>
  );
}
