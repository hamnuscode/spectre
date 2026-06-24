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
    <section className="py-20 lg:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-x">
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
      </div>
      <div className="mt-12">
        <FaqAccordion />
      </div>
    </section>
  );
}
