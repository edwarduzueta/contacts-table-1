import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const url = new URL('/', request.url);
  const res = NextResponse.redirect(url);
  res.cookies.set('email', '', { path: '/', httpOnly: false, maxAge: 0 });
  return res;
}
