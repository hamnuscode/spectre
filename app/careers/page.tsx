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
              'radial-gradient(50% 60% at 85% 10%, rgba(39,183,207,0.16), transparent 70%), radial-gradient(45% 60% at 5% 80%, rgba(43,215,127,0.14), transparent 72%)',
            // Fade the wash out toward the bottom so it blends into the ambient
            // background instead of cutting off hard at the header's edge.
            maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
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

      {/* ── Why join — three matching cards ──────────────────── */}
      <section className="container-x pb-4 pt-6 lg:pt-10">
        <div className="grid gap-5 md:grid-cols-3">
          {[
            {
              n: '01',
              t: 'Real ownership',
              d: 'You drive projects end-to-end for fast-growing global brands — no busywork, no hand-holding. Your decisions ship.',
            },
            {
              n: '02',
              t: 'Learn across disciplines',
              d: 'Tech, web, marketing, finance and people under one roof. Cross-pollinate, level up fast, and never get boxed in.',
            },
            {
              n: '03',
              t: 'Remote-first & global',
              d: 'Work from anywhere on an async-friendly team that values output over hours. We hire the best minds, wherever they are.',
            },
          ].map((c, i) => (
            <Reveal key={c.n} delay={i * 80}>
              <div className="group relative h-full overflow-hidden rounded-3xl border border-[var(--navy-tint)] bg-white/80 p-7 shadow-[0_30px_70px_-50px_rgba(7,48,109,0.5)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_45px_90px_-45px_rgba(39,183,207,0.45)]">
                <span aria-hidden className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-[var(--cyan)] transition-transform duration-500 group-hover:scale-x-100" />
                <span className="font-mono text-sm text-[var(--cyan)]">{c.n}</span>
                <h3 className="mt-4 text-xl text-navy">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--muted)]">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Application ──────────────────────────────────────── */}
      <section id="apply" className="container-x scroll-mt-28 pb-24 pt-10">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:gap-16">
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
