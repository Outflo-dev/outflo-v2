import "server-only";

import { createClient } from "@/lib/supabase/server";

type ProofRow = {
    observation_id: string;
    emission_subject: string | null;
    persisted_at: string;
    duration: string;
};

export type BeginProofRecord = {
    observationId: string;
    action: string | null;
    timestampUtc: string;
    observedOutfloseconds: string;
    proofNumber: number;
};

export async function readBeginProofRecords(): Promise<BeginProofRecord[]> {
    const supabase = await createClient();
    const { data: { user }, error: authError } =
        await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Authenticated Guide required.");
    }

    const rows: ProofRow[] = [];
    const batchSize = 500;
    let total = 0;
    let offset = 0;

    do {
        const { data, count, error } = await supabase
            .from("machine_time_verified_emissions_v1")
            .select(
                "observation_id, emission_subject, persisted_at, duration",
                { count: "exact" },
            )
            .eq("user_id", user.id)
            .eq("machine_proof_verdict", "verified")
            .eq("machine_proof_total_checks", 7)
            .order("persisted_at", { ascending: false })
            .order("observation_id", { ascending: false })
            .range(offset, offset + batchSize - 1);

        if (error) {
            throw new Error(`Proof records read failed: ${error.message}`);
        }

        total = count ?? 0;
        rows.push(...(data ?? []));
        offset += data?.length ?? 0;
    } while (offset < total && offset > 0);

    return rows.map((row, index) => ({
        observationId: row.observation_id,
        action: row.emission_subject === "UNATTRIBUTED"
            ? null
            : row.emission_subject,
        timestampUtc: row.persisted_at,
        observedOutfloseconds: row.duration,
        proofNumber: total - index,
    }));
}
