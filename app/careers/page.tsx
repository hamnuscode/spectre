import type { Metadata } from 'next';
import { services } from '@/data/services';
import { CareersForm } from '@/components/forms/CareersForm';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the cream of the crop at Spectre Tech Services — tech, web, marketing, finance and people. Submit your CV.',
};

export default function CareersPage() {
  return (
    <>
      {/* ── Minimal header ───────────────────────────────────── */}
      <header className="relative overflow-hidden pt-[calc(var(--nav-h)+3.5rem)]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(50% 60% at 85% 10%, rgba(39,183,207,0.16), transparent 70%), radial-gradient(45% 55% at 5% 95%, rgba(43,215,127,0.14), transparent 72%)',
          }}
        />
        <div className="container-x relative z-10 max-w-3xl pb-6">
          <Reveal>
            <p className="eyebrow mb-5">Careers at Spectre</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.03]">
              Join the cream of <span className="text-gradient">the crop.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-6 max-w-xl text-[1.1rem] leading-relaxed text-[var(--muted)]">
              We&apos;re always looking for diverse, expert minds across tech,
              web, marketing, finance and people. Send your details and CV below
              — we read every application.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ── Why join — three distinct cards ──────────────────── */}
      <section className="container-x pb-4 pt-6 lg:pt-10">
        <div className="grid gap-5 md:grid-cols-3">
          {/* Card 1 — light, cyan top accent + index */}
          <Reveal>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-[var(--navy-tint)] bg-white/80 p-7 shadow-[0_30px_70px_-50px_rgba(7,48,109,0.5)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_45px_90px_-45px_rgba(39,183,207,0.45)]">
              <span aria-hidden className="absolute inset-x-0 top-0 h-1 bg-[var(--cyan)] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
              <span className="font-mono text-sm text-[var(--cyan)]">01</span>
              <h3 className="mt-4 text-xl text-navy">Real ownership</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">
                You drive projects end-to-end for fast-growing global brands —
                no busywork, no hand-holding. Your decisions ship.
              </p>
            </div>
          </Reveal>

          {/* Card 2 — inverted dark fill */}
          <Reveal delay={80}>
            <div className="group relative h-full overflow-hidden rounded-3xl bg-[var(--navy-deep)] p-7 text-white shadow-[0_30px_70px_-45px_rgba(7,48,109,0.7)] transition-all duration-500 hover:-translate-y-1.5">
              <div
                aria-hidden
                className="absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(70% 90% at 80% 10%, rgba(43,215,127,0.22), transparent 70%)' }}
              />
              <div className="relative z-10">
                <span aria-hidden className="grid h-11 w-11 place-items-center rounded-2xl bg-white/10 text-[var(--green)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v4M12 18v4M2 12h4M18 12h4M5 5l2.5 2.5M16.5 16.5 19 19M19 5l-2.5 2.5M7.5 16.5 5 19" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <h3 className="mt-4 text-xl">Learn across disciplines</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">
                  Tech, web, marketing, finance and people under one roof. Cross
                  pollinate, level up fast, and never get boxed in.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Card 3 — light, green corner glow + tag row */}
          <Reveal delay={160}>
            <div className="group relative h-full overflow-hidden rounded-3xl border border-[var(--navy-tint)] bg-white/80 p-7 shadow-[0_30px_70px_-50px_rgba(7,48,109,0.5)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[var(--green)]/50 hover:shadow-[0_45px_90px_-45px_rgba(43,215,127,0.4)]">
              <div
                aria-hidden
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: 'radial-gradient(circle, rgba(43,215,127,0.4), transparent 70%)' }}
              />
              <h3 className="relative z-10 text-xl text-navy">Remote-first &amp; global</h3>
              <p className="relative z-10 mt-3 text-sm leading-relaxed text-[var(--muted)]">
                Work from anywhere on an async-friendly team that values output
                over hours. We hire the best minds, wherever they are.
              </p>
              <div className="relative z-10 mt-5 flex flex-wrap gap-2">
                {['Flexible hours', 'Async', 'Worldwide'].map((t) => (
                  <span key={t} className="rounded-lg border border-[var(--navy-tint)] bg-white/70 px-3 py-1 text-xs font-medium text-navy/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Application ──────────────────────────────────────── */}
      <section id="apply" className="container-x scroll-mt-28 pb-24 pt-10">
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
