import type { Metadata } from 'next';
import { site } from '@/data/site';
import { serviceBySlug } from '@/data/services';
import { ContactForm } from '@/components/forms/ContactForm';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to Spectre Tech Services about your project. We reply within 1 business day.',
};

const phoneIcon = <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.6A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.4-1.2a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2Z" />;
const mailIcon = (
  <>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m4 7 8 6 8-6" />
  </>
);
const pinIcon = (
  <>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="2.5" />
  </>
);
const clockIcon = <path d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />;

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const sp = await searchParams;
  const initial = sp.service && serviceBySlug(sp.service) ? sp.service : '';

  const details = [
    { icon: phoneIcon, label: 'Phone', value: site.phones[0], href: `tel:${site.phones[0].replace(/[^+\d]/g, '')}` },
    { icon: mailIcon, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: pinIcon, label: 'Address', value: site.address },
    { icon: pinIcon, label: 'Coverage', value: 'Global · Remote-first' },
    { icon: clockIcon, label: 'Response time', value: 'Within 1 business day' },
  ];

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <header className="relative overflow-hidden pt-[calc(var(--nav-h)+3.5rem)]">
        {/* soft brand blob */}
        <div
          aria-hidden
          className="pointer-events-none absolute -left-24 top-24 h-[420px] w-[420px] rounded-full opacity-70 blur-3xl"
          style={{ background: 'radial-gradient(circle, rgba(39,183,207,0.18), transparent 70%)' }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 50% at 70% 0%, rgba(43,215,127,0.10), transparent 70%)',
            // Fade out toward the bottom so the wash blends into the ambient
            // background instead of cutting off hard at the header's edge.
            maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
          }}
        />
        <div className="container-x relative z-10 max-w-3xl pb-16 lg:pb-24">
          <Reveal>
            <p className="eyebrow mb-5">Get in Touch</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="text-[clamp(2.8rem,7vw,5rem)] font-bold leading-[0.98] tracking-tight">
              Let&apos;s Build the Future of{' '}
              <span className="text-gradient">Digital.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-7 max-w-xl text-[1.15rem] leading-relaxed text-[var(--muted)]">
              Whether you have a project brief ready or just an idea, we want to
              hear from you. Reach out and we&apos;ll get back to you within one
              business day.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ── Details + form ───────────────────────────────────── */}
      <section className="container-x grid gap-12 pb-24 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* LEFT — details */}
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Contact Details</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-[clamp(2.2rem,5vw,3.4rem)]">
              We&apos;re here{' '}
              <span className="text-gradient">to talk.</span>
            </h2>
          </Reveal>

          <div className="mt-9 space-y-3">
            {details.map((d, i) => {
              const inner = (
                <div className="flex items-center gap-4 rounded-2xl border border-[var(--navy-tint)] bg-white/70 px-5 py-4 transition-colors duration-300 hover:border-[var(--accent)]">
                  <span
                    aria-hidden
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
                    style={{ background: 'color-mix(in srgb, var(--accent) 12%, white)', color: 'var(--accent)' }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {d.icon}
                    </svg>
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-wider text-[var(--muted)]">{d.label}</div>
                    <div className="font-medium text-navy">{d.value}</div>
                  </div>
                </div>
              );
              return (
                <Reveal key={d.label} delay={i * 50}>
                  {d.href ? (
                    <a href={d.href} data-cursor="hover" className="block">
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </Reveal>
              );
            })}
          </div>

        </div>

        {/* RIGHT — form */}
        <Reveal>
          <ContactForm initialService={initial} />
        </Reveal>
      </section>
    </>
  );
}
