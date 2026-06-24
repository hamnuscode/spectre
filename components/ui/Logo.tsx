import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/data/site';

/**
 * Brand lockup: the SPECTRE prism mark (extracted logo PNG) +
 * wordmark in the display serif with wide tracking, echoing the
 * classical letter-spacing baked into the logo itself.
 */
export function Logo({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <Link
      href="/"
      aria-label={`${site.name} — home`}
      className={`flex items-center gap-3 ${className ?? ''}`}
      data-cursor="hover"
    >
      <Image
        src="/brand/spectre-logo.png"
        alt={`${site.name} logo`}
        width={44}
        height={44}
        priority
        className="h-10 w-10 object-contain transition-transform duration-500 ease-out group-hover/logo:rotate-3"
      />
      {!compact && (
        <span className="wordmark text-[1.05rem] font-medium text-navy">
          Spectre
        </span>
      )}
    </Link>
  );
}
