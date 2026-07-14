import { WorkspaceLayout } from "@/components/workspace/workspace-layout";
import { SearchBox } from "@/components/search/search-box";

export default function Page() {
  return (
    <WorkspaceLayout title="Search" description="Search support notes, products, and knowledge assets" compact={false}>
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <div className="rounded-2xl border border-border/70 bg-card/70 p-5 shadow-sm">
          <p className="text-sm font-medium text-primary">Workspace Search</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Search SupportHub</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Find support notes, product references, SOPs, tools, and warranty documentation from the vault.
          </p>
        </div>

        <SearchBox />
      </div>
    </WorkspaceLayout>
  );
}
