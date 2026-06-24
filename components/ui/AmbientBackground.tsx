'use client';

import { useEffect, useRef } from 'react';

/**
 * Tech background — a network of drifting nodes with lines between nearby
 * points. Reacts to the cursor: nodes within range are softly pushed away
 * and ease back via damping. Canvas-rendered (~60 nodes, DPR capped at 1.5),
 * pauses when the tab is hidden, and is disabled for reduced-motion. Sits
 * behind all content (z -10) at low opacity so it never fights the text.
 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const canvas = canvasRef.current;
    if (!canvas || reduced) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    let nodes: { x: number; y: number; vx: number; vy: number; c: string }[] = [];
    const mouse = { x: -9999, y: -9999 };

    const COLORS = ['rgba(7,48,109', 'rgba(39,183,207', 'rgba(43,215,127'];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.min(80, Math.round((w * h) / 22000));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        c: COLORS[i % 3],
      }));
    };
    resize();

    const MAX = 155; // link distance
    const PUSH_R = 150; // cursor influence radius
    let raf = 0;
    let running = true;

    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        // soft cursor repulsion
        const mdx = a.x - mouse.x;
        const mdy = a.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < PUSH_R * PUSH_R) {
          const md = Math.sqrt(md2) || 1;
          const force = (1 - md / PUSH_R) * 0.6;
          a.vx += (mdx / md) * force;
          a.vy += (mdy / md) * force;
        }

        a.x += a.vx;
        a.y += a.vy;
        // gentle damping + tiny brownian drift so motion never dies or runs away
        a.vx = a.vx * 0.94 + (Math.random() - 0.5) * 0.02;
        a.vy = a.vy * 0.94 + (Math.random() - 0.5) * 0.02;
        if (a.x < 0 || a.x > w) a.vx *= -1;
        if (a.y < 0 || a.y > h) a.vy *= -1;
        a.x = Math.max(0, Math.min(w, a.x));
        a.y = Math.max(0, Math.min(h, a.y));

        // links
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX * MAX) {
            const alpha = (1 - Math.sqrt(d2) / MAX) * 0.22;
            ctx.strokeStyle = `rgba(7,48,109,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      // nodes
      for (const n of nodes) {
        ctx.fillStyle = `${n.c},0.7)`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onVisible = () => {
      running = !document.hidden;
      if (running) raf = requestAnimationFrame(tick);
      else cancelAnimationFrame(raf);
    };

    let resizeT: number;
    const onResize = () => {
      clearTimeout(resizeT);
      resizeT = window.setTimeout(resize, 200);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerout', onLeave, { passive: true });
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisible);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerout', onLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 opacity-90" />
    </div>
  );
}
