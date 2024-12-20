import { NextRequest, NextResponse } from 'next/server'

// Adjust this URL to your backend server’s verify endpoint
const BACKEND_VERIFY_URL = process.env.BACKEND_VERIFY_URL || 'http://localhost:8000/auth/verify';

export async function GET(req: NextRequest) {
  const sessionToken = req.cookies.get('session_token')?.value;

  if (!sessionToken) {
    return NextResponse.json({ message: 'No session token' }, { status: 401 });
  }

  // Call your external backend service to verify the session
  const response = await fetch(BACKEND_VERIFY_URL, {
    headers: {
      cookie: `session_token=${sessionToken}`,
    },
    credentials: 'include'
  });

  if (!response.ok) {
    return NextResponse.json({ message: 'Invalid session' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Session valid' }, { status: 200 });
}
