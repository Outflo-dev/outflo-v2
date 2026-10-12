import { describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";

import { decodeMachineTimeEvidenceV1 } from "./decodeMachineTimeEvidenceV1";
import { verifyMachineTimeObservationV1 } from "./verifyMachineTimeObservationV1";

const fields = [
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
].join(",");

describe.skipIf(
  process.env.OUTFLO_RECORD_PROOF_VERIFICATIONS !== "1"
)("Record hosted Machine Proof verifications V1", () => {
  it("records actual Machine results for the entire ledger", async () => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key =
      process.env.SUPABASE_SECRET_KEY ??
      process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !key) {
      throw new Error("Hosted Supabase credentials missing.");
    }

    const db = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    const records: {
      observationId: string;
      verdict: string;
      checks: { check: string; result: string }[];
      missing: string[];
    }[] = [];

    for (let offset = 0; ; offset += 200) {
      const { data, error } = await db
        .from("machine_time_observations")
        .select(fields)
        .order("observation_id")
        .range(offset, offset + 199);

      if (error) throw new Error(error.message);

      const rows = (data ?? []) as unknown as Record<string, unknown>[];

      for (const row of rows) {
        const observationId = String(row.observation_id);

        try {
          const evidence = decodeMachineTimeEvidenceV1(row);

          if (evidence.status === "supported") {
            const result =
              verifyMachineTimeObservationV1(evidence.observed);

            records.push({
              observationId,
              verdict: result.verdict,
              checks: [...result.checks],
              missing: [],
            });
          } else {
            records.push({
              observationId,
              verdict: evidence.status,
              checks: [],
              missing: evidence.status === "incomplete"
                ? [...evidence.missing]
                : [],
            });
          }
        } catch (error) {
          console.error("INVALID EVIDENCE:", observationId, error);

          records.push({
            observationId,
            verdict: "invalid-evidence",
            checks: [],
            missing: [],
          });
        }
      }

      if (rows.length < 200) break;
    }

    const counts: Record<string, number> = {};
    for (const record of records) {
      counts[record.verdict] =
        (counts[record.verdict] ?? 0) + 1;
    }

    console.log("MACHINE VERDICTS:", counts);
    console.log("RECORDS TO WRITE:", records.length);

    expect(records.length).toBeGreaterThan(0);

    let recorded = 0;

    for (let offset = 0; offset < records.length; offset += 8) {
      await Promise.all(
        records.slice(offset, offset + 8).map(async (record) => {
          const { data, error } = await db.rpc(
            "record_machine_time_proof_verification_v1",
            {
              p_observation_id: record.observationId,
              p_verdict: record.verdict,
              p_checks: record.checks,
              p_missing_fields: record.missing,
            },
          );

          if (error) {
            throw new Error(
              record.observationId + ": " + error.message
            );
          }

          if (!data) {
            throw new Error(
              "No verification identity: " + record.observationId
            );
          }

          recorded++;
        }),
      );
    }

    console.log("RECORDED VERIFICATIONS:", recorded);

    expect(recorded).toBe(records.length);
  }, 180000);
});
