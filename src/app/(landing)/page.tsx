/* ==========================================================
   OUTFLO — ROOT ROUTE
   File: src/app/(landing)/page.tsx
   Scope: Own the root route entry and render the signed-out landing surface
   Last Updated:
   - date: 2026-07-18
   - note: replace the isolated mark proof with the canonical landing view
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import LandingView from "./LandingView";

/* ------------------------------
   Route
-------------------------------- */
export default function RootRoute() {
  return <LandingView />;
}