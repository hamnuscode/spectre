'use client';

import { useReveal } from '@/hooks/useReveal';
import { cn } from '@/lib/utils';

/**
 * Scroll-reveal wrapper. Animates transform/opacity only.
 * `delay` staggers children via inline transition-delay.
 */
export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn('reveal', className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
