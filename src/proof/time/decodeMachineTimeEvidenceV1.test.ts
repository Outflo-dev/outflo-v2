/* ==========================================================
   OUTFLŌ — DECODE MACHINE TIME EVIDENCE V1 TEST
   File: src/proof/time/decodeMachineTimeEvidenceV1.test.ts
   Scope: Verify exact persisted evidence reconstruction
          and historical evidence classification
   Last Updated:
   - Outflō Time: 847937961822553110002352219277
   - note: establish persisted evidence decoding tests
   ========================================================== */

import { describe, expect, it } from "vitest";

import { resolveObservedMachineTime } from "../../runtime/clock/interval/resolveObservedMachineTime";
import { decodeMachineTimeEvidenceV1 } from "./decodeMachineTimeEvidenceV1";
import { verifyMachineTimeObservationV1 } from "./verifyMachineTimeObservationV1";

function createRecordedEvidence() {
  const observed = resolveObservedMachineTime(
    {
      wallUnixMilliseconds: 1_791_377_197_352n,
      monotonicMilliseconds: 137_770_233.6555,
    },
    {
      wallUnixMilliseconds: 1_791_377_197_956n,
      monotonicMilliseconds: 137_770_838.1388,
    },
  );

  return {
    observation_id: "00000000-0000-4000-8000-000000000001",
    observation_method: "platform-unix-millisecond-protected-v1",
    clock_definition: "outflo-clock-definition-v1",
    first_wall_unix_milliseconds: observed.firstObservation.wallUnixMilliseconds.toString(),
    first_monotonic_milliseconds: observed.firstObservation.monotonicMilliseconds.toString(),
    second_wall_unix_milliseconds: observed.secondObservation.wallUnixMilliseconds.toString(),
    second_monotonic_milliseconds: observed.secondObservation.monotonicMilliseconds.toString(),
    raw_span_milliseconds: observed.rawSpanMilliseconds.toString(),
    observation_precision_milliseconds: observed.observationPrecisionMilliseconds.toString(),
    protected_first_unix_milliseconds: observed.protectedFirstUnixMilliseconds.toString(),
    protected_second_unix_milliseconds: observed.protectedSecondUnixMilliseconds.toString(),
    protected_span_milliseconds: observed.protectedSpanMilliseconds.toString(),
    first_instant: observed.firstInstant.toString(),
    second_instant: observed.secondInstant.toString(),
    duration: observed.duration.toString(),
    provenance_snapshot: { observer: { kind: "server" } },
  };
}

describe("Machine Time persisted evidence decoding v1", () => {
  it("reconstructs exact evidence eligible for verification", () => {
    const result = decodeMachineTimeEvidenceV1(createRecordedEvidence());

    expect(result.status).toBe("supported");
    if (result.status !== "supported") return;

    expect(result.observed.rawSpanMilliseconds).toBe(604n);
    expect(result.observed.protectedSpanMilliseconds).toBe(602n);
    expect(typeof result.observed.firstInstant).toBe("bigint");
    expect(verifyMachineTimeObservationV1(result.observed).verdict).toBe("verified");
  });

  it("does not reinterpret a historical method as protected v1", () => {
    const result = decodeMachineTimeEvidenceV1({
      ...createRecordedEvidence(),
      observation_method: "platform-wall-monotonic-v1",
    });

    expect(result.status).toBe("unsupported-version");
  });

  it("identifies missing historical evidence", () => {
    const result = decodeMachineTimeEvidenceV1({
      ...createRecordedEvidence(),
      raw_span_milliseconds: null,
      provenance_snapshot: null,
    });

    expect(result.status).toBe("incomplete");
    if (result.status !== "incomplete") return;

    expect(result.missing).toContain("raw_span_milliseconds");
    expect(result.missing).toContain("provenance_snapshot");
  });

  it("rejects malformed integer serialization", () => {
    expect(() => decodeMachineTimeEvidenceV1({
      ...createRecordedEvidence(),
      first_instant: "12.5",
    })).toThrow(TypeError);
  });

  it("rejects numeric substitution for exact bigint text", () => {
    expect(() => decodeMachineTimeEvidenceV1({
      ...createRecordedEvidence(),
      first_wall_unix_milliseconds: 1_791_377_197_352,
    })).toThrow(TypeError);
  });
});
