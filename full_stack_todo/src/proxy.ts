
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    const sessionCookie = request.cookies.get("better-auth.session_token");

    // Simple optimistic check: If trying to access dashboard without session cookie, redirect to login
    if (request.nextUrl.pathname.startsWith("/dashboard") && !sessionCookie) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/dashboard/:path*"],
};
