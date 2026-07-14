import type { KnowledgeDocument } from "@/lib/vault/types";

export interface KnowledgeGraphNode {
    id: string;
    title: string;
    path: string;
    folder: string;
    tags: string[];
}

export interface KnowledgeGraphEdge {
    source: string;
    target: string;
    type: "wiki-link" | "embed";
    alias?: string;
}

export interface KnowledgeGraph {
    nodes: KnowledgeGraphNode[];
    edges: KnowledgeGraphEdge[];
}

export interface RelatedKnowledgeNode extends KnowledgeGraphNode {
    score: number;
    reasons: string[];
}

export type KnowledgeGraphDocument = KnowledgeDocument;
