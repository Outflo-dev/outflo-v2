/* ==========================================================
   OUTFLO — ONBOARDING PAGE CONTENT FRAME
   File: src/compositions/onboarding/internal/page/internal/scroll/OnboardingPageScroll.tsx
   Scope: Compose the content frame within the onboarding page surface
   Last Updated:
   - date: 2026-08-03
   - note: preserve onboarding content framing while returning page movement to the browser
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import boxStyles from "./module/construction/scroll.box.module.css";

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
            `}
        >
            {children}
        </div>
    );
}                           