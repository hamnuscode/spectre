/**
 * Persistent ambient layer behind all content — sparse, slow-drifting
 * geometric line-art and angular shards in flat brand colours (no gradients).
 * Everything is transform/opacity animated → GPU-composited, ~0 CPU, and
 * kept at very low opacity so it never competes with text.
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Outlined drifting triangles (echo the logo's facets) */}
      <span
        className="absolute -left-[6%] top-[8%] h-[34vmax] w-[34vmax] animate-drift border-2 border-navy/[0.05]"
        style={{ clipPath: 'polygon(50% 0, 100% 100%, 0 100%)' }}
      />
      <span
        className="absolute right-[-8%] top-[26%] h-[26vmax] w-[26vmax] animate-drift border-2 border-cyan/[0.07]"
        style={{
          clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
          animationDelay: '-7s',
          animationDuration: '24s',
        }}
      />
      <span
        className="absolute bottom-[-6%] left-[34%] h-[24vmax] w-[24vmax] animate-drift border-2 border-green/[0.07]"
        style={{
          clipPath: 'polygon(50% 0, 100% 100%, 0 100%)',
          animationDelay: '-13s',
          animationDuration: '28s',
        }}
      />

      {/* Thin solid accent lines drifting on the diagonal */}
      <span className="absolute left-[14%] top-0 h-[120%] w-px rotate-[14deg] bg-navy/[0.04]" />
      <span className="absolute right-[22%] top-0 h-[120%] w-px -rotate-[10deg] bg-cyan/[0.06]" />
      <span className="absolute left-[62%] top-0 h-[120%] w-px rotate-[8deg] bg-navy/[0.04]" />
    </div>
  );
}
