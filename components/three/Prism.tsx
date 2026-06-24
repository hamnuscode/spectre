'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';

// Lazy, SSR-disabled import of the R3F canvas — keeps three.js out of the
// initial bundle and off the server. Only loads when the hero is near view.
const PrismScene = dynamic(() => import('./PrismScene'), {
  ssr: false,
  loading: () => <PrismFallback />,
});

function PrismFallback() {
  return (
    <div className="grid h-full w-full place-items-center" aria-hidden>
      <div
        className="h-44 w-44 animate-drift rounded-[28%] opacity-80"
        style={{
          background: 'var(--grad-prism)',
          clipPath:
            'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
          filter: 'blur(2px)',
        }}
      />
    </div>
  );
}

export function Prism() {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  const [reduced, setReduced] = useState(false);

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
      className="relative aspect-square w-full max-w-[520px]"
      data-cursor="hover"
    >
      {/* Static, reduced-motion-friendly fallback always rendered underneath */}
      {(reduced || !show) && <PrismFallback />}
      {show && !reduced && (
        <div className="absolute inset-0">
          <PrismScene />
        </div>
      )}
    </div>
  );
}
