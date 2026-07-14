import { NextResponse } from "next/server";

import { getEntity } from "@/lib/entities";

export async function GET(request: Request, { params }: { params: Promise<{ type: string; id: string }> }) {
    const { type, id } = await params;
    const entity = await getEntity(type, id);

    if (!entity) {
        return NextResponse.json({ success: false, error: "Entity not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: entity });
}
