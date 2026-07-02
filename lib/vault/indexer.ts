import fs from "node:fs"
import path from "node:path"

import { vaultConfig } from "./config"
import { VaultNote } from "./types"

function scanDirectory(
    directory: string,
    results: VaultNote[]
) {

    const entries = fs.readdirSync(directory, {
        withFileTypes: true,
    })

    for (const entry of entries) {

        if (vaultConfig.ignore.includes(entry.name)) {
            continue
        }

        const fullPath = path.join(directory, entry.name)

        if (entry.isDirectory()) {

            scanDirectory(fullPath, results)

            continue

        }

        if (!entry.name.endsWith(".md")) {
            continue
        }

        const stats = fs.statSync(fullPath)

        results.push({

            title: path.basename(entry.name, ".md"),

            path: path.relative(vaultConfig.path, fullPath),

            folder: path.dirname(
                path.relative(vaultConfig.path, fullPath)
            ),

            modified: stats.mtime.toISOString(),

        })

    }

}

export function indexVault(): VaultNote[] {

    const notes: VaultNote[] = []

    scanDirectory(vaultConfig.path, notes)

    notes.sort((a, b) =>
        b.modified.localeCompare(a.modified)
    )

    return notes

}
