import type { Metadata } from 'next';
import { services } from '@/data/services';
import { PageHero } from '@/components/sections/PageHero';
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
      <PageHero
        eyebrow="Careers"
        title={
          <>
            Join the cream of{' '}
            <span className="text-gradient">the crop.</span>
          </>
        }
        intro="We're always looking for diverse, expert minds. Send your details and CV below — we read every application."
      />

      <section className="pb-20 lg:pb-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)]">Tell us about you.</h2>
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
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--accent)]"
                  />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <Reveal>
            <div className="rounded-3xl border border-[var(--navy-tint)] bg-white/80 p-7 backdrop-blur-md md:p-9">
              <CareersForm roles={services.map((s) => s.name)} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
