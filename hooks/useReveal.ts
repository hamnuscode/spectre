'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight scroll-reveal via IntersectionObserver.
 * Adds `.in` to the element once it enters the viewport (one-shot).
 * CSS handles the transition (transform/opacity only) — no JS animation cost.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      el.classList.add('in');
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            obs.unobserve(entry.target);
          }
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? '0px 0px -8% 0px',
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  return ref;
}
