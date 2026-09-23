/* ==========================================================
   OUTFLO — BEGIN TEMPORAL RELATIONSHIP TEST
   File: src/runtime/begin/relationship/resolveBeginTemporalRelationship.test.ts
   Scope: Prove Begin relationships derive from canonical Clock Instants
   Last Updated:
   - note: establish before, at, and after relationships without Unix time
   ========================================================== */

import { describe, expect, it } from "vitest";

import { createTemporalInstant128 } from "../../../machine/clock/instant/createTemporalInstant128";
import { resolveBeginTemporalRelationship } from "./resolveBeginTemporalRelationship";

describe("resolveBeginTemporalRelationship", () => {
  it("resolves observed time before Begin", () => {
    const relationship =
      resolveBeginTemporalRelationship({
        beginInstant: createTemporalInstant128(10n),
        observedInstant: createTemporalInstant128(4n),
      });

    expect(relationship.position).toBe("before");
    expect(relationship.distance).toBe(6n);
  });

  it("resolves observed time at Begin", () => {
    const relationship =
      resolveBeginTemporalRelationship({
        beginInstant: createTemporalInstant128(10n),
        observedInstant: createTemporalInstant128(10n),
      });

    expect(relationship.position).toBe("at");
    expect(relationship.distance).toBe(0n);
  });

  it("resolves observed time after Begin", () => {
    const relationship =
      resolveBeginTemporalRelationship({
        beginInstant: createTemporalInstant128(10n),
        observedInstant: createTemporalInstant128(17n),
      });

    expect(relationship.position).toBe("after");
    expect(relationship.distance).toBe(7n);
  });
});
