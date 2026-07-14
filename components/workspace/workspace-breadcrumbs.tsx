"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type WorkspaceBreadcrumbsProps = {
    activePath?: string;
};

const labels: Record<string, string> = {
    "/": "Home",
    "/search": "Search",
    "/knowledge": "Knowledge",
    "/products": "Products",
    "/devices": "Devices",
    "/customers": "Customers",
    "/rmas": "RMAs",
    "/warranty": "Warranty",
    "/reports": "Analytics",
    "/settings": "Settings",
};

export function WorkspaceBreadcrumbs({ activePath = "/" }: WorkspaceBreadcrumbsProps) {
    const segments = activePath.split("/").filter(Boolean);
    const items = segments.map((segment, index) => {
        const href = `/${segments.slice(0, index + 1).join("/")}`;
        return {
            href,
            label: labels[href] ?? segment,
        };
    });

    return (
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="font-medium text-foreground hover:text-primary">
                Home
            </Link>
            {items.length > 0 ? items.map((item, index) => (
                <div key={item.href} className="flex items-center gap-2">
                    <ChevronRight className="size-4" />
                    {index === items.length - 1 ? (
                        <span className="font-medium text-foreground">{item.label}</span>
                    ) : (
                        <Link href={item.href} className="hover:text-primary">
                            {item.label}
                        </Link>
                    )}
                </div>
            )) : null}
        </nav>
    );
}
