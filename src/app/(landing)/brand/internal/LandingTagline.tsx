/* ==========================================================
   OUTFLO — LANDING TAGLINE
   File: src/app/(landing)/brand/internal/LandingTagline.tsx
   Scope: Render and visually style the canonical landing tagline
   Last Updated:
   - date: 2026-07-21
   - note: preserve tuned typography while applying a soft Time gradient
   ========================================================== */

/* ------------------------------
   Styles
-------------------------------- */
const TAGLINE_STYLE = {
    margin: 0,

    fontFamily: "var(--font-family-system)",
    fontSize: ".975rem",
    fontWeight: 400,
    letterSpacing: "0.0em",

    color: "var(--color-text-secondary)",
    textAlign: "center",
} as const;

const TIME_STYLE = {
    color: "transparent",

    background:
        "linear-gradient(90deg, var(--color-accent-primary) -35%, var(--color-accent-secondary) 85%)",

    backgroundClip: "text",
    WebkitBackgroundClip: "text",
} as const;

/* ------------------------------
   Component
-------------------------------- */
export default function LandingTagline() {
    return (
        <p style={TAGLINE_STYLE}>
            Your life, in <span style={TIME_STYLE}>time.</span>
        </p>
    );
}