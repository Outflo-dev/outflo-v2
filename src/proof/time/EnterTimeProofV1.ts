/* ==========================================================
   OUTFLŌ — ENTER TIME PROOF V1

   File: src/proof/time/EnterTimeProofV1.ts
   Last Updated:
   - Outflō Time: 847937961822553110002352219277
   - note: register Begin entrance proof check
   - Outflō Time: 847937618438524862731494314450
   - note: establish Enter Time Proof v1 contract

   Owner: Proof

   Scope:
   Define the identity, subject, evidence reference,
   and verification contract of one Enter Time Proof.

   Proof does not own observation, temporal resolution,
   canonical arithmetic, or persistence.
   ========================================================== */

export type EnterTimeProofCheckV1 =
  | "raw-span"
  | "protected-entrance"
  | "protected-completion"
  | "protected-span"
  | "first-canonical-instant"
  | "second-canonical-instant"
  | "canonical-duration"
  | "outflo-begin-is-entrance";

export type EnterTimeProofCheckResultV1 = Readonly<{
  check: EnterTimeProofCheckV1;

  result:
    | "pass"
    | "fail"
    | "unavailable";
}>;

export type EnterTimeProofV1 = Readonly<{
  kind: "enter-time-proof";

  version: 1;

  proofId: string;

  subject: Readonly<{
    kind: "guide-enter-time-execution";
  }>;

  evidence: Readonly<{
    kind: "machine-time-observation";

    observationId: string;
  }>;

  verification: Readonly<{
    verdict:
      | "verified"
      | "failed"
      | "insufficient-evidence";

    checks: readonly EnterTimeProofCheckResultV1[];
  }>;
}>;
