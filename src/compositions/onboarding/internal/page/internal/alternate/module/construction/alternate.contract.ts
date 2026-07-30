/* ==========================================================
   OUTFLO — ONBOARDING PAGE ALTERNATE CONTRACT
   File: src/compositions/onboarding/internal/page/internal/alternate/module/construction/alternate.contract.ts
   Scope: Define the canonical configuration accepted by an onboarding alternate route
   Last Updated:
   - date: 2026-07-29
   - note: expose shared prompt, action-label, and destination ownership across the page family
   ========================================================== */

export type OnboardingPageAlternateConfig = {
    prompt: string;
    actionLabel: string;
    href: string;
};