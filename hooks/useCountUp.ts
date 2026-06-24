'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Counts up to `target` once the element scrolls into view.
 * Uses a single RAF loop with an ease-out curve; runs exactly once.
 */
export function useCountUp(target: number, durationMs = 1600) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const run = () => {
      if (started.current) return;
      started.current = true;
      if (reduced) {
        setValue(target);
        return;
      }
      let startTs: number | null = null;
      const tick = (ts: number) => {
        if (startTs === null) startTs = ts;
        const p = Math.min((ts - startTs) / durationMs, 1);
        const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
        setValue(Math.round(target * eased));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            run();
            obs.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, durationMs]);

  return { ref, value };
}
