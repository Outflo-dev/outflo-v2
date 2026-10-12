import { describe, expect, it } from "vitest";
import { createClient } from "@supabase/supabase-js";

import { decodeMachineTimeEvidenceV1 } from "./decodeMachineTimeEvidenceV1";
import { verifyMachineTimeObservationV1 } from "./verifyMachineTimeObservationV1";

const fields = [
  "observation_id",
  "persisted_at",
  "creation_execution_id",
  "sign_in_execution_id",
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
  process.env.OUTFLO_VERIFY_HOSTED_LEDGER !== "1"
)("Hosted Machine Time Ledger V1", () => {
  it("verifies every persisted observation with the real Machine", async () => {
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

    const results: Record<string, string>[] = [];

    for (let offset = 0; ; offset += 200) {
      const { data, error } = await db
        .from("machine_time_observations")
        .select(fields)
        .order("persisted_at", { ascending: true })
        .order("observation_id", { ascending: true })
        .range(offset, offset + 199);

      if (error) throw new Error(error.message);

      const rows = (data ?? []) as unknown as Record<string, unknown>[];

      for (const row of rows) {
        const id = String(row.observation_id);

        const subject = row.creation_execution_id
          ? "CREATION"
          : row.sign_in_execution_id
            ? "SIGN IN"
            : "UNATTRIBUTED";

        try {
          const evidence = decodeMachineTimeEvidenceV1(row);

          if (evidence.status !== "supported") {
            results.push({
              id,
              subject,
              verdict: evidence.status,
              checks: "N/A",
            });
            continue;
          }

          const verification =
            verifyMachineTimeObservationV1(evidence.observed);

          results.push({
            id,
            subject,
            verdict: verification.verdict,
            checks:
              verification.checks.filter(
                (check) => check.result === "pass",
              ).length + "/7",
          });
        } catch (error) {
          results.push({
            id,
            subject,
            verdict: "invalid-evidence",
            checks: error instanceof Error
              ? error.message
              : "Unknown error",
          });
        }
      }

      if (rows.length < 200) break;
    }

    const counts: Record<string, number> = {};

    for (const result of results) {
      counts[result.verdict] =
        (counts[result.verdict] ?? 0) + 1;
    }

    console.log("TOTAL OBSERVATIONS:", results.length);
    console.log("MACHINE VERIFICATION SUMMARY:", counts);
    console.table(results.slice(-20));

    expect(results.length).toBeGreaterThan(0);

    expect(
      results.filter((result) =>
        result.verdict === "failed" ||
        result.verdict === "invalid-evidence"
      ),
    ).toEqual([]);
  });
});
