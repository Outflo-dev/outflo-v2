import "server-only";

/* ==========================================================
   OUTFLO — COMPLETE CONVERSATION TURN HTTP BOUNDARY
   Target: src/app/api/conversations/[conversationId]/turns/[turnId]/complete/route.ts
   Scope: Let an authenticated Guide complete one admitted turn
          through the existing Conversation + Mistral runtime.
   ========================================================== */

import { NextResponse } from "next/server";
import { completeAuthenticatedConversationTurn } from
  "@/runtime/conversation/completeAuthenticatedConversationTurn";

export const runtime = "nodejs";

const HEADERS = { "Cache-Control": "no-store" };
const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

type RouteContext = {
  params: Promise<{ conversationId: string; turnId: string }>;
};

function errorResponse(message: string, status: number): NextResponse {
  return NextResponse.json({ error: message }, { status, headers: HEADERS });
}

export async function POST(
  request: Request,
  { params }: RouteContext,
): Promise<NextResponse> {
  // Browser session cookies must not authorize cross-origin inference requests.
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return errorResponse("Cross-origin requests are not permitted.", 403);
      }
    } catch {
      return errorResponse("Invalid request origin.", 403);
    }
  }

  const { conversationId, turnId } = await params;
  if (!UUID.test(conversationId) || !UUID.test(turnId)) {
    return errorResponse("Invalid conversation or turn identity.", 400);
  }

  try {
    const completed = await completeAuthenticatedConversationTurn(
      conversationId,
      turnId,
    );

    return NextResponse.json(completed, {
      status: 200,
      headers: HEADERS,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message === "Authenticated Guide identity is required.") {
      return errorResponse("Authentication required.", 401);
    }

    if (
      message === "Open Guide conversation not found." ||
      message === "Guide turn not found in this conversation." ||
      message === "Persisted Guide message not found."
    ) {
      return errorResponse("Conversation turn not found.", 404);
    }

    if (message === "This Guide turn already has an Outflō reply.") {
      return errorResponse("This turn is already complete.", 409);
    }

    // Keep provider details and privileged persistence errors server-side.
    console.error("Outflō conversation completion unavailable:", error);
    return errorResponse("Conversation response unavailable.", 500);
  }
}
