import { NextRequest, NextResponse } from "next/server";

import { searchNotes } from "@/lib/search";

export async function GET(
    request: NextRequest
) {

    const query =
        request.nextUrl.searchParams.get("q") ?? "";

    const results =
        await searchNotes(query);

    return NextResponse.json({

        success: true,

        query,

        count: results.length,

        results,

    });

}
