/* ==========================================================
   OUTFLO — BACK NAVIGATION ACTION
   File: src/components/system/primitives/actions/navigation/BackNavigationAction.tsx
   Scope: Own the canonical backward-navigation action boundary
   Last Updated:
   - date: 2026-07-26
   - note: establish the shared icon-only back navigation action
   ========================================================== */

/* ------------------------------
   Imports
-------------------------------- */
import Link from "next/link";

import BackArrowIcon from "@/components/system/primitives/icons/navigation/BackArrowIcon";

import styles from "./BackNavigationAction.module.css";

/* ------------------------------
   Types
-------------------------------- */
type BackNavigationActionProps = {
    href: string;
    label?: string;
};

/* ------------------------------
   Component
-------------------------------- */
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
            <BackArrowIcon size={22} />
        </Link>
    );
}