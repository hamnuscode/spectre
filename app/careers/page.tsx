import type { Metadata } from 'next';
import { services } from '@/data/services';
import { CareersForm } from '@/components/forms/CareersForm';
import { Reveal } from '@/components/ui/Reveal';
import { Stagger, StaggerItem } from '@/components/ui/Stagger';
import { Stage3D } from '@/components/three/Stage3D';
import { CountUp } from '@/components/ui/CountUp';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the cream of the crop at Spectre Tech Services — tech, web, marketing, finance and people. Submit your CV.',
};

const stats = [
  { to: 5, suffix: '', v: '', l: 'Disciplines' },
  { to: 100, suffix: '%', v: '', l: 'Remote-friendly' },
  { to: 0, suffix: '', v: '24/7', l: 'Global team' },
];

const perks = [
  {
    t: 'Remote-first',
    d: 'Work from anywhere. We hire for talent and character, not timezones.',
    icon: <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0Zm0 0h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />,
  },
  {
    t: 'Real ownership',
    d: 'Small teams, big mandates. Your work ships and your name is on it.',
    icon: <path d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z" />,
  },
  {
    t: 'Learning budget',
    d: 'Courses, conferences, books — we invest in you getting sharper.',
    icon: <path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2V5Zm15 14H6M9 7h7M9 11h7" />,
  },
  {
    t: 'Senior mentorship',
    d: 'Pair with people who have built at scale and want you to grow.',
    icon: <path d="M16 7a4 4 0 1 0-8 0 4 4 0 0 0 8 0ZM4 21a8 8 0 0 1 16 0" />,
  },
  {
    t: 'Outcome-driven',
    d: 'No clock-watching. We measure impact, not hours at a desk.',
    icon: <path d="M3 12h4l3 8 4-16 3 8h4" />,
  },
  {
    t: 'Global clients',
    d: 'Work across industries and continents on problems that matter.',
    icon: <path d="M12 21s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 10-7 10Z" />,
  },
];

const hiring = [
  { n: '01', t: 'Apply', d: 'Send your CV and a line on why Spectre. Every application is read by a human.' },
  { n: '02', t: 'Conversation', d: 'A relaxed chat about your work, how you think, and what you want next.' },
  { n: '03', t: 'Offer', d: 'A short practical step, then a clear offer — usually within a few days.' },
];

export default function CareersPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden pt-[calc(var(--nav-h)+3rem)]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 55% at 85% 12%, rgba(39,183,207,0.20), transparent 70%), radial-gradient(50% 55% at 5% 90%, rgba(43,215,127,0.18), transparent 72%)',
          }}
        />
        <div className="container-x relative z-10 grid items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Reveal>
              <p className="eyebrow mb-5">Careers at Spectre</p>
            </Reveal>
            <Reveal delay={60}>
              <h1 className="text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.03]">
                Join the cream of{' '}
                <span className="text-gradient">the crop.</span>
              </h1>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-[var(--muted)]">
                We&apos;re always looking for diverse, expert minds across tech,
                web, marketing, finance and people. Bring your craft — we&apos;ll
                bring the clients, the team, and the room to grow.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="#apply" variant="primary">Apply Now</Button>
                <Button href="#perks" variant="secondary">Why Spectre</Button>
              </div>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-12 grid max-w-md grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-bold tracking-tight text-navy sm:text-3xl">
                      {s.v ? s.v : <CountUp to={s.to} suffix={s.suffix} />}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-wider text-[var(--muted)]">{s.l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* talent-orbit 3D */}
          <div className="flex justify-center lg:justify-end">
            <div className="glass relative aspect-square w-full max-w-[460px] overflow-hidden rounded-3xl shadow-[0_40px_90px_-50px_rgba(7,48,109,0.5)]">
              <Stage3D variant="orbit" className="h-full w-full" />
            </div>
          </div>
        </div>
      </header>

      {/* ── Perks ────────────────────────────────────────────── */}
      <section id="perks" className="container-x py-16 lg:py-24">
        <Reveal>
          <p className="eyebrow mb-4">Why you&apos;ll love it</p>
        </Reveal>
        <Reveal delay={60}>
          <h2 className="max-w-2xl text-[clamp(1.9rem,4vw,3rem)] leading-[1.05]">
            A place built for people who{' '}
            <span className="text-gradient">do their best work.</span>
          </h2>
        </Reveal>

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((p) => (
            <StaggerItem key={p.t} className="h-full">
              <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--navy-tint)] bg-white p-6 shadow-[0_12px_30px_-22px_rgba(7,48,109,0.3)] transition-all duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-[0_34px_70px_-32px_rgba(7,48,109,0.4)]">
                <span aria-hidden className="absolute left-0 top-0 h-full w-[3px] origin-top scale-y-0 bg-[var(--accent)] transition-transform duration-300 group-hover:scale-y-100" />
                <span
                  aria-hidden
                  className="mb-5 grid h-11 w-11 place-items-center rounded-xl transition-colors duration-300"
                  style={{ background: 'color-mix(in srgb, var(--accent) 12%, white)', color: 'var(--accent)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {p.icon}
                  </svg>
                </span>
                <h3 className="text-base transition-colors duration-300 group-hover:text-[var(--accent)]">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{p.d}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* ── How hiring works ─────────────────────────────────── */}
      <section className="relative overflow-hidden py-16 lg:py-20">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: 'radial-gradient(60% 60% at 50% 0%, rgba(7,48,109,0.06), transparent 70%)' }}
        />
        <div className="container-x relative z-10">
          <Reveal>
            <h2 className="text-center text-[clamp(1.7rem,3.4vw,2.6rem)]">
              How hiring <span className="text-gradient">works.</span>
            </h2>
          </Reveal>
          <Stagger className="mt-12 grid gap-5 md:grid-cols-3">
            {hiring.map((h) => (
              <StaggerItem key={h.n} className="h-full">
                <div className="h-full rounded-2xl border border-[var(--navy-tint)] bg-white/70 p-7 backdrop-blur-sm transition-colors duration-300 hover:border-[var(--accent)]">
                  <div className="font-display text-3xl font-bold text-[var(--accent)]/40">{h.n}</div>
                  <h3 className="mt-3 text-lg">{h.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">{h.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* ── Application ──────────────────────────────────────── */}
      <section id="apply" className="container-x scroll-mt-28 pb-24 pt-4">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Reveal>
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)]">Tell us about you.</h2>
            </Reveal>
            <Reveal delay={60}>
              <p className="mt-4 leading-relaxed text-[var(--muted)]">
                Attach your CV and share your work. We look at the whole person —
                your GitHub, portfolio, and how you think, not just a list of
                keywords.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ul className="mt-7 space-y-3 text-sm text-ink/75">
                {[
                  'PDF or Word CV, up to 5MB',
                  'Optional GitHub / portfolio + LinkedIn',
                  'Every application is read by a human',
                ].map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent)]" />
                    {t}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal>
            <div className="rounded-3xl border border-[var(--navy-tint)] bg-white/90 p-7 shadow-[0_40px_90px_-45px_rgba(7,48,109,0.55)] backdrop-blur-md transition-all duration-500 focus-within:-translate-y-1 focus-within:border-[var(--cyan)]/60 focus-within:shadow-[0_50px_110px_-35px_rgba(39,183,207,0.45)] md:p-9">
              <CareersForm roles={services.map((s) => s.name)} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
