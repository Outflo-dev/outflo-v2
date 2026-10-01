/* ==========================================================
   OUTFLO — REQUEST PROXY
   File: src/proxy.ts
   Scope: Refresh authenticated session and gate protected Outflō routes
   Last Updated:
   - date: 2026-09-30
   - note: require verified Access identity outside explicit public routes
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import {
    NextResponse,
    type NextRequest,
} from "next/server";

import {
    updateSession,
} from "@/lib/supabase/proxy";

/* ------------------------------
   Public Routes
-------------------------------- */

const PUBLIC_PATHS = new Set([
    "/",
    "/coming-soon",
    "/terms",
    "/create-account",
    "/sign-in",
    "/verify-email",
    "/manifest.webmanifest",
]);

/* ------------------------------
   Proxy
-------------------------------- */

export async function proxy(
    request: NextRequest,
) {
    const {
        response,
        authenticatedUserId,
    } = await updateSession(request);

    const pathname =
        request.nextUrl.pathname;

    if (
        PUBLIC_PATHS.has(pathname) ||
        authenticatedUserId !== null
    ) {
        return response;
    }

    const signInUrl =
        request.nextUrl.clone();

    signInUrl.pathname = "/sign-in";
    signInUrl.search = "";

    const redirectResponse =
        NextResponse.redirect(signInUrl);

    response.cookies
        .getAll()
        .forEach((cookie) => {
            redirectResponse.cookies.set(cookie);
        });

    return redirectResponse;
}

/* ------------------------------
   Matcher
-------------------------------- */

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
