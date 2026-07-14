import fs from "node:fs"
import path from "node:path"

import type { VaultChangeEvent } from "./vault.types.ts"

export class VaultWatcher {
    private readonly rootDir: string
    private readonly ignore: string[]

    constructor(rootDir: string, ignore: string[] = []) {
        this.rootDir = rootDir
        this.ignore = ignore
    }

    public watch(previousFiles: Map<string, string>, currentFiles: Map<string, string>): VaultChangeEvent[] {
        const events: VaultChangeEvent[] = []
        const seen = new Set<string>()

        for (const [relativePath, currentHash] of currentFiles.entries()) {
            seen.add(relativePath)
            const previousHash = previousFiles.get(relativePath)

            if (previousHash == null) {
                events.push({ type: "create", path: relativePath, document: undefined })
                continue
            }

            if (previousHash !== currentHash) {
                events.push({ type: "update", path: relativePath, document: undefined })
            }
        }

        for (const [relativePath] of previousFiles.entries()) {
            if (!seen.has(relativePath)) {
                events.push({ type: "delete", path: relativePath })
            }
        }

        this.detectRenamesAndMoves(previousFiles, currentFiles, events)
        return events
    }

    private detectRenamesAndMoves(previousFiles: Map<string, string>, currentFiles: Map<string, string>, events: VaultChangeEvent[]) {
        const added = new Set<string>()
        const removed = new Set<string>()

        events.forEach((event) => {
            if (event.type === "create") {
                added.add(event.path)
            }
            if (event.type === "delete") {
                removed.add(event.path)
            }
        })

        if (added.size === 0 || removed.size === 0) {
            return
        }

        const removedPaths = Array.from(removed)
        const addedPaths = Array.from(added)

        for (const removedPath of removedPaths) {
            for (const addedPath of addedPaths) {
                if (removedPath === addedPath) {
                    continue
                }

                const removedDir = path.dirname(removedPath)
                const addedDir = path.dirname(addedPath)
                const sameDir = removedDir === addedDir
                const sameBasename = path.basename(removedPath) === path.basename(addedPath)
                const sameExtension = path.extname(removedPath) === path.extname(addedPath)

                if ((sameDir && sameBasename && sameExtension) || (!sameDir && sameBasename && sameExtension)) {
                    const existing = events.find((event) => event.type === "delete" && event.path === removedPath)
                    if (existing) {
                        existing.type = "rename"
                        existing.previousPath = removedPath
                        existing.path = addedPath
                    }
                    break
                }

                if (sameBasename && sameExtension) {
                    const existing = events.find((event) => event.type === "delete" && event.path === removedPath)
                    if (existing) {
                        existing.type = "move"
                        existing.previousPath = removedPath
                        existing.path = addedPath
                    }
                    break
                }
            }
        }
    }
}
