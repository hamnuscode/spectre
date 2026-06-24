'use client';

import { useEffect, useRef } from 'react';

/**
 * Lightweight scroll-reveal via IntersectionObserver.
 * Adds `.in` to the element once it enters the viewport (one-shot).
 * CSS handles the transition (transform/opacity only) — no JS animation cost.
 *
 * Hardened against the "stuck invisible until repaint" bug: if the element
 * is already on-screen at mount, or the observer somehow never fires, a
 * fallback timer reveals it so text can never be permanently hidden.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string }
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveal = () => el.classList.add('in');

    if (
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      reveal();
      return;
    }

    // If it's already in view at mount, reveal on the next frame.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      requestAnimationFrame(reveal);
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
        threshold: options?.threshold ?? 0.12,
        rootMargin: options?.rootMargin ?? '0px 0px -6% 0px',
      }
    );
    obs.observe(el);

    // Absolute fallback: never let content stay hidden.
    const fallback = window.setTimeout(reveal, 1400);

    return () => {
      obs.disconnect();
      window.clearTimeout(fallback);
    };
  }, [options?.threshold, options?.rootMargin]);

  return ref;
}
