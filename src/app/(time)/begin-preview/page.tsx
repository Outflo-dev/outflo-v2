import BeginComposition from "@/compositions/begin/BeginComposition";
import { readOutfloBeginInstant } from "@/runtime/begin/read/readOutfloBeginInstant";

export default async function BeginPreviewPage() {
    const beginInstant = await readOutfloBeginInstant();
    return <BeginComposition beginInstant={beginInstant} proofCount={null} />;
}
