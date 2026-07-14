"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface CommandInputProps {
    value: string;
    onChange: (value: string) => void;
    onEscape: () => void;
    inputRef: React.RefObject<HTMLInputElement | null>;
}

export function CommandInput({ value, onChange, onEscape, inputRef }: CommandInputProps) {
    return (
        <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
                ref={inputRef}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder="Type a command or search..."
                className="h-12 rounded-xl border-border/70 bg-background pl-10 pr-4 text-base"
                aria-label="Command palette"
                onKeyDown={(event) => {
                    if (event.key === "Escape") {
                        event.preventDefault();
                        onEscape();
                    }
                }}
            />
        </div>
    );
}
