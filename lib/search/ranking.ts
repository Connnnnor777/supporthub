import { SearchResult } from "./types";

export function rankResults(
    results: SearchResult[]
): SearchResult[] {

    return results.sort((a, b) => {

        if (b.score !== a.score) {
            return b.score - a.score;
        }

        return b.modified.localeCompare(a.modified);

    });

}
