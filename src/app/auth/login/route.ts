import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const form = await request.formData();
  const email = String(form.get('email') || '').trim().toLowerCase();
  const url = new URL('/list', request.url);
  const res = NextResponse.redirect(url);
  if (email) {
    res.cookies.set('email', email, { path: '/', httpOnly: false, sameSite: 'lax' });
  }
  return res;
}
