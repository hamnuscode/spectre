'use client';

import { useCountUp } from '@/hooks/useCountUp';

/**
 * Counts up to `to` once scrolled into view, with optional prefix/suffix.
 * Thin wrapper over useCountUp so stats read as live, animating numbers.
 */
export function CountUp({
  to,
  prefix = '',
  suffix = '',
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const { ref, value } = useCountUp(to);
  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
