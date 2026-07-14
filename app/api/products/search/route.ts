import { NextResponse } from "next/server";

import { getProductSummaries } from "@/lib/products";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get("q")?.trim().toLowerCase() ?? "";
        const products = await getProductSummaries();

        const filtered = products.filter((product) => {
            const haystack = [product.name, product.manufacturer, product.category, ...(product.tags ?? []), ...(product.aliases ?? [])]
                .filter(Boolean)
                .join(" ")
                .toLowerCase();
            return haystack.includes(query);
        });

        return NextResponse.json({ success: true, count: filtered.length, products: filtered });
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
