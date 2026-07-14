"use client";

import Link from "next/link";
import { Home, Search, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";

type WorkspaceSidebarProps = {
    items: Array<{
        title: string;
        href: string;
        icon: typeof Sparkles;
    }>;
    collapsed?: boolean;
    activePath?: string;
    onNavigate?: () => void;
};

export function WorkspaceSidebar({ items, collapsed = false, activePath = "/", onNavigate }: WorkspaceSidebarProps) {
    return (
        <aside className="flex h-full flex-col px-3 py-4" aria-label="Workspace navigation">
            <div className="mb-6 flex items-center gap-3 px-2">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
                    SH
                </div>
                {!collapsed ? (
                    <div>
                        <p className="text-sm font-semibold">SupportHub</p>
                        <p className="text-xs text-muted-foreground">Workspace</p>
                    </div>
                ) : null}
            </div>

            <nav className="flex-1 space-y-1">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePath === item.href || (item.href !== "/" && activePath.startsWith(item.href));

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={onNavigate}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className="size-4 shrink-0" />
                            {!collapsed ? <span>{item.title}</span> : null}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
