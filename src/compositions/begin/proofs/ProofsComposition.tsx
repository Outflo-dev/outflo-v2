import type { BeginProofRecord } from "@/runtime/begin/read/readBeginProofRecords";
import BackNavigationAction from "@/components/system/primitives/actions/navigation/BackNavigationAction";

import ProofTile from "./internal/tile/ProofTile";
import ProofSubjectIcon from "./internal/tile/ProofSubjectIcon";
import styles from "./ProofsComposition.module.css";

type Props = {
    records: BeginProofRecord[];
};

const utcFormatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "UTC",
    timeZoneName: "short",
});

function displayAction(action: string | null): string | null {
    if (!action) return null;

    return action.toLowerCase().replace(
        /\b\w/g,
        (letter) => letter.toUpperCase(),
    );
}

export default function ProofsComposition({ records }: Props) {
    return (
        <main className={styles.surface}>
            <header className={styles.header}>
                <nav className={styles.back} aria-label="Proofs navigation">
                    <BackNavigationAction
                        href="/home"
                        label="Back to Home"
                    />
                </nav>

                <div className={styles.heading}>
                    <h1>Proofs</h1>
                    <p>VERIFIED MACHINE TIME</p>
                </div>
            </header>

            <section className={styles.records} aria-label="Verified Proofs">
                {records.length === 0 && (
                    <p className={styles.empty}>No verified Proofs yet.</p>
                )}

                {records.map((record) => (
                    <ProofTile
                        key={record.observationId}
                        icon={<ProofSubjectIcon action={record.action} />}
                        action={displayAction(record.action)}
                        timestampUtc={utcFormatter.format(
                            new Date(record.timestampUtc),
                        )}
                        observedOutfloseconds={record.observedOutfloseconds}
                        proofNumber={record.proofNumber}
                    />
                ))}
            </section>
        </main>
    );
}
