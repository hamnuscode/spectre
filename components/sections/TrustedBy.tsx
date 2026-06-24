'use client';

import { clients } from '@/data/site';

/**
 * Seamless infinite marquee. The track is duplicated 2× and translated
 * -50% via a pure CSS keyframe (transform only → GPU, no JS, no jank).
 * Pauses on hover. Honors reduced-motion through the global CSS override.
 * Rendered inline inside the hero (no section chrome of its own).
 */
export function TrustedBy() {
  const track = [...clients, ...clients];
  return (
    <div aria-label="Trusted by">
      <p className="eyebrow mb-5 text-center text-[var(--muted)]">
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
          className="flex shrink-0 animate-marquee items-center gap-14 pr-14 group-hover:[animation-play-state:paused]"
          style={{ ['--marquee-duration' as string]: '34s' }}
        >
          {track.map((name, i) => (
            <span
              key={i}
              className="select-none whitespace-nowrap font-display text-xl font-bold text-navy/30 transition-colors duration-300 hover:text-navy"
              data-cursor="hover"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
