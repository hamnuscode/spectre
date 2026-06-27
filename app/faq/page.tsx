import type { Metadata } from 'next';
import { faqs } from '@/data/site';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { Reveal } from '@/components/ui/Reveal';

export const metadata: Metadata = {
  title: 'FAQ',
  description:
    'Frequently asked questions about Spectre Tech Services — how we work, pricing, timelines and more.',
};

export default function FaqPage() {
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

      {/* ── Header ───────────────────────────────────────────── */}
      <header className="relative overflow-hidden pt-[calc(var(--nav-h)+3.5rem)]">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(50% 60% at 85% 10%, rgba(39,183,207,0.16), transparent 70%), radial-gradient(45% 60% at 5% 80%, rgba(43,215,127,0.14), transparent 72%)',
            // Fade out toward the bottom so the wash blends into the ambient
            // background instead of cutting off hard at the header's edge.
            maskImage: 'linear-gradient(to bottom, black 60%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent)',
          }}
        />
        <div className="container-x relative z-10 max-w-3xl pb-4 text-center mx-auto">
          <Reveal>
            <p className="eyebrow mb-5">FAQ</p>
          </Reveal>
          <Reveal delay={60}>
            <h1 className="text-[clamp(2.6rem,6vw,4.4rem)] leading-[1.03]">
              Frequently asked <span className="text-gradient">questions.</span>
            </h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="mx-auto mt-6 max-w-xl text-[1.1rem] leading-relaxed text-[var(--muted)]">
              Everything you might want to know before reaching out. Still
              curious? Drop us a line and we&apos;ll get back within one business
              day.
            </p>
          </Reveal>
        </div>
      </header>

      {/* ── Accordion ────────────────────────────────────────── */}
      <section className="pb-24 pt-12 lg:pt-16">
        <FaqAccordion />
      </section>
    </>
  );
}
