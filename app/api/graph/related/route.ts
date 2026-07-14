import { NextRequest, NextResponse } from "next/server";

import { getKnowledgeGraph, getRelatedNotes } from "@/lib/knowledge-graph";
import { getVaultNotes } from "@/lib/services/vault-service";

export async function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get("q") ?? "";
    const notes = await getVaultNotes();
    const graph = await getKnowledgeGraph();

    return NextResponse.json({
        related: getRelatedNotes(path, notes, graph),
    });
}
