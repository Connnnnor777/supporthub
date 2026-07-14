import { SearchBox } from "@/components/search/search-box";
import { AppShell } from "@/components/layout/app-shell";

export default function Page() {
  return (
    <AppShell>
      <main className="mx-auto w-full max-w-4xl space-y-8 p-6 md:p-10">
        <div className="space-y-3">
          <p className="text-sm font-medium text-primary">Search</p>
          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Search SupportHub
            </h1>
            <p className="max-w-2xl text-muted-foreground">
              Find support notes, product references, SOPs, tools, and warranty documentation from the vault.
            </p>
          </div>
        </div>

        <SearchBox />
      </main>
    </AppShell>
  );
}
