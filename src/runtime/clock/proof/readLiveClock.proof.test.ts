/* ==========================================================
   OUTFLO — READ LIVE CLOCK PROOF
   File: src/runtime/clock/proof/readLiveClock.proof.test.ts
   Scope: Prove a live platform observation can resolve to a canonical Outflō Clock coordinate
   Last Updated:
   - note: expose one live canonical Clock coordinate for implementation proof
   ========================================================== */

import { expect, it } from "vitest";

import { serializeTemporalInstant128 } from "../../../machine/clock/serialization/serializeTemporalInstant128";
import { readCurrentTemporalInstant128 } from "../now/readCurrentTemporalInstant128";

it("reads the live Outflō Clock", () => {
  const instant = readCurrentTemporalInstant128();

  const serialized = serializeTemporalInstant128(instant);

  console.log("\nOUTFLŌ CLOCK:", serialized, "\n");

  expect(typeof serialized).toBe("string");
});
