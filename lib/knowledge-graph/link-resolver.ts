import type { KnowledgeDocument } from "@/lib/vault/types";

function normalize(value: string) {
    return value
        .replace(/\\/g, "/")
        .replace(/\.md$/i, "")
        .trim()
        .toLowerCase();
}

export function getDocumentId(document: Pick<KnowledgeDocument, "path">) {
    return normalize(document.path);
}

export function resolveKnowledgeLink(
    target: string,
    source: KnowledgeDocument,
    documents: KnowledgeDocument[]
): KnowledgeDocument | undefined {
    const cleanTarget = target.split("#")[0].trim();

    if (!cleanTarget) {
        return undefined;
    }

    const normalizedTarget = normalize(cleanTarget);
    const sourceFolder = normalize(source.folder);
    const sameFolderPath = sourceFolder === "."
        ? normalizedTarget
        : `${sourceFolder}/${normalizedTarget}`;

    const exactPath = documents.find((document) =>
        normalize(document.path) === normalizedTarget ||
        getDocumentId(document) === normalizedTarget ||
        getDocumentId(document) === sameFolderPath
    );

    if (exactPath) {
        return exactPath;
    }

    const titleMatches = documents.filter(
        (document) => document.title.toLowerCase() === cleanTarget.toLowerCase()
    );

    if (titleMatches.length === 1) {
        return titleMatches[0];
    }

    if (titleMatches.length > 1) {
        return titleMatches.find(
            (document) => normalize(document.folder) === sourceFolder
        ) ?? titleMatches[0];
    }

    return documents.find((document) =>
        document.aliases.some((alias) => alias.toLowerCase() === cleanTarget.toLowerCase())
    );
}
