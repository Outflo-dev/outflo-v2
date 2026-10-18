import "server-only";

/* ==========================================================
   OUTFLO — CONVERSATION GUIDE TURN HTTP BOUNDARY
   Target: src/app/api/conversations/[conversationId]/turns/route.ts
   Scope: Accept one same-origin authenticated Guide message;
          delegate identity, admission, and read-back to the
          existing conversation runtime owner.
   ========================================================== */

import { NextResponse } from "next/server";
import { admitAuthenticatedGuideTurn } from
  "@/runtime/conversation/admitAuthenticatedGuideTurn";

export const runtime = "nodejs";

const HEADERS = { "Cache-Control": "no-store" };
const UUID = /^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i;

type RouteContext = {
  params: Promise<{ conversationId: string }>;
};

function reply(error: string, status: number): NextResponse {
  return NextResponse.json({ error }, { status, headers: HEADERS });
}

export async function POST(
  request: Request,
  { params }: RouteContext,
): Promise<NextResponse> {
  // Authenticated cookies must not authorize cross-origin browser submissions.
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return reply("Cross-origin submissions are not permitted.", 403);
      }
    } catch {
      return reply("Invalid request origin.", 403);
    }
  }

  const { conversationId } = await params;
  if (!UUID.test(conversationId)) {
    return reply("Invalid conversation identity.", 400);
  }

  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) {
    return reply("Expected JSON request.", 415);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return reply("Malformed JSON request.", 400);
  }

  const content =
    payload !== null && typeof payload === "object" && !Array.isArray(payload)
      ? (payload as Record<string, unknown>).content
      : undefined;

  if (
    typeof content !== "string" ||
    content.trim().length === 0 ||
    content.length > 4000
  ) {
    return reply("Message must contain 1 to 4000 characters.", 400);
  }

  try {
    const admitted = await admitAuthenticatedGuideTurn(conversationId, content);
    return NextResponse.json(admitted, { status: 201, headers: HEADERS });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    if (message === "Authenticated Guide identity is required.") {
      return reply("Authentication required.", 401);
    }

    // A conversation not owned by the Guide is indistinguishable from missing.
    if (
      message.includes("Open conversation not found.") ||
      message.includes("Conversation does not belong to this Guide.")
    ) {
      return reply("Open conversation not found.", 404);
    }

    console.error("Outflō Guide turn admission unavailable:", error);
    return reply("Guide message admission unavailable.", 500);
  }
}
