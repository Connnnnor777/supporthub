import { NextResponse } from "next/server"

import { createVaultService } from "@/lib/vault/vault.service"

const service = createVaultService()

export async function GET() {
    try {
        const result = await service.refresh()

        return NextResponse.json({
            status: "ok",
            health: {
                status: "ok",
                lastRefresh: result.stats.lastRefresh,
                documentsIndexed: result.documents.length,
                parsingErrors: result.parsingErrors.length,
            },
        })
    } catch (error) {
        return NextResponse.json(
            {
                status: "error",
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        )
    }
}
