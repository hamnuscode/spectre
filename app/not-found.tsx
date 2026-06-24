import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="grid min-h-[70vh] place-items-center px-6 pt-[var(--nav-h)] text-center">
      <div>
        <p className="eyebrow mb-4">Error 404</p>
        <h1 className="text-[clamp(3rem,12vw,7rem)] leading-none">
          <span className="text-gradient">Off the spectrum.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-md text-[var(--muted)]">
          The page you&apos;re after doesn&apos;t exist — or has refracted
          somewhere else. Let&apos;s get you back on track.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button href="/">Back home</Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </div>
    </section>
  );
}
