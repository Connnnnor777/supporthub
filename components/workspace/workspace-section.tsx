import { cn } from "@/lib/utils";

type WorkspaceSectionProps = {
    title: string;
    description?: string;
    actions?: React.ReactNode;
    children: React.ReactNode;
    className?: string;
};

export function WorkspaceSection({ title, description, actions, children, className }: WorkspaceSectionProps) {
    return (
        <section className={cn("rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm", className)}>
            <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                    <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
                    {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
                </div>
                {actions ? <div className="shrink-0">{actions}</div> : null}
            </div>
            {children}
        </section>
    );
}
