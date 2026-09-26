/* ==========================================================
   OUTFLO — TERMS DOCUMENT
   File: src/compositions/legal/terms/internal/document/TermsDocument.tsx
   Scope: Render the complete continuous Terms of Use document
   ========================================================== */

import {
    TERMS_DOCUMENT,
} from "../../terms-document.record";

import TermsSection from "../section/TermsSection";

import styles from "./TermsDocument.module.css";

export default function TermsDocument() {
    return (
        <div
            id="terms-document"
            className={styles.document}
        >
            {TERMS_DOCUMENT.sections.map((section) => (
                <TermsSection
                    key={section.number}
                    section={section}
                />
            ))}
        </div>
    );
}
