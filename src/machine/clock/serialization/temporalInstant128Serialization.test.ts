/* ==========================================================
   OUTFLO — TEMPORAL INSTANT 128 SERIALIZATION TEST
   File: src/machine/clock/serialization/temporalInstant128Serialization.test.ts
   Scope: Prove exact reversible serialization of canonical Clock coordinates
   Last Updated:
   - note: establish round-trip, boundary, and malformed-input serialization proofs
   ========================================================== */

import { describe, expect, it } from "vitest";

import { createTemporalInstant128 } from "../instant/createTemporalInstant128";
import {
  TEMPORAL_INSTANT_128_MAX,
  TEMPORAL_INSTANT_128_MIN,
} from "../instant/temporalInstant128.constants";
import { parseTemporalInstant128 } from "./parseTemporalInstant128";
import { serializeTemporalInstant128 } from "./serializeTemporalInstant128";

describe("TemporalInstant128 serialization", () => {
  it("round-trips zero exactly", () => {
    const instant = createTemporalInstant128(0n);

    expect(
      parseTemporalInstant128(
        serializeTemporalInstant128(instant),
      ),
    ).toBe(instant);
  });

  it("round-trips the minimum Instant exactly", () => {
    const instant = createTemporalInstant128(
      TEMPORAL_INSTANT_128_MIN,
    );

    expect(
      parseTemporalInstant128(
        serializeTemporalInstant128(instant),
      ),
    ).toBe(instant);
  });

  it("round-trips the maximum Instant exactly", () => {
    const instant = createTemporalInstant128(
      TEMPORAL_INSTANT_128_MAX,
    );

    expect(
      parseTemporalInstant128(
        serializeTemporalInstant128(instant),
      ),
    ).toBe(instant);
  });

  it("rejects non-canonical integer strings", () => {
    expect(() => parseTemporalInstant128("01")).toThrow(TypeError);
    expect(() => parseTemporalInstant128("+1")).toThrow(TypeError);
    expect(() => parseTemporalInstant128("1.0")).toThrow(TypeError);
    expect(() => parseTemporalInstant128(" 1")).toThrow(TypeError);
  });

  it("rejects serialized values outside the Instant domain", () => {
    expect(() =>
      parseTemporalInstant128(
        (TEMPORAL_INSTANT_128_MAX + 1n).toString(),
      ),
    ).toThrow(RangeError);
  });
});
