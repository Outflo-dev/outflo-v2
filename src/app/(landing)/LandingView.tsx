/* ==========================================================
   OUTFLO — LANDING VIEW
   File: src/app/(landing)/LandingView.tsx
   Scope: Own the signed-out landing surface composition
   Last Updated:
   - date: 2026-07-19
   - note: fill the shared application frame while preserving landing-specific placement
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
    justifyContent: "flex-start",
    flex: 1,

    width: "100%",

    paddingTop:
        "calc(env(safe-area-inset-top) + clamp(5.5rem, 13dvh, 8rem))",
    paddingBottom: "env(safe-area-inset-bottom)",

    color: "var(--color-text-primary)",
    background: "var(--color-surface-primary)",

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