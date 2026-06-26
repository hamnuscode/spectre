'use client';

import { motion } from 'framer-motion';

/**
 * Thin section divider whose line draws itself in (pathLength) as it scrolls
 * into view. Cyan→green gradient stroke, centred, very subtle.
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div className={className ?? 'container-x py-6'} aria-hidden>
      <svg viewBox="0 0 1200 4" preserveAspectRatio="none" className="block h-1 w-full overflow-visible">
        <defs>
          <linearGradient id="divider-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0" />
            <stop offset="50%" stopColor="var(--cyan)" stopOpacity="0.55" />
            <stop offset="100%" stopColor="var(--green)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.line
          x1="0"
          y1="2"
          x2="1200"
          y2="2"
          stroke="url(#divider-grad)"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: '0px 0px -10% 0px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
    </div>
  );
}
