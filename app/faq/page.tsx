import type { Metadata } from 'next';
import { faqs, site } from '@/data/site';
import { PageHero } from '@/components/sections/PageHero';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { CtaBand } from '@/components/sections/CtaBand';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Answers to common questions about Spectre Tech Services — support, marketing, accounting, response times and more.',
};

export default function FaqPage() {
  // FAQ structured data for rich results.
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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Frequently asked{' '}
            <span className="text-gradient">questions.</span>
          </>
        }
        intro={`Can't find what you're looking for? Email ${site.email} — we reply within 1 business day.`}
      />
      <section className="py-8 lg:py-12">
        <FaqAccordion />
      </section>
      <CtaBand title="Still have questions?" sub="Reach out — a specialist will get back to you within 1 business day." />
    </>
  );
}
