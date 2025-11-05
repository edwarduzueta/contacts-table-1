import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const email = request.cookies.get('email')?.value ?? '';
  const { pathname } = request.nextUrl;

  const protectedPaths = ['/list', '/admin', '/add'];

  if (protectedPaths.some((p) => pathname.startsWith(p)) && !email) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/list/:path*', '/admin/:path*', '/add/:path*'],
};
