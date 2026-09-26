/* ==========================================================
   OUTFLO — TERMS ARRIVAL
   File: src/compositions/legal/terms/internal/arrival/TermsArrival.tsx
   Scope: Present the Terms identity, canonical Outflō Time stamp, and document entrance
   ========================================================== */

import OutfloMark from "@/components/system/primitives/marks/outflo/OutfloMark";
import OutfloWordmark from "@/components/system/primitives/marks/outflo/OutfloWordmark";

import {
    TERMS_DOCUMENT,
} from "../../terms-document.record";

import TermsEnterDocumentAction from "../enter/TermsEnterDocumentAction";
import TermsTimeInstrument from "../time/TermsTimeInstrument";

import styles from "./TermsArrival.module.css";

export default function TermsArrival() {
    return (
        <header className={styles.arrival}>
            <div className={styles.brand}>
                <div className={styles.mark}>
                    <OutfloMark size={160} />
                </div>

                <div className={styles.wordmark}>
                    <OutfloWordmark sizeRem={2.2} />
                </div>
            </div>

            <div className={styles.identity}>
                <h1 className={styles.title}>
                    {TERMS_DOCUMENT.title}
                </h1>

                <TermsTimeInstrument
                    instant={
                        TERMS_DOCUMENT.updatedInstant
                    }
                />
            </div>

            <div
                className={styles.divider}
                aria-hidden="true"
            />

            <div className={styles.introduction}>
                {TERMS_DOCUMENT.introduction.map((paragraph) => (
                    <p key={paragraph}>
                        {paragraph}
                    </p>
                ))}
            </div>

            <div className={styles.enter}>
                <TermsEnterDocumentAction />
            </div>
        </header>
    );
}
