/**
 * GlowyWavesHero — layered, softly-glowing flowing waves in brand colours
 * on a deep-navy panel. Pure SVG + CSS transform animation (GPU-composited),
 * deterministic paths (no hydration mismatch), neutralised by reduced-motion.
 */

function wave(y: number, amp: number, period: number, phase: number, width = 2400, step = 16) {
  const pts: string[] = [];
  for (let x = 0; x <= width; x += step) {
    const yy = y + amp * Math.sin((x / period) * Math.PI * 2 + phase);
    pts.push(`${x.toFixed(1)} ${yy.toFixed(1)}`);
  }
  return 'M ' + pts.join(' L ');
}

const LAYERS = [
  { y: 360, amp: 46, period: 400, phase: 0, color: '#27b7cf', width: 7, dur: 26, op: 0.9 },
  { y: 330, amp: 60, period: 480, phase: 1.1, color: '#2bd77f', width: 6, dur: 32, op: 0.8 },
  { y: 300, amp: 38, period: 360, phase: 2.2, color: '#3f6fd1', width: 5, dur: 22, op: 0.75 },
  { y: 270, amp: 52, period: 520, phase: 0.6, color: '#27b7cf', width: 4, dur: 38, op: 0.6 },
];

export function GlowyWavesHero({ className }: { className?: string }) {
  return (
    <div
      className={`relative h-full min-h-[320px] w-full overflow-hidden rounded-3xl bg-[var(--navy-deep)] ${className ?? ''}`}
    >
      {/* soft ambient glow */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[120%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(39,183,207,0.25), transparent 70%)' }}
      />
      <svg
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <filter id="gw-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        {LAYERS.map((l, i) => (
          <g key={i}>
            {/* glow underlay */}
            <path
              d={wave(l.y, l.amp, l.period, l.phase)}
              fill="none"
              stroke={l.color}
              strokeWidth={l.width + 6}
              strokeLinecap="round"
              opacity={l.op * 0.4}
              filter="url(#gw-glow)"
              style={{ animation: `waveflow ${l.dur}s linear infinite`, animationDelay: `${-i * 3}s` }}
            />
            {/* crisp line */}
            <path
              d={wave(l.y, l.amp, l.period, l.phase)}
              fill="none"
              stroke={l.color}
              strokeWidth={l.width}
              strokeLinecap="round"
              opacity={l.op}
              style={{ animation: `waveflow ${l.dur}s linear infinite`, animationDelay: `${-i * 3}s` }}
            />
          </g>
        ))}
      </svg>

      {/* subtle vignette for depth */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'radial-gradient(120% 100% at 50% 0%, transparent 40%, rgba(4,29,68,0.65) 100%)' }}
      />
    </div>
  );
}

export default GlowyWavesHero;
