/* ==========================================================
   OUTFLO — ONBOARDING COMPOSITIONS
   File: src/compositions/onboarding/index.ts
   Scope: Expose the completed public onboarding compositions
   Last Updated:
   - date: 2026-07-29
   - note: expose Create Account as the first completed onboarding composition
   ========================================================== */

export {
    default as CreateAccountComposition,
} from "./access/create-account/CreateAccountComposition";

export {
    default as VerifyEmailComposition,
} from "./access/verify-email/VerifyEmailComposition";

export {
    default as GuideNameComposition,
} from "./outflo-onboarding/guide-name/GuideNameComposition";



export {
    default as BeginComposition,
} from "./outflo-onboarding/begin/BeginComposition";



export {
    default as SignInComposition,
} from "./access/sign-in/SignInComposition";

export {
    default as MoreWaysToEnterComposition,
} from "./access/more-ways-to-enter/MoreWaysToEnterComposition";
