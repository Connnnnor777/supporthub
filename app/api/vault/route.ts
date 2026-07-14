import { NextResponse } from "next/server";
import { getVaultNotes } from "@/lib/services/vault-service";

export async function GET() {
  try {
    const notes = await getVaultNotes();

    return NextResponse.json({
      status: "ok",
      count: notes.length,
      notes,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 500 }
    );
  }
}