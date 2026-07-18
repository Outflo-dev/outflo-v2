/* ==========================================================
   OUTFLO — LANDING WORDMARK
   File: src/components/landing/brand/LandingWordmark.tsx
   Scope: Render the canonical Outflō landing wordmark
   Last Updated:
   - date: 2026-07-18
   - note: establish the landing wordmark as its own presentation owner
   ========================================================== */

/* ------------------------------
   Styles
-------------------------------- */
const WORDMARK_STYLE = {
    margin: 0,
    fontSize: "2rem",
    lineHeight: 1,
    fontWeight: 500,
    letterSpacing: "-0.03em",
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