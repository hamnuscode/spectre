'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { serviceOptions } from '@/data/services';
import { site } from '@/data/site';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, ErrorText } from './Field';
import { ThemedSelect } from './ThemedSelect';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Errors = Partial<Record<'name' | 'email' | 'message', string>>;
const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const budgets = [
  { value: 'under-5k', label: 'Under $5k' },
  { value: '5-15k', label: '$5k – $15k' },
  { value: '15-50k', label: '$15k – $50k' },
  { value: '50k-plus', label: '$50k+' },
  { value: 'unsure', label: 'Not sure yet' },
];

function FieldLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <span className="mb-2 block text-xs font-semibold uppercase tracking-wider text-navy">
      {children}
      {required && <span className="text-[var(--green)]"> *</span>}
    </span>
  );
}

export function ContactForm({ initialService = '' }: { initialService?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [service, setService] = useState(initialService);
  const [budget, setBudget] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const eo: Errors = {};
    if (!String(data.get('name') || '').trim()) eo.name = 'Please enter your name.';
    const email = String(data.get('email') || '').trim();
    if (!email) eo.email = 'Please enter your email.';
    else if (!emailRe.test(email)) eo.email = 'That email doesn’t look right.';
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
      setBudget('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="rounded-3xl border border-[var(--navy-tint)] bg-white/90 p-7 shadow-[0_30px_70px_-40px_rgba(7,48,109,0.5)] backdrop-blur-md md:p-9">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <span aria-hidden className="grid h-12 w-12 place-items-center rounded-2xl bg-navy text-white">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2Z" />
          </svg>
        </span>
        <div>
          <h2 className="text-xl leading-tight">Send Us a Message</h2>
          <p className="text-sm text-[var(--muted)]">We&apos;ll reply within one business day</p>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid place-items-center py-12 text-center"
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
            <h3 className="mt-5 text-2xl">Message sent.</h3>
            <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
              Thanks for reaching out — a specialist will be in touch within 1 business day.
            </p>
            <button onClick={() => setStatus('idle')} data-cursor="hover" className="mt-6 text-sm font-medium text-[var(--accent)] hover:underline">
              Send another message
            </button>
          </motion.div>
        ) : (
          <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <FieldLabel required>Full name</FieldLabel>
                <Input name="name" autoComplete="name" placeholder="Jane Smith" error={!!errors.name} aria-invalid={!!errors.name} />
                <ErrorText id="c-name">{errors.name}</ErrorText>
              </label>
              <label>
                <FieldLabel required>Business email</FieldLabel>
                <Input name="email" type="email" autoComplete="email" placeholder="jane@company.com" error={!!errors.email} aria-invalid={!!errors.email} />
                <ErrorText id="c-email">{errors.email}</ErrorText>
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <label>
                <FieldLabel>Phone number</FieldLabel>
                <Input name="phone" type="tel" autoComplete="tel" placeholder="+1 (000) 000-0000" />
              </label>
              <label>
                <FieldLabel>Company name</FieldLabel>
                <Input name="company" autoComplete="organization" placeholder="Acme Corp" />
              </label>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <FieldLabel>Service of interest</FieldLabel>
                <ThemedSelect name="service" ariaLabel="Service of interest" placeholder="Select a service…" options={serviceOptions} value={service} onChange={setService} />
              </div>
              <div>
                <FieldLabel>Project budget</FieldLabel>
                <ThemedSelect name="budget" ariaLabel="Project budget" placeholder="Select a range…" options={budgets} value={budget} onChange={setBudget} />
              </div>
            </div>

            <label>
              <FieldLabel required>Tell us about your project</FieldLabel>
              <Textarea name="message" className="min-h-[150px]" placeholder="Describe your project, goals, timeline, or anything that helps us understand what you're building…" error={!!errors.message} aria-invalid={!!errors.message} />
              <ErrorText id="c-msg">{errors.message}</ErrorText>
            </label>

            {status === 'error' && (
              <p role="alert" className="text-sm text-[#c2334d]">
                Something went wrong. Please try again or email {site.email}.
              </p>
            )}

            <Button type="submit" disabled={status === 'submitting'} className="w-full justify-center">
              {status === 'submitting' ? 'Sending…' : 'Send Message'}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
