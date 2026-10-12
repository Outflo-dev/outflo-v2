import BeginComposition from "@/compositions/begin/BeginComposition";
import { readOutfloBeginInstant } from "@/runtime/begin/read/readOutfloBeginInstant";
import { readBeginProofCount } from "@/runtime/begin/read/readBeginProofCount";

export default async function HomePage() {
    const beginInstant = await readOutfloBeginInstant();
    let proofCount: number | null = null;

    try {
        proofCount = await readBeginProofCount();
    } catch (error) {
        console.error("Begin Proof count read failed:", error);
    }

    return (
        <BeginComposition
            beginInstant={beginInstant}
            proofCount={proofCount}
        />
    );
}
