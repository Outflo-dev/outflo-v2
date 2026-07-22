/* ==========================================================
   OUTFLO — LANDING TAGLINE
   File: src/app/(landing)/brand/internal/LandingTagline.tsx
   Scope: Render and visually style the canonical landing tagline
   Last Updated:
   - date: 2026-07-19
   - note: leave line-box geometry and composition spacing to LandingBrand
   ========================================================== */

/* ------------------------------
   Styles
-------------------------------- */
const TAGLINE_STYLE = {
    margin: 0,

    fontFamily: "var(--font-family-system)",
    fontSize: ".95rem",
    fontWeight: 400,
    letterSpacing: "0.01em",

    color: "var(--color-text-secondary)",
    textAlign: "center",
} as const;

/* ------------------------------
   Component
-------------------------------- */
export default function LandingTagline() {
    return (
        <p style={TAGLINE_STYLE}>
            Your life, in <span style={{ color: "var(--color-accent-primary)" }}>time</span>.
        </p>
    );
}