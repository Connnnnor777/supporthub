import { NextResponse } from "next/server"

import { createVaultService } from "@/lib/vault/vault.service"

const service = createVaultService()

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const scope = searchParams.get("scope") ?? "documents"

    const result = await service.refresh()

    if (scope === "stats") {
      return NextResponse.json({
        status: "ok",
        stats: result.stats,
      })
    }

    if (scope === "health") {
      return NextResponse.json({
        status: "ok",
        health: {
          status: "ok",
          lastRefresh: result.stats.lastRefresh,
          documentsIndexed: result.documents.length,
          parsingErrors: result.parsingErrors.length,
        },
      })
    }

    return NextResponse.json({
      status: "ok",
      count: result.documents.length,
      documents: result.documents,
      events: result.events,
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