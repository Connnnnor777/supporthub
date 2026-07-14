import { NextResponse } from "next/server";

import { getEntityTypes } from "@/lib/entities";

export async function GET() {
    const types = await getEntityTypes();

    return NextResponse.json({
        success: true,
        data: types.map((type) => ({
            type: type.type,
            name: type.name,
        })),
    });
}
