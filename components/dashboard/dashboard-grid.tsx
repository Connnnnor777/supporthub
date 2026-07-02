import { Bot, Clock3, Package2, Sparkles, Users2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function DashboardGrid() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-sm font-medium text-primary">Operations overview</p>
                    <h1 className="text-3xl font-semibold tracking-tight">SupportHub dashboard</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Bring product, customer, and knowledge context into one workspace.
                    </p>
                </div>
                <Button>New case</Button>
            </div>

            <div className="grid gap-4 xl:grid-cols-[1.4fr_0.8fr]">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Sparkles className="size-4 text-primary" />
                            Quick Actions
                        </CardTitle>
                        <CardDescription>Jump into the most common support workflows.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3 sm:grid-cols-2">
                        <Button variant="outline" className="justify-start">
                            Review new tickets
                        </Button>
                        <Button variant="outline" className="justify-start">
                            Share knowledge update
                        </Button>
                        <Button variant="outline" className="justify-start">
                            Draft SOP summary
                        </Button>
                        <Button variant="outline" className="justify-start">
                            Sync product notes
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Bot className="size-4 text-primary" />
                            AI Assistant
                        </CardTitle>
                        <CardDescription>Ask for a summary or next best action.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <p className="rounded-lg border border-dashed border-border/70 bg-muted/40 p-3 text-sm text-muted-foreground">
                            “Summarize the latest customer escalation and suggest follow-up steps.”
                        </p>
                        <Button className="w-full">Open assistant</Button>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Clock3 className="size-4 text-primary" />
                            Recent Notes
                        </CardTitle>
                        <CardDescription>Latest updates across the support hub.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="rounded-lg border border-border/70 bg-muted/30 p-3">
                            <p className="font-medium text-foreground">Escalation brief</p>
                            <p>Updated 12 minutes ago by Maya</p>
                        </div>
                        <div className="rounded-lg border border-border/70 bg-muted/30 p-3">
                            <p className="font-medium text-foreground">Release rollout checklist</p>
                            <p>Synced to SOPs this morning</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Package2 className="size-4 text-primary" />
                            Products
                        </CardTitle>
                        <CardDescription>High-priority products and active initiatives.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 p-3">
                            <span className="font-medium text-foreground">Atlas Pro</span>
                            <span>3 open issues</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 p-3">
                            <span className="font-medium text-foreground">Signal AI</span>
                            <span>2 pending notes</span>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users2 className="size-4 text-primary" />
                            Customers
                        </CardTitle>
                        <CardDescription>Priority accounts that need attention.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm text-muted-foreground">
                        <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 p-3">
                            <span className="font-medium text-foreground">Northwind Labs</span>
                            <span>Escalation</span>
                        </div>
                        <div className="flex items-center justify-between rounded-lg border border-border/70 bg-muted/30 p-3">
                            <span className="font-medium text-foreground">Brightline</span>
                            <span>Renewal review</span>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
