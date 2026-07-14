export type FrontmatterValue =
    | string
    | string[]
    | number
    | boolean
    | null

export type Frontmatter = Record<string, FrontmatterValue>

export interface KnowledgeHeading {
    level: number
    text: string
    slug: string
}

export interface KnowledgeLink {
    target: string
    alias?: string
    embed: boolean
}

export interface KnowledgeDocument {
    title: string
    path: string
    folder: string
    modified: string
    frontmatter: Frontmatter
    headings: KnowledgeHeading[]
    tags: string[]
    links: KnowledgeLink[]
    aliases: string[]
    content: string
}

/** @deprecated Use KnowledgeDocument for provider-neutral knowledge records. */
export type VaultNote = KnowledgeDocument

/** @deprecated Use KnowledgeDocument for provider-neutral knowledge records. */
export type KnowledgeNote = KnowledgeDocument
