import type { CommandDefinition, CommandProvider, CommandRegistry } from "./command.types";

class InMemoryCommandRegistry implements CommandRegistry {
    private readonly commands = new Map<string, CommandDefinition>();
    private readonly providers = new Map<string, CommandProvider>();

    registerCommand(command: CommandDefinition) {
        this.commands.set(command.id, command);
    }

    registerProvider(provider: CommandProvider) {
        this.providers.set(provider.id, provider);
        provider.register(this);
    }

    listCommands() {
        return Array.from(this.commands.values());
    }

    async executeCommand(id: string) {
        const command = this.commands.get(id);
        if (!command?.action) {
            return;
        }

        await command.action();
    }
}

export const commandRegistry = new InMemoryCommandRegistry();

export function registerCommand(command: CommandDefinition) {
    commandRegistry.registerCommand(command);
}

export function registerProvider(provider: CommandProvider) {
    commandRegistry.registerProvider(provider);
}

export function listCommands() {
    return commandRegistry.listCommands();
}

export async function executeCommand(id: string) {
    await commandRegistry.executeCommand(id);
}
