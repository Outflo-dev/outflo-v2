/* ==========================================================
   OUTFLO — LANDING TAGLINE
   File: src/components/landing/brand/LandingTagline.tsx
   Scope: Render the canonical landing tagline
   Last Updated:
   - date: 2026-07-18
   - note: establish the landing tagline as its own presentation owner
   ========================================================== */

/* ------------------------------
   Styles
-------------------------------- */
const TAGLINE_STYLE = {
    margin: 0,
    fontSize: "1rem",
    lineHeight: 1.4,
    fontWeight: 400,
    letterSpacing: "0.01em",
    textAlign: "center",
} as const;

/* ------------------------------
   Component
-------------------------------- */
export default function LandingTagline() {
    return (
        <p style={TAGLINE_STYLE}>
            Your life, in time.
        </p>
    );
}