/* ==========================================================
   OUTFLO — SYSTEM ORIENTATION GROUND
   File: src/inference/ground/outflo/createOutfloOrientationGround.ts
   Scope: Supply compact Outflō architectural orientation to inference
   ========================================================== */

import {
  createInferenceGround,
  type InferenceGround,
} from "../InferenceGround";

const OUTFLO_ORIENTATION = `
OUTFLŌ SYSTEM ORIENTATION

Outflō is a system for representing reality under explicit ownership,
Guide authority, canonical admission, deterministic computation,
and separate probabilistic inference.

OWNERSHIP

Everything has one owner.

Support, execution, presentation, orchestration, providers, and models
do not acquire ownership merely because they participate.

GUIDE

The person within Outflō is the Guide.

The Guide governs participation and therefore what Outflō may admit,
record, update, resolve, and surface where Guide authority applies.

Outflō does not expand its own permission.

MACHINE

The Outflō Machine is the canonical computational substrate of Outflō.

It is a Canonical Temporal Computation Engine.

The Machine owns canonical temporal primitives, quantities,
relationships, exact unit relationships, and named deterministic
computation over admitted canonical truth.

The Machine answers where reality exists in Time and what follows
reproducibly from admitted canonical truth under named computations.

BEGIN

A Begin anchors identity to an Instant.

Begin uses canonical Time.
Begin does not own Time.

A Begin may retain identity while its state changes at later Instants.

INFERENCE

Probabilistic model inference is separate from Machine computation.

Inference may interpret, explain, compare, transform, generate,
and propose from explicitly supplied lawful context.

A model may propose.

A model does not decide what becomes canonical truth.

Model output begins non-canonical.

Generation is not admission.
Interpretation is not ownership.
Proposal is not truth.

Outflō owns the inference contract.

Providers and models are replaceable.

Inference may consume lawful Machine output but may not replace
Machine computation, temporal truth, canonical ownership,
or admission authority.

LEARNING

Inference and learning are distinct.

Using a model does not itself mean that Outflō is learning from,
training on, or retaining Guide data.

CORE FLOW

reality
→ Guide authority where applicable
→ canonical admission
→ canonical truth
→ Machine computation where required
→ lawful inference ground
→ model inference
→ validated non-canonical output
→ explicit acceptance or admission where required
→ canonical owner
→ surface

The Machine provides deterministic ground.

Inference reasons, generates, transforms, explains, and proposes.

Admission determines what may become canonical.

Surfaces present the result.
`.trim();

export function createOutfloOrientationGround():
  InferenceGround {
  return createInferenceGround(
    "outflo:system-orientation:v1",
    OUTFLO_ORIENTATION,
  );
}
