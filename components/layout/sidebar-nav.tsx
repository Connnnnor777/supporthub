"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BarChart3,
    Brain,
    CircleHelp,
    LayoutDashboard,
    Package,
    Settings2,
    ShieldCheck,
    Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

type NavItem = {
    title: string;
    href: string;
    icon: typeof LayoutDashboard;
};

const navigation: NavItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Products", href: "/products", icon: Package },
    { title: "Customers", href: "/customers", icon: Users },
    { title: "Knowledge", href: "/knowledge", icon: Brain },
    { title: "SOPs", href: "/sops", icon: ShieldCheck },
    { title: "Reports", href: "/reports", icon: BarChart3 },
    { title: "Settings", href: "/settings", icon: Settings2 },
];

export function SidebarNav() {
    const pathname = usePathname();

    return (
        <nav className="space-y-2" aria-label="Sidebar navigation">
            {navigation.map((item) => {
                const Icon = item.icon;
                const isActive =
                    pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href));

                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                            isActive
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        <Icon className="size-4" />
                        <span>{item.title}</span>
                    </Link>
                );
            })}
        </nav>
    );
}
