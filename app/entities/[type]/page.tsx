import Link from "next/link";
import { notFound } from "next/navigation";

import { WorkspaceLayout } from "@/components/workspace/workspace-layout";
import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { EntityCard } from "@/components/workspace/entity-card";
import { getEntities, getEntityTypes } from "@/lib/entities";

export default async function EntityTypePage({ params }: { params: Promise<{ type: string }> }) {
    const { type } = await params;
    const entityTypes = await getEntityTypes();
    const entityType = entityTypes.find((entry) => entry.type === type);

    if (!entityType) {
        notFound();
    }

    const entities = await getEntities(type);

    return (
        <WorkspaceLayout title={entityType.name} description={`Browse ${type} workspaces`} compact={false}>
            <div className="space-y-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Link href="/entities" className="hover:text-primary">Entities</Link>
                    <span>/</span>
                    <span className="font-medium text-foreground">{entityType.name}</span>
                </div>
                <WorkspaceSection title={entityType.name} description={`Entities discovered for ${type}`}>
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {entities.map((entity) => (
                            <Link key={entity.id} href={`/entities/${type}/${entity.id}`} className="block">
                                <EntityCard title={entity.name} subtitle={entity.aliases[0] ?? entity.title} tags={entity.tags.slice(0, 4)} relationships={entity.relationships.length} />
                            </Link>
                        ))}
                    </div>
                </WorkspaceSection>
            </div>
        </WorkspaceLayout>
    );
}
