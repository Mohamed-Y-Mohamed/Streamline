import { NextRequest, NextResponse } from "next/server";

// Protected paths that require authentication
const protectedPaths = ["/root", "/root/*"];

export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("session_token");

  // Check if the request is for a protected route
  const isProtectedRoute = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedRoute && !sessionToken) {
    // Redirect to signin if accessing a protected route without a session
    return NextResponse.redirect(new URL("/auth/signin", req.url));
  }

  // Allow access to non-protected routes
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/root/:path*"], // Matches all routes under `/root`
};
