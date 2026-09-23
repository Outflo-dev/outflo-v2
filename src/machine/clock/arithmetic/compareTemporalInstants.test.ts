/* ==========================================================
   OUTFLO — COMPARE TEMPORAL INSTANTS TEST
   File: src/machine/clock/arithmetic/compareTemporalInstants.test.ts
   Scope: Prove canonical ordering between Outflō Clock Instants
   Last Updated:
   - note: establish before, equal, after, and full-domain ordering proofs
   ========================================================== */

import { describe, expect, it } from "vitest";

import { createTemporalInstant128 } from "../instant/createTemporalInstant128";
import {
  TEMPORAL_INSTANT_128_MAX,
  TEMPORAL_INSTANT_128_MIN,
} from "../instant/temporalInstant128.constants";
import { compareTemporalInstants } from "./compareTemporalInstants";

describe("compareTemporalInstants", () => {
  it("identifies an earlier Instant", () => {
    const first = createTemporalInstant128(-1n);
    const second = createTemporalInstant128(0n);

    expect(compareTemporalInstants(first, second)).toBe(-1);
  });

  it("identifies equal Instants", () => {
    const first = createTemporalInstant128(0n);
    const second = createTemporalInstant128(0n);

    expect(compareTemporalInstants(first, second)).toBe(0);
  });

  it("identifies a later Instant", () => {
    const first = createTemporalInstant128(1n);
    const second = createTemporalInstant128(0n);

    expect(compareTemporalInstants(first, second)).toBe(1);
  });

  it("orders the full Clock domain", () => {
    const minimum = createTemporalInstant128(
      TEMPORAL_INSTANT_128_MIN,
    );
    const maximum = createTemporalInstant128(
      TEMPORAL_INSTANT_128_MAX,
    );

    expect(compareTemporalInstants(minimum, maximum)).toBe(-1);
    expect(compareTemporalInstants(maximum, minimum)).toBe(1);
  });
});
