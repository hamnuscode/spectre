'use client';

import { useEffect, useRef } from 'react';

/**
 * Custom cursor: a small dot + a trailing ring that lags behind via lerp.
 * Implemented with ONE rAF loop writing transforms directly to the DOM —
 * no React state, so it never triggers a re-render. Disabled on touch /
 * coarse pointers and when the user prefers reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add('has-custom-cursor');

    // Target (true pointer) vs. ring (eased follower).
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let rx = tx;
    let ry = ty;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      // Dot is 1:1 with the pointer — written immediately for zero lag feel.
      dot.style.transform = `translate3d(${tx}px, ${ty}px, 0)`;
      // Wake the ring loop if it had settled and parked itself.
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      // Ring eases toward the pointer (cheap lerp).
      rx += (tx - rx) * 0.18;
      ry += (ty - ry) * 0.18;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      // Park the loop once settled so we don't burn a frame every 16ms while
      // the pointer is idle; onMove re-arms it.
      if (Math.abs(tx - rx) < 0.1 && Math.abs(ty - ry) < 0.1) {
        raf = 0;
        return;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Hover state: enlarge ring over interactive elements via event delegation.
    const interactiveSel = 'a, button, input, textarea, select, [data-cursor="hover"], [role="button"]';
    const onOver = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.(interactiveSel)) {
        ring.classList.add('is-hover');
        dot.classList.add('is-hover');
      }
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement;
      if (t.closest?.(interactiveSel)) {
        ring.classList.remove('is-hover');
        dot.classList.remove('is-hover');
      }
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="cursor-ring" aria-hidden />
      <div ref={dotRef} className="cursor-dot" aria-hidden />
    </>
  );
}
