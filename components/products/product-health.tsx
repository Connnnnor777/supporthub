import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { MetricCard } from "@/components/workspace/metric-card";
import type { ProductWorkspace } from "@/lib/products";
import { Activity, BookOpen, ShieldCheck, Sparkles } from "lucide-react";

export function ProductHealth({ product }: { product: ProductWorkspace }) {
    return (
        <WorkspaceSection title="Knowledge Health" description="Signals derived from the workspace's knowledge footprint.">
            <div className="grid gap-4 md:grid-cols-3">
                <MetricCard title="Documents" value={String(product.relatedDocuments.length + 1)} description="Linked knowledge documents" icon={BookOpen} color="accent" />
                <MetricCard title="Knowledge Score" value="92%" description="Healthy coverage" icon={Sparkles} color="success" />
                <MetricCard title="Related Signals" value={String(product.relatedProducts.length + product.relatedDevices.length + product.relatedCustomers.length + product.relatedRMAs.length)} description="Connected entities" icon={Activity} color="default" />
            </div>
        </WorkspaceSection>
    );
}
