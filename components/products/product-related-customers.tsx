import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { EntityCard } from "@/components/workspace/entity-card";
import type { ProductWorkspace } from "@/lib/products";

export function ProductRelatedCustomers({ product }: { product: ProductWorkspace }) {
    return (
        <WorkspaceSection title="Related Customers" description="Customers associated with this product.">
            <div className="grid gap-3 md:grid-cols-2">
                {product.relatedCustomers.length > 0 ? product.relatedCustomers.map((document) => (
                    <EntityCard key={document.path} title={document.title} subtitle={document.folder} tags={document.tags.slice(0, 3)} relationships={1} />
                )) : <p className="text-sm text-muted-foreground">No related customers found.</p>}
            </div>
        </WorkspaceSection>
    );
}
