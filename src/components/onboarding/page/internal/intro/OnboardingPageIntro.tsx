/* ==========================================================
   OUTFLO — ONBOARDING PAGE INTRO
   File: src/components/onboarding/page/internal/intro/OnboardingPageIntro.tsx
   Scope: Compose the canonical title and subtitle unit across onboarding pages
   Last Updated:
   - date: 2026-07-29
   - note: consume explicit frame, title, and subtitle style owners
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import frameStyles from "./module/style/intro.frame.module.css";
import subtitleStyles from "./module/style/intro.subtitle.module.css";
import titleStyles from "./module/style/intro.title.module.css";

/* ------------------------------
   Types
-------------------------------- */
type OnboardingPageIntroProps = {
    title: string;
    subtitle: string;
};

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageIntro({
    title,
    subtitle,
}: OnboardingPageIntroProps) {
    return (
        <div className={frameStyles.frame}>
            <h1 className={titleStyles.title}>
                {title}
            </h1>

            <p className={subtitleStyles.subtitle}>
                {subtitle}
            </p>
        </div>
    );
}