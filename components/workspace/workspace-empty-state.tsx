import { Inbox } from "lucide-react";

type WorkspaceEmptyStateProps = {
    title: string;
    description?: string;
};

export function WorkspaceEmptyState({ title, description }: WorkspaceEmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border/70 bg-muted/30 px-6 py-12 text-center">
            <div className="rounded-full bg-background p-3 shadow-sm">
                <Inbox className="size-6 text-muted-foreground" />
            </div>
            <h3 className="mt-4 text-lg font-semibold">{title}</h3>
            {description ? <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p> : null}
        </div>
    );
}
