/* ==========================================================
   OUTFLO — BEGIN TEMPORAL RELATIONSHIP
   File: src/runtime/begin/relationship/resolveBeginTemporalRelationship.ts
   Scope: Derive the temporal relationship between a Begin Instant and an observed Clock Instant
   Last Updated:
   - note: establish Begin relationship directly on canonical Outflō Clock primitives
   ========================================================== */

import { compareTemporalInstants } from "../../../machine/clock/arithmetic/compareTemporalInstants";
import { measureTemporalDurationBetweenInstants } from "../../../machine/clock/arithmetic/measureTemporalDurationBetweenInstants";
import type { TemporalDuration128 } from "../../../machine/clock/duration/TemporalDuration128";
import type { TemporalInstant128 } from "../../../machine/clock/instant/TemporalInstant128";

export type BeginTemporalPosition =
  | "before"
  | "at"
  | "after";

export type BeginTemporalRelationship = {
  distance: TemporalDuration128;
  position: BeginTemporalPosition;
};

export function resolveBeginTemporalRelationship({
  beginInstant,
  observedInstant,
}: {
  beginInstant: TemporalInstant128;
  observedInstant: TemporalInstant128;
}): BeginTemporalRelationship {
  const order =
    compareTemporalInstants(
      observedInstant,
      beginInstant,
    );

  const position: BeginTemporalPosition =
    order < 0
      ? "before"
      : order > 0
        ? "after"
        : "at";

  return {
    distance:
      measureTemporalDurationBetweenInstants(
        beginInstant,
        observedInstant,
      ),
    position,
  };
}
