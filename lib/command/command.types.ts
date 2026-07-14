export type CommandKind =
    | "navigation"
    | "workspace"
    | "entity"
    | "product"
    | "customer"
    | "document"
    | "search"
    | "action";

export interface CommandContext {
    query: string;
    recentCommands: string[];
    pinnedCommands: string[];
    recentEntities: string[];
}

export interface CommandDefinition {
    id: string;
    title: string;
    description: string;
    kind: CommandKind;
    keywords: string[];
    priority?: number;
    icon?: string;
    href?: string;
    action?: () => void | Promise<void>;
    score?: number;
    pinned?: boolean;
    section?: string;
    metadata?: Record<string, unknown>;
}

export interface CommandProvider {
    id: string;
    name: string;
    register(commands: CommandRegistry): void;
}

export interface CommandRegistry {
    registerCommand(command: CommandDefinition): void;
    registerProvider(provider: CommandProvider): void;
    listCommands(): CommandDefinition[];
    executeCommand(id: string): Promise<void>;
}
