/**
 * Persistent ambient layer behind all content.
 * Three slow-drifting prismatic blobs + a faint geometric grid.
 * GPU-composited (transform/opacity only) — costs ~0 CPU and never
 * competes with text (very low opacity, sits at z-index -1, fixed).
 */
export function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Soft prismatic blobs */}
      <span className="absolute -left-[10%] top-[-8%] h-[46vmax] w-[46vmax] rounded-full bg-[radial-gradient(circle,rgba(7,48,109,0.16),transparent_62%)] blur-[8px] animate-drift" />
      <span
        className="absolute right-[-12%] top-[18%] h-[40vmax] w-[40vmax] rounded-full bg-[radial-gradient(circle,rgba(39,183,207,0.16),transparent_62%)] blur-[8px] animate-drift"
        style={{ animationDelay: '-6s', animationDuration: '22s' }}
      />
      <span
        className="absolute bottom-[-14%] left-[28%] h-[42vmax] w-[42vmax] rounded-full bg-[radial-gradient(circle,rgba(43,215,127,0.14),transparent_62%)] blur-[8px] animate-drift"
        style={{ animationDelay: '-12s', animationDuration: '26s' }}
      />

      {/* Faint geometric grid */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(7,48,109,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(7,48,109,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 78%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 78%)',
        }}
      />
    </div>
  );
}
