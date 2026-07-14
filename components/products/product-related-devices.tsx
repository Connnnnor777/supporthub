import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { EntityCard } from "@/components/workspace/entity-card";
import type { ProductWorkspace } from "@/lib/products";

export function ProductRelatedDevices({ product }: { product: ProductWorkspace }) {
    return (
        <WorkspaceSection title="Related Devices" description="Related device references for this product.">
            <div className="grid gap-3 md:grid-cols-2">
                {product.relatedDevices.length > 0 ? product.relatedDevices.map((document) => (
                    <EntityCard key={document.path} title={document.title} subtitle={document.folder} tags={document.tags.slice(0, 3)} relationships={1} />
                )) : <p className="text-sm text-muted-foreground">No related devices found.</p>}
            </div>
        </WorkspaceSection>
    );
}
