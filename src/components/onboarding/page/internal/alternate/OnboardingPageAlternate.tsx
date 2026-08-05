/* ==========================================================
   OUTFLO — ONBOARDING PAGE ALTERNATE
   File: src/components/onboarding/page/internal/alternate/OnboardingPageAlternate.tsx
   Scope: Render the canonical alternate route within an onboarding page
   Last Updated:
   - date: 2026-08-02
   - note: preserve alternate-route ownership beside the alternate-action sibling
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";

import type {
    OnboardingPageAlternateConfig,
} from "./module/construction/alternate.contract";

import controlStyles from "./module/construction/alternate.action.control.module.css";

import focusStyles from "./module/style/alternate.action.focus.module.css";
import paintStyles from "./module/style/alternate.action.paint.module.css";
import typeStyles from "./module/style/alternate.action.type.module.css";
import frameStyles from "./module/style/alternate.frame.module.css";
import promptStyles from "./module/style/alternate.prompt.module.css";

/* ------------------------------
   Component
-------------------------------- */
export default function OnboardingPageAlternate({
    prompt,
    actionLabel,
    href,
}: OnboardingPageAlternateConfig) {
    return (
        <div className={frameStyles.frame}>
            <p className={promptStyles.prompt}>
                {prompt}{" "}

                <Link
                    href={href}
                    className={`
                        ${controlStyles.control}
                        ${paintStyles.paint}
                        ${typeStyles.type}
                        ${focusStyles.focus}
                    `}
                >
                    {actionLabel}
                </Link>
            </p>
        </div>
    );
}
