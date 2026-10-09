/* ==========================================================
   OUTFLO — TIME ENTER ACTION
   File: src/compositions/time/internal/enter/TimeEnterAction.tsx
   Scope: Navigate from TIME entrance to the existing destination
   Last Updated:
   - date: 2026-10-09
   - note: establish isolated upward ENTER action
   ========================================================== */

import Link from "next/link";

import ArrowIcon from "@/components/system/primitives/icons/navigation/ArrowIcon";

import styles from "./TimeEnterAction.module.css";

export default function TimeEnterAction() {
    return (
        <Link
            href="/coming-soon"
            className={styles.action}
            aria-label="Enter Outflō"
        >
            <span className={styles.circle}>
                <span className={styles.arrow}>
                    <ArrowIcon direction="right" />
                </span>
            </span>

            <span className={styles.label}>
                ENTER
            </span>
        </Link>
    );
}
