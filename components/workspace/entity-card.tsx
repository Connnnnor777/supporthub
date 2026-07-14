import { MoreHorizontal, type LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type EntityCardProps = {
    title: string;
    subtitle?: string;
    status?: string;
    tags?: string[];
    relationships?: number;
    icon?: LucideIcon;
    actions?: React.ReactNode;
    className?: string;
};

export function EntityCard({ title, subtitle, status, tags = [], relationships, icon: Icon, actions, className }: EntityCardProps) {
    return (
        <div className={cn("rounded-2xl border border-border/70 bg-card/70 p-4 shadow-sm", className)}>
            <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                    {Icon ? <div className="rounded-xl bg-muted p-2"><Icon className="size-4" /></div> : null}
                    <div>
                        <p className="font-semibold">{title}</p>
                        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {status ? <Badge variant="outline">{status}</Badge> : null}
                    {actions ? <Button variant="ghost" size="icon" aria-label="Quick actions"><MoreHorizontal className="size-4" /></Button> : null}
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
            {relationships !== undefined ? (
                <p className="mt-4 text-sm text-muted-foreground">{relationships} relationships</p>
            ) : null}
        </div>
    );
}
