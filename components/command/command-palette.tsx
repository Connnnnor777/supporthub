"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { usePathname, useRouter } from "next/navigation";

import { CommandFooter } from "./command-footer";
import { CommandInput } from "./command-input";
import { CommandPreview } from "./command-preview";
import { CommandResults } from "./command-results";
import { initializeCommandProviders } from "@/lib/command";
import { getCommandResults } from "@/lib/command";
import type { CommandDefinition } from "@/lib/command";

export function CommandPalette() {
    const router = useRouter();
    const pathname = usePathname();
    const [open, setOpen] = React.useState(false);
    const [query, setQuery] = React.useState("");
    const [results, setResults] = React.useState<CommandDefinition[]>([]);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useEffect(() => {
        initializeCommandProviders();
    }, []);

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const isShortcut = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k";
            if (isShortcut) {
                event.preventDefault();
                setOpen((current) => !current);
            }

            if (event.key === "Escape" && open) {
                event.preventDefault();
                setOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [open]);

    React.useEffect(() => {
        if (!open) {
            setQuery("");
            setSelectedIndex(0);
            return;
        }

        inputRef.current?.focus();
    }, [open]);

    React.useEffect(() => {
        let active = true;
        void (async () => {
            const payload = await getCommandResults(query);
            if (active) {
                setResults(payload.commands);
                setSelectedIndex(0);
            }
        })();

        return () => {
            active = false;
        };
    }, [query]);

    const handleSelect = React.useCallback((command: CommandDefinition) => {
        if (command.href) {
            router.push(command.href);
        }
        setOpen(false);
    }, [router]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-2xl border-border/70 p-0 shadow-2xl">
                <DialogTitle className="sr-only">Command Palette</DialogTitle>
                <div className="p-4">
                    <CommandInput value={query} onChange={setQuery} onEscape={() => setOpen(false)} inputRef={inputRef} />
                    <div className="mt-4 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
                        <div className="space-y-3">
                            <CommandResults commands={results} onSelect={() => handleSelect(results[selectedIndex])} />
                        </div>
                        <div className="space-y-3">
                            <CommandPreview command={results[selectedIndex]} />
                            <Separator />
                            <p className="text-sm text-muted-foreground">Current route: {pathname}</p>
                        </div>
                    </div>
                </div>
                <CommandFooter />
            </DialogContent>
        </Dialog>
    );
}
