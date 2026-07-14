import type { ActivityItem } from "@/components/workspace/activity-feed";
import type { KnowledgeDocument } from "@/lib/vault/types";

export interface ProductWorkspace {
    id: string;
    name: string;
    manufacturer?: string;
    category?: string;
    tags: string[];
    aliases: string[];
    overview: string;
    drivers: KnowledgeDocument[];
    firmware: KnowledgeDocument[];
    warranty: KnowledgeDocument[];
    installGuides: KnowledgeDocument[];
    troubleshooting: KnowledgeDocument[];
    relatedProducts: KnowledgeDocument[];
    relatedDevices: KnowledgeDocument[];
    relatedCustomers: KnowledgeDocument[];
    relatedRMAs: KnowledgeDocument[];
    relatedDocuments: KnowledgeDocument[];
    graphNeighbors: KnowledgeDocument[];
    activity: ActivityItem[];
}

export interface ProductSummary {
    id: string;
    name: string;
    manufacturer?: string;
    category?: string;
    tags: string[];
    aliases: string[];
    documentCount: number;
    relationshipCount: number;
    lastUpdated: string;
    overview: string;
}

export interface ProductSearchResult extends ProductSummary {
    score: number;
}
