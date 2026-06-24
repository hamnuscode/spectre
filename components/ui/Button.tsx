'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';

const base =
  'group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-out focus-visible:outline-2';

const variants: Record<Variant, string> = {
  primary:
    'bg-navy text-white shadow-prism hover:-translate-y-0.5 hover:shadow-glow hover:bg-[var(--navy-soft)]',
  secondary:
    'prism-border rounded-full text-navy hover:-translate-y-0.5 hover:text-[var(--cyan)]',
  ghost: 'text-navy hover:text-[var(--cyan)]',
};

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}

export function Button({
  href,
  variant = 'primary',
  className,
  children,
  onClick,
  type = 'button',
  disabled,
}: CommonProps & {
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
}) {
  const cls = cn(base, variants[variant], disabled && 'opacity-60', className);
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === 'primary' && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-[var(--cyan)]/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls} data-cursor="hover">
        {inner}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cls}
      data-cursor="hover"
    >
      {inner}
    </button>
  );
}
