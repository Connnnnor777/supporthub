import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { KnowledgeCard } from "@/components/workspace/knowledge-card";
import type { ProductWorkspace } from "@/lib/products";

export function ProductRelatedDocuments({ product }: { product: ProductWorkspace }) {
    return (
        <WorkspaceSection title="Related Documents" description="Supplementary documents connected to the product.">
            <div className="grid gap-3 md:grid-cols-2">
                {product.relatedDocuments.length > 0 ? product.relatedDocuments.map((document) => (
                    <KnowledgeCard key={document.path} title={document.title} summary={document.content.slice(0, 120)} path={`/knowledge`} tags={document.tags.slice(0, 3)} />
                )) : <p className="text-sm text-muted-foreground">No related documents found.</p>}
            </div>
        </WorkspaceSection>
    );
}
