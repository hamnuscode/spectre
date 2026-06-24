import { NextResponse } from 'next/server';

/**
 * Stubbed careers / application endpoint. Accepts multipart form data
 * (CV upload + profile links) and validates server-side.
 *
 * 🔌 REAL INTEGRATION PLUGS IN HERE:
 *   - Store the CV in S3 / R2 / UploadThing and keep the URL
 *   - Push the candidate into an ATS (Greenhouse / Lever / Ashby)
 *   - Notify the hiring channel (Slack / email)
 */
const MAX_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export async function POST(req: Request) {
  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid form' }, { status: 400 });
  }

  const name = String(form.get('name') ?? '').trim();
  const email = String(form.get('email') ?? '').trim();
  const role = String(form.get('role') ?? '').trim();
  const cv = form.get('cv');

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!name || !emailRe.test(email) || !role) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 422 });
  }

  if (cv instanceof File) {
    if (cv.size > MAX_BYTES) {
      return NextResponse.json({ ok: false, error: 'CV exceeds 5MB' }, { status: 413 });
    }
    if (cv.size > 0 && !ALLOWED.includes(cv.type)) {
      return NextResponse.json({ ok: false, error: 'CV must be PDF or Word' }, { status: 415 });
    }
  }

  await new Promise((r) => setTimeout(r, 700));

  // TODO(real): upload CV + push to ATS here.
  return NextResponse.json({ ok: true });
}
