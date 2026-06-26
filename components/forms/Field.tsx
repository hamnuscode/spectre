'use client';

import { cn } from '@/lib/utils';

const fieldBase =
  'w-full rounded-xl border border-[var(--navy-tint)] bg-white/70 px-4 py-3 text-sm text-ink outline-none transition-all duration-200 placeholder:text-[var(--muted)]/60 hover:border-[var(--cyan)]/50 focus:border-[var(--cyan)] focus:ring-2 focus:ring-[var(--cyan)]/25 focus:bg-white focus:shadow-[0_10px_30px_-14px_rgba(39,183,207,0.6)]';

export function Label({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1.5 block text-sm font-medium text-navy"
    >
      {children}
      {required && <span className="text-[var(--green)]"> *</span>}
    </label>
  );
}

export function ErrorText({ id, children }: { id: string; children?: string }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1.5 text-xs text-[#c2334d]">
      {children}
    </p>
  );
}

export function Input({
  error,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }) {
  return (
    <input
      className={cn(fieldBase, error && 'border-[#c2334d] focus:ring-[#c2334d]/20', className)}
      {...props}
    />
  );
}

export function Textarea({
  error,
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }) {
  return (
    <textarea
      className={cn(fieldBase, 'min-h-[120px] resize-y', error && 'border-[#c2334d]', className)}
      {...props}
    />
  );
}

export function Select({
  error,
  className,
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }) {
  return (
    <div className="relative">
      <select
        className={cn(
          fieldBase,
          'cursor-pointer appearance-none pr-10',
          error && 'border-[#c2334d]',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <span
        aria-hidden
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--cyan)]"
      >
        ▾
      </span>
    </div>
  );
}
