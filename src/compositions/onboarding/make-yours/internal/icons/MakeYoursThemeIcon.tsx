/* ==========================================================
   OUTFLO — MAKE YOURS THEME ICON
   File: src/compositions/onboarding/make-yours/internal/icons/MakeYoursThemeIcon.tsx
   Scope: Render the local Theme selector icon within Make Outflō Yours
   Last Updated:
   - date: 2026-08-08
   - note: establish temporary theme geometry for the Step 4 visual pass
   ========================================================== */

export default function MakeYoursThemeIcon() {
    return (
        <svg
            viewBox="0 0 32 32"
            width="28"
            height="28"
            fill="none"
            aria-hidden="true"
        >
            <path
                d="M23.5 21.5
                   C20.8 25.2 15.7 26.2 11.8 23.8
                   C7.6 21.3 6.2 15.9 8.5 11.6
                   C10.1 8.6 13 6.8 16.2 6.6
                   C14.7 10.4 15.7 14.8 18.8 17.4
                   C20.1 18.5 21.7 19.2 23.5 19.5"
                stroke="var(--color-accent-secondary)"
                strokeWidth="1.7"
                strokeLinecap="square"
                strokeLinejoin="bevel"
            />
        </svg>
    );
}
