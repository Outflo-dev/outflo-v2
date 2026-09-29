/* ==========================================================
   OUTFLO — OUTFLOSECOND GROUND
   File: src/inference/ground/outflo/createOutfloSecondGround.ts
   Scope: Supply the canonical Clock v1 Outflōsecond definition to inference
   ========================================================== */

import {
  createInferenceGround,
  type InferenceGround,
} from "../InferenceGround";

const OUTFLO_SECOND_GROUND = `
OUTFLŌ CLOCK DEFINITION v1 — OUTFLŌSECOND

Outflō Time uses a signed 128-bit integer coordinate space.

minimum coordinate
→ -(2^127)

maximum coordinate
→ 2^127 - 1

zero coordinate
→ 1958-01-01 00:00:00 TAI

A canonical temporal coordinate is an Instant.

Clock Definition v1 adopts:

Ω
→ 435,494,880,000,000,000 SI seconds

n
→ 128

The canonical temporal quantum is the Outflōsecond.

Exactly:

1 Outflōsecond
=
435494880000000000 / 2^127
SI seconds

Approximate human intuition only:

1 Outflōsecond
≈ 2.55960885626015 × 10^-21 SI seconds

The exact rational relationship is canonical.

The decimal approximation is not.

The canonical tick is:

1 Outflōsecond

The Machine does not require software or hardware to physically
observe one event per Outflōsecond.

Observed elapsed duration is resolved into the corresponding
canonical Outflō coordinate.

Coordinate precision and observation precision are distinct.

The precision of the canonical coordinate system does not imply
that an observation or sensor measured reality to that precision.
`.trim();

export function createOutfloSecondGround():
  InferenceGround {
  return createInferenceGround(
    "outflo:machine:clock:v1:outflosecond",
    OUTFLO_SECOND_GROUND,
  );
}
