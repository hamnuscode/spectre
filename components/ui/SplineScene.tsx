'use client';

import { Suspense, lazy, useEffect, useRef, useState } from 'react';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
  /**
   * Skip the scene's intro (e.g. the start-up zoom-out) by keeping the canvas
   * hidden until this many ms after the scene loads, then fading it in. The
   * intro still plays off-screen, so the user only ever sees the settled pose.
   */
  revealAfter?: number;
}

/**
 * Lazy-loaded Spline 3D scene (ported from the Greply project). Client-only.
 *
 * Global cursor tracking: the scene's pointer handler only listens on its
 * canvas, so we forward out-of-box mouse moves to the canvas as real
 * PointerEvents (one forward per frame using the latest coords). Inside the
 * box, native events handle it, so we skip to avoid duplicates.
 */
export function SplineScene({ scene, className, revealAfter = 0 }: SplineSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(revealAfter === 0);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let canvas: HTMLCanvasElement | null = null;
    let frame = 0;
    let lastX = 0;
    let lastY = 0;

    const flush = () => {
      frame = 0;
      if (!canvas || !canvas.isConnected) canvas = host.querySelector('canvas');
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      const inside =
        lastX >= r.left && lastX <= r.right && lastY >= r.top && lastY <= r.bottom;
      if (inside) return;
      canvas.dispatchEvent(
        new PointerEvent('pointermove', {
          pointerId: 1,
          pointerType: 'mouse',
          isPrimary: true,
          clientX: lastX,
          clientY: lastY,
          bubbles: true,
          cancelable: true,
          view: window,
        }),
      );
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      lastX = e.clientX;
      lastY = e.clientY;
      if (!frame) frame = requestAnimationFrame(flush);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={hostRef} className={className}>
      <Suspense
        fallback={
          <div className="flex h-full w-full items-center justify-center">
            <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--muted)]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[var(--cyan)]" />
              booting agent…
            </span>
          </div>
        }
      >
        <Spline
          scene={scene}
          className="h-full w-full"
          style={{
            opacity: revealed ? 1 : 0,
            transition: 'opacity 0.7s ease',
          }}
          onLoad={() => {
            if (revealAfter > 0) setTimeout(() => setRevealed(true), revealAfter);
          }}
        />
      </Suspense>
    </div>
  );
}
