import { CountUp } from '@/components/ui/CountUp';

/**
 * Skinny dark stats band — sits under "What We Do". Animated counters on a
 * deep-navy strip, with a subtle brand gradient wash.
 */
const stats = [
  { to: 25, suffix: '+', v: '', l: 'Global Clients' },
  { to: 98, suffix: '%', v: '', l: 'Satisfaction' },
  { to: 3, suffix: '+', v: '', l: 'Years' },
  { to: 0, suffix: '', v: '24/7', l: 'Support' },
  { to: 5, suffix: '', v: '', l: 'Disciplines' },
];

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
      <div className="container-x relative z-10 grid grid-cols-2 gap-x-6 gap-y-8 py-10 text-center sm:grid-cols-3 lg:grid-cols-5 lg:py-12">
        {stats.map((s) => (
          <div key={s.l}>
            <div className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {s.v ? s.v : <CountUp to={s.to} suffix={s.suffix} />}
            </div>
            <div className="mt-1.5 text-xs uppercase tracking-wider text-white/55">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
