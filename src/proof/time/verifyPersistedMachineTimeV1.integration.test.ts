/* ==========================================================
   OUTFLŌ — PERSISTED MACHINE TIME VERIFICATION
   File: src/proof/time/verifyPersistedMachineTimeV1.integration.test.ts
   Scope: Verify actual hosted Machine Time evidence
          through the existing Proof verifier
   Last Updated:
   - Outflō Time: 847937961822553110002352219277
   - note: establish live persisted observation verification
   ========================================================== */

import { describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";

import { decodeMachineTimeEvidenceV1 } from "./decodeMachineTimeEvidenceV1";
import { verifyMachineTimeObservationV1 } from "./verifyMachineTimeObservationV1";

const observationId = process.env.OUTFLO_PROOF_OBSERVATION_ID;

describe.skipIf(!observationId)(
  "Persisted Machine Time Proof v1",
  () => {
    it("verifies actual recorded evidence", async () => {
      const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const secret = process.env.SUPABASE_SECRET_KEY;

      if (!url || !secret || !observationId) {
        throw new Error("Remote verification configuration missing.");
      }

      const db = createClient(url, secret);

      const { data, error } = await db
        .from("machine_time_observations")
        .select([
          "observation_id",
          "observation_method",
          "clock_definition",
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
          "provenance_snapshot",
        ].join(","))
        .eq("observation_id", observationId)
        .single();

      if (error) throw new Error(error.message);

      const evidence = decodeMachineTimeEvidenceV1(data);

      expect(evidence.status).toBe("supported");

      if (evidence.status !== "supported") {
        throw new Error("Persisted evidence is not supported v1.");
      }

      const verification =
        verifyMachineTimeObservationV1(evidence.observed);

      console.log("OBSERVATION:", evidence.observationId);
      console.log("VERDICT:", verification.verdict);
      console.table(verification.checks);

      expect(verification.verdict).toBe("verified");
      expect(verification.checks).toHaveLength(7);
    });
  },
);
