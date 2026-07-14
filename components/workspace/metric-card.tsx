import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, type LucideIcon } from "lucide-react";

type MetricCardProps = {
    title: string;
    value: string;
    description?: string;
    trend?: string;
    trendPositive?: boolean;
    icon?: LucideIcon;
    color?: "default" | "accent" | "success" | "warning";
};

const colorClasses = {
    default: "border-border/60 bg-background/60",
    accent: "border-primary/30 bg-primary/10",
    success: "border-emerald-500/30 bg-emerald-500/10",
    warning: "border-amber-500/30 bg-amber-500/10",
};

export function MetricCard({ title, value, description, trend, trendPositive, icon: Icon, color = "default" }: MetricCardProps) {
    return (
        <div className={cn("rounded-2xl border p-4 shadow-sm", colorClasses[color])}>
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{title}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
                </div>
                {Icon ? <div className="rounded-xl bg-background/70 p-2"><Icon className="size-4" /></div> : null}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                {trend ? (
                    <span className={cn("flex items-center gap-1", trendPositive ? "text-emerald-600" : "text-amber-600")}>
                        {trendPositive ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                        {trend}
                    </span>
                ) : null}
                {description ? <span>{description}</span> : null}
            </div>
        </div>
    );
}
