'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { services } from '@/data/services';
import { EnquiryForm } from '@/components/forms/EnquiryForm';

/**
 * Interactive contact: a visual discipline picker drives the form's service
 * field. Pick a chip, the form updates — or just use the dropdown. Clean,
 * controlled, accessible.
 */
export function ContactExperience({ initial = '' }: { initial?: string }) {
  const [service, setService] = useState(initial);

  return (
    <div className="rounded-3xl border border-[var(--navy-tint)] bg-white/85 p-6 backdrop-blur-md md:p-9">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
        What can we help with?
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {services.map((s) => {
          const on = service === s.slug;
          return (
            <button
              key={s.slug}
              type="button"
              onClick={() => setService(on ? '' : s.slug)}
              data-cursor="hover"
              aria-pressed={on}
              className={`rounded-full border px-4 py-2 text-sm transition-all duration-300 ${
                on
                  ? 'border-navy bg-navy text-white'
                  : 'border-[var(--navy-tint)] text-navy hover:border-[var(--accent)] hover:text-[var(--accent)]'
              }`}
            >
              {s.name}
            </button>
          );
        })}
      </div>

      <motion.div layout className="mt-8 border-t border-[var(--navy-tint)] pt-8">
        <EnquiryForm serviceValue={service} onServiceValue={setService} />
      </motion.div>
    </div>
  );
}
