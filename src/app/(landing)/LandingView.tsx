/* ==========================================================
   OUTFLO — LANDING VIEW
   File: src/app/(landing)/LandingView.tsx
   Scope: Own the signed-out landing surface composition
   Last Updated:
   - date: 2026-07-21
   - note: mount the landing Orb atmosphere behind the locked brand composition
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import LandingOrbAtmosphere from "./atmosphere/LandingOrbAtmosphere";
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
        "calc(env(safe-area-inset-top) + clamp(4.4rem, 10.8dvh, 6.8rem))",
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
            <LandingOrbAtmosphere />
            <LandingBrand />
        </section>
    );
}