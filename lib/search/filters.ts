import type { KnowledgeGraph } from "@/lib/knowledge-graph";
import { getDocumentId } from "@/lib/knowledge-graph";
import type { KnowledgeDocument } from "@/lib/vault/types";

export function calculateScore(
    note: KnowledgeDocument,
    query: string,
    graph?: KnowledgeGraph
): number {

    const q = query.toLowerCase();
    const content = note.content
        .split(/\r?\n/)
        .filter((line) => line.length < 1000 && !line.includes("data:image"))
        .join("\n")
        .toLowerCase();
    const frontmatter = Object.values(note.frontmatter)
        .flat()
        .filter((value): value is string => typeof value === "string")
        .join(" ")
        .toLowerCase();

    let score = 0;

    if (note.title.toLowerCase() === q)
        score += 100;

    if (note.title.toLowerCase().startsWith(q))
        score += 50;

    if (note.title.toLowerCase().includes(q))
        score += 25;

    if (note.folder.toLowerCase().includes(q))
        score += 10;

    if (note.path.toLowerCase().includes(q))
        score += 5;

    if (note.aliases.some((alias) => alias.toLowerCase() === q))
        score += 80;

    if (note.aliases.some((alias) => alias.toLowerCase().includes(q)))
        score += 35;

    if (note.tags.some((tag) => tag.toLowerCase() === q))
        score += 60;

    if (note.tags.some((tag) => tag.toLowerCase().includes(q)))
        score += 30;

    if (note.headings.some((heading) => heading.text.toLowerCase().includes(q)))
        score += 20;

    if (note.links.some((link) => link.target.toLowerCase().includes(q)))
        score += 12;

    if (frontmatter.includes(q))
        score += 15;

    if (content.includes(q))
        score += 3;

    if (graph) {
        const documentId = getDocumentId(note);
        const backlinks = graph.edges.filter((edge) => edge.target === documentId).length;
        const outgoingLinks = graph.edges.filter((edge) => edge.source === documentId).length;
        const queryMatchesTags = note.tags.some((tag) => tag.toLowerCase().includes(q));
        const queryMatchesAliases = note.aliases.some((alias) => alias.toLowerCase().includes(q));

        if (backlinks > 0)
            score += Math.min(backlinks * 2, 20);

        if (outgoingLinks > 0)
            score += Math.min(outgoingLinks, 10);

        if (queryMatchesTags && backlinks > 0)
            score += 5;

        if (queryMatchesAliases && outgoingLinks > 0)
            score += 5;
    }

    return score;

}
