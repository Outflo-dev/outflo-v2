import type { ReactNode } from "react";

import styles from "./MoreWaysToEnterOption.module.css";

type MoreWaysToEnterOptionProps = {
    icon: ReactNode;
    name: string;
    detail: string;
    status: string;
    available?: boolean;
};

export default function MoreWaysToEnterOption({
    icon,
    name,
    detail,
    status,
    available = false,
}: MoreWaysToEnterOptionProps) {
    return (
        <div className={styles.option}>
            <div className={styles.mark}>
                {icon}
            </div>

            <div className={styles.copy}>
                <p className={styles.name}>
                    {name}
                </p>

                <p className={styles.detail}>
                    {detail}
                </p>
            </div>

            <span
                className={
                    available
                        ? `${styles.status} ${styles.available}`
                        : styles.status
                }
            >
                {status}
            </span>
        </div>
    );
}
