/* ==========================================================
   OUTFLO — TERMS ROUTE
   File: src/app/(legal)/terms/page.tsx
   Scope: Expose the current Terms of Use surface
   ========================================================== */

import type {
    Metadata,
} from "next";

import TermsComposition from "@/compositions/legal/terms/TermsComposition";

export const metadata: Metadata = {
    title: "Terms of Use — Outflō",
    description: "Terms governing use of Outflō.",
};

export default function TermsPage() {
    return <TermsComposition />;
}
