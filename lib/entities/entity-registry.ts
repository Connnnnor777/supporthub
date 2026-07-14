import type { EntityTypeDefinition } from "./entity.types";

class EntityRegistry {
    private readonly registry = new Map<string, EntityTypeDefinition>();

    register(type: EntityTypeDefinition) {
        this.registry.set(type.type, type);
    }

    get(type: string) {
        return this.registry.get(type);
    }

    list() {
        return Array.from(this.registry.values());
    }

    has(type: string) {
        return this.registry.has(type);
    }
}

export const entityRegistry = new EntityRegistry();

export function registerEntityType(type: EntityTypeDefinition) {
    entityRegistry.register(type);
}

export function getEntityType(type: string) {
    return entityRegistry.get(type);
}

export function listEntityTypes() {
    return entityRegistry.list();
}
