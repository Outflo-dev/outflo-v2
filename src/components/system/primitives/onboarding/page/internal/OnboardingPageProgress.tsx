/* ==========================================================
   OUTFLO — ONBOARDING PAGE PROGRESS
   File: src/components/system/primitives/onboarding/page/internal/OnboardingPageProgress.tsx
   Scope: Render the canonical onboarding journey position
   Last Updated:
   - date: 2026-07-26
   - note: establish stable page-scale progress presentation
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import styles from "./OnboardingPageProgress.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageProgressProps = {
    step: number;
    totalSteps: number;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageProgress({
    step,
    totalSteps,
}: OnboardingPageProgressProps) {
    const activeIndex = Math.min(
        Math.max(step - 1, 0),
        totalSteps - 1,
    );

    return (
        <div
            aria-label={`Step ${step} of ${totalSteps}`}
            className={styles.progress}
        >
            {Array.from(
                { length: totalSteps },
                (_, index) => {
                    const isActive =
                        index === activeIndex;

                    return (
                        <span
                            key={index}
                            aria-hidden="true"
                            className={
                                isActive
                                    ? styles.active
                                    : styles.inactive
                            }
                        />
                    );
                },
            )}
        </div>
    );
}
