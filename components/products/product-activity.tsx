import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { ActivityFeed } from "@/components/workspace/activity-feed";
import type { ProductWorkspace } from "@/lib/products";

export function ProductActivity({ product }: { product: ProductWorkspace }) {
    return (
        <WorkspaceSection title="Activity" description="Recent activity for this product workspace.">
            <ActivityFeed items={product.activity.length > 0 ? product.activity : [{ title: "Workspace generated", description: "This product workspace was assembled from the knowledge engine.", timestamp: "Just now", status: "neutral" }]} />
        </WorkspaceSection>
    );
}
