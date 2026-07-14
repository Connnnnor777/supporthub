import { createVaultService } from "@/lib/vault/vault.service"

const service = createVaultService()

export async function getVaultNotes() {
  const result = await service.refresh()
  return result.documents
}

export async function getRecentNotes(limit = 5) {
  const result = await service.refresh()
  return result.documents.slice(0, limit)
}

export async function getNoteCount() {
  const result = await service.refresh()
  return result.documents.length
}