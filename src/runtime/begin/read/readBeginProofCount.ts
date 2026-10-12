import "server-only";
import { createClient } from "@/lib/supabase/server";

export async function readBeginProofCount(): Promise<number> {
    const supabase = await createClient();
    const { data: { user }, error: authError } =
        await supabase.auth.getUser();

    if (authError || !user) {
        throw new Error("Authenticated Guide required.");
    }

    const { count, error } = await supabase
        .from("machine_time_verified_emissions_v1")
        .select("observation_id", { count: "exact", head: true })
        .eq("user_id", user.id)
        .eq("machine_proof_verdict", "verified")
        .eq("machine_proof_total_checks", 7);

    if (error) {
        throw new Error(`Proof count failed: ${error.message}`);
    }

    return count ?? 0;
}
