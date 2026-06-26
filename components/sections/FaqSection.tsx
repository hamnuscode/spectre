import { faqs } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FaqAccordion } from './FaqAccordion';

/** FAQ section for the end of the home page (FAQ page was folded in here). */
export function FaqSection() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <section className="pb-20 pt-2 lg:pb-28 lg:pt-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-x">
        <div className="rounded-3xl border border-[var(--navy-tint)] bg-white/55 py-12 shadow-[0_30px_70px_-50px_rgba(7,48,109,0.4)] backdrop-blur-sm md:py-14">
          <SectionHeader
            eyebrow="FAQ"
            title={
              <>
                Frequently asked{' '}
                <span className="text-gradient">questions.</span>
              </>
            }
            intro="Everything you might want to know before reaching out."
            align="center"
          />
          <div className="mt-10">
            <FaqAccordion />
          </div>
        </div>
      </div>
    </section>
  );
}
