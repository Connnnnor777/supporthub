import { Clock3, Sparkles } from "lucide-react";

export type ActivityItem = {
    title: string;
    description: string;
    timestamp: string;
    status?: "neutral" | "success" | "warning";
};

type ActivityFeedProps = {
    items: ActivityFeedItem[];
};

const statusClasses = {
    neutral: "border-border/70 bg-background/70",
    success: "border-emerald-500/30 bg-emerald-500/10",
    warning: "border-amber-500/30 bg-amber-500/10",
};

export function ActivityFeed({ items }: ActivityFeedProps) {
    return (
        <ol className="space-y-3">
            {items.map((item, index) => (
                <li key={`${item.title}-${index}`} className={"rounded-2xl border p-4 shadow-sm " + (statusClasses[item.status ?? "neutral"])}>
                    <div className="flex items-start gap-3">
                        <div className="rounded-xl bg-muted p-2">
                            {index % 2 === 0 ? <Sparkles className="size-4" /> : <Clock3 className="size-4" />}
                        </div>
                        <div className="flex-1">
                            <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground">{item.description}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
}
