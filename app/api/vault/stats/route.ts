import { NextResponse } from "next/server"

import { createVaultService } from "@/lib/vault/vault.service"

const service = createVaultService()

export async function GET() {
    try {
        const result = await service.refresh()

        return NextResponse.json({
            status: "ok",
            stats: result.stats,
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
