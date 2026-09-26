/* ==========================================================
   OUTFLO — TERMS COMPOSITION
   File: src/compositions/legal/terms/TermsComposition.tsx
   Scope: Compose the complete Terms of Use surface
   ========================================================== */

import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";

import TermsArrival from "./internal/arrival/TermsArrival";
import TermsDocument from "./internal/document/TermsDocument";
import TermsFooter from "./internal/footer/TermsFooter";

import styles from "./internal/layout/TermsLayout.module.css";

export default function TermsComposition() {
    return (
        <article className={styles.surface}>
            <nav
                className={styles.navigation}
                aria-label="Terms navigation"
            >
                <BackNavigationAction
                    href="/"
                    label="Back to Outflō"
                />
            </nav>

            <div className={styles.content}>
                <TermsArrival />

                <TermsDocument />

                <TermsFooter />
            </div>
        </article>
    );
}
