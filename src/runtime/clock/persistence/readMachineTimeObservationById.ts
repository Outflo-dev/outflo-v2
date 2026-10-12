/* ==========================================================
   OUTFLŌ — READ MACHINE TIME OBSERVATION BY ID
   File: src/runtime/clock/persistence/readMachineTimeObservationById.ts
   Scope: Read one authenticated Guide-owned Machine Time
          observation without altering its recorded evidence
   Last Updated:
   - Outflō Time: 847937856889600622318940087881
   - note: establish persisted observation retrieval for Proof
   ========================================================== */

import "server-only";

import { createClient } from "@/lib/supabase/server";
import { createTrustedSupabaseClient } from "@/lib/supabase/trusted/createTrustedSupabaseClient";

const OBSERVATION_COLUMNS = [
  "observation_id",
  "user_id",
  "first_wall_unix_milliseconds::text",
  "first_monotonic_milliseconds",
  "second_wall_unix_milliseconds::text",
  "second_monotonic_milliseconds",
  "raw_span_milliseconds::text",
  "observation_precision_milliseconds::text",
  "protected_first_unix_milliseconds::text",
  "protected_second_unix_milliseconds::text",
  "protected_span_milliseconds::text",
  "first_instant",
  "second_instant",
  "duration",
  "observation_method",
  "clock_definition",
  "provenance_snapshot",
  "persisted_at",
].join(",");

export async function readMachineTimeObservationById(
  observationId: string,
) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authenticationError,
  } = await supabase.auth.getUser();

  if (authenticationError || !user) {
    throw new Error(
      "Authenticated Guide identity is required to read Machine Time.",
    );
  }

  const { data, error } = await supabase
    .from("machine_time_observations")
    .select(OBSERVATION_COLUMNS)
    .eq("observation_id", observationId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (error) {
    throw new Error(
      [error.message, error.code, error.hint, error.details]
        .filter(Boolean)
        .join(" | "),
    );
  }

  return data;
}

export async function readCompletedSignOutObservation(
  observationId: string,
  authenticatedGuideId: string,
) {
  if (!observationId || !authenticatedGuideId) {
    throw new Error("Sign Out observation identity required.");
  }

  const supabase = createTrustedSupabaseClient();

  const { data, error } = await supabase
    .from("machine_time_observations")
    .select(OBSERVATION_COLUMNS)
    .eq("observation_id", observationId)
    .eq("user_id", authenticatedGuideId)
    .maybeSingle();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
