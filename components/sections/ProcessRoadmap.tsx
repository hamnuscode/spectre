'use client';

import { useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion';
import { process } from '@/data/site';
import { SectionHeader } from '@/components/ui/SectionHeader';

/* ---- Wave geometry (viewBox units) ---------------------------------- */
const N = process.length;
const VW = 1000;
const VH = 340;
const X0 = 70;
const STEP = (VW - X0 * 2) / (N - 1);
const HI = 120; // crest y
const LO = 250; // trough y

const nodes = process.map((step, i) => ({
  ...step,
  x: X0 + i * STEP,
  y: i % 2 === 0 ? LO : HI,
  up: i % 2 !== 0, // crest → label above
  t: i / (N - 1), // scroll threshold
}));

// Smooth wave path through the nodes.
const pathD = nodes.reduce((d, n, i) => {
  if (i === 0) return `M ${n.x} ${n.y}`;
  const p = nodes[i - 1];
  const mx = (p.x + n.x) / 2;
  return `${d} C ${mx} ${p.y} ${mx} ${n.y} ${n.x} ${n.y}`;
}, '');

/**
 * "How We Work" — a wavy roadmap whose coloured line draws in as the section
 * scrolls through the viewport. Nodes fill once the line reaches them; the
 * detail panel below tracks the furthest-reached step (and can be previewed
 * by clicking a node). The fill is a single Framer `pathLength` motion value
 * (GPU-smooth), with a spring for buttery scrubbing. Reduced-motion users
 * still get a fully-drawn, readable diagram.
 */
export function ProcessRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 78%', 'end 55%'],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.4,
  });

  const [reached, setReached] = useState(0);
  const [active, setActive] = useState(0);

  useMotionValueEvent(drawn, 'change', (v) => {
    let r = 0;
    for (let i = 0; i < N; i++) if (nodes[i].t <= v + 0.02) r = i;
    setReached((prev) => {
      if (prev !== r) setActive(r);
      return r;
    });
  });

  return (
    <section ref={ref} className="bg-offwhite py-20 lg:py-28">
      <div className="container-x">
        <SectionHeader
          eyebrow="// How We Work"
          title={
            <>
              A process that fills in{' '}
              <span className="text-gradient">as you go.</span>
            </>
          }
          intro="From first conversation to ongoing support. Scroll to trace the path — or tap any stop to jump ahead."
        />

        {/* Roadmap */}
        <div className="mt-14">
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="w-full"
            role="img"
            aria-label="Spectre's five-step process roadmap"
            style={{ overflow: 'visible' }}
          >
            {/* Base dotted track */}
            <path
              d={pathD}
              fill="none"
              stroke="var(--navy-tint)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeDasharray="1 14"
            />
            {/* Drawn coloured line */}
            <motion.path
              d={pathD}
              fill="none"
              stroke="var(--green)"
              strokeWidth={5}
              strokeLinecap="round"
              style={{ pathLength: drawn }}
            />

            {/* Nodes + labels */}
            {nodes.map((n, i) => {
              const filled = i <= reached;
              const isActive = i === active;
              return (
                <g
                  key={n.id}
                  className="cursor-pointer"
                  onClick={() => setActive(i)}
                >
                  {/* generous hit area */}
                  <rect
                    x={n.x - 60}
                    y={n.up ? n.y - 60 : n.y - 20}
                    width={120}
                    height={90}
                    fill="transparent"
                  />
                  <circle
                    cx={n.x}
                    cy={n.y}
                    r={filled ? 15 : 12}
                    fill={filled ? 'var(--green)' : '#ffffff'}
                    stroke={filled ? 'var(--green)' : 'var(--navy-tint)'}
                    strokeWidth={3}
                    style={{ transition: 'r .3s ease, fill .3s ease' }}
                  />
                  {isActive && (
                    <circle cx={n.x} cy={n.y} r={23} fill="none" stroke="var(--navy)" strokeWidth={1.5} opacity={0.5} />
                  )}
                  <text
                    x={n.x}
                    y={n.up ? n.y - 34 : n.y + 46}
                    textAnchor="middle"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 20,
                      fontWeight: isActive ? 700 : 500,
                      fill: filled ? 'var(--navy)' : 'var(--muted)',
                      transition: 'fill .3s ease',
                    }}
                  >
                    {n.title}
                  </text>
                  <text
                    x={n.x}
                    y={n.up ? n.y - 56 : n.y + 66}
                    textAnchor="middle"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 12,
                      letterSpacing: 2,
                      fill: 'var(--cyan)',
                    }}
                  >
                    {`0${i + 1}`}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Active detail */}
        <div className="relative mx-auto mt-6 max-w-3xl overflow-hidden rounded-2xl prism-border bg-white/80 p-7 backdrop-blur-sm md:p-9">
          <AnimatePresence mode="wait">
            <motion.div
              key={nodes[active].id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="flex items-center gap-3">
                <span className="wordmark text-xs text-[var(--cyan)]">
                  Step {active + 1} of {N}
                </span>
                <span className="h-px flex-1 bg-[var(--navy-tint)]" />
                <span className="font-display text-base font-bold text-navy">
                  {nodes[active].title}
                </span>
              </div>
              <p className="mt-4 leading-relaxed text-ink/70">
                {nodes[active].detail}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
