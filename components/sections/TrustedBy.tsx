'use client';

import { clients } from '@/data/site';

/**
 * Seamless infinite marquee. The track is duplicated 2× and translated
 * -50% via a pure CSS keyframe (transform only → GPU, no JS, no jank).
 * Pauses on hover. Honors reduced-motion through the global CSS override.
 */
export function TrustedBy() {
  const track = [...clients, ...clients];
  return (
    <section className="bg-offwhite py-12" aria-label="Trusted by">
      <p className="eyebrow mb-7 text-center">
        Trusted by international brands
      </p>
      <div
        className="group relative flex overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
          WebkitMaskImage:
            'linear-gradient(90deg, transparent, black 12%, black 88%, transparent)',
        }}
      >
        <div
          className="flex shrink-0 animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused]"
          style={{ ['--marquee-duration' as string]: '34s' }}
        >
          {track.map((name, i) => (
            <span
              key={i}
              className="select-none whitespace-nowrap font-display text-2xl font-black text-navy/35 transition-colors duration-300 hover:text-navy"
              data-cursor="hover"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
