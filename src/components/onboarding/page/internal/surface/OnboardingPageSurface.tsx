/* ==========================================================
   OUTFLO — ONBOARDING PAGE SURFACE
   File: src/components/onboarding/page/internal/surface/OnboardingPageSurface.tsx
   Scope: Compose the canonical onboarding surface within the application shell
   Last Updated:
   - date: 2026-07-29
   - note: combine explicit shell participation, stacking, box, paint, and clipping owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import type { ReactNode } from "react";

import boxStyles from "./module/construction/surface.box.module.css";

import clipStyles from "./module/style/surface.clip.module.css";
import frameStyles from "./module/style/surface.frame.module.css";
import paintStyles from "./module/style/surface.paint.module.css";
import stackStyles from "./module/style/surface.stack.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageSurfaceProps = {
    children: ReactNode;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageSurface({
    children,
}: OnboardingPageSurfaceProps) {
    return (
        <section
            className={`
                ${frameStyles.frame}
                ${stackStyles.stack}
                ${boxStyles.box}
                ${paintStyles.paint}
                ${clipStyles.clip}
            `}
        >
            {children}
        </section>
    );
}