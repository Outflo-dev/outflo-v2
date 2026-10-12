import BeginSurfaceLive from "./BeginSurfaceLive";

type Props = {
    beginInstant: string | null;
    proofCount: number | null;
};

export default function BeginComposition(props: Props) {
    return <BeginSurfaceLive {...props} />;
}
