export function CommandFooter() {
    return (
        <div className="flex items-center justify-between border-t border-border/60 px-3 py-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
                <span className="rounded-md border border-border/60 px-2 py-1">↑↓</span>
                <span>Navigate</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="rounded-md border border-border/60 px-2 py-1">Enter</span>
                <span>Select</span>
            </div>
        </div>
    );
}
