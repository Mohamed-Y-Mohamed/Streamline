import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/root')) {
    const sessionToken = req.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
    }

    // Call /auth/verify to check session
    const res = await fetch(`${req.nextUrl.origin}/api/auth/verify`, {
      headers: { cookie: `session_token=${sessionToken}` },
    });

    if (!res.ok) {
      return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/root/:path*', '/auth/signin'],
};