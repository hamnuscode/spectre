import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export function CtaBand({
  title = 'Ready for an awesome project with us?',
  sub = "Let's talk about your project. We reply within 1 business day.",
}: {
  title?: string;
  sub?: string;
}) {
  return (
    <section className="container-x py-20">
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-14 text-center text-white md:py-20">
          {/* Solid angular facets (no gradient) */}
          <div
            aria-hidden
            className="absolute -left-10 -top-10 h-56 w-56 bg-cyan/20"
            style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
          />
          <div
            aria-hidden
            className="absolute -bottom-10 -right-10 h-56 w-56 bg-green/20"
            style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-white text-[clamp(1.9rem,4vw,3rem)]">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/75">{sub}</p>
            <div className="mt-8 flex justify-center gap-3">
              <Button href="/contact" variant="primary" className="bg-white !text-navy hover:bg-white">
                Get a Quote
              </Button>
              <Button
                href="/services"
                variant="secondary"
                className="!text-white before:!opacity-100"
              >
                View Services
              </Button>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
