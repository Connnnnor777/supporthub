import { CommandItem } from "./command-item";
import type { CommandDefinition } from "@/lib/command";

interface CommandResultsProps {
    commands: CommandDefinition[];
    onSelect?: () => void;
}

export function CommandResults({ commands, onSelect }: CommandResultsProps) {
    if (commands.length === 0) {
        return <p className="px-3 py-4 text-sm text-muted-foreground">No commands match yet.</p>;
    }

    return (
        <div className="space-y-2">
            {commands.map((command) => (
                <CommandItem key={command.id} command={command} onSelect={onSelect} />
            ))}
        </div>
    );
}
