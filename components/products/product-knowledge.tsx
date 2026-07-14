import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { KnowledgeCard } from "@/components/workspace/knowledge-card";
import type { ProductWorkspace } from "@/lib/products";

export function ProductKnowledge({ product }: { product: ProductWorkspace }) {
    return (
        <WorkspaceSection title="Knowledge" description="Knowledge documents related to this product.">
            <div className="grid gap-3 md:grid-cols-2">
                {product.relatedDocuments.slice(0, 4).map((document) => (
                    <KnowledgeCard key={document.path} title={document.title} summary={document.content.slice(0, 120)} path={`/knowledge`} tags={document.tags.slice(0, 3)} />
                ))}
            </div>
        </WorkspaceSection>
    );
}
