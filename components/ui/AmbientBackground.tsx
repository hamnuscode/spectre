/**
 * Ambient background — subtle and neat. Soft gradient washes in gentle brand
 * tones drift very slowly over a barely-there dot grid. GPU-composited
 * (transform only), neutralised by the global reduced-motion rule, fixed
 * behind all content at z -10.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* faint dot grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: 'radial-gradient(rgba(7,48,109,0.08) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 82%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 82%)',
        }}
      />
      {/* soft drifting gradient washes */}
      <span className="absolute -left-[12%] -top-[10%] h-[52vmax] w-[52vmax] rounded-full bg-[radial-gradient(circle,rgba(7,48,109,0.07),transparent_65%)] blur-2xl animate-drift" />
      <span
        className="absolute right-[-14%] top-[24%] h-[46vmax] w-[46vmax] rounded-full bg-[radial-gradient(circle,rgba(39,183,207,0.07),transparent_65%)] blur-2xl animate-drift"
        style={{ animationDelay: '-9s', animationDuration: '30s' }}
      />
      <span
        className="absolute bottom-[-16%] left-[32%] h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle,rgba(43,215,127,0.06),transparent_65%)] blur-2xl animate-drift"
        style={{ animationDelay: '-16s', animationDuration: '34s' }}
      />
    </div>
  );
}
