import assert from "node:assert/strict"
import fs from "node:fs"
import os from "node:os"
import path from "node:path"
import test from "node:test"

import { createVaultService } from "../../lib/vault/vault.service.ts"

function createTempVault() {
    const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), "supporthub-vault-"))

    return {
        rootDir,
        cleanup() {
            fs.rmSync(rootDir, { recursive: true, force: true })
        },
    }
}

function writeMarkdown(rootDir: string, relativePath: string, content = "# Example\n") {
    const absolutePath = path.join(rootDir, relativePath)
    fs.mkdirSync(path.dirname(absolutePath), { recursive: true })
    fs.writeFileSync(absolutePath, content, "utf8")
}

test("vault service handles large vaults", async () => {
    const vault = createTempVault()

    try {
        const service = createVaultService({ rootDir: vault.rootDir })

        for (let index = 0; index < 5005; index += 1) {
            writeMarkdown(vault.rootDir, `docs/doc-${index}.md`, `# Doc ${index}\n\nTags: #alpha\n`)
        }

        const result = await service.refresh()

        assert.equal(result.documents.length, 5005)
        assert.equal(result.stats.documentCount, 5005)
        assert.equal(result.stats.tagCount, 1)
        assert.ok(result.stats.lastRefresh)
    } finally {
        vault.cleanup()
    }
})

test("vault service detects file renames", async () => {
    const vault = createTempVault()

    try {
        const service = createVaultService({ rootDir: vault.rootDir })
        writeMarkdown(vault.rootDir, "alpha.md", "# Alpha\n")

        await service.refresh()
        fs.renameSync(path.join(vault.rootDir, "alpha.md"), path.join(vault.rootDir, "beta.md"))

        const result = await service.refresh()
        const renameEvent = result.events.find((event) => event.type === "rename")

        assert.ok(renameEvent)
        assert.equal(renameEvent?.previousPath, "alpha.md")
        assert.equal(renameEvent?.path, "beta.md")
        assert.ok(result.documents.some((document) => document.path === "beta.md"))
    } finally {
        vault.cleanup()
    }
})

test("vault service detects deleted files", async () => {
    const vault = createTempVault()

    try {
        const service = createVaultService({ rootDir: vault.rootDir })
        writeMarkdown(vault.rootDir, "delete-me.md", "# Delete me\n")

        await service.refresh()
        fs.unlinkSync(path.join(vault.rootDir, "delete-me.md"))

        const result = await service.refresh()
        const deleteEvent = result.events.find((event) => event.type === "delete")

        assert.ok(deleteEvent)
        assert.equal(deleteEvent?.path, "delete-me.md")
        assert.equal(result.documents.length, 0)
    } finally {
        vault.cleanup()
    }
})

test("vault service detects moved files", async () => {
    const vault = createTempVault()

    try {
        const service = createVaultService({ rootDir: vault.rootDir })
        writeMarkdown(vault.rootDir, "notes/one.md", "# One\n")

        await service.refresh()
        fs.mkdirSync(path.join(vault.rootDir, "archive"), { recursive: true })
        fs.renameSync(path.join(vault.rootDir, "notes/one.md"), path.join(vault.rootDir, "archive/one.md"))

        const result = await service.refresh()
        const moveEvent = result.events.find((event) => event.type === "move")

        assert.ok(moveEvent)
        assert.equal(moveEvent?.previousPath, "notes/one.md")
        assert.equal(moveEvent?.path, "archive/one.md")
    } finally {
        vault.cleanup()
    }
})

test("vault service skips unchanged files on refresh", async () => {
    const vault = createTempVault()

    try {
        const service = createVaultService({ rootDir: vault.rootDir })
        writeMarkdown(vault.rootDir, "fresh.md", "# Fresh\n")

        const first = await service.refresh()
        const second = await service.refresh()

        assert.equal(first.events.length, 1)
        assert.equal(second.events.length, 0)
        assert.equal(second.stats.documentCount, 1)
    } finally {
        vault.cleanup()
    }
})
