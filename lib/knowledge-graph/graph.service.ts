import type { KnowledgeDocument } from "@/lib/vault/types";

import { getDocumentId, resolveKnowledgeLink } from "./link-resolver.ts";
import type {
    KnowledgeGraph,
    KnowledgeGraphNode,
    RelatedKnowledgeNode,
} from "./types.ts";

function toNode(document: KnowledgeDocument): KnowledgeGraphNode {
    return {
        id: getDocumentId(document),
        title: document.title,
        path: document.path,
        folder: document.folder,
        tags: document.tags,
    };
}

function intersectionSize(left: string[], right: string[]) {
    const rightSet = new Set(right.map((value) => value.toLowerCase()));

    return left.filter((value) => rightSet.has(value.toLowerCase())).length;
}

function headingTexts(document: KnowledgeDocument) {
    return document.headings.map((heading) => heading.text);
}

function outgoingTargets(document: KnowledgeDocument, graph: KnowledgeGraph) {
    return graph.edges
        .filter((edge) => edge.source === getDocumentId(document))
        .map((edge) => edge.target);
}

function backlinkSources(document: KnowledgeDocument, graph: KnowledgeGraph) {
    return graph.edges
        .filter((edge) => edge.target === getDocumentId(document))
        .map((edge) => edge.source);
}

export function buildKnowledgeGraph(notes: KnowledgeDocument[]): KnowledgeGraph {
    const nodes = notes.map(toNode);
    const edges = notes.flatMap((note) =>
        note.links.flatMap((link) => {
            const target = resolveKnowledgeLink(link.target, note, notes);

            if (!target) {
                return [];
            }

            return [{
                source: getDocumentId(note),
                target: getDocumentId(target),
                type: link.embed ? "embed" as const : "wiki-link" as const,
                alias: link.alias,
            }];
        })
    );

    return {
        nodes,
        edges,
    };
}

export function getOutgoingLinks(
    path: string,
    graph: KnowledgeGraph
): KnowledgeGraphNode[] {
    const source = path.toLowerCase().replace(/\\/g, "/").replace(/\.md$/i, "");
    const targets = new Set(
        graph.edges
            .filter((edge) => edge.source === source)
            .map((edge) => edge.target)
    );

    return graph.nodes.filter((node) => targets.has(node.id));
}

export function getBacklinks(
    path: string,
    graph: KnowledgeGraph
): KnowledgeGraphNode[] {
    const target = path.toLowerCase().replace(/\\/g, "/").replace(/\.md$/i, "");
    const sources = new Set(
        graph.edges
            .filter((edge) => edge.target === target)
            .map((edge) => edge.source)
    );

    return graph.nodes.filter((node) => sources.has(node.id));
}

export function getRelatedNotes(
    path: string,
    notes: KnowledgeDocument[],
    graph: KnowledgeGraph
): RelatedKnowledgeNode[] {
    const document = notes.find((note) => getDocumentId(note) === path.toLowerCase().replace(/\\/g, "/").replace(/\.md$/i, ""));

    if (!document) {
        return [];
    }

    const documentId = getDocumentId(document);
    const documentOutgoing = outgoingTargets(document, graph);
    const documentBacklinks = backlinkSources(document, graph);

    return notes
        .filter((candidate) => getDocumentId(candidate) !== documentId)
        .map((candidate) => {
            const reasons: string[] = [];
            let score = 0;

            const sharedLinks = intersectionSize(
                documentOutgoing,
                outgoingTargets(candidate, graph)
            );
            if (sharedLinks > 0) {
                score += sharedLinks * 25;
                reasons.push("shared wiki links");
            }

            const sharedTags = intersectionSize(document.tags, candidate.tags);
            if (sharedTags > 0) {
                score += sharedTags * 20;
                reasons.push("shared tags");
            }

            const sharedAliases = intersectionSize(document.aliases, candidate.aliases);
            if (sharedAliases > 0) {
                score += sharedAliases * 15;
                reasons.push("shared aliases");
            }

            const sharedHeadings = intersectionSize(headingTexts(document), headingTexts(candidate));
            if (sharedHeadings > 0) {
                score += sharedHeadings * 10;
                reasons.push("shared headings");
            }

            const candidateId = getDocumentId(candidate);
            if (documentBacklinks.includes(candidateId)) {
                score += 40;
                reasons.push("direct backlink");
            }

            if (documentOutgoing.includes(candidateId)) {
                score += 35;
                reasons.push("direct outgoing link");
            }

            return {
                ...toNode(candidate),
                score,
                reasons,
            };
        })
        .filter((candidate) => candidate.score > 0)
        .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title));
}
