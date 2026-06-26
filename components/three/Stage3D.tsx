'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

/**
 * Generic lazy 3D stage. Picks a scene by `variant`, loads three.js only
 * when near view (IntersectionObserver), SSR-disabled, with a static
 * reduced-motion / pre-hydration fallback. Keeps three out of the initial
 * bundle on every route.
 */
const scenes = {
  hero: dynamic(() => import('./HeroScene'), { ssr: false, loading: () => <Fallback /> }),
  ico: dynamic(() => import('./IcoScene'), { ssr: false, loading: () => <Fallback /> }),
  knot: dynamic(() => import('./KnotScene'), { ssr: false, loading: () => <Fallback /> }),
  cubes: dynamic(() => import('./CubesScene'), { ssr: false, loading: () => <Fallback /> }),
  earth: dynamic(() => import('./EarthScene'), { ssr: false, loading: () => <Fallback /> }),
};

function Fallback() {
  return (
    <div className="grid h-full w-full place-items-center" aria-hidden>
      <div className="h-36 w-36 animate-drift rounded-[2rem] bg-navy/10 ring-1 ring-navy/10" />
    </div>
  );
}

export function Stage3D({
  variant = 'hero',
  className,
}: {
  variant?: keyof typeof scenes;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [reduced, setReduced] = useState(false);
  const Scene = scenes[variant];

  useEffect(() => {
    setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShow(true);
          obs.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className ?? 'relative aspect-square w-full max-w-[520px]'}
      data-cursor="hover"
    >
      {(reduced || !show) && <Fallback />}
      {show && !reduced && (
        <div className="absolute inset-0">
          <Scene />
        </div>
      )}
    </div>
  );
}
