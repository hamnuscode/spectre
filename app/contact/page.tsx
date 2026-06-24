import type { Metadata } from 'next';
import { site } from '@/data/site';
import { serviceBySlug } from '@/data/services';
import { ContactForm } from '@/components/forms/ContactForm';
import { Reveal } from '@/components/ui/Reveal';
import { Globe } from '@/components/ui/Globe';

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
const globeIcon = (
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" />
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
    { icon: phoneIcon, label: 'Alt. phone', value: site.phones[1], href: `tel:${site.phones[1].replace(/[^+\d]/g, '')}` },
    { icon: mailIcon, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: globeIcon, label: 'Website', value: site.domain, href: site.url },
    { icon: pinIcon, label: 'Coverage', value: 'Global · Remote-first' },
    { icon: clockIcon, label: 'Response time', value: 'Within 1 business day' },
  ];

  return (
    <section className="pt-[calc(var(--nav-h)+1.5rem)]">
      {/* Interactive globe */}
      <div className="container-x">
        <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden rounded-3xl bg-[var(--navy-deep)] sm:h-[360px]">
          <div className="h-[260px] w-[260px] sm:h-[320px] sm:w-[320px]">
            <Globe />
          </div>
        </div>
      </div>

      <div className="container-x grid gap-12 pb-24 pt-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        {/* LEFT — details */}
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Contact Details</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="text-[clamp(2.2rem,5vw,3.4rem)]">
              We&apos;re here{' '}
              <span className="text-gradient">to talk.</span>
            </h1>
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

          <Reveal delay={120}>
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">Follow us</p>
              <div className="mt-3 flex gap-3">
                {site.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="hover"
                    aria-label={s.label}
                    className="grid h-11 w-11 place-items-center rounded-xl border border-[var(--navy-tint)] text-navy transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                  >
                    {s.label[0]}
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* RIGHT — form */}
        <Reveal>
          <ContactForm initialService={initial} />
        </Reveal>
      </div>
    </section>
  );
}
