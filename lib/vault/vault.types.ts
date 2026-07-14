import type { KnowledgeDocument } from "./types"

export type VaultChangeType = "create" | "update" | "delete" | "rename" | "move"

export interface VaultChangeEvent {
    type: VaultChangeType
    path: string
    previousPath?: string
    document?: KnowledgeDocument
}

export interface VaultStats {
    documentCount: number
    folderCount: number
    tagCount: number
    wikiLinkCount: number
    brokenLinks: number
    largestFiles: Array<{
        path: string
        size: number
    }>
    lastRefresh: string | null
}

export interface VaultHealth {
    status: "ok" | "error"
    message?: string
    lastRefresh: string | null
    documentsIndexed: number
    parsingErrors: number
}

export interface VaultRefreshResult {
    documents: KnowledgeDocument[]
    stats: VaultStats
    events: VaultChangeEvent[]
    parsingErrors: Array<{
        path: string
        message: string
    }>
}

export interface VaultServiceOptions {
    rootDir?: string
    ignore?: string[]
}
