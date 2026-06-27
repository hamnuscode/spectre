/**
 * Ambient background — site-wide, subtle, alive. A barely-there line grid
 * slowly pans while themed gradient blobs drift behind it. Everything is
 * GPU-composited, neutralised by the global reduced-motion rule, and fixed
 * behind all content at z -10.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      {/* slowly-panning line grid */}
      <div className="absolute inset-[-56px] animate-gridpan opacity-[0.6]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(7,48,109,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(7,48,109,0.05) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />
      </div>

      {/* faint dot grid for texture */}
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage: 'radial-gradient(rgba(7,48,109,0.07) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse at center, black 35%, transparent 82%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 35%, transparent 82%)',
        }}
      />

      {/* soft drifting themed gradient blobs — the radial gradients are
          already soft (fade to transparent), so no costly CSS blur is needed.
          Each is promoted to its own GPU layer so the drift transform is a
          cheap composite, not a per-frame re-rasterisation. */}
      <span className="animate-drift absolute -left-[12%] -top-[10%] h-[52vmax] w-[52vmax] transform-gpu rounded-full bg-[radial-gradient(circle,rgba(7,48,109,0.16),transparent_70%)] will-change-transform" />
      <span
        className="animate-drift absolute right-[-14%] top-[18%] h-[46vmax] w-[46vmax] transform-gpu rounded-full bg-[radial-gradient(circle,rgba(39,183,207,0.18),transparent_70%)] will-change-transform"
        style={{ animationDelay: '-9s', animationDuration: '30s' }}
      />
      <span
        className="animate-drift absolute bottom-[-18%] left-[28%] h-[50vmax] w-[50vmax] transform-gpu rounded-full bg-[radial-gradient(circle,rgba(43,215,127,0.16),transparent_70%)] will-change-transform"
        style={{ animationDelay: '-16s', animationDuration: '34s' }}
      />
    </div>
  );
}
