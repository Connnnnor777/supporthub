import { NextResponse } from "next/server";

import { getEntities } from "@/lib/entities";

export async function GET(request: Request, { params }: { params: Promise<{ type: string }> }) {
    const { type } = await params;
    const entities = await getEntities(type);

    return NextResponse.json({
        success: true,
        data: entities,
    });
}
