import assert from "node:assert/strict";
import test from "node:test";

import { createDefaultEntityDefinitions, getEntityType, listEntityTypes, registerEntityType } from "../../lib/entities/index.ts";

test("default entity definitions register a product entity type", () => {
    for (const definition of createDefaultEntityDefinitions()) {
        registerEntityType(definition);
    }

    const productType = getEntityType("product");
    assert.ok(productType);
    assert.equal(productType?.name, "Product");
    assert.ok(listEntityTypes().some((entry) => entry.type === "product"));
});
