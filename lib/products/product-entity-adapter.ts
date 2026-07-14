import type { Entity } from "@/lib/entities";
import type { ProductWorkspace } from "./product.types";

export function mapEntityToProductWorkspace(entity: Entity): ProductWorkspace {
    return {
        id: entity.id,
        name: entity.name,
        category: String(entity.metadata.category ?? ""),
        manufacturer: String(entity.metadata.manufacturer ?? ""),
        tags: entity.tags,
        aliases: entity.aliases,
        overview: String(entity.metadata.overview ?? entity.name),
        drivers: [],
        firmware: [],
        warranty: [],
        installGuides: [],
        troubleshooting: [],
        relatedProducts: [],
        relatedDevices: [],
        relatedCustomers: [],
        relatedRMAs: [],
        relatedDocuments: entity.documents,
        graphNeighbors: [],
        activity: entity.activity,
    };
}
