/* ==========================================================
   OUTFLO — CREATE ACCOUNT PAGE
   File: src/app/(onboarding)/create-account/page.tsx
   Scope: Expose the completed Create Account composition
   Last Updated:
   - date: 2026-07-29
   - note: consume Create Account through the public onboarding composition boundary
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import {
   CreateAccountComposition,
} from "@/compositions/onboarding";

/* ------------------------------
   Page
-------------------------------- */
export default function CreateAccountPage() {
   return <CreateAccountComposition />;
}