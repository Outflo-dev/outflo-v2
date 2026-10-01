/* ==========================================================
   OUTFLO — SUPABASE SESSION PROXY
   File: src/lib/supabase/proxy.ts
   Scope: Refresh, propagate, and verify the authenticated Supabase session
   Last Updated:
   - date: 2026-09-30
   - note: expose verified authenticated identity to the request proxy
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */

import { createServerClient } from "@supabase/ssr";
import {
    NextResponse,
    type NextRequest,
} from "next/server";

/* ------------------------------
   Types
-------------------------------- */

export type SupabaseSessionUpdate = {
    response: NextResponse;
    authenticatedUserId: string | null;
};

/* ------------------------------
   Session
-------------------------------- */

export async function updateSession(
    request: NextRequest,
): Promise<SupabaseSessionUpdate> {
    let response = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },

                setAll(cookiesToSet, headers) {
                    cookiesToSet.forEach(
                        ({ name, value }) => {
                            request.cookies.set(
                                name,
                                value,
                            );
                        },
                    );

                    response = NextResponse.next({
                        request,
                    });

                    cookiesToSet.forEach(
                        ({
                            name,
                            value,
                            options,
                        }) => {
                            response.cookies.set(
                                name,
                                value,
                                options,
                            );
                        },
                    );

                    Object.entries(headers).forEach(
                        ([key, value]) => {
                            response.headers.set(
                                key,
                                value,
                            );
                        },
                    );
                },
            },
        },
    );

    const {
        data,
        error,
    } = await supabase.auth.getClaims();

    return {
        response,
        authenticatedUserId:
            error === null && data !== null
                ? data.claims.sub
                : null,
    };
}
