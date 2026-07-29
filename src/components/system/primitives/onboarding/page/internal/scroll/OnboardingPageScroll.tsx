/* ==========================================================
   OUTFLO — ONBOARDING PAGE SCROLL
   File: src/components/system/primitives/onboarding/page/internal/scroll/OnboardingPageScroll.tsx
   Scope: Compose the singular movable region within the onboarding page surface
   Last Updated:
   - date: 2026-07-29
   - note: combine explicit frame, column, inset, box, overflow, overscroll, scrollbar, and touch owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import boxStyles from "./module/construction/scroll.box.module.css";

import overflowStyles from "./module/behavior/scroll.overflow.module.css";
import overscrollStyles from "./module/behavior/scroll.overscroll.module.css";
import scrollbarStyles from "./module/behavior/scroll.scrollbar.module.css";
import touchStyles from "./module/behavior/scroll.touch.module.css";

import columnStyles from "./module/style/scroll.column.module.css";
import frameStyles from "./module/style/scroll.frame.module.css";
import insetStyles from "./module/style/scroll.inset.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageScrollProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageScroll({
    children,
}: OnboardingPageScrollProps) {
    return (
        <div
            className={`
                ${frameStyles.frame}
                ${columnStyles.column}
                ${insetStyles.inset}
                ${boxStyles.box}
                ${overflowStyles.overflow}
                ${overscrollStyles.overscroll}
                ${scrollbarStyles.scrollbar}
                ${touchStyles.touch}
            `}
        >
            {children}
        </div>
    );
}