import fs from "node:fs"
import path from "node:path"

import { parseKnowledgeMarkdown } from "./parser.ts"
import type { KnowledgeDocument } from "./types.ts"
import { vaultConfig } from "./config.ts"
import { buildVaultStats } from "./vault.stats.ts"
import { VaultWatcher } from "./vault.watcher.ts"
import type { VaultRefreshResult, VaultServiceOptions } from "./vault.types.ts"

interface FileIndexEntry {
    hash: string
    size: number
}

export function createVaultService(options: VaultServiceOptions = {}) {
    const rootDir = options.rootDir ?? vaultConfig.path
    const ignore = options.ignore ?? vaultConfig.ignore
    const watcher = new VaultWatcher(rootDir, ignore)
    let previousFiles = new Map<string, string>()
    let previousDocuments: KnowledgeDocument[] = []
    let previousDocumentsByPath = new Map<string, KnowledgeDocument>()

    function collectMarkdownFiles(directory: string, files: Map<string, string>) {
        const entries = fs.readdirSync(directory, { withFileTypes: true })

        entries.forEach((entry) => {
            if (ignore.includes(entry.name)) {
                return
            }

            const fullPath = path.join(directory, entry.name)
            if (entry.isDirectory()) {
                collectMarkdownFiles(fullPath, files)
                return
            }

            if (!entry.name.endsWith(".md")) {
                return
            }

            const stats = fs.statSync(fullPath)
            const relativePath = path.relative(rootDir, fullPath).split(path.sep).join("/")
            const hash = `${stats.size}:${stats.mtimeMs}`
            files.set(relativePath, hash)
        })
    }

    async function refresh(): Promise<VaultRefreshResult> {
        const currentFiles = new Map<string, string>()
        collectMarkdownFiles(rootDir, currentFiles)

        const events = watcher.watch(previousFiles, currentFiles)
        const documents: KnowledgeDocument[] = []
        const parsingErrors: Array<{ path: string; message: string }> = []

        const sortedPaths = Array.from(currentFiles.keys()).sort()
        for (const relativePath of sortedPaths) {
            const absolutePath = path.join(rootDir, relativePath)
            if (!fs.existsSync(absolutePath)) {
                continue
            }

            const previousHash = previousFiles.get(relativePath)
            const currentHash = currentFiles.get(relativePath)
            const cachedDocument = previousDocumentsByPath.get(relativePath)

            if (previousHash && currentHash && previousHash === currentHash && cachedDocument) {
                documents.push(cachedDocument)
                continue
            }

            try {
                const content = fs.readFileSync(absolutePath, "utf8")
                const parsed = parseKnowledgeMarkdown(content)
                const stats = fs.statSync(absolutePath)
                const document: KnowledgeDocument = {
                    title: path.basename(relativePath, ".md"),
                    path: relativePath,
                    folder: path.dirname(relativePath),
                    modified: stats.mtime.toISOString(),
                    ...parsed,
                }
                documents.push(document)
                previousDocumentsByPath.set(relativePath, document)
            } catch (error) {
                parsingErrors.push({
                    path: relativePath,
                    message: error instanceof Error ? error.message : "Unknown parsing error",
                })
            }
        }

        documents.sort((a, b) => b.modified.localeCompare(a.modified))

        const stats = buildVaultStats(documents)
        stats.lastRefresh = new Date().toISOString()

        previousFiles = currentFiles
        previousDocuments = documents

        return {
            documents,
            stats,
            events,
            parsingErrors,
        }
    }

    return {
        refresh,
        getPreviousDocuments: () => previousDocuments,
    }
}
