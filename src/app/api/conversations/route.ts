import "server-only";

/* ==========================================================
   OUTFLO — CONVERSATION CREATION HTTP BOUNDARY
   File: src/app/api/conversations/route.ts
   Scope: Admit one same-origin authenticated Guide request
          to the existing Conversation creation owner
   ========================================================== */

import { NextResponse } from "next/server";
import { resolveAuthenticatedActiveConversation } from
  "@/runtime/conversation/resolveAuthenticatedActiveConversation";

export const runtime = "nodejs";

const NO_STORE = { "Cache-Control": "no-store" };

export async function POST(request: Request): Promise<NextResponse> {
  // A browser's authenticated cookies must not authorize a cross-origin POST.
  const origin = request.headers.get("origin");

  if (origin) {
    let sameOrigin = false;

    try {
      sameOrigin = new URL(origin).origin === new URL(request.url).origin;
    } catch {
      // Malformed Origin is not an allowed origin.
    }

    if (!sameOrigin) {
      return NextResponse.json(
        { error: "Cross-origin conversation creation is not permitted." },
        { status: 403, headers: NO_STORE },
      );
    }
  }

  try {
    const conversation = await resolveAuthenticatedActiveConversation();

    return NextResponse.json(conversation, {
      status: conversation.created ? 201 : 200,
      headers: NO_STORE,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Authenticated Guide identity is required."
    ) {
      return NextResponse.json(
        { error: "Authentication required." },
        { status: 401, headers: NO_STORE },
      );
    }

    console.error("Outflō Conversation creation unavailable:", error);

    return NextResponse.json(
      { error: "Conversation creation unavailable." },
      { status: 500, headers: NO_STORE },
    );
  }
}
