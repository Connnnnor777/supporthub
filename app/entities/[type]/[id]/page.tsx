import { notFound } from "next/navigation";

import { EntityWorkspaceShell } from "@/components/entities/entity-workspace-shell";
import { WorkspaceLayout } from "@/components/workspace/workspace-layout";
import { getEntity, getEntityTypes } from "@/lib/entities";

export default async function EntityDetailPage({ params }: { params: Promise<{ type: string; id: string }> }) {
    const { type, id } = await params;
    const entityTypes = await getEntityTypes();
    const entityType = entityTypes.find((entry) => entry.type === type);

    if (!entityType) {
        notFound();
    }

    const entity = await getEntity(type, id);

    if (!entity) {
        notFound();
    }

    return (
        <WorkspaceLayout title={entity.name} description={`${entityType.name} workspace`} compact={false}>
            <EntityWorkspaceShell entity={entity} />
        </WorkspaceLayout>
    );
}
