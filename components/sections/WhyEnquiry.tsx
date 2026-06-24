'use client';

import { whySpectre } from '@/data/site';
import { Reveal } from '@/components/ui/Reveal';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

/**
 * Home split section: Quick Enquiry card (left) + Why Spectre value props (right).
 */
export function WhyEnquiry() {
  return (
    <section className="container-x py-20 lg:py-28">
      <div className="grid items-start gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
        {/* LEFT — Quick Enquiry */}
        <Reveal className="order-2 lg:order-1">
          <div className="prism-border relative overflow-hidden rounded-3xl bg-white/80 p-7 backdrop-blur-md md:p-9">
            <div
              aria-hidden
              className="absolute -right-16 -top-16 h-44 w-44 rounded-full opacity-40 blur-2xl"
              style={{ background: 'var(--grad-prism-soft)' }}
            />
            <p className="eyebrow mb-2">Quick Enquiry</p>
            <h3 className="text-2xl">Let&apos;s talk about your project.</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Tell us what you need — we reply within 1 business day.
            </p>
            <div className="mt-6">
              <EnquiryForm compact />
            </div>
          </div>
        </Reveal>

        {/* RIGHT — Why Spectre */}
        <div className="order-1 lg:order-2">
          <Reveal>
            <p className="eyebrow mb-4">Why Spectre</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="text-[clamp(2rem,4.4vw,3.2rem)]">
              See the difference professional services{' '}
              <span className="text-gradient">can do for you.</span>
            </h2>
          </Reveal>

          <div className="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {whySpectre.map((w, i) => (
              <Reveal key={w.title} delay={i * 70}>
                <div className="group flex gap-4" data-cursor="hover">
                  <span
                    aria-hidden
                    className="mt-1 h-6 w-6 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: 'var(--grad-prism)',
                      clipPath:
                        'polygon(50% 0, 100% 38%, 82% 100%, 18% 100%, 0 38%)',
                    }}
                  />
                  <div>
                    <h3 className="text-base">{w.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--muted)]">
                      {w.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
