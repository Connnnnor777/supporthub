import { buildKnowledgeGraph } from "../knowledge-graph/graph.service.ts";
import { getVaultNotes } from "../services/vault-service.ts";
import type { KnowledgeDocument } from "../vault/types.ts";

import { getEntityType } from "./entity-registry.ts";
import type { Entity, EntityTypeDefinition } from "./entity.types.ts";

const PRODUCT_ENTITY_TYPE = "product";

function normalizeValue(value?: string | string[] | number | boolean | null): string {
    if (typeof value === "string") return value.trim();
    if (Array.isArray(value)) return value.join(", ");
    if (typeof value === "number" || typeof value === "boolean") return String(value);
    return "";
}

function collectTags(document: KnowledgeDocument) {
    const tags = new Set<string>();

    document.tags?.forEach((tag) => tags.add(String(tag)));

    const fmTags = document.frontmatter?.tags;
    if (Array.isArray(fmTags)) {
        fmTags.forEach((tag) => tags.add(String(tag)));
    } else if (typeof fmTags === "string") {
        tags.add(fmTags);
    }

    return [...tags];
}

function collectAliases(document: KnowledgeDocument) {
    const frontmatter = document.frontmatter ?? {};
    const productValue = normalizeValue(frontmatter.product);
    const aliases = [productValue, ...(Array.isArray(frontmatter.aliases) ? frontmatter.aliases : [])].filter(Boolean);
    return aliases.map((alias) => String(alias).trim()).filter(Boolean);
}

function collectOverview(document: KnowledgeDocument) {
    const heading = document.headings.find((item) => item.level === 1) ?? document.headings[0];
    return heading?.text ?? document.content.slice(0, 180).replace(/\s+/g, " ").trim();
}

function buildEntityFromDefinition(definition: EntityTypeDefinition, document: KnowledgeDocument, documents: KnowledgeDocument[], graph: ReturnType<typeof buildKnowledgeGraph>): Entity {
    return definition.build(document, documents, { graph });
}

export async function buildEntity(type: string, id?: string): Promise<Entity | null> {
    const definition = getEntityType(type);
    if (!definition) {
        return null;
    }

    const documents = await getVaultNotes();
    const graph = buildKnowledgeGraph(documents);
    const candidateDocuments = definition.discover(documents);
    const document = id
        ? candidateDocuments.find((item) => item.path.toLowerCase().includes(id.toLowerCase()) || item.title.toLowerCase().includes(id.toLowerCase())) ?? candidateDocuments[0]
        : candidateDocuments[0];

    if (!document) {
        return null;
    }

    return buildEntityFromDefinition(definition, document, documents, graph);
}

export async function buildEntities(type: string): Promise<Entity[]> {
    const definition = getEntityType(type);
    if (!definition) {
        return [];
    }

    const documents = await getVaultNotes();
    const graph = buildKnowledgeGraph(documents);
    const candidateDocuments = definition.discover(documents);

    return candidateDocuments.map((document) => buildEntityFromDefinition(definition, document, documents, graph));
}

export function createDefaultEntityDefinitions() {
    return [
        {
            type: PRODUCT_ENTITY_TYPE,
            name: "Product",
            discover(documents: KnowledgeDocument[]) {
                return documents.filter((document) => {
                    const productValue = normalizeValue(document.frontmatter?.product);
                    return Boolean(productValue || document.tags.includes("product"));
                });
            },
            build(document: KnowledgeDocument): Entity {
                return {
                    id: document.path.replace(/\\/g, "-").toLowerCase(),
                    type: PRODUCT_ENTITY_TYPE,
                    name: document.title,
                    title: document.title,
                    aliases: collectAliases(document),
                    tags: collectTags(document),
                    metadata: {
                        category: normalizeValue(document.frontmatter?.category) || "General",
                        manufacturer: normalizeValue(document.frontmatter?.manufacturer) || normalizeValue(document.frontmatter?.vendor),
                        overview: collectOverview(document),
                    },
                    relationships: [],
                    documents: [document],
                    activity: [],
                };
            },
        },
    ];
}
