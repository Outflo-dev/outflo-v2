/* ==========================================================
   OUTFLO — TERMS SECTION
   File: src/compositions/legal/terms/internal/section/TermsSection.tsx
   Scope: Render one complete numbered section of the continuous Terms document
   ========================================================== */

import type {
    TermsSectionRecord,
} from "../../terms-document.record";

import styles from "./TermsSection.module.css";

type TermsSectionProps = {
    section: TermsSectionRecord;
};

export default function TermsSection({
    section,
}: TermsSectionProps) {
    return (
        <section className={styles.section}>
            <div
                className={styles.number}
                aria-hidden="true"
            >
                {section.number}
            </div>

            <div className={styles.content}>
                <div
                    className={styles.rule}
                    aria-hidden="true"
                />

                <h2 className={styles.heading}>
                    {section.title}
                </h2>

                <div className={styles.body}>
                    {section.paragraphs.map((paragraph) => (
                        <p
                            key={paragraph}
                            className={styles.paragraph}
                        >
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
}
