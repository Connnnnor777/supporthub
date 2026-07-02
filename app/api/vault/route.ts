import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        vault: process.env.VAULT_PATH,
    });
}