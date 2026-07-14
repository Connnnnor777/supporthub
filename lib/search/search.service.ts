import { getVaultNotes } from "@/lib/services/vault-service";
import type { KnowledgeGraph } from "@/lib/knowledge-graph";

import { calculateScore } from "./filters";
import { rankResults } from "./ranking";
import {
    SearchOptions,
    SearchResult,
} from "./types";

export async function searchNotes(
    query: string,

    options: SearchOptions = {},

    graph?: KnowledgeGraph

): Promise<SearchResult[]> {

    if (!query.trim()) {

        return [];

    }

    const notes = await getVaultNotes();

    const results: SearchResult[] = [];

    for (const note of notes) {

        const score = calculateScore(note, query, graph);

        if (score <= 0)
            continue;

        results.push({

            title: note.title,

            path: note.path,

            folder: note.folder,

            modified: note.modified,

            tags: note.tags,

            score,

        });

    }

    const ranked = rankResults(results);

    return ranked.slice(
        0,
        options.limit ?? 100
    );

}
