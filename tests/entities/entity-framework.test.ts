import assert from "node:assert/strict";
import test from "node:test";

import { createDefaultEntityDefinitions } from "../../lib/entities/entity-builder.ts";
import { getEntityType, listEntityTypes, registerEntityType } from "../../lib/entities/entity-registry.ts";

test("default entity definitions register a product entity type", () => {
    for (const definition of createDefaultEntityDefinitions()) {
        registerEntityType(definition);
    }

    const productType = getEntityType("product");
    assert.ok(productType);
    assert.equal(productType?.name, "Product");
    assert.ok(listEntityTypes().some((entry) => entry.type === "product"));
});
