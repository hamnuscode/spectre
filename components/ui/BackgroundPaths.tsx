'use client';

import { motion } from 'framer-motion';

/**
 * Animated floating SVG paths (adapted from kokonutd's "Background Paths").
 * Two mirrored families of slowly-drawing, drifting curves. Renders as a
 * full-bleed, pointer-transparent backdrop layer — drop it behind hero/section
 * content. `tone` switches the stroke for light vs dark surfaces.
 */
function FloatingPaths({ position, tone }: { position: number; tone: 'light' | 'dark' }) {
  const stroke = tone === 'dark' ? 'rgba(255,255,255,1)' : 'rgba(7,48,109,1)';
  // Fewer paths = far less main-thread SVG animation work (these animate
  // pathLength/pathOffset, which aren't GPU-composited). 14 per family still
  // reads as a dense ribbon while keeping the frame budget cheap. `k` spreads
  // the 14 curves across the same area the original 36 covered.
  const COUNT = 14;
  const SPREAD = 36 / COUNT;
  const paths = Array.from({ length: COUNT }, (_, i) => {
    const k = i * SPREAD;
    return {
      id: i,
      d: `M-${380 - k * 5 * position} -${189 + k * 6}C-${
        380 - k * 5 * position
      } -${189 + k * 6} -${312 - k * 5 * position} ${216 - k * 6} ${
        152 - k * 5 * position
      } ${343 - k * 6}C${616 - k * 5 * position} ${470 - k * 6} ${
        684 - k * 5 * position
      } ${875 - k * 6} ${684 - k * 5 * position} ${875 - k * 6}`,
      width: 0.5 + k * 0.03,
    };
  });

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <svg className="h-full w-full" viewBox="0 0 696 316" fill="none" preserveAspectRatio="xMidYMid slice">
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke={stroke}
            strokeWidth={path.width}
            strokeOpacity={0.06 + path.id * 0.016}
            initial={{ pathLength: 0.3, opacity: 0.5 }}
            animate={{
              pathLength: 1,
              opacity: [0.25, 0.55, 0.25],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 22 + (path.id % 9),
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({ tone = 'dark' }: { tone?: 'light' | 'dark' }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <FloatingPaths position={1} tone={tone} />
      <FloatingPaths position={-1} tone={tone} />
    </div>
  );
}
