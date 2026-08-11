/* ==========================================================
   OUTFLO — REQUEST PROXY
   File: src/proxy.ts
   Scope: Route requests through the canonical Supabase session owner
   Last Updated:
   - date: 2026-08-11
   - note: wire request-level Supabase session refresh
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import type { NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/proxy";

/* ------------------------------
   Proxy
-------------------------------- */

export async function proxy(request: NextRequest) {
    return updateSession(request);
}

/* ------------------------------
   Matcher
-------------------------------- */

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};
