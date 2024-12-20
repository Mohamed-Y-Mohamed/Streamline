"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.middleware = middleware;
const server_1 = require("next/server");
async function middleware(req) {
    const sessionToken = req.cookies.get("session_token")?.value;
    if (!sessionToken) {
        const url = req.nextUrl.clone();
        url.pathname = "/auth/signin";
        return server_1.NextResponse.redirect(url);
    }
    // Optionally validate the session by calling the backend
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/validate-session`, {
            method: "GET",
            headers: {
                Cookie: `session_token=${sessionToken}`,
            },
        });
        if (!response.ok) {
            const url = req.nextUrl.clone();
            url.pathname = "/auth/signin";
            return server_1.NextResponse.redirect(url);
        }
    }
    catch (error) {
        console.error("Error validating session:", error);
        const url = req.nextUrl.clone();
        url.pathname = "/auth/signin";
        return server_1.NextResponse.redirect(url);
    }
    return server_1.NextResponse.next();
}
exports.config = {
    matcher: [
        "/root/:path*", // Protect all `/root` routes
    ],
};
