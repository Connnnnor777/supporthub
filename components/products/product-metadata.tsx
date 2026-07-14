import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { MetricCard } from "@/components/workspace/metric-card";
import type { ProductWorkspace } from "@/lib/products";
import { Boxes, Tags, User2 } from "lucide-react";

export function ProductMetadata({ product }: { product: ProductWorkspace }) {
    return (
        <WorkspaceSection title="Metadata" description="Descriptive metadata generated from the knowledge signal.">
            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard title="Manufacturer" value={product.manufacturer ?? "Unknown"} description="Derived from frontmatter" icon={User2} color="default" />
                <MetricCard title="Category" value={product.category ?? "General"} description="Derived from frontmatter" icon={Boxes} color="default" />
                <MetricCard title="Aliases" value={String(product.aliases.length)} description="Detected aliases" icon={Tags} color="default" />
            </div>
        </WorkspaceSection>
    );
}
