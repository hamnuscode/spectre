'use client';

import { whySpectre } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

/** Line icons for the value props (clean, no pentagons). */
const icons = [
  <path key="a" d="M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />, // clock — 24/7
  <path key="b" d="m12 3 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3Z" />, // star — cream
  <path key="c" d="M7 17 17 7M9 7h8v8" />, // arrow out — beyond
  <path key="d" d="M12 3 5 6v5c0 4.5 3 7.3 7 9 4-1.7 7-4.5 7-9V6l-7-3Z" />, // shield — whitehat
  <path key="e" d="M12 20s-7-4.4-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.6-7 9-7 9Z" />, // heart — delight
  <path key="f" d="M3 7h7v7H3zM14 7h7v4h-7zM14 14h7v3h-7zM3 17h7v0" />, // layers — one partner
];

export function WhyEnquiry() {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* LEFT — Why Spectre */}
        <div>
          <Reveal>
            <p className="eyebrow mb-4">Why Spectre</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-[clamp(2rem,4.4vw,3.2rem)] leading-[1.08]">
              See the difference professional services{' '}
              <span className="text-gradient">can do for you.</span>
            </h2>
          </Reveal>
          <Reveal delay={110}>
            <p className="mt-5 max-w-xl leading-relaxed text-[var(--muted)]">
              We partner with the best-in-their-fields and fastest-growing
              global brands to consistently create superior customer
              experiences — no fluff, no surprises.
            </p>
          </Reveal>

          <div className="mt-9 grid gap-4 sm:grid-cols-2">
            {whySpectre.map((w, i) => (
              <Reveal key={w.title} delay={i * 60}>
                <div className="group h-full rounded-2xl border border-[var(--navy-tint)] bg-white/70 p-5 transition-colors duration-300 hover:border-[var(--accent)]">
                  <span
                    aria-hidden
                    className="mb-4 grid h-10 w-10 place-items-center rounded-xl"
                    style={{
                      background: 'color-mix(in srgb, var(--accent) 12%, white)',
                      color: 'var(--accent)',
                    }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                      {icons[i % icons.length]}
                    </svg>
                  </span>
                  <h3 className="text-base">{w.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[var(--muted)]">
                    {w.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* RIGHT — Quick Enquiry card */}
        <Reveal>
          <div className="rounded-3xl border border-[var(--navy-tint)] bg-white/90 p-7 shadow-[0_30px_70px_-40px_rgba(7,48,109,0.5)] backdrop-blur-md md:p-9">
            <div className="mb-7 flex items-center gap-4">
              <span aria-hidden className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
              <div>
                <h3 className="text-xl leading-tight">Quick Enquiry</h3>
                <p className="text-sm text-[var(--muted)]">
                  {`We reply within 1 business day`}
                </p>
              </div>
            </div>
            <EnquiryForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
