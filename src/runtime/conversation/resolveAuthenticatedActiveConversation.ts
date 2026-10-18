import "server-only";

/*
 * OUTFLO — RESOLVE AUTHENTICATED ACTIVE CONVERSATION
 * Scope: Resume one open Guide conversation or create it.
 */

import { createClient } from "@/lib/supabase/server";
import { createTrustedSupabaseClient } from
  "@/lib/supabase/trusted/createTrustedSupabaseClient";
import { createAuthenticatedConversation } from
  "./createAuthenticatedConversation";

export type ActiveConversation = Readonly<{
  conversationId: string;
  status: "open";
  created: boolean;
}>;

export async function resolveAuthenticatedActiveConversation():
  Promise<ActiveConversation> {
  const authenticated = await createClient();

  const {
    data: { user },
    error: identityError,
  } = await authenticated.auth.getUser();

  if (identityError || !user) {
    throw new Error("Authenticated Guide identity is required.");
  }

  const db = createTrustedSupabaseClient();

  async function readOpen(): Promise<string | null> {
    const { data, error } = await db
      .from("conversations")
      .select("conversation_id")
      .eq("guide_id", user!.id)
      .eq("status", "open")
      .maybeSingle();

    if (error) {
      throw new Error(`Active conversation read failed: ${error.message}`);
    }

    return data?.conversation_id ?? null;
  }

  const existing = await readOpen();

  if (existing) {
    return {
      conversationId: existing,
      status: "open",
      created: false,
    };
  }

  try {
    const created = await createAuthenticatedConversation();

    return {
      ...created,
      created: true,
    };
  } catch (error) {
    // Another request may have created the active conversation.
    const concurrent = await readOpen();

    if (concurrent) {
      return {
        conversationId: concurrent,
        status: "open",
        created: false,
      };
    }

    throw error;
  }
}
