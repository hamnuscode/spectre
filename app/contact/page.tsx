import type { Metadata } from 'next';
import { site } from '@/data/site';
import { serviceBySlug } from '@/data/services';
import { Stage3D } from '@/components/three/Stage3D';
import { ContactExperience } from '@/components/sections/ContactExperience';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to Spectre Tech Services about your project. We reply within 1 business day.',
};

const methods = [
  { label: 'Email us', value: site.email, href: `mailto:${site.email}` },
  { label: 'Call us', value: site.phones[0], href: `tel:${site.phones[0].replace(/[^+\d]/g, '')}` },
  { label: 'Or', value: site.phones[1], href: `tel:${site.phones[1].replace(/[^+\d]/g, '')}` },
];

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const sp = await searchParams;
  const initial = sp.service && serviceBySlug(sp.service) ? sp.service : '';

  return (
    <>
      {/* Hero with 3D accent */}
      <header className="relative overflow-hidden pt-[calc(var(--nav-h)+3rem)]">
        <div className="container-x grid items-center gap-10 pb-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="eyebrow mb-5">Contact</p>
            <h1 className="text-[clamp(2.4rem,6vw,4.2rem)]">
              Let&apos;s build{' '}
              <span className="text-gradient">something.</span>
            </h1>
            <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-[var(--muted)]">
              Tell us what you need and we&apos;ll point the right specialists at
              it. {site.responsePromise}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {methods.map((m) => (
                <a
                  key={m.value}
                  href={m.href}
                  data-cursor="hover"
                  className="group rounded-2xl border border-[var(--navy-tint)] bg-white/70 px-5 py-3 transition-colors duration-300 hover:border-[var(--accent)]"
                >
                  <span className="block text-xs uppercase tracking-wider text-[var(--accent)]">
                    {m.label}
                  </span>
                  <span className="font-display text-lg font-semibold text-navy">
                    {m.value}
                  </span>
                </a>
              ))}
            </div>

            <div className="mt-6 flex gap-4">
              {site.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="text-xs uppercase tracking-widest text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <Stage3D variant="ico" />
          </div>
        </div>
      </header>

      {/* Interactive form */}
      <section className="container-x pb-24">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <ContactExperience initial={initial} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
