/* ==========================================================
   OUTFLO — ONBOARDING PAGE COMPONENTS
   File: src/components/onboarding/page/index.ts
   Scope: Expose the reusable onboarding page component family
   Last Updated:
   - date: 2026-08-04
   - note: establish the public component boundary consumed by onboarding compositions
   ========================================================== */

export {
    default as OnboardingPage,
} from "./OnboardingPage";

export {
    default as OnboardingPageAction,
} from "./internal/action/OnboardingPageAction";

export {
    default as OnboardingPageAlternate,
} from "./internal/alternate/OnboardingPageAlternate";

export {
    default as OnboardingPageAlternateAction,
} from "./internal/alternate/OnboardingPageAlternateAction";

export {
    default as OnboardingPageBody,
} from "./internal/body/OnboardingPageBody";

export {
    default as OnboardingPageIcon,
} from "./internal/icon/OnboardingPageIcon";

export {
    default as OnboardingPageIntro,
} from "./internal/intro/OnboardingPageIntro";

export {
    default as OnboardingPageProgress,
} from "./internal/progress/OnboardingPageProgress";
