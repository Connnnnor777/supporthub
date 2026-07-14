export function WorkspaceLoading() {
    return (
        <div className="space-y-4">
            <div className="h-24 animate-pulse rounded-2xl bg-muted" />
            <div className="grid gap-4 md:grid-cols-3">
                <div className="h-24 animate-pulse rounded-2xl bg-muted" />
                <div className="h-24 animate-pulse rounded-2xl bg-muted" />
                <div className="h-24 animate-pulse rounded-2xl bg-muted" />
            </div>
        </div>
    );
}
