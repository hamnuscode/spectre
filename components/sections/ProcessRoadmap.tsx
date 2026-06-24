'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { process as steps } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';

/* ---- Wave geometry (viewBox units) ---------------------------------- */
const N = steps.length;
const VW = 1000;
const VH = 280;
const X0 = 70;
const STEP = (VW - X0 * 2) / (N - 1);
const HI = 110;
const LO = 185;

const nodes = steps.map((step, i) => ({
  ...step,
  x: X0 + i * STEP,
  y: i % 2 === 0 ? LO : HI,
  up: i % 2 !== 0,
  t: i / (N - 1),
}));

const pathD = nodes.reduce((d, n, i) => {
  if (i === 0) return `M ${n.x} ${n.y}`;
  const p = nodes[i - 1];
  const mx = (p.x + n.x) / 2;
  return `${d} C ${mx} ${p.y} ${mx} ${n.y} ${n.x} ${n.y}`;
}, '');

/**
 * "How We Work" — the inner panel is CSS-sticky inside a tall wrapper, so it
 * stays pinned while you scroll; the coloured line scrubs 0→100% across that
 * distance and nodes fill as it reaches them. Once it completes, the wrapper
 * ends and the page moves on. Driven by a throttled rAF scroll listener that
 * writes straight to the DOM (no per-frame React renders). Reduced-motion
 * users get a fully-drawn static diagram.
 */
export function ProcessRoadmap() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const nodeRefs = useRef<(SVGGElement | null)[]>([]);
  const [active, setActive] = useState(0);

  // Plain rAF scroll listener → sticky-scrub progress written straight to the
  // DOM. (Avoids Framer's scroll hooks, which trip a Next 15.5 prerender bug.)
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const paint = (p: number) => {
      const line = lineRef.current;
      if (line) {
        const len = line.getTotalLength();
        line.style.strokeDasharray = `${len}`;
        line.style.strokeDashoffset = `${len * (1 - p)}`;
      }
      let reached = 0;
      nodeRefs.current.forEach((g, i) => {
        if (!g) return;
        const on = p + 0.001 >= nodes[i].t;
        if (on) reached = i;
        const dot = g.querySelector<SVGCircleElement>('[data-dot]');
        const ring = g.querySelector<SVGCircleElement>('[data-ring]');
        const label = g.querySelector<SVGTextElement>('[data-label]');
        if (dot) dot.setAttribute('r', on ? '6' : '0');
        if (ring) ring.setAttribute('stroke', on ? 'var(--accent)' : 'var(--navy-tint)');
        if (label) label.setAttribute('fill', on ? 'var(--navy)' : 'var(--muted)');
      });
      setActive((prev) => (prev === reached ? prev : reached));
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      paint(1);
      return;
    }

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const rect = wrap.getBoundingClientRect();
        const dist = rect.height - window.innerHeight;
        const p = dist > 0 ? Math.min(1, Math.max(0, -rect.top / dist)) : 0;
        paint(p);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    // Tall wrapper defines the pinned scroll distance.
    <section ref={wrapRef} className="relative h-[180vh] bg-offwhite">
      <div className="sticky top-0 flex min-h-screen flex-col justify-center py-10">
        <div className="container-x">
          <SectionHeader
            eyebrow="// How We Work"
            title={
              <>
                A process that fills in{' '}
                <span className="text-gradient">as you go.</span>
              </>
            }
            intro="From first conversation to ongoing support. Keep scrolling to draw the path; tap any stop to read it."
          />

          <div className="mt-8">
            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              className="w-full"
              role="img"
              aria-label="Spectre's five-step process roadmap"
              style={{ overflow: 'visible' }}
            >
              <path
                className="roadmap-dots"
                d={pathD}
                fill="none"
                stroke="rgba(7,48,109,0.34)"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeDasharray="2 10"
              />
              <path
                ref={lineRef}
                d={pathD}
                fill="none"
                stroke="var(--accent)"
                strokeWidth={4}
                strokeLinecap="round"
              />

              {nodes.map((n, i) => (
                <g
                  key={n.id}
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className="cursor-pointer"
                  onClick={() => setActive(i)}
                >
                  <rect
                    x={n.x - 60}
                    y={n.up ? n.y - 60 : n.y - 20}
                    width={120}
                    height={90}
                    fill="transparent"
                  />
                  <circle cx={n.x} cy={n.y} r={11} fill="#ffffff" data-ring stroke="var(--navy-tint)" strokeWidth={1.5} />
                  <circle cx={n.x} cy={n.y} r={0} fill="var(--accent)" data-dot style={{ transition: 'r .35s ease' }} />
                  {i === active && (
                    <>
                      <circle className="roadmap-pulse" cx={n.x} cy={n.y} r={13} fill="none" stroke="var(--accent)" strokeWidth={1.5} />
                      <circle cx={n.x} cy={n.y} r={18} fill="none" stroke="var(--accent)" strokeWidth={1} opacity={0.35} />
                    </>
                  )}
                  <text
                    data-label
                    x={n.x}
                    y={n.up ? n.y - 30 : n.y + 40}
                    textAnchor="middle"
                    fill="var(--muted)"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 19, fontWeight: 600 }}
                  >
                    {n.title}
                  </text>
                  <text
                    x={n.x}
                    y={n.up ? n.y - 50 : n.y + 60}
                    textAnchor="middle"
                    fill="var(--accent)"
                    style={{ fontFamily: 'var(--font-body)', fontSize: 11, letterSpacing: 2 }}
                  >
                    {`0${i + 1}`}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          <div className="relative mx-auto mt-6 flex min-h-[168px] max-w-3xl flex-col overflow-hidden rounded-2xl border border-[var(--navy-tint)] bg-white/85 p-6 backdrop-blur-sm md:p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={nodes[active].id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center gap-3">
                  <span className="wordmark text-xs text-[var(--accent)]">
                    Step {active + 1} of {N}
                  </span>
                  <span className="h-px flex-1 bg-[var(--navy-tint)]" />
                  <span className="font-display text-base font-semibold text-navy">
                    {nodes[active].title}
                  </span>
                </div>
                <p className="mt-3 leading-relaxed text-ink/70">{nodes[active].detail}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
