'use client';

import { motion } from 'framer-motion';

/**
 * Friendly completion meter for the forms — a thin cyan→green gradient bar
 * with a copy line that warms up as the user fills things in. Gives the
 * forms a bit of character and a sense of momentum.
 */
function labelFor(value: number) {
  if (value <= 0) return "Let's get started";
  if (value < 40) return 'Off to a good start…';
  if (value < 75) return 'Looking great';
  if (value < 100) return 'Almost there';
  return 'Ready to send 🚀';
}

export function FormProgress({ value }: { value: number }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="mb-6">
      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
        <motion.span key={labelFor(v)} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
          {labelFor(v)}
        </motion.span>
        <span className="tabular-nums text-navy">{v}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[var(--navy-tint)]">
        <motion.div
          className="h-full rounded-full"
          style={{ background: 'linear-gradient(90deg, var(--cyan), var(--green))' }}
          animate={{ width: `${v}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 20 }}
        />
      </div>
    </div>
  );
}
