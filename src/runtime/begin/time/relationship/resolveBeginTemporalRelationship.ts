/* ==========================================================
   OUTFLO — BEGIN TEMPORAL RELATIONSHIP
   File: src/runtime/begin/time/relationship/resolveBeginTemporalRelationship.ts
   Scope: Derive the temporal relationship between Begin and observed Now
   Last Updated:
   - date: 2026-08-19
   - note: establish the signed unit-level relationship between two Unix-millisecond instants
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */

export type BeginTemporalPosition =
    | "before"
    | "at"
    | "after";

export type BeginTemporalRelationship = {
    deltaMs: number;
    distanceMs: number;
    position: BeginTemporalPosition;
};

/* ------------------------------
   Resolution
-------------------------------- */

export function resolveBeginTemporalRelationship({
    beginUnixMs,
    nowUnixMs,
}: {
    beginUnixMs: number;
    nowUnixMs: number;
}): BeginTemporalRelationship {
    const deltaMs =
        nowUnixMs - beginUnixMs;

    const position: BeginTemporalPosition =
        deltaMs < 0
            ? "before"
            : deltaMs > 0
              ? "after"
              : "at";

    return {
        deltaMs,
        distanceMs: Math.abs(deltaMs),
        position,
    };
}
