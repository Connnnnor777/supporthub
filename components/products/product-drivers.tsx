import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { KnowledgeCard } from "@/components/workspace/knowledge-card";
import type { ProductWorkspace } from "@/lib/products";

export function ProductDrivers({ product }: { product: ProductWorkspace }) {
    return (
        <WorkspaceSection title="Drivers" description="Driver-focused documentation for the product.">
            <div className="grid gap-3 md:grid-cols-2">
                {product.drivers.length > 0 ? product.drivers.map((document) => (
                    <KnowledgeCard key={document.path} title={document.title} summary={document.content.slice(0, 120)} path={`/knowledge`} tags={document.tags.slice(0, 3)} />
                )) : <p className="text-sm text-muted-foreground">No driver documents found.</p>}
            </div>
        </WorkspaceSection>
    );
}
