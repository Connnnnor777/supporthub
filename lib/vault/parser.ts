import type {
    Frontmatter,
    FrontmatterValue,
    KnowledgeHeading,
    KnowledgeLink,
} from "./types"

type ParsedFrontmatter = {
    frontmatter: Frontmatter
    body: string
}

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
}

function parseScalar(value: string): FrontmatterValue {
    const trimmed = value.trim()

    if (!trimmed) {
        return ""
    }

    if (trimmed === "true") {
        return true
    }

    if (trimmed === "false") {
        return false
    }

    if (trimmed === "null") {
        return null
    }

    if (/^-?\d+(\.\d+)?$/.test(trimmed)) {
        return Number(trimmed)
    }

    if (
        (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
        (trimmed.startsWith("'") && trimmed.endsWith("'"))
    ) {
        return trimmed.slice(1, -1)
    }

    if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
        return trimmed
            .slice(1, -1)
            .split(",")
            .map((item) => String(parseScalar(item.trim())))
            .filter(Boolean)
    }

    return trimmed
}

function parseFrontmatter(markdown: string): ParsedFrontmatter {
    const normalized = markdown.replace(/\r\n/g, "\n")

    if (!normalized.startsWith("---\n")) {
        return {
            frontmatter: {},
            body: markdown,
        }
    }

    const end = normalized.indexOf("\n---", 4)

    if (end === -1) {
        return {
            frontmatter: {},
            body: markdown,
        }
    }

    const yaml = normalized.slice(4, end)
    const body = normalized.slice(end).replace(/^\n---\n?/, "")
    const frontmatter: Frontmatter = {}
    const lines = yaml.split("\n")

    for (let index = 0; index < lines.length; index += 1) {
        const line = lines[index]
        const keyValue = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/)

        if (!keyValue) {
            continue
        }

        const key = keyValue[1]
        const rawValue = keyValue[2]

        if (rawValue.trim()) {
            frontmatter[key] = parseScalar(rawValue)
            continue
        }

        const values: string[] = []

        while (index + 1 < lines.length) {
            const nextLine = lines[index + 1]
            const listItem = nextLine.match(/^\s+-\s+(.+)$/)

            if (!listItem) {
                break
            }

            values.push(String(parseScalar(listItem[1])))
            index += 1
        }

        frontmatter[key] = values
    }

    return {
        frontmatter,
        body,
    }
}

function parseHeadings(markdown: string): KnowledgeHeading[] {
    return markdown
        .split(/\r?\n/)
        .map((line) => line.match(/^(#{1,6})\s+(.+)$/))
        .filter((match): match is RegExpMatchArray => Boolean(match))
        .map((match) => {
            const text = match[2].trim()

            return {
                level: match[1].length,
                text,
                slug: slugify(text),
            }
        })
}

function parseTags(markdown: string, frontmatter: Frontmatter): string[] {
    const tags = new Set<string>()
    const frontmatterTags = frontmatter.tags

    if (Array.isArray(frontmatterTags)) {
        frontmatterTags.forEach((tag) => tags.add(tag.replace(/^#/, "")))
    } else if (typeof frontmatterTags === "string") {
        frontmatterTags
            .split(/[,\s]+/)
            .filter(Boolean)
            .forEach((tag) => tags.add(tag.replace(/^#/, "")))
    }

    for (const match of markdown.matchAll(/(^|[\s([{])#([A-Za-z][A-Za-z0-9_-]*)/g)) {
        tags.add(match[2])
    }

    return [...tags].sort((a, b) => a.localeCompare(b))
}

function parseLinks(markdown: string): KnowledgeLink[] {
    const links: KnowledgeLink[] = []
    const matches = markdown.matchAll(/(!)?\[\[([^\]\r\n]+)\]\]/g)

    for (const match of matches) {
        const [target, alias] = match[2]
            .split("|")
            .map((part) => part.trim())

        if (!target) {
            continue
        }

        links.push({
            target: target.split("#")[0],
            alias,
            embed: Boolean(match[1]),
        })
    }

    return links
}

function parseAliases(frontmatter: Frontmatter): string[] {
    const value = frontmatter.aliases ?? frontmatter.alias

    if (Array.isArray(value)) {
        return value
    }

    if (typeof value === "string") {
        return value
            .split(",")
            .map((alias) => alias.trim())
            .filter(Boolean)
    }

    return []
}

export function parseKnowledgeMarkdown(markdown: string) {
    const { frontmatter, body } = parseFrontmatter(markdown)

    return {
        frontmatter,
        headings: parseHeadings(body),
        tags: parseTags(body, frontmatter),
        links: parseLinks(body),
        aliases: parseAliases(frontmatter),
        content: body,
    }
}
