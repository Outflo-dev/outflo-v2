/* ==========================================================
   OUTFLO — ONBOARDING PAGE PROGRESS
   File: src/components/system/primitives/onboarding/page/internal/progress/OnboardingPageProgress.tsx
   Scope: Render the canonical onboarding journey position
   Last Updated:
   - date: 2026-07-29
   - note: compose explicit progress layout, dot construction, and state-paint owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import dotShapeStyles from "./module/construction/progress.dot.shape.module.css";
import dotSizeStyles from "./module/construction/progress.dot.size.module.css";

import activeStyles from "./module/style/progress.dot.active.module.css";
import inactiveStyles from "./module/style/progress.dot.inactive.module.css";
import frameStyles from "./module/style/progress.frame.module.css";
import trackStyles from "./module/style/progress.track.module.css";

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
        <div className={frameStyles.frame}>
            <div
                aria-label={`Step ${step} of ${totalSteps}`}
                className={trackStyles.track}
            >
                {Array.from(
                    { length: totalSteps },
                    (_, index) => {
                        const isActive =
                            index === activeIndex;

                        const stateClassName =
                            isActive
                                ? activeStyles.active
                                : inactiveStyles.inactive;

                        return (
                            <span
                                key={index}
                                aria-hidden="true"
                                className={`
                                    ${dotSizeStyles.size}
                                    ${dotShapeStyles.shape}
                                    ${stateClassName}
                                `}
                            />
                        );
                    },
                )}
            </div>
        </div>
    );
}