"use client";

import { useEffect, useMemo, useState } from "react";
import { Menu, Search, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { WorkspaceSidebar } from "@/components/workspace/workspace-sidebar";
import { WorkspaceBreadcrumbs } from "@/components/workspace/workspace-breadcrumbs";
import { cn } from "@/lib/utils";

type WorkspaceLayoutProps = {
    children: React.ReactNode;
    title?: string;
    description?: string;
    compact?: boolean;
};

const navigationItems = [
    { title: "Home", href: "/", icon: Sparkles },
    { title: "Search", href: "/search", icon: Search },
    { title: "Knowledge", href: "/knowledge", icon: Sparkles },
    { title: "Products", href: "/products", icon: Sparkles },
    { title: "Devices", href: "/devices", icon: Sparkles },
    { title: "Customers", href: "/customers", icon: Sparkles },
    { title: "RMAs", href: "/rmas", icon: Sparkles },
    { title: "Warranty", href: "/warranty", icon: Sparkles },
    { title: "Analytics", href: "/reports", icon: Sparkles },
    { title: "Settings", href: "/settings", icon: Sparkles },
];

export function WorkspaceLayout({ children, title, description, compact = false }: WorkspaceLayoutProps) {
    const pathname = usePathname();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
                event.preventDefault();
                window.dispatchEvent(new CustomEvent("workspace:command-palette"));
            }
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    const currentTitle = useMemo(() => {
        if (title) return title;
        const matched = navigationItems.find((item) => item.href === pathname || (item.href !== "/" && pathname.startsWith(item.href)));
        return matched?.title ?? "Workspace";
    }, [pathname, title]);

    return (
        <div className="min-h-screen bg-background text-foreground">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <div className={cn("hidden border-r border-border/70 bg-sidebar/80 lg:flex lg:flex-col", isCollapsed ? "lg:w-20" : "lg:w-72")}>
                    <WorkspaceSidebar items={navigationItems} collapsed={isCollapsed} activePath={pathname} />
                </div>

                <div className="flex min-h-screen flex-1 flex-col">
                    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/90 backdrop-blur">
                        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-3">
                                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                                    <SheetTrigger asChild>
                                        <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                                            <Menu className="size-4" />
                                        </Button>
                                    </SheetTrigger>
                                    <SheetContent side="left" className="w-72 p-0">
                                        <WorkspaceSidebar items={navigationItems} collapsed={false} activePath={pathname} onNavigate={() => setMobileOpen(false)} />
                                    </SheetContent>
                                </Sheet>

                                <Button variant="ghost" size="icon" onClick={() => setIsCollapsed((value) => !value)} className="hidden lg:inline-flex" aria-label="Collapse sidebar">
                                    <Menu className="size-4" />
                                </Button>

                                <div>
                                    <p className="text-sm font-semibold">{currentTitle}</p>
                                    {!compact && description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link href="/search" className="hidden items-center gap-2 rounded-lg border border-border/70 bg-muted/50 px-3 py-2 text-sm text-muted-foreground sm:flex">
                                    <Search className="size-4" />
                                    <span>Search</span>
                                </Link>
                                <Button variant="outline" size="sm" onClick={() => window.dispatchEvent(new CustomEvent("workspace:command-palette"))}>
                                    Ctrl+K
                                </Button>
                                <ThemeToggle />
                            </div>
                        </div>
                    </header>

                    <main className="flex-1 px-4 py-5 sm:px-6 lg:px-8">
                        <div className="mb-4">
                            <WorkspaceBreadcrumbs activePath={pathname} />
                        </div>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
