/* ==========================================================
   OUTFLO — ONBOARDING PAGE INTRO
   File: src/components/system/primitives/onboarding/page/internal/OnboardingPageIntro.tsx
   Scope: Render the canonical title and supporting-copy composition across onboarding
   Last Updated:
   - date: 2026-07-26
   - note: establish stable centered introduction hierarchy
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import styles from "./OnboardingPageIntro.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageIntroProps = {
    title: string;
    support: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageIntro({
    title,
    support,
}: OnboardingPageIntroProps) {
    return (
        <div className={styles.intro}>
            <h1 className={styles.title}>
                {title}
            </h1>

            <p className={styles.support}>
                {support}
            </p>
        </div>
    );
}
