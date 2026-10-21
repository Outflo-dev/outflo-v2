import "server-only";

/* ==========================================================
   OUTFLŌ — READ CONVERSATION HTTP BOUNDARY
   Target: src/app/api/conversations/[conversationId]/route.ts
   Scope: Return persisted Guide-owned conversation history.
          This is a display read, not Conversation Proof.
   ========================================================== */

import { NextResponse } from "next/server";
import { readAuthenticatedConversation } from
  "@/runtime/conversation/readAuthenticatedConversation";
import { readAuthenticatedConversationProofSnapshot } from
  "@/runtime/conversation/readAuthenticatedConversationProofSnapshot";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const HEADERS = { "Cache-Control": "private, no-store" };
const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

type RouteContext = {
  params: Promise<{ conversationId: string }>;
};

function errorResponse(error: string, status: number): NextResponse {
  return NextResponse.json({ error }, { status, headers: HEADERS });
}

export async function GET(
  _request: Request,
  { params }: RouteContext,
): Promise<NextResponse> {
  const { conversationId } = await params;

  if (!UUID.test(conversationId)) {
    return errorResponse("Invalid conversation identity.", 400);
  }

  try {
    const conversation = await readAuthenticatedConversation(conversationId);
    const proof = await readAuthenticatedConversationProofSnapshot(conversationId);

    return NextResponse.json({ ...conversation, proof }, {
      status: 200,
      headers: HEADERS,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message === "Authenticated Guide identity is required.") {
      return errorResponse("Authentication required.", 401);
    }

    // Unowned and missing conversations must be indistinguishable.
    if (message === "Guide conversation not found.") {
      return errorResponse("Conversation not found.", 404);
    }

    console.error("Outflō Conversation read unavailable:", error);
    return errorResponse("Conversation history unavailable.", 500);
  }
}
