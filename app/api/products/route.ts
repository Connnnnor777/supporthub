import { NextResponse } from "next/server";

import { getProductSummaries } from "@/lib/products";

export async function GET() {
    try {
        const products = await getProductSummaries();
        return NextResponse.json({
            success: true,
            count: products.length,
            products,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}
