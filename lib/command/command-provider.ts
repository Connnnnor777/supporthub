import { registerProvider } from "./command-registry";
import type { CommandProvider } from "./command.types";

const builtInProviders: CommandProvider[] = [];

export function initializeCommandProviders() {
    if (builtInProviders.length > 0) {
        return;
    }

    const providers: CommandProvider[] = [
        {
            id: "supporthub.core",
            name: "SupportHub Core",
            register(commands) {
                commands.registerCommand({
                    id: "navigation.dashboard",
                    title: "Dashboard",
                    description: "Open the dashboard workspace",
                    kind: "workspace",
                    keywords: ["dashboard", "home", "overview"],
                    priority: 100,
                    href: "/dashboard",
                    section: "Workspaces",
                });
                commands.registerCommand({
                    id: "navigation.products",
                    title: "Products",
                    description: "Open the products workspace",
                    kind: "product",
                    keywords: ["products", "inventory", "catalog"],
                    priority: 95,
                    href: "/products",
                    section: "Workspaces",
                });
                commands.registerCommand({
                    id: "navigation.entities",
                    title: "Entities",
                    description: "Browse entity workspaces",
                    kind: "entity",
                    keywords: ["entities", "workspaces", "registry"],
                    priority: 90,
                    href: "/entities",
                    section: "Workspaces",
                });
                commands.registerCommand({
                    id: "navigation.search",
                    title: "Search",
                    description: "Open the global search experience",
                    kind: "search",
                    keywords: ["search", "find", "lookup"],
                    priority: 88,
                    href: "/search",
                    section: "Workspaces",
                });
                commands.registerCommand({
                    id: "navigation.settings",
                    title: "Settings",
                    description: "Open workspace settings",
                    kind: "action",
                    keywords: ["settings", "preferences", "config"],
                    priority: 80,
                    href: "/settings",
                    section: "Workspaces",
                });
                commands.registerCommand({
                    id: "action.refresh-vault",
                    title: "Refresh Vault",
                    description: "Refresh the knowledge vault index",
                    kind: "action",
                    keywords: ["refresh", "vault", "index"],
                    priority: 70,
                    section: "Actions",
                });
                commands.registerCommand({
                    id: "action.refresh-graph",
                    title: "Refresh Graph",
                    description: "Refresh the knowledge graph",
                    kind: "action",
                    keywords: ["refresh", "graph", "links"],
                    priority: 65,
                    section: "Actions",
                });
            },
        },
    ];

    providers.forEach((provider) => {
        registerProvider(provider);
        builtInProviders.push(provider);
    });
}
