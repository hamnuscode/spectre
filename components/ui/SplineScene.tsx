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
 * canvas, so we forward every mouse move to the canvas as a real PointerEvent
 * (one forward per frame using the latest coords). We always forward — even
 * when the cursor is over the canvas — because the robot can sit beneath other
 * layers (e.g. a hero background) where native pointer events never reach it.
 * Events are dispatched non-bubbling so they don't re-trigger this listener.
 */
type SplineApp = { stop: () => void; play: () => void };

export function SplineScene({ scene, className, revealAfter = 0 }: SplineSceneProps) {
  const hostRef = useRef<HTMLDivElement>(null);
  const appRef = useRef<SplineApp | null>(null);
  // Whether the scene is on-screen; cursor forwarding + Spline's render loop
  // are paused when it isn't.
  const visibleRef = useRef(true);
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
      if (!visibleRef.current) return; // off-screen: don't drive the canvas
      if (!canvas || !canvas.isConnected) canvas = host.querySelector('canvas');
      if (!canvas) return;
      canvas.dispatchEvent(
        new PointerEvent('pointermove', {
          pointerId: 1,
          pointerType: 'mouse',
          isPrimary: true,
          clientX: lastX,
          clientY: lastY,
          bubbles: false,
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

    // Apply the current visibility/tab state to Spline's render loop.
    const sync = () => {
      const app = appRef.current;
      if (!app) return;
      if (visibleRef.current && !document.hidden) app.play();
      else app.stop();
    };

    // Pause the 3D render loop when the scene scrolls out of view.
    const io = new IntersectionObserver(
      ([e]) => {
        visibleRef.current = e.isIntersecting;
        sync();
      },
      { rootMargin: '120px' },
    );
    io.observe(host);

    // …and when the tab is backgrounded.
    const onVisChange = () => sync();
    document.addEventListener('visibilitychange', onVisChange);

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('visibilitychange', onVisChange);
      io.disconnect();
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
          onLoad={(app) => {
            appRef.current = app;
            // If it finished loading while already scrolled away / tab hidden,
            // don't let its render loop run.
            if (!visibleRef.current || document.hidden) app.stop();
            if (revealAfter > 0) setTimeout(() => setRevealed(true), revealAfter);
          }}
        />
      </Suspense>
    </div>
  );
}
