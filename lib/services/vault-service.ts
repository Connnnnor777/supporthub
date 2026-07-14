import { indexVault } from "@/lib/vault/indexer";

export async function getVaultNotes() {
  return indexVault();
}

export async function getRecentNotes(limit = 5) {
  const notes = indexVault();

  return notes.slice(0, limit);
}

export async function getNoteCount() {
  return indexVault().length;
}