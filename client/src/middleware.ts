import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if user is accessing a protected route under /root
  if (pathname.startsWith('/root')) {
    const sessionToken = req.cookies.get('session_token')?.value;

    if (!sessionToken) {
      return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
    }

    // Verify session
    const verifyResponse = await fetch(`${req.nextUrl.origin}/api/auth/verify`, {
      headers: { cookie: `session_token=${sessionToken}` },
    });

    if (!verifyResponse.ok) {
      return NextResponse.redirect(new URL('/auth/signin', req.nextUrl));
    }
  }

  // If user tries to access /auth/signin but is already signed in, redirect them to /root/dashboard
  if (pathname === '/auth/signin') {
    const sessionToken = req.cookies.get('session_token')?.value;

    if (sessionToken) {
      // Verify session
      const verifyResponse = await fetch(`${req.nextUrl.origin}/api/auth/verify`, {
        headers: { cookie: `session_token=${sessionToken}` },
      });

      if (verifyResponse.ok) {
        return NextResponse.redirect(new URL('/root/Dashboard', req.nextUrl));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/root/:path*', '/auth/signin'],
};
