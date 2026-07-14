"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Boxes, Cpu, ShieldCheck, Wrench, ClipboardList, Users2, FileText, Activity, BadgeCheck, GanttChartSquare } from "lucide-react";

import { cn } from "@/lib/utils";

type ProductSidebarProps = {
    productId: string;
};

const sections = [
    { id: "overview", label: "Overview", href: "", icon: BookOpen },
    { id: "knowledge", label: "Knowledge", href: "knowledge", icon: FileText },
    { id: "drivers", label: "Drivers", href: "drivers", icon: Wrench },
    { id: "firmware", label: "Firmware", href: "firmware", icon: Cpu },
    { id: "warranty", label: "Warranty", href: "warranty", icon: ShieldCheck },
    { id: "installation", label: "Installation", href: "installation", icon: ClipboardList },
    { id: "troubleshooting", label: "Troubleshooting", href: "troubleshooting", icon: BadgeCheck },
    { id: "related-products", label: "Related Products", href: "related-products", icon: Boxes },
    { id: "related-devices", label: "Related Devices", href: "related-devices", icon: Boxes },
    { id: "related-customers", label: "Related Customers", href: "related-customers", icon: Users2 },
    { id: "related-rmas", label: "Related RMAs", href: "related-rmas", icon: GanttChartSquare },
    { id: "related-documents", label: "Related Documents", href: "related-documents", icon: FileText },
    { id: "timeline", label: "Timeline", href: "timeline", icon: Activity },
];

export function ProductSidebar({ productId }: ProductSidebarProps) {
    const pathname = usePathname();

    return (
        <aside className="rounded-2xl border border-border/70 bg-card/80 p-4 shadow-sm">
            <p className="mb-3 text-sm font-semibold">Sections</p>
            <nav className="space-y-1" aria-label="Product sections">
                {sections.map((section) => {
                    const href = section.href ? `/products/${productId}/${section.href}` : `/products/${productId}`;
                    const active = pathname === href;
                    const Icon = section.icon;

                    return (
                        <Link key={section.id} href={href} className={cn("flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
                            <Icon className="size-4" />
                            <span>{section.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}
