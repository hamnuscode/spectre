'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { serviceOptions } from '@/data/services';
import { site } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Label, Input, Textarea, Select, ErrorText } from './Field';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'service' | 'message', string>>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Quick Enquiry / Contact form. Client-side validation + accessible
 * labels and errors, posts to the stubbed /api/enquiry route, and shows
 * a satisfying success state. `compact` tightens it for the home split.
 */
export function EnquiryForm({
  compact = false,
  defaultService = '',
}: {
  compact?: boolean;
  defaultService?: string;
}) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});

  function validate(data: FormData): Errors {
    const e: Errors = {};
    if (!String(data.get('name') || '').trim()) e.name = 'Please enter your name.';
    const email = String(data.get('email') || '').trim();
    if (!email) e.email = 'Please enter your email.';
    else if (!emailRe.test(email)) e.email = 'That email doesn’t look right.';
    if (!String(data.get('service') || '')) e.service = 'Choose what you need help with.';
    if (String(data.get('message') || '').trim().length < 10)
      e.message = 'A little more detail helps us help you.';
    return e;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const v = validate(data);
    setErrors(v);
    if (Object.keys(v).length) {
      const first = form.querySelector<HTMLElement>('[aria-invalid="true"]');
      first?.focus();
      return;
    }
    setStatus('submitting');
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(data)),
      });
      if (!res.ok) throw new Error('bad status');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid place-items-center rounded-2xl prism-border bg-white/85 p-10 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 16 }}
              className="grid h-16 w-16 place-items-center rounded-2xl text-white"
              style={{ background: 'var(--grad-prism)' }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M4 12.5l5 5L20 6.5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
            <h3 className="mt-5 text-2xl">Request received.</h3>
            <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
              Thanks — {site.responsePromise.toLowerCase()} A specialist will be
              in touch shortly.
            </p>
            <button
              onClick={() => setStatus('idle')}
              data-cursor="hover"
              className="mt-6 text-sm font-medium text-[var(--cyan)] hover:underline"
            >
              Send another request
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col gap-4"
          >
            <div className={compact ? 'grid gap-4' : 'grid gap-4 sm:grid-cols-2'}>
              <div>
                <Label htmlFor="name" required>
                  Name
                </Label>
                <Input
                  id="name"
                  name="name"
                  autoComplete="name"
                  placeholder="Jane Doe"
                  error={!!errors.name}
                  aria-invalid={!!errors.name}
                  aria-describedby="name-err"
                />
                <ErrorText id="name-err">{errors.name}</ErrorText>
              </div>
              <div>
                <Label htmlFor="email" required>
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="jane@company.com"
                  error={!!errors.email}
                  aria-invalid={!!errors.email}
                  aria-describedby="email-err"
                />
                <ErrorText id="email-err">{errors.email}</ErrorText>
              </div>
            </div>

            <div>
              <Label htmlFor="service" required>
                What do you need help with?
              </Label>
              <Select
                id="service"
                name="service"
                defaultValue={defaultService}
                error={!!errors.service}
                aria-invalid={!!errors.service}
                aria-describedby="service-err"
              >
                <option value="" disabled>
                  Choose a service…
                </option>
                {serviceOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
              <ErrorText id="service-err">{errors.service}</ErrorText>
            </div>

            <div>
              <Label htmlFor="message" required>
                Tell us a little more
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="A sentence or two about your project or challenge…"
                error={!!errors.message}
                aria-invalid={!!errors.message}
                aria-describedby="message-err"
              />
              <ErrorText id="message-err">{errors.message}</ErrorText>
            </div>

            {status === 'error' && (
              <p role="alert" className="text-sm text-[#c2334d]">
                Something went wrong sending that. Please try again or email{' '}
                {site.email}.
              </p>
            )}

            <div className="flex items-center gap-4">
              <Button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? 'Sending…' : 'Send My Request'}
              </Button>
              <span className="text-xs text-[var(--muted)]">
                {site.responsePromise}
              </span>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
