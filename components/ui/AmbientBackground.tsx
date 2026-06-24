/**
 * Ambient background — soft, calm, barely-there. A few large blurred
 * gradient washes in gentle brand tones that drift very slowly. No busy
 * animation, no canvas; GPU-composited (transform only) and neutralised
 * by the global reduced-motion rule. Sits behind all content at z -10.
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-bg">
      <span className="absolute -left-[12%] -top-[10%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(7,48,109,0.06),transparent_65%)] blur-2xl animate-drift" />
      <span
        className="absolute right-[-14%] top-[22%] h-[48vmax] w-[48vmax] rounded-full bg-[radial-gradient(circle,rgba(39,183,207,0.06),transparent_65%)] blur-2xl animate-drift"
        style={{ animationDelay: '-9s', animationDuration: '30s' }}
      />
      <span
        className="absolute bottom-[-16%] left-[30%] h-[50vmax] w-[50vmax] rounded-full bg-[radial-gradient(circle,rgba(43,215,127,0.05),transparent_65%)] blur-2xl animate-drift"
        style={{ animationDelay: '-16s', animationDuration: '34s' }}
      />
    </div>
  );
}
