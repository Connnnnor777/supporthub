import { getVaultNotes } from "@/lib/services/vault-service";

import { buildKnowledgeGraph } from "./graph.service.ts";
import type { KnowledgeGraph } from "./types.ts";

let cachedGraph: KnowledgeGraph | null = null;

export async function getKnowledgeGraph() {
    if (!cachedGraph) {
        const notes = await getVaultNotes();
        cachedGraph = buildKnowledgeGraph(notes);
    }

    return cachedGraph;
}

export async function refreshGraph() {
    const notes = await getVaultNotes();
    cachedGraph = buildKnowledgeGraph(notes);

    return cachedGraph;
}
