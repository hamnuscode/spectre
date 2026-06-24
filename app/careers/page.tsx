import type { Metadata } from 'next';
import { roles } from '@/data/careers';
import { PageHero } from '@/components/sections/PageHero';
import { CareersForm } from '@/components/forms/CareersForm';
import { Reveal } from '@/components/ui/Reveal';
import { TiltCard } from '@/components/ui/TiltCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join the cream of the crop at Spectre Tech Services — tech, web, marketing, finance and people roles. Submit your CV.',
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Join the cream of{' '}
            <span className="text-gradient">the crop.</span>
          </>
        }
        intro="We're always looking for diverse, expert minds. Browse open roles below, or send a general application — we read every one."
      />

      {/* Open roles */}
      <section className="container-x py-14">
        <SectionHeader eyebrow="Open Roles" title="Where you might fit" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {roles.map((r, i) => (
            <Reveal key={r.title} delay={i * 60}>
              <TiltCard glow={(['navy', 'cyan', 'green'] as const)[i % 3]} className="h-full">
                <article className="prism-border flex h-full flex-col rounded-2xl bg-white/85 p-6">
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="rounded-full bg-navy px-3 py-1 font-medium text-white">
                      {r.team}
                    </span>
                    <span className="rounded-full bg-offwhite px-3 py-1 text-navy">
                      {r.type}
                    </span>
                    <span className="rounded-full bg-offwhite px-3 py-1 text-navy">
                      {r.location}
                    </span>
                  </div>
                  <h3 className="mt-4 text-xl">{r.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--muted)]">
                    {r.blurb}
                  </p>
                  <a
                    href="#apply"
                    data-cursor="hover"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--cyan)] hover:gap-2.5 hover:text-navy"
                  >
                    Apply for this role <span aria-hidden>→</span>
                  </a>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="scroll-mt-28 bg-offwhite py-20 lg:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-4">Apply Now</p>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.8rem)]">
              Tell us about you.
            </h2>
            <p className="mt-4 leading-relaxed text-[var(--muted)]">
              Attach your CV and share your work. We look at the whole person —
              your GitHub, portfolio, and how you think, not just a list of
              keywords.
            </p>
            <ul className="mt-7 space-y-3 text-sm text-ink/75">
              {[
                'PDF or Word CV, up to 5MB',
                'Optional GitHub / portfolio + LinkedIn',
                'Every application is read by a human',
              ].map((t) => (
                <li key={t} className="flex gap-2.5">
                  <span
                    aria-hidden
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45"
                    style={{ background: 'var(--grad-prism)' }}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="prism-border rounded-3xl bg-white/80 p-7 backdrop-blur-md md:p-9">
              <CareersForm roles={roles.map((r) => r.title)} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
