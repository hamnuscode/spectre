import type { Metadata } from 'next';
import { whySpectre, stats, site } from '@/data/site';
import { PageHero } from '@/components/sections/PageHero';
import { Testimonials } from '@/components/sections/Testimonials';
import { CtaBand } from '@/components/sections/CtaBand';
import { Reveal } from '@/components/ui/Reveal';
import { TiltCard } from '@/components/ui/TiltCard';
import { SectionHeader } from '@/components/ui/SectionHeader';

export const metadata: Metadata = {
  title: 'Why Spectre',
  description:
    'A group of diverse and expert minds delivering tech, web, marketing, finance and people — 24/7, whitehat, built to delight.',
};

const accents = ['navy', 'cyan', 'green'] as const;

export default function WhySpectrePage() {
  return (
    <>
      <PageHero
        eyebrow="Why Spectre"
        title={
          <>
            We help brands stand out{' '}
            <span className="text-gradient">in the digital age.</span>
          </>
        }
        intro="We're a group of diverse and expert minds who understand that brands have to delight and reward if they're going to earn the right to talk with people. Here's what that looks like in practice."
      />

      {/* Story + stats */}
      <section className="container-x py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
          <Reveal>
            <div className="space-y-5 text-[1.05rem] leading-relaxed text-ink/75">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)]">Our story</h2>
              <p>
                Spectre brings together some of the brightest account managers,
                media buyers, designers, content writers, creative heads,
                chartered accountants, financial analysts, web developers, tech
                support staff, and client-success specialists under one roof.
              </p>
              <p>
                We partner with the best-in-their-fields and fastest-growing
                global brands to consistently create superior customer
                experiences. As a leading tech-support and marketing provider,
                our concept goes beyond our direct clients — it reaches every
                person they serve.
              </p>
              <p>
                Whatever the discipline, the approach is the same: understand
                the audience first, then build the design, content, and
                marketing solution that works best for them. That focus is what
                gives us targeted traffic and real performance.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="grid gap-4">
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className="prism-border flex items-center gap-5 rounded-2xl bg-white/80 p-6"
                >
                  <div
                    aria-hidden
                    className="h-12 w-1.5 rounded-full"
                    style={{ background: 'var(--grad-prism)' }}
                  />
                  <div>
                    <div className="font-display text-4xl font-black text-navy">
                      {s.value}
                      <span className="text-gradient">{s.suffix}</span>
                    </div>
                    <div className="text-sm uppercase tracking-wider text-[var(--muted)]">
                      {s.label}
                    </div>
                  </div>
                </div>
              ))}
              <div className="prism-border rounded-2xl bg-navy p-6 text-white">
                <p className="text-sm text-white/70">Reach us directly</p>
                <a
                  href={`mailto:${site.email}`}
                  data-cursor="hover"
                  className="font-display text-lg font-black hover:text-[var(--green)]"
                >
                  {site.email}
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-offwhite py-20 lg:py-28">
        <div className="container-x">
          <SectionHeader
            eyebrow="Our Differentiators"
            title={
              <>
                What sets us{' '}
                <span className="text-gradient">apart.</span>
              </>
            }
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whySpectre.map((w, i) => (
              <Reveal key={w.title} delay={i * 60}>
                <TiltCard glow={accents[i % 3]} className="h-full">
                  <article className="h-full rounded-2xl border border-[var(--navy-tint)] bg-white/85 p-6 backdrop-blur-sm">
                    <span
                      aria-hidden
                      className="mb-4 grid h-10 w-10 place-items-center rounded-xl text-white"
                      style={{ background: 'var(--navy)' }}
                    >
                      <span className="h-2.5 w-2.5 rounded-sm bg-white" />
                    </span>
                    <h3 className="text-lg">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--muted)]">
                      {w.body}
                    </p>
                  </article>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBand title="See the difference professional services can do for you." />
    </>
  );
}
