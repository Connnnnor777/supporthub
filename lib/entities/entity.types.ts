import type { ActivityItem } from "../../components/workspace/activity-feed.tsx";
import type { KnowledgeDocument } from "../vault/types.ts";

export interface Relationship {
    type: string;
    targetId: string;
    targetType: string;
    label?: string;
}

export interface Entity {
    id: string;
    type: string;
    name: string;
    title: string;
    aliases: string[];
    tags: string[];
    metadata: Record<string, unknown>;
    relationships: Relationship[];
    documents: KnowledgeDocument[];
    activity: ActivityItem[];
}

export interface EntityTypeDefinition {
    type: string;
    name: string;
    icon?: string;
    discover(documents: KnowledgeDocument[]): KnowledgeDocument[];
    build(document: KnowledgeDocument, documents: KnowledgeDocument[], context?: Record<string, unknown>): Entity;
}
