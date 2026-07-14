import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import type { Entity } from "../../lib/entities/index.ts";
import { Cpu, FileText, Network, Tag } from "lucide-react";

interface EntityWorkspaceShellProps {
    entity: Entity;
}

export function EntityWorkspaceShell({ entity }: EntityWorkspaceShellProps) {
    return (
        <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <p className="text-sm font-medium text-muted-foreground">{entity.type}</p>
                    <h1 className="text-3xl font-semibold tracking-tight">{entity.title}</h1>
                </div>
                <div className="flex flex-wrap gap-2">
                    {entity.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="h-4 w-4" /> Overview
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Summary</p>
                            <p className="mt-2 text-sm leading-7 text-foreground/80">
                                {(entity.metadata.overview as string) ?? entity.name}
                            </p>
                        </div>
                        <Separator />
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Aliases</p>
                                <p className="mt-2 text-sm text-foreground/80">
                                    {entity.aliases.length > 0 ? entity.aliases.join(", ") : "—"}
                                </p>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Metadata</p>
                                <p className="mt-2 text-sm text-foreground/80">
                                    {entity.metadata.category ? String(entity.metadata.category) : "—"}
                                </p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Tag className="h-4 w-4" /> Attributes
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            {Object.entries(entity.metadata).map(([key, value]) => (
                                <div key={key} className="flex items-center justify-between gap-2">
                                    <span className="text-muted-foreground">{key}</span>
                                    <span className="font-medium">{String(value)}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Network className="h-4 w-4" /> Relationships
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            {entity.relationships.length > 0 ? (
                                entity.relationships.map((relationship) => (
                                    <div key={`${relationship.type}-${relationship.targetId}`} className="flex items-center justify-between gap-2">
                                        <span className="text-muted-foreground">{relationship.type}</span>
                                        <span className="font-medium">{relationship.targetId}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground">No relationships detected.</p>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Cpu className="h-4 w-4" /> Source Documents
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm">
                            {entity.documents.map((document) => (
                                <div key={document.path} className="flex items-center justify-between gap-2">
                                    <span className="text-muted-foreground">{document.title}</span>
                                    <span className="font-medium">{document.path}</span>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
