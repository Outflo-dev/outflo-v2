/* ==========================================================
   OUTFLO — BEGIN ELAPSED ICON
   File: src/compositions/onboarding/begin/internal/preview/BeginElapsedIcon.tsx
   Scope: Render the unified infinity-in-circle mark for Begin elapsed preview
   Last Updated:
   - date: 2026-08-08
   - note: unify circle and infinity within one optical coordinate system
   ========================================================== */

/* ------------------------------
   Component
-------------------------------- */
export default function BeginElapsedIcon() {
    return (
        <svg
            aria-hidden="true"
            viewBox="0 0 64 64"
            width="64"
            height="64"
            fill="none"
        >
            <circle
                cx="32"
                cy="32"
                r="29"
                stroke="var(--color-accent-secondary)"
                strokeWidth="1.8"
            />

            <text
                x="32"
                y="34"
                fill="var(--color-accent-secondary)"
                fontFamily="Cambria Math, Times New Roman, serif"
                fontSize="43"
                fontWeight="400"
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {"\u221E"}
            </text>
        </svg>
    );
}
