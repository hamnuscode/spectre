'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { serviceOptions } from '@/data/services';
import { site } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, ErrorText } from './Field';
import { ThemedSelect } from './ThemedSelect';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'service' | 'message', string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Quick Enquiry form (home Why-Spectre card). Placeholder-led fields,
 * themed dropdown, client validation + accessible errors, posts to the
 * stubbed /api/enquiry route, and shows a satisfying success state.
 */
export function EnquiryForm({ defaultService = '' }: { defaultService?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [service, setService] = useState(defaultService);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const eo: Errors = {};
    if (!String(data.get('name') || '').trim()) eo.name = 'Please enter your name.';
    const email = String(data.get('email') || '').trim();
    if (!email) eo.email = 'Please enter your email.';
    else if (!emailRe.test(email)) eo.email = 'That email doesn’t look right.';
    if (!service) eo.service = 'Choose what you need help with.';
    if (String(data.get('message') || '').trim().length < 10)
      eo.message = 'A little more detail helps us help you.';
    setErrors(eo);
    if (Object.keys(eo).length) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      form.reset();
      setService('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid place-items-center rounded-2xl border border-[var(--navy-tint)] bg-white/85 p-10 text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-white"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <h3 className="mt-5 text-2xl">Request received.</h3>
        <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
          Thanks — {site.responsePromise.toLowerCase()} A specialist will be in
          touch shortly.
        </p>
        <button
          onClick={() => setStatus('idle')}
          data-cursor="hover"
          className="mt-6 text-sm font-medium text-[var(--accent)] hover:underline"
        >
          Send another request
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Input name="name" aria-label="Full name" autoComplete="name" placeholder="Full Name" error={!!errors.name} aria-invalid={!!errors.name} />
          <ErrorText id="name-err">{errors.name}</ErrorText>
        </div>
        <div>
          <Input name="email" type="email" aria-label="Business email" autoComplete="email" placeholder="Business Email" error={!!errors.email} aria-invalid={!!errors.email} />
          <ErrorText id="email-err">{errors.email}</ErrorText>
        </div>
      </div>

      <Input name="company" aria-label="Company name" autoComplete="organization" placeholder="Company Name" />

      <div>
        <ThemedSelect
          name="service"
          ariaLabel="What do you need help with?"
          placeholder="What do you need help with?"
          options={serviceOptions}
          value={service}
          onChange={setService}
          error={!!errors.service}
        />
        <ErrorText id="service-err">{errors.service}</ErrorText>
      </div>

      <div>
        <Textarea name="message" aria-label="Your message" placeholder="Brief message…" error={!!errors.message} aria-invalid={!!errors.message} />
        <ErrorText id="message-err">{errors.message}</ErrorText>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-[#c2334d]">
          Something went wrong. Please try again or email {site.email}.
        </p>
      )}

      <Button type="submit" disabled={status === 'submitting'} className="w-full justify-center">
        {status === 'submitting' ? 'Sending…' : 'Send My Request'}
      </Button>
    </form>
  );
}
