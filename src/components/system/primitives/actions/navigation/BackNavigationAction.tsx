/* ==========================================================
   OUTFLO — BACK NAVIGATION ACTION
   File: src/components/system/primitives/actions/navigation/BackNavigationAction.tsx
   Scope: Own the canonical backward-navigation action boundary
   Last Updated:
   - date: 2026-09-23
   - note: render the canonical chevron + Back language
   ========================================================== */

import Link from "next/link";

import ChevronRightIcon from "@/components/system/primitives/icons/navigation/ChevronRightIcon";

import styles from "./BackNavigationAction.module.css";

type BackNavigationActionProps = {
    href: string;
    label?: string;
};

export default function BackNavigationAction({
    href,
    label = "Go back",
}: BackNavigationActionProps) {
    return (
        <Link
            href={href}
            aria-label={label}
            className={styles.action}
        >
            <span className={styles.chevron}>
                <ChevronRightIcon />
            </span>

            <span className={styles.label}>
                Back
            </span>
        </Link>
    );
}
