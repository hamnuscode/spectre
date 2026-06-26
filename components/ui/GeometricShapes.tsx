'use client';

import { motion } from 'framer-motion';

/**
 * Animated geometric shapes that slowly morph between forms (triangle ↔
 * square ↔ hexagon ↔ diamond) while drifting and rotating. Brand-tinted,
 * pointer-transparent. Use as a decorative backdrop layer. Neutralised by the
 * global reduced-motion rule.
 *
 * Every frame in a set has the SAME number of points (6) so SVG/framer can
 * interpolate the polygon smoothly — padded with repeated vertices.
 */
const SHAPE_SETS = [
  [
    '50,8 50,8 88,76 88,76 12,76 12,76', // triangle
    '14,14 50,14 86,14 86,86 50,86 14,86', // square
    '50,8 86,29 86,71 50,92 14,71 14,29', // hexagon
  ],
  [
    '50,10 50,10 90,50 90,50 50,90 10,50', // diamond
    '20,20 50,20 80,20 80,80 50,80 20,80', // square
    '50,6 84,28 84,72 50,94 16,72 16,28', // hexagon
  ],
];

type Blob = {
  set: number;
  size: number;
  top: string;
  left: string;
  color: string;
  dur: number;
  delay: number;
};

const BLOBS: Blob[] = [
  { set: 0, size: 220, top: '8%', left: '6%', color: 'var(--cyan)', dur: 16, delay: 0 },
  { set: 1, size: 300, top: '52%', left: '72%', color: 'var(--green)', dur: 22, delay: -4 },
  { set: 0, size: 170, top: '70%', left: '14%', color: 'var(--navy-soft)', dur: 19, delay: -9 },
  { set: 1, size: 240, top: '14%', left: '78%', color: 'var(--cyan)', dur: 25, delay: -13 },
];

export function GeometricShapes({ className, opacity = 0.5 }: { className?: string; opacity?: number }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className ?? ''}`}>
      {BLOBS.map((b, i) => {
        const frames = SHAPE_SETS[b.set];
        return (
          <motion.svg
            key={i}
            viewBox="0 0 100 100"
            width={b.size}
            height={b.size}
            className="absolute"
            style={{ top: b.top, left: b.left, opacity }}
            initial={{ rotate: 0, y: 0 }}
            animate={{ rotate: 360, y: [0, -18, 0] }}
            transition={{
              rotate: { duration: b.dur * 2, repeat: Infinity, ease: 'linear', delay: b.delay },
              y: { duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay },
            }}
          >
            <motion.polygon
              points={frames[0]}
              fill="none"
              stroke={b.color}
              strokeWidth={1.2}
              strokeLinejoin="round"
              animate={{ points: [...frames, frames[0]] }}
              transition={{ duration: b.dur, repeat: Infinity, ease: 'easeInOut', delay: b.delay }}
            />
          </motion.svg>
        );
      })}
    </div>
  );
}
