import { SidebarNav } from "@/components/layout/sidebar-nav";
import { TopHeader } from "@/components/layout/top-header";

export function AppShell({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-background">
            <div className="flex min-h-screen flex-col lg:flex-row">
                <aside className="w-full border-b border-border/60 bg-sidebar px-4 py-5 lg:w-72 lg:border-b-0 lg:border-r lg:px-6 lg:py-6">
                    <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-primary-foreground">
                            SH
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-foreground">SupportHub</p>
                            <p className="text-xs text-muted-foreground">Ops workspace</p>
                        </div>
                    </div>
                    <div className="mt-6">
                        <SidebarNav />
                    </div>
                </aside>

                <div className="flex min-h-screen flex-1 flex-col">
                    <TopHeader />
                    <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
                </div>
            </div>
        </div>
    );
}
