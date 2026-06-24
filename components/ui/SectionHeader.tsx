import { Reveal } from './Reveal';
import { cn } from '@/lib/utils';

export function SectionHeader({
  eyebrow,
  title,
  intro,
  align = 'left',
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'max-w-2xl',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {eyebrow && (
        <Reveal>
          <p className="eyebrow mb-4">{eyebrow}</p>
        </Reveal>
      )}
      <Reveal delay={60}>
        <h2 className="text-balance text-[clamp(2rem,4.6vw,3.4rem)]">{title}</h2>
      </Reveal>
      {intro && (
        <Reveal delay={120}>
          <p className="mt-5 text-[1.05rem] leading-relaxed text-[var(--muted)]">
            {intro}
          </p>
        </Reveal>
      )}
    </div>
  );
}
