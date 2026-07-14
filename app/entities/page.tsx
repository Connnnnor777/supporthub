import Link from "next/link";

import { WorkspaceLayout } from "@/components/workspace/workspace-layout";
import { WorkspaceSection } from "@/components/workspace/workspace-section";
import { EntityCard } from "@/components/workspace/entity-card";
import { getEntityTypes } from "@/lib/entities";

export default async function EntitiesPage() {
    const entityTypes = await getEntityTypes();

    return (
        <WorkspaceLayout title="Entities" description="Registry-driven workspaces for structured domains" compact={false}>
            <div className="space-y-6">
                <WorkspaceSection title="Entity Types" description="The platform now exposes reusable entity types that can be surfaced as workspaces.">
                    <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                        {entityTypes.map((entityType) => (
                            <Link key={entityType.type} href={`/entities/${entityType.type}`} className="block">
                                <EntityCard title={entityType.name} subtitle={`Workspace for ${entityType.type} entities`} tags={[entityType.type]} relationships={0} />
                            </Link>
                        ))}
                    </div>
                </WorkspaceSection>
            </div>
        </WorkspaceLayout>
    );
}
