import { NextResponse } from "next/server";

import { getKnowledgeGraph } from "@/lib/knowledge-graph";

export async function GET() {
    const graph = await getKnowledgeGraph();

    return NextResponse.json(graph);
}
