import Link from "next/link";
import { notFound } from "next/navigation";

import { WorkspaceLayout } from "@/components/workspace/workspace-layout";
import { ProductHeader } from "@/components/products/product-header";
import { ProductOverview } from "@/components/products/product-overview";
import { ProductKnowledge } from "@/components/products/product-knowledge";
import { ProductDrivers } from "@/components/products/product-drivers";
import { ProductFirmware } from "@/components/products/product-firmware";
import { ProductWarranty } from "@/components/products/product-warranty";
import { ProductRelatedDocuments } from "@/components/products/product-related-documents";
import { ProductRelatedDevices } from "@/components/products/product-related-devices";
import { ProductRelatedRmas } from "@/components/products/product-related-rmas";
import { ProductRelatedCustomers } from "@/components/products/product-related-customers";
import { ProductActivity } from "@/components/products/product-activity";
import { ProductSidebar } from "@/components/products/product-sidebar";
import { ProductHealth } from "@/components/products/product-health";
import { ProductTimeline } from "@/components/products/product-timeline";
import { ProductMetadata } from "@/components/products/product-metadata";
import { getProductById } from "@/lib/products";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const product = await getProductById(id);

    if (!product) {
        notFound();
    }

    return (
        <WorkspaceLayout title={product.name} description="Dynamic product workspace" compact={false}>
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/products" className="hover:text-primary">Products</Link>
                    <span>/</span>
                    <span className="font-medium text-foreground">{product.name}</span>
                </div>
                <ProductHeader product={product} />
                <div className="grid gap-6 xl:grid-cols-[260px_1fr]">
                    <ProductSidebar productId={product.id} />
                    <div className="space-y-6">
                        <ProductOverview product={product} />
                        <ProductHealth product={product} />
                        <ProductKnowledge product={product} />
                        <ProductDrivers product={product} />
                        <ProductFirmware product={product} />
                        <ProductWarranty product={product} />
                        <ProductRelatedDocuments product={product} />
                        <ProductRelatedDevices product={product} />
                        <ProductRelatedCustomers product={product} />
                        <ProductRelatedRmas product={product} />
                        <ProductActivity product={product} />
                        <ProductTimeline product={product} />
                        <ProductMetadata product={product} />
                    </div>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
