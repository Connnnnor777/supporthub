import Link from "next/link";

import { WorkspaceLayout } from "@/components/workspace/workspace-layout";
import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { EntityCard } from "@/components/workspace/entity-card";
import { getProductSummaries } from "@/lib/products";

export default async function Page() {
    const products = await getProductSummaries();

    return (
        <WorkspaceLayout title="Products" description="Products discovered from the knowledge engine" compact={false}>
            <div className="space-y-6">
                <WorkspaceSection title="Products" description="Products are dynamically assembled from the knowledge engine.">
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {products.map((product) => (
                            <Link key={product.id} href={`/products/${product.id}`} className="block">
                                <EntityCard title={product.name} subtitle={product.manufacturer ?? product.category ?? "Generated product"} tags={product.tags.slice(0, 4)} relationships={product.relationshipCount} />
                            </Link>
                        ))}
                    </div>
                </WorkspaceSection>
            </div>
        </WorkspaceLayout>
    );
}
