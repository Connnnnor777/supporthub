import { searchNotes } from "@/lib/search";
import { getEntities } from "@/lib/entities";
import { getProducts } from "@/lib/products";

import { listCommands } from "./command-registry";
import type { CommandDefinition, CommandContext } from "./command.types";

function normalize(text: string) {
    return text.toLowerCase().trim();
}

function scoreCommand(command: CommandDefinition, query: string, context: CommandContext) {
    const normalizedQuery = normalize(query);
    const haystack = [command.title, command.description, ...(command.keywords ?? [])].join(" ").toLowerCase();

    let score = command.priority ?? 0;

    if (!normalizedQuery) {
        if (command.pinned) score += 120;
        if (context.recentCommands.includes(command.id)) score += 60;
        return score;
    }

    if (haystack.includes(normalizedQuery)) score += 60;
    if (command.title.toLowerCase().includes(normalizedQuery)) score += 25;
    if (command.keywords.some((keyword) => keyword.toLowerCase().includes(normalizedQuery))) score += 15;

    if (context.recentCommands.includes(command.id)) score += 40;
    if (context.pinnedCommands.includes(command.id)) score += 80;

    return score;
}

export async function getCommandResults(query: string, context: CommandContext = { query, recentCommands: [], pinnedCommands: [], recentEntities: [] }) {
    const commands = listCommands();
    const commandResults = commands
        .map((command) => ({ command, score: scoreCommand(command, query, context) }))
        .filter((entry) => entry.score > 0)
        .sort((left, right) => right.score - left.score || left.command.title.localeCompare(right.command.title));

    const searchResults = query.trim()
        ? (await searchNotes(query, { limit: 6 }))
        : [];

    const entities = query.trim()
        ? (await getEntities("product"))
        : [];

    const products = query.trim()
        ? (await getProducts())
        : [];

    return {
        commands: commandResults.slice(0, 8).map((entry) => entry.command),
        searchResults,
        entities: entities.slice(0, 4).map((entity) => ({
            id: entity.id,
            title: entity.name,
            subtitle: entity.aliases[0] ?? entity.title,
            type: entity.type,
            href: `/entities/product/${entity.id}`,
        })),
        products: products.slice(0, 4).map((product) => ({
            id: product.id,
            title: product.name,
            subtitle: product.category ?? product.manufacturer,
            href: `/products/${product.id}`,
        })),
    };
}
