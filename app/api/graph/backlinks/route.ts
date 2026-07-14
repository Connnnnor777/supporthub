import { NextRequest, NextResponse } from "next/server";

import { getBacklinks, getKnowledgeGraph } from "@/lib/knowledge-graph";

export async function GET(request: NextRequest) {
    const path = request.nextUrl.searchParams.get("q") ?? "";
    const graph = await getKnowledgeGraph();

    return NextResponse.json({
        backlinks: getBacklinks(path, graph),
    });
}
