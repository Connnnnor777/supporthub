import path from "node:path"

import type { KnowledgeDocument } from "./types.ts"
import type { VaultStats } from "./vault.types.ts"

export function buildVaultStats(documents: KnowledgeDocument[]): VaultStats {
    const folderSet = new Set<string>()
    const tagSet = new Set<string>()
    let wikiLinkCount = 0
    let brokenLinks = 0

    documents.forEach((document) => {
        if (document.folder) {
            folderSet.add(document.folder)
        }

        document.tags.forEach((tag) => tagSet.add(tag))
        wikiLinkCount += document.links.length

        document.links.forEach((link) => {
            const target = link.target.trim()
            if (!target || target.startsWith("http://") || target.startsWith("https://") || target.startsWith("mailto:")) {
                return
            }

            const resolvedPath = target.replace(/\//g, path.sep)
            const exists = documents.some((candidate) => candidate.path.replace(/\\/g, "/") === resolvedPath.replace(/\\/g, "/"))
            if (!exists) {
                brokenLinks += 1
            }
        })
    })

    const largestFiles = documents
        .map((document) => ({
            path: document.path,
            size: document.content.length,
        }))
        .sort((a, b) => b.size - a.size)
        .slice(0, 5)

    return {
        documentCount: documents.length,
        folderCount: folderSet.size,
        tagCount: tagSet.size,
        wikiLinkCount,
        brokenLinks,
        largestFiles,
        lastRefresh: new Date().toISOString(),
    }
}
