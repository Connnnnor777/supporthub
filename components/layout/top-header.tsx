import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export function TopHeader() {
    return (
        <header className="border-b border-border/60 bg-background/95 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-3 rounded-lg border border-border/80 bg-muted/40 px-3 py-2 shadow-sm">
                    <Search className="size-4 text-muted-foreground" />
                    <input
                        aria-label="Search"
                        className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground md:w-72"
                        placeholder="Search notes, customers, products"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        New case
                    </Button>
                    <ThemeToggle />
                </div>
            </div>
        </header>
    );
}
