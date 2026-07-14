"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

type WorkspaceSearchBarProps = {
    placeholder?: string;
};

export function WorkspaceSearchBar({ placeholder = "Search workspace" }: WorkspaceSearchBarProps) {
    const router = useRouter();

    return (
        <div className="flex items-center gap-2 rounded-xl border border-border/70 bg-background px-3 py-2 shadow-sm">
            <Search className="size-4 text-muted-foreground" />
            <Input
                aria-label="Search workspace"
                placeholder={placeholder}
                className="border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
                onKeyDown={(event) => {
                    if (event.key === "Enter") {
                        router.push("/search");
                    }
                }}
            />
        </div>
    );
}
