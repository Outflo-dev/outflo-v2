import "server-only";

import { createClient } from "@/lib/supabase/server";
import { readOutfloBeginInstant } from "./readOutfloBeginInstant";

export async function readBeginProofCount(): Promise<number | null> {
    const supabase = await createClient();

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Authenticated Guide required.");
    }

    const beginInstant = await readOutfloBeginInstant();

    if (beginInstant === null) {
        return null;
    }

    const { count, error } = await supabase
        .from("machine_time_verified_emissions_v1")
        .select("observation_id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("outflo_begin_instant", beginInstant)
        .eq("machine_proof_verdict", "verified")
        .eq("machine_proof_total_checks", 7)
        .not("since_outflo_begin_outfloseconds", "is", null)
        .not("since_outflo_begin_outfloseconds", "like", "-%");

    if (error) {
        throw new Error(`Begin Proof read failed: ${error.message}`);
    }

    return count ?? 0;
}
