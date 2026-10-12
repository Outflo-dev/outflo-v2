import { readBeginProofRecords } from "@/runtime/begin/read/readBeginProofRecords";
import ProofsComposition from "@/compositions/begin/proofs/ProofsComposition";

export default async function ProofsPage() {
    const records = await readBeginProofRecords();

    return <ProofsComposition records={records} />;
}
