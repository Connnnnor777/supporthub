import { WorkspaceLayout } from "@/components/workspace/workspace-layout";
import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { MetricCard } from "@/components/workspace/metric-card";
import { EntityCard } from "@/components/workspace/entity-card";
import { KnowledgeCard } from "@/components/workspace/knowledge-card";
import { ActivityFeed } from "@/components/workspace/activity-feed";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BarChart3, BookOpen, Boxes, CircleAlert, FileText, Package2, ShieldCheck, Sparkles, Users2 } from "lucide-react";

export default function HomeWorkspacePage() {
    return (
        <WorkspaceLayout title="Home" description="Your workspace command center" compact={false}>
            <div className="space-y-6">
                <WorkspaceSection title="Welcome" description="A centralized workspace for operations, knowledge, and product context." actions={<Button variant="outline">Open search</Button>}>
                    <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
                        <div className="rounded-2xl border border-border/70 bg-muted/40 p-5">
                            <div className="flex items-center gap-2 text-sm font-medium text-primary">
                                <Sparkles className="size-4" />
                                SupportHub Workspace
                            </div>
                            <h3 className="mt-3 text-2xl font-semibold tracking-tight">Everything you need is now part of one workspace.</h3>
                            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">The home experience unifies search, knowledge health, vault activity, and quick actions into a reusable application shell.</p>
                        </div>
                        <div className="grid gap-3">
                            <Button className="justify-start" asChild>
                                <a href="/search">Launch global search</a>
                            </Button>
                            <Button variant="outline" className="justify-start" asChild>
                                <a href="/knowledge">View knowledge base</a>
                            </Button>
                            <Button variant="outline" className="justify-start" asChild>
                                <a href="/reports">Open analytics</a>
                            </Button>
                        </div>
                    </div>
                </WorkspaceSection>

                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                    <MetricCard title="Documents" value="24" trend="+3%" trendPositive description="Indexed in vault" icon={FileText} color="accent" />
                    <MetricCard title="Knowledge Health" value="92%" trend="stable" description="Healthy links" icon={ShieldCheck} color="success" />
                    <MetricCard title="Active Products" value="11" trend="+2" description="Tracked in workspace" icon={Package2} color="default" />
                    <MetricCard title="Open RMAs" value="4" trend="-1" trendPositive={false} description="Pending review" icon={CircleAlert} color="warning" />
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <WorkspaceSection title="Vault Statistics" description="Live insight into the managed knowledge source">
                        <div className="grid gap-4 md:grid-cols-2">
                            <MetricCard title="Folders" value="8" description="Knowledge directories" icon={Boxes} />
                            <MetricCard title="Tags" value="19" description="Indexed topics" icon={BookOpen} />
                            <MetricCard title="Wiki Links" value="71" description="Cross references" icon={ArrowRight} />
                            <MetricCard title="Broken Links" value="3" description="Needs review" icon={CircleAlert} color="warning" />
                        </div>
                    </WorkspaceSection>
                    <WorkspaceSection title="Recent Activity" description="A reusable timeline for future operations events">
                        <ActivityFeed items={[
                            { title: "Vault refresh completed", description: "Knowledge index updated with the latest markdown changes.", timestamp: "2m ago", status: "success" },
                            { title: "Search index synced", description: "The latest document set is now searchable.", timestamp: "15m ago", status: "neutral" },
                            { title: "Broken links detected", description: "Three wiki links need attention in the vault.", timestamp: "1h ago", status: "warning" },
                        ]} />
                    </WorkspaceSection>
                </div>

                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                    <WorkspaceSection title="Recent Documents" description="Key documents from the knowledge vault">
                        <div className="grid gap-3 md:grid-cols-2">
                            <KnowledgeCard title="EVO Omni Setup" summary="Installation notes and troubleshooting guidance." path="/knowledge" tags={["install", "evo"]} />
                            <KnowledgeCard title="Warranty Claims" summary="Coverage notes and escalation guidance." path="/knowledge" tags={["warranty", "claims"]} />
                            <KnowledgeCard title="Device Compatibility" summary="Firmware and driver compatibility matrix." path="/knowledge" tags={["device", "compatibility"]} />
                            <KnowledgeCard title="RMA Checklist" summary="Shipping, validation, and replacement workflow." path="/knowledge" tags={["rma", "ops"]} />
                        </div>
                    </WorkspaceSection>
                    <WorkspaceSection title="Pinned Workstreams" description="Reusable entity cards for the workspace layer">
                        <div className="grid gap-3">
                            <EntityCard title="XP8200" subtitle="Product workspace" status="Active" tags={["firmware", "drivers"]} relationships={6} />
                            <EntityCard title="Northwind Customer" subtitle="Support account" status="Priority" tags={["case", "sla"]} relationships={4} />
                            <EntityCard title="RMA-4021" subtitle="Replacement request" status="Review" tags={["shipping", "validation"]} relationships={3} />
                        </div>
                    </WorkspaceSection>
                </div>
            </div>
        </WorkspaceLayout>
    );
}
