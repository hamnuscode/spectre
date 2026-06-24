'use client';

import createGlobe from 'cobe';
import { useEffect, useRef } from 'react';

/**
 * Interactive globe (cobe). Draggable to spin, auto-rotates otherwise.
 * Brand-tinted, GPU-canvas, no React re-render per frame.
 */
export function Globe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerMovement = useRef(0);
  const rRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let phi = 0;
    let width = 0;
    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener('resize', onResize);
    onResize();

    // cobe's published types omit `onRender`, which it supports at runtime.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const options: any = {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.28,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 14000,
      mapBrightness: 6,
      baseColor: [0.16, 0.32, 0.58],
      markerColor: [0.17, 0.84, 0.5],
      glowColor: [0.15, 0.72, 0.81],
      markers: [
        { location: [40.71, -74.0], size: 0.05 }, // NY
        { location: [51.5, -0.12], size: 0.04 }, // London
        { location: [33.69, 73.06], size: 0.05 }, // Islamabad
        { location: [1.35, 103.82], size: 0.04 }, // Singapore
        { location: [53.55, -113.49], size: 0.04 }, // Edmonton
      ],
      onRender: (state: Record<string, number>) => {
        if (pointerInteracting.current === null) phi += 0.004;
        state.phi = phi + rRef.current;
        state.width = width * 2;
        state.height = width * 2;
      },
    };
    const globe = createGlobe(canvas, options);

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      data-cursor="hover"
      onPointerDown={(e) => {
        pointerInteracting.current = e.clientX - pointerMovement.current;
        if (canvasRef.current) canvasRef.current.style.cursor = 'grabbing';
      }}
      onPointerUp={() => {
        pointerInteracting.current = null;
        if (canvasRef.current) canvasRef.current.style.cursor = 'grab';
      }}
      onPointerOut={() => {
        pointerInteracting.current = null;
      }}
      onPointerMove={(e) => {
        if (pointerInteracting.current !== null) {
          const delta = e.clientX - pointerInteracting.current;
          pointerMovement.current = delta;
          rRef.current = delta / 200;
        }
      }}
      className={className}
      style={{ width: '100%', aspectRatio: '1', cursor: 'grab', contain: 'layout paint size' }}
    />
  );
}
