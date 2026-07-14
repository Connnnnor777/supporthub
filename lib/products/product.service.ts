import { getEntities } from "@/lib/entities";

import { buildProductWorkspace } from "./product-builder";
import { mapEntityToProductWorkspace } from "./product-entity-adapter";
import type { ProductSummary, ProductWorkspace } from "./product.types";

let cachedProducts: ProductWorkspace[] | null = null;
let cacheVersion = 0;

export async function getProducts(): Promise<ProductWorkspace[]> {
    if (cachedProducts) {
        return cachedProducts;
    }

    const entities = await getEntities("product");
    const fallbackProducts = await buildProductWorkspace();
    const products = entities.length > 0 ? entities.map(mapEntityToProductWorkspace) : fallbackProducts;
    cachedProducts = products;
    return products;
}

export async function getProductById(id: string): Promise<ProductWorkspace | null> {
    const products = await getProducts();
    return products.find((product) => product.id === id) ?? null;
}

export async function getProductSummaries(): Promise<ProductSummary[]> {
    const products = await getProducts();

    return products.map((product) => ({
        id: product.id,
        name: product.name,
        manufacturer: product.manufacturer,
        category: product.category,
        tags: product.tags,
        aliases: product.aliases,
        documentCount: product.relatedDocuments.length + 1,
        relationshipCount: product.relatedProducts.length + product.relatedDevices.length + product.relatedCustomers.length + product.relatedRMAs.length + product.graphNeighbors.length,
        lastUpdated: product.relatedDocuments[0]?.modified ?? new Date().toISOString(),
        overview: product.overview,
    }));
}

export function invalidateProductCache() {
    cachedProducts = null;
    cacheVersion += 1;
    return cacheVersion;
}
