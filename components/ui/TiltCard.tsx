'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils';

/**
 * Pointer-parallax tilt card. Writes CSS custom properties directly on
 * pointermove (no React state, no re-render) so it stays at 60fps.
 * Disabled for reduced-motion / coarse pointers (falls back to a static lift).
 */
export function TiltCard({
  children,
  className,
  max = 8,
  glow = 'cyan',
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
  glow?: 'navy' | 'cyan' | 'green';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const raf = useRef(0);

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.setProperty('--rx', `${(0.5 - py) * max}deg`);
      el.style.setProperty('--ry', `${(px - 0.5) * max}deg`);
      el.style.setProperty('--mx', `${px * 100}%`);
      el.style.setProperty('--my', `${py * 100}%`);
    });
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  const glowColor =
    glow === 'navy'
      ? 'rgba(7,48,109,0.18)'
      : glow === 'green'
      ? 'rgba(43,215,127,0.22)'
      : 'rgba(39,183,207,0.22)';

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        'group/tilt relative rounded-2xl transition-[transform,box-shadow] duration-300 ease-out',
        '[transform-style:preserve-3d] [transform:perspective(900px)_rotateX(var(--rx,0))_rotateY(var(--ry,0))]',
        'hover:-translate-y-1 hover:shadow-prism',
        className
      )}
      style={
        {
          '--rx': '0deg',
          '--ry': '0deg',
        } as React.CSSProperties
      }
    >
      {/* Pointer-tracked sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background: `radial-gradient(420px circle at var(--mx,50%) var(--my,50%), ${glowColor}, transparent 60%)`,
        }}
      />
      {children}
    </div>
  );
}
