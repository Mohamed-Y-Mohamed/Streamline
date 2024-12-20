import { NextRequest, NextResponse } from 'next/server';

// Adjust this to your backend URL
const BACKEND_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8000';

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get('session_token')?.value;
  if (!sessionToken) {
    return NextResponse.json({ message: 'No session token' }, { status: 401 });
  }

  // Call your backend's verify endpoint
  const response = await fetch(`${BACKEND_URL}/auth/verify`, {
    headers: {
      cookie: `session_token=${sessionToken}`
    },
    credentials: 'include'
  });

  if (!response.ok) {
    return new NextResponse('Invalid session', { status: 401 });
  }

  // If verification is successful, just return a 200 response
  return new NextResponse('Session valid', { status: 200 });
}
