import { cache } from "react";

import { buildEntities, buildEntity, createDefaultEntityDefinitions } from "./entity-builder";
import { getEntityType, listEntityTypes } from "./entity-registry";
import type { Entity } from "./entity.types";

const registerDefaults = (() => {
    let initialized = false;

    return () => {
        if (initialized) {
            return;
        }

        initialized = true;
        for (const definition of createDefaultEntityDefinitions()) {
            const existing = getEntityType(definition.type);
            if (!existing) {
                const { registerEntityType } = require("./entity-registry") as typeof import("./entity-registry");
                registerEntityType(definition);
            }
        }
    };
})();

const cachedEntities = new Map<string, Entity[]>();

export async function getEntities(type: string): Promise<Entity[]> {
    registerDefaults();
    if (cachedEntities.has(type)) return cachedEntities.get(type)!;

    const entities = await buildEntities(type);
    cachedEntities.set(type, entities);
    return entities;
}

export async function getEntity(type: string, id: string): Promise<Entity | null> {
    registerDefaults();
    return buildEntity(type, id);
}

export async function getEntityTypes() {
    registerDefaults();
    return listEntityTypes();
}

export const getCachedEntities = cache(getEntities);
export const getCachedEntity = cache(getEntity);
export const getCachedEntityTypes = cache(getEntityTypes);
