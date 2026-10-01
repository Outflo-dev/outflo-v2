/* ==========================================================
   OUTFLO — RESOLVE SIGN IN DESTINATION
   File: src/runtime/onboarding/access/sign-in/destination/resolveSignInDestination.ts
   Scope: Resolve the destination for an authenticated Access identity
   Last Updated:
   - date: 2026-09-30
   - note: authenticated returning Guides enter Outflō directly
   ========================================================== */

/* ------------------------------
   Types
-------------------------------- */

export type SignInDestination =
    "/time";

/* ------------------------------
   Resolution
-------------------------------- */

export async function resolveSignInDestination(): Promise<SignInDestination> {
    return "/time";
}
