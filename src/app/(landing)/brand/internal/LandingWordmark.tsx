/* ==========================================================
   OUTFLO — LANDING WORDMARK
   File: src/app/(landing)/brand/internal/LandingWordmark.tsx
   Scope: Render and visually style the canonical Outflō landing wordmark
   Last Updated:
   - date: 2026-07-19
   - note: leave line-box geometry and composition spacing to LandingBrand
   ========================================================== */

/* ------------------------------
   Styles
-------------------------------- */
const WORDMARK_STYLE = {
    margin: 0,

    fontFamily: "var(--font-family-wordmark)",
    fontSize: "2.95rem",
    fontWeight: 400,
    letterSpacing: "0.03em",

    color: "var(--color-text-primary)",
    textAlign: "center",
} as const;

/* ------------------------------
   Component
-------------------------------- */
export default function LandingWordmark() {
    return (
        <h1 style={WORDMARK_STYLE}>
            Outflō
        </h1>
    );
}