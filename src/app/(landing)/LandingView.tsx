/* ==========================================================
   OUTFLO — LANDING VIEW
   File: src/app/(landing)/LandingView.tsx
   Scope: Own the signed-out landing surface composition
   Last Updated:
   - date: 2026-07-18
   - note: establish the landing surface with its canonical brand composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import LandingBrand from "./brand/LandingBrand";

/* ------------------------------
   Styles
-------------------------------- */
const VIEW_STYLE = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    minHeight: "100dvh",
    paddingTop: "env(safe-area-inset-top)",
    paddingBottom: "env(safe-area-inset-bottom)",
    overflow: "hidden",
} as const;

/* ------------------------------
   Component
-------------------------------- */
export default function LandingView() {
    return (
        <section style={VIEW_STYLE}>
            <LandingBrand />
        </section>
    );
}