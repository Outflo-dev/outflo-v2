/* ==========================================================
   OUTFLO — MAKE YOURS LANGUAGE ICON
   File: src/compositions/onboarding/make-yours/internal/icons/MakeYoursLanguageIcon.tsx
   Scope: Render the local Language selector icon within Make Outflō Yours
   Last Updated:
   - date: 2026-08-08
   - note: establish temporary language geometry for the Step 4 visual pass
   ========================================================== */

export default function MakeYoursLanguageIcon() {
    return (
        <svg
            viewBox="0 0 32 32"
            width="28"
            height="28"
            fill="none"
            aria-hidden="true"
        >
            <circle
                cx="16"
                cy="16"
                r="10"
                stroke="var(--color-accent-secondary)"
                strokeWidth="1.6"
            />

            <path
                d="M6 16 H26 M16 6 C12.5 9 12.5 23 16 26 M16 6 C19.5 9 19.5 23 16 26"
                stroke="var(--color-accent-secondary)"
                strokeWidth="1.4"
                strokeLinecap="square"
            />
        </svg>
    );
}
