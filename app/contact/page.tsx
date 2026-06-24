import type { Metadata } from 'next';
import { site } from '@/data/site';
import { serviceBySlug } from '@/data/services';
import { PageHero } from '@/components/sections/PageHero';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { OfficeCard } from '@/components/sections/OfficeCard';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Talk to Spectre Tech Services about your project. We reply within 1 business day.',
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const sp = await searchParams;
  const preselect = sp.service && serviceBySlug(sp.service) ? sp.service : '';

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s talk about{' '}
            <span className="text-gradient">your project.</span>
          </>
        }
        intro={`Tell us what you need and we'll point the right specialists at it. ${site.responsePromise}`}
      />

      <section className="container-x pb-8">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Form */}
          <Reveal>
            <div className="prism-border rounded-3xl bg-white/80 p-7 backdrop-blur-md md:p-9">
              <h2 className="text-2xl">Send us a message</h2>
              <p className="mt-2 text-sm text-[var(--muted)]">
                Fields marked with <span className="text-[var(--green)]">*</span>{' '}
                are required.
              </p>
              <div className="mt-6">
                <EnquiryForm defaultService={preselect} />
              </div>
            </div>
          </Reveal>

          {/* Interactive office / details */}
          <Reveal delay={120}>
            <OfficeCard />
          </Reveal>
        </div>
      </section>
    </>
  );
}
