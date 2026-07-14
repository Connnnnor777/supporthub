import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { ActivityFeed } from "@/components/workspace/activity-feed";
import type { ProductWorkspace } from "@/lib/products";

export function ProductTimeline({ product }: { product: ProductWorkspace }) {
    return (
        <WorkspaceSection title="Timeline" description="Chronological view of the product workspace.">
            <ActivityFeed items={product.activity.length > 0 ? product.activity : [{ title: "Workspace created", description: "The product workspace was assembled from the knowledge engine.", timestamp: "Now", status: "neutral" }]} />
        </WorkspaceSection>
    );
}
