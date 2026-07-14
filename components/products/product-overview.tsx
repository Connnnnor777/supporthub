import { WorkspaceSection } from "@/components/workspace/workspace-section";
import type { ProductWorkspace } from "@/lib/products";

export function ProductOverview({ product }: { product: ProductWorkspace }) {
    return (
        <WorkspaceSection title="Overview" description="Generated from the knowledge engine.">
            <p className="max-w-3xl text-sm leading-7 text-muted-foreground">{product.overview}</p>
        </WorkspaceSection>
    );
}
