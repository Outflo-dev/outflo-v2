"use client";

/* ==========================================================
   OUTFLO — TERMS ENTER DOCUMENT ACTION
   File: src/compositions/legal/terms/internal/enter/TermsEnterDocumentAction.tsx
   Scope: Move the Guide from the Terms arrival into the continuous document
   ========================================================== */

import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

import styles from "./TermsEnterDocumentAction.module.css";

export default function TermsEnterDocumentAction() {
    function enterDocument() {
        document
            .getElementById("terms-document")
            ?.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
    }

    return (
        <button
            type="button"
            className={styles.action}
            onClick={enterDocument}
            aria-label="Scroll to read the Terms of Use"
        >
            <span className={styles.chevron}>
                <ChevronRightIcon size={20} />
            </span>

            <span className={styles.label}>
                Scroll to read
            </span>
        </button>
    );
}
