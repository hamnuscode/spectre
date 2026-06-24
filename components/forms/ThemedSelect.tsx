'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface Option {
  value: string;
  label: string;
}

/**
 * Compact, on-brand custom dropdown (replaces the OS-styled native <select>).
 * Renders a hidden input so it still works with FormData. Controlled when
 * `value` is provided, otherwise self-managed. Keyboard + click-outside aware.
 */
export function ThemedSelect({
  name,
  options,
  value,
  defaultValue = '',
  onChange,
  placeholder = 'Choose…',
  error,
  id,
  ariaLabel,
}: {
  name: string;
  options: Option[];
  value?: string;
  defaultValue?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  error?: boolean;
  id?: string;
  ariaLabel?: string;
}) {
  const controlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = controlled ? value! : internal;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find((o) => o.value === current);

  function pick(v: string) {
    if (!controlled) setInternal(v);
    onChange?.(v);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <input type="hidden" name={name} value={current} />
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={ariaLabel}
        data-cursor="hover"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          'flex w-full items-center justify-between rounded-xl border bg-white/70 px-4 py-3 text-left text-sm outline-none transition-all duration-200',
          error ? 'border-[#c2334d]' : 'border-[var(--navy-tint)]',
          open && 'border-[var(--accent)] ring-2 ring-[var(--accent)]/20'
        )}
      >
        <span className={selected ? 'text-ink' : 'text-[var(--muted)]/70'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={cn('transition-transform duration-200', open && 'rotate-180')}
          aria-hidden
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            id={listId}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-[var(--navy-tint)] bg-white p-1.5 shadow-[0_18px_45px_-18px_rgba(7,48,109,0.4)]"
          >
            {options.map((o) => {
              const on = o.value === current;
              return (
                <li key={o.value} role="option" aria-selected={on}>
                  <button
                    type="button"
                    data-cursor="hover"
                    onClick={() => pick(o.value)}
                    className={cn(
                      'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors duration-150',
                      on
                        ? 'bg-[var(--navy-tint)] font-medium text-navy'
                        : 'text-ink/80 hover:bg-[var(--navy-tint)]/50'
                    )}
                  >
                    {o.label}
                    {on && (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                        <path d="M4 12.5l5 5L20 6.5" />
                      </svg>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
