import Link from "next/link";
import { ArrowRight, Command, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import type { CommandDefinition } from "@/lib/command";

interface CommandItemProps {
    command: CommandDefinition;
    onSelect?: () => void;
}

export function CommandItem({ command, onSelect }: CommandItemProps) {
    const content = (
        <div className="flex items-center justify-between gap-4 rounded-xl border border-border/60 bg-background/70 px-3 py-3 transition-colors hover:bg-muted/60">
            <div className="flex items-center gap-3">
                <div className="flex size-8 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                    {command.kind === "product" ? <Sparkles className="size-4" /> : <Command className="size-4" />}
                </div>
                <div>
                    <p className="text-sm font-medium text-foreground">{command.title}</p>
                    <p className="text-sm text-muted-foreground">{command.description}</p>
                </div>
            </div>
            <ArrowRight className="size-4 text-muted-foreground" />
        </div>
    );

    if (command.href) {
        return (
            <Link href={command.href} onClick={onSelect} className={cn("block")}>
                {content}
            </Link>
        );
    }

    return <button type="button" onClick={onSelect} className="w-full text-left">{content}</button>;
}
