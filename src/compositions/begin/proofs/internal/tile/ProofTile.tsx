import type { ReactNode } from "react";
import Link from "next/link";
import styles from "./ProofTile.module.css";

type ProofTileProps = {
    icon: ReactNode;
    action: string | null;
    timestampUtc: string;
    observedOutfloseconds: string;
    proofNumber: number;
};

export default function ProofTile({
    icon, action, timestampUtc,
    observedOutfloseconds, proofNumber,
}: ProofTileProps) {
    const duration = observedOutfloseconds.replace(
        /\B(?=(\d{3})+(?!\d))/g, " ",
    );

    return (
        <Link href="/coming-soon?from=proofs" className={styles.tile}>
            <span className={styles.icon}>{icon}</span>
            <span className={styles.content}>
                <span className={styles.top}>
                    <strong>Proof</strong>
                    <span className={styles.verified}>✓ Verified</span>
                </span>
                <span className={styles.stamp}>
                    {action ? `${action} · ` : ""}{timestampUtc}
                </span>
                <span className={styles.label}>
                    OBSERVED OUTFLŌSECONDS
                </span>
                <span className={styles.duration}>
                    {duration}
                </span>
                <span className={styles.number}>
                    Proof <b>{proofNumber}</b>
                </span>
            </span>
        </Link>
    );
}
