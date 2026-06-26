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
