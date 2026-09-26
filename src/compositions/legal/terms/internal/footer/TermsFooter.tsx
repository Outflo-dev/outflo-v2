/* ==========================================================
   OUTFLO — TERMS FOOTER
   File: src/compositions/legal/terms/internal/footer/TermsFooter.tsx
   Scope: Close the Terms document and return to Outflō
   ========================================================== */

import Link from "next/link";

import styles from "./TermsFooter.module.css";

export default function TermsFooter() {
    return (
        <footer className={styles.footer}>
            <Link
                href="/"
                className={styles.link}
            >
                Back to Outflō
            </Link>

            <p className={styles.identity}>
                OUTFLŌ
            </p>
        </footer>
    );
}
