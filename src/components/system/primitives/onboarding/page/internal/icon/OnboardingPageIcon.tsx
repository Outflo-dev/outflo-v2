/* ==========================================================
   OUTFLO — ONBOARDING PAGE ICON
   File: src/components/system/primitives/onboarding/page/internal/icon/OnboardingPageIcon.tsx
   Scope: Compose the canonical selected icon within the onboarding page
   Last Updated:
   - date: 2026-07-29
   - note: consume explicit icon contract, frame, landing, paint, and rendered-size owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type {
    OnboardingPageIconComponent,
} from "./module/construction/icon.contract";

import {
    ONBOARDING_PAGE_ICON_SIZE_PX,
} from "./module/construction/icon.size";

import frameStyles from "./module/style/icon.frame.module.css";
import landingStyles from "./module/style/icon.landing.module.css";
import paintStyles from "./module/style/icon.paint.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageIconProps = {
    icon: OnboardingPageIconComponent;
    title?: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageIcon({
    icon: Icon,
    title,
}: OnboardingPageIconProps) {
    return (
        <div className={frameStyles.frame}>
            <div
                className={`
                    ${landingStyles.landing}
                    ${paintStyles.paint}
                `}
            >
                <Icon
                    size={ONBOARDING_PAGE_ICON_SIZE_PX}
                    title={title}
                />
            </div>
        </div>
    );
}