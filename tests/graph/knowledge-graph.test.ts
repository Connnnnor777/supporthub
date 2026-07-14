import assert from "node:assert/strict";
import test from "node:test";

import {
    buildKnowledgeGraph,
    getBacklinks,
    getOutgoingLinks,
    getRelatedNotes,
} from "../../lib/knowledge-graph/graph.service.ts";
import type { KnowledgeDocument } from "../../lib/vault/types.ts";

function note(
    title: string,
    links: KnowledgeDocument["links"] = [],
    overrides: Partial<KnowledgeDocument> = {}
): KnowledgeDocument {
    return {
        title,
        path: `${title}.md`,
        folder: ".",
        modified: "2026-07-14T00:00:00.000Z",
        frontmatter: {},
        headings: [],
        tags: [],
        aliases: [],
        links,
        content: "",
        ...overrides,
    };
}

test("buildKnowledgeGraph creates nodes and wiki-link edges", () => {
    const graph = buildKnowledgeGraph([
        note("Driver", [{ target: "Warranty", embed: false }]),
        note("Warranty"),
    ]);

    assert.equal(graph.nodes.length, 2);
    assert.deepEqual(graph.edges, [
        {
            source: "driver",
            target: "warranty",
            type: "wiki-link",
            alias: undefined,
        },
    ]);
});

test("buildKnowledgeGraph gracefully ignores broken links", () => {
    const graph = buildKnowledgeGraph([
        note("Driver", [{ target: "Missing", embed: false }]),
    ]);

    assert.equal(graph.nodes.length, 1);
    assert.equal(graph.edges.length, 0);
});

test("buildKnowledgeGraph supports circular links", () => {
    const graph = buildKnowledgeGraph([
        note("Driver", [{ target: "Warranty", embed: false }]),
        note("Warranty", [{ target: "Driver", embed: false }]),
    ]);

    assert.equal(graph.edges.length, 2);
    assert.deepEqual(
        graph.edges.map((edge) => `${edge.source}->${edge.target}`).sort(),
        ["driver->warranty", "warranty->driver"]
    );
});

test("getBacklinks returns source nodes", () => {
    const graph = buildKnowledgeGraph([
        note("Driver", [{ target: "Warranty", embed: false }]),
        note("RMA", [{ target: "Warranty", embed: false }]),
        note("Warranty"),
    ]);

    assert.deepEqual(
        getBacklinks("Warranty.md", graph).map((node) => node.title).sort(),
        ["Driver", "RMA"]
    );
});

test("getOutgoingLinks returns target nodes", () => {
    const graph = buildKnowledgeGraph([
        note("Driver", [
            { target: "Warranty", embed: false },
            { target: "RMA", embed: true },
        ]),
        note("RMA"),
        note("Warranty"),
    ]);

    assert.deepEqual(
        getOutgoingLinks("Driver.md", graph).map((node) => node.title).sort(),
        ["RMA", "Warranty"]
    );
});

test("getRelatedNotes ranks related notes by strongest relationships", () => {
    const notes = [
        note("EVO Omni", [{ target: "Driver", embed: false }], {
            tags: ["evo", "pos"],
            aliases: ["Omni"],
            headings: [{ level: 2, text: "Troubleshooting", slug: "troubleshooting" }],
        }),
        note("Driver", [], { tags: ["evo"] }),
        note("Warranty", [{ target: "Driver", embed: false }], {
            tags: ["evo", "pos"],
            aliases: ["Omni"],
            headings: [{ level: 2, text: "Troubleshooting", slug: "troubleshooting" }],
        }),
        note("Unrelated"),
    ];
    const graph = buildKnowledgeGraph(notes);

    const related = getRelatedNotes("EVO Omni.md", notes, graph);

    assert.equal(related[0].title, "Warranty");
    assert.ok(related[0].score > related[1].score);
    assert.equal(related.some((result) => result.title === "Unrelated"), false);
});

test("resolver handles duplicate titles by preferring same-folder match", () => {
    const graph = buildKnowledgeGraph([
        note("Index", [{ target: "Driver", embed: false }], {
            path: "Products/Index.md",
            folder: "Products",
        }),
        note("Driver", [], {
            path: "Products/Driver.md",
            folder: "Products",
        }),
        note("Driver", [], {
            path: "Archive/Driver.md",
            folder: "Archive",
        }),
    ]);

    assert.deepEqual(graph.edges, [
        {
            source: "products/index",
            target: "products/driver",
            type: "wiki-link",
            alias: undefined,
        },
    ]);
});

test("buildKnowledgeGraph handles an empty vault", () => {
    const graph = buildKnowledgeGraph([]);

    assert.deepEqual(graph, {
        nodes: [],
        edges: [],
    });
});

test("buildKnowledgeGraph handles a larger vault", () => {
    const notes = Array.from({ length: 250 }, (_, index) =>
        note(`Note ${index}`, index === 0 ? [] : [{ target: `Note ${index - 1}`, embed: false }])
    );
    const graph = buildKnowledgeGraph(notes);

    assert.equal(graph.nodes.length, 250);
    assert.equal(graph.edges.length, 249);
});
