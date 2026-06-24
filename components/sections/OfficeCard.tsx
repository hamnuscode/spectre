'use client';

import { site } from '@/data/site';

/**
 * Interactive "office" card: a stylised animated radar/map built from pure
 * CSS (concentric prism rings + a pulsing pin) — no map tile requests, no
 * heavy embed. Contact details sit beneath. All motion is transform/opacity.
 */
export function OfficeCard() {
  return (
    <div className="prism-border overflow-hidden rounded-3xl bg-navy text-white">
      {/* Radar */}
      <div className="relative aspect-[5/4] overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(circle at 50% 55%, rgba(39,183,207,0.35), transparent 60%), var(--navy)',
          }}
        />
        {/* Grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        {/* Concentric pulse rings */}
        <div className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--green)]/40"
              style={{
                animation: 'ping 3s cubic-bezier(0,0,0.2,1) infinite',
                animationDelay: `${i * 1}s`,
              }}
            />
          ))}
          {/* Pin */}
          <span
            className="relative block h-5 w-5 rounded-full"
            style={{
              background: 'var(--grad-prism)',
              boxShadow: '0 0 0 4px rgba(43,215,127,0.25)',
            }}
          />
        </div>

        <span className="absolute bottom-4 left-5 wordmark text-xs text-white/60">
          Global · Remote-first
        </span>
      </div>

      {/* Details */}
      <div className="space-y-5 p-7">
        <Detail label="Email" value={site.email} href={`mailto:${site.email}`} />
        {site.phones.map((p, i) => (
          <Detail
            key={p}
            label={i === 0 ? 'Phone' : 'Alt. phone'}
            value={p}
            href={`tel:${p.replace(/[^+\d]/g, '')}`}
          />
        ))}
        <div className="flex flex-wrap gap-3 pt-2">
          {site.socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="hover"
              className="rounded-full border border-white/20 px-4 py-1.5 text-xs uppercase tracking-wider text-white/75 transition-colors hover:border-[var(--green)] hover:text-[var(--green)]"
            >
              {s.label}
            </a>
          ))}
        </div>
        <p className="border-t border-white/10 pt-4 text-sm text-white/65">
          {site.responsePromise}
        </p>
      </div>

      <style jsx>{`
        @keyframes ping {
          0% {
            transform: translate(-50%, -50%) scale(0.4);
            opacity: 0.9;
          }
          100% {
            transform: translate(-50%, -50%) scale(2.4);
            opacity: 0;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          span {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

function Detail({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href: string;
}) {
  return (
    <div>
      <div className="text-xs uppercase tracking-[0.2em] text-[var(--cyan)]">
        {label}
      </div>
      <a
        href={href}
        data-cursor="hover"
        className="font-display text-lg font-black transition-colors hover:text-[var(--green)]"
      >
        {value}
      </a>
    </div>
  );
}
