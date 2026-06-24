import { NextResponse } from 'next/server';

/**
 * Stubbed enquiry endpoint. Validates server-side and returns success.
 *
 * 🔌 REAL INTEGRATION PLUGS IN HERE:
 *   - Email: forward to Resend / SendGrid / SES (e.g. resend.emails.send(...))
 *   - CRM:   create a lead in HubSpot / Salesforce / Pipedrive
 *   - Store: persist to a DB / Google Sheet for the sales team
 * Keep the validation below; just add the side-effect before `return`.
 */
export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid payload' }, { status: 400 });
  }

  const name = String(body.name ?? '').trim();
  const email = String(body.email ?? '').trim();
  const service = String(body.service ?? '').trim();
  const message = String(body.message ?? '').trim();

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // `service` is optional (the contact form treats it as a nice-to-have).
  void service;
  if (!name || !emailRe.test(email) || message.length < 10) {
    return NextResponse.json(
      { ok: false, error: 'Validation failed' },
      { status: 422 }
    );
  }

  // Simulate downstream latency so the submit animation reads naturally.
  await new Promise((r) => setTimeout(r, 600));

  // TODO(real): send email / create CRM lead here.
  return NextResponse.json({ ok: true });
}
