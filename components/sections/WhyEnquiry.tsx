'use client';

import { whySpectre } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { Stagger, StaggerItem } from '@/components/ui/Stagger';
import { TiltCard } from '@/components/ui/TiltCard';
import { EnquiryForm } from '@/components/forms/EnquiryForm';
import { SectionHeader } from '@/components/ui/SectionHeader';

/** Line icons for the value props (clean, no pentagons). */
const icons = [
  <path key="a" d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  <path key="b" d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z" />,
  <path key="c" d="M7 17 17 7M9 7h8v8" />,
  <path key="d" d="M12 3 5 6v5c0 4.5 3 7.3 7 9 4-1.7 7-4.5 7-9V6l-7-3Z" />,
  <path key="e" d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z" />,
  <path key="f" d="M3 7h7v7H3zM14 7h7v4h-7zM14 14h7v3h-7zM3 17h7v0" />,
];

export function WhyEnquiry() {
  return (
    <section className="container-x py-20 lg:py-28">
      <SectionHeader
        eyebrow="Why Spectre"
        title={
          <>
            See the difference professional services{' '}
            <span className="text-gradient">can do for you.</span>
          </>
        }
        intro="We partner with the best-in-their-fields and fastest-growing global brands to consistently create superior customer experiences — no fluff, no surprises."
        align="center"
      />

      {/* Cards — 3 in a row, staggered in with tilt */}
      <Stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whySpectre.map((w, i) => (
          <StaggerItem key={w.title} className="h-full">
            <TiltCard glow="cyan" className="h-full">
              <div className="group h-full rounded-2xl border border-[var(--navy-tint)] bg-white/80 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[var(--accent)]">
                <span
                  aria-hidden
                  className="mb-4 grid h-10 w-10 place-items-center rounded-xl"
                  style={{ background: 'color-mix(in srgb, var(--accent) 12%, white)', color: 'var(--accent)' }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                    {icons[i % icons.length]}
                  </svg>
                </span>
                <h3 className="text-base">{w.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">{w.body}</p>
              </div>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>

      {/* Form — centered under the cards */}
      <Reveal delay={80}>
        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-[var(--navy-tint)] bg-white/90 p-7 shadow-[0_40px_90px_-45px_rgba(7,48,109,0.55)] backdrop-blur-md transition-all duration-500 focus-within:-translate-y-1 focus-within:border-[var(--cyan)]/60 focus-within:shadow-[0_50px_110px_-35px_rgba(39,183,207,0.45)] md:p-9">
          <div className="mb-7 flex items-center gap-4">
            <span aria-hidden className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <div>
              <h3 className="text-xl leading-tight">Quick Enquiry</h3>
              <p className="text-sm text-[var(--muted)]">We reply within 1 business day</p>
            </div>
          </div>
          <EnquiryForm />
        </div>
      </Reveal>
    </section>
  );
}
