'use client';

import { useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Label, Input, Textarea, Select, ErrorText } from './Field';

type Status = 'idle' | 'submitting' | 'success' | 'error';
type Errors = Partial<
  Record<'name' | 'email' | 'role' | 'cv' | 'github' | 'linkedin', string>
>;

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const urlRe = /^https?:\/\/.+\..+/;
const MAX = 5 * 1024 * 1024;
const TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export function CareersForm({ roles }: { roles: string[] }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Errors>({});
  const [fileName, setFileName] = useState<string>('');
  const fileRef = useRef<HTMLInputElement>(null);

  function validate(form: HTMLFormElement): Errors {
    const e: Errors = {};
    const d = new FormData(form);
    if (!String(d.get('name') || '').trim()) e.name = 'Please enter your name.';
    const email = String(d.get('email') || '').trim();
    if (!email) e.email = 'Please enter your email.';
    else if (!emailRe.test(email)) e.email = 'That email doesn’t look right.';
    if (!String(d.get('role') || '')) e.role = 'Pick a role.';
    const gh = String(d.get('github') || '').trim();
    if (gh && !urlRe.test(gh)) e.github = 'Enter a full URL (https://…).';
    const li = String(d.get('linkedin') || '').trim();
    if (li && !urlRe.test(li)) e.linkedin = 'Enter a full URL (https://…).';
    const cv = fileRef.current?.files?.[0];
    if (cv) {
      if (cv.size > MAX) e.cv = 'File must be under 5MB.';
      else if (!TYPES.includes(cv.type)) e.cv = 'Upload a PDF or Word document.';
    }
    return e;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const v = validate(form);
    setErrors(v);
    if (Object.keys(v).length) return;

    setStatus('submitting');
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        body: new FormData(form),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      form.reset();
      setFileName('');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="grid place-items-center rounded-3xl prism-border bg-white/85 p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 16 }}
          className="grid h-16 w-16 place-items-center rounded-2xl text-white"
          style={{ background: 'var(--grad-prism)' }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M4 12.5l5 5L20 6.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
        <h3 className="mt-5 text-2xl">Application received.</h3>
        <p className="mt-2 max-w-sm text-sm text-[var(--muted)]">
          Thanks for your interest in Spectre. If there&apos;s a fit, our team
          will reach out within a few business days.
        </p>
        <button
          onClick={() => setStatus('idle')}
          data-cursor="hover"
          className="mt-6 text-sm font-medium text-[var(--cyan)] hover:underline"
        >
          Submit another application
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" required>Full name</Label>
          <Input id="name" name="name" autoComplete="name" placeholder="Jane Doe" error={!!errors.name} aria-invalid={!!errors.name} aria-describedby="c-name-err" />
          <ErrorText id="c-name-err">{errors.name}</ErrorText>
        </div>
        <div>
          <Label htmlFor="email" required>Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="jane@email.com" error={!!errors.email} aria-invalid={!!errors.email} aria-describedby="c-email-err" />
          <ErrorText id="c-email-err">{errors.email}</ErrorText>
        </div>
      </div>

      <div>
        <Label htmlFor="role" required>Role of interest</Label>
        <Select id="role" name="role" defaultValue="" error={!!errors.role} aria-invalid={!!errors.role} aria-describedby="c-role-err">
          <option value="" disabled>Choose a role…</option>
          {roles.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
          <option value="General application">General application</option>
        </Select>
        <ErrorText id="c-role-err">{errors.role}</ErrorText>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="github">GitHub / portfolio URL</Label>
          <Input id="github" name="github" type="url" inputMode="url" placeholder="https://github.com/you" error={!!errors.github} aria-invalid={!!errors.github} aria-describedby="c-gh-err" />
          <ErrorText id="c-gh-err">{errors.github}</ErrorText>
        </div>
        <div>
          <Label htmlFor="linkedin">LinkedIn URL</Label>
          <Input id="linkedin" name="linkedin" type="url" inputMode="url" placeholder="https://linkedin.com/in/you" error={!!errors.linkedin} aria-invalid={!!errors.linkedin} aria-describedby="c-li-err" />
          <ErrorText id="c-li-err">{errors.linkedin}</ErrorText>
        </div>
      </div>

      {/* CV upload */}
      <div>
        <Label htmlFor="cv">CV / Résumé (PDF or Word, max 5MB)</Label>
        <label
          htmlFor="cv"
          data-cursor="hover"
          className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-dashed border-[var(--cyan)]/50 bg-white/60 px-4 py-4 text-sm transition-colors hover:border-[var(--cyan)] hover:bg-[var(--navy-tint)]/40"
        >
          <span className="text-[var(--muted)]">
            {fileName || 'Click to upload your CV…'}
          </span>
          <span
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium text-white"
            style={{ background: 'var(--grad-prism)' }}
          >
            Browse
          </span>
          <input
            id="cv"
            name="cv"
            ref={fileRef}
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            className="sr-only"
            aria-invalid={!!errors.cv}
            aria-describedby="c-cv-err"
            onChange={(e) => setFileName(e.target.files?.[0]?.name ?? '')}
          />
        </label>
        <ErrorText id="c-cv-err">{errors.cv}</ErrorText>
      </div>

      <div>
        <Label htmlFor="note">Short note</Label>
        <Textarea id="note" name="note" placeholder="Tell us why Spectre, and what you'd bring…" />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-[#c2334d]">
          Something went wrong submitting that. Please try again.
        </p>
      )}

      <div>
        <Button type="submit" disabled={status === 'submitting'}>
          {status === 'submitting' ? 'Submitting…' : 'Submit Application'}
        </Button>
      </div>
    </form>
  );
}
