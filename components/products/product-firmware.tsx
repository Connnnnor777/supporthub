import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { KnowledgeCard } from "@/components/workspace/knowledge-card";
import type { ProductWorkspace } from "@/lib/products";

export function ProductFirmware({ product }: { product: ProductWorkspace }) {
    return (
        <WorkspaceSection title="Firmware" description="Firmware and release documentation.">
            <div className="grid gap-3 md:grid-cols-2">
                {product.firmware.length > 0 ? product.firmware.map((document) => (
                    <KnowledgeCard key={document.path} title={document.title} summary={document.content.slice(0, 120)} path={`/knowledge`} tags={document.tags.slice(0, 3)} />
                )) : <p className="text-sm text-muted-foreground">No firmware documents found.</p>}
            </div>
        </WorkspaceSection>
    );
}
