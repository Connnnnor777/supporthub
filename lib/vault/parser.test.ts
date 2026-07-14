import assert from "node:assert/strict"
import test from "node:test"

import { parseKnowledgeMarkdown } from "./parser.ts"

test("parseKnowledgeMarkdown extracts frontmatter, aliases, and tags", () => {
    const parsed = parseKnowledgeMarkdown(`---
product: EVO Omni
vendor: Custom America
aliases:
  - Omni
  - EVO
tags:
  - evo
  - install
---

# Installation

Setup notes for #support.
`)

    assert.equal(parsed.frontmatter.product, "EVO Omni")
    assert.equal(parsed.frontmatter.vendor, "Custom America")
    assert.deepEqual(parsed.aliases, ["Omni", "EVO"])
    assert.deepEqual(parsed.tags, ["evo", "install", "support"])
})

test("parseKnowledgeMarkdown extracts headings and wiki links", () => {
    const parsed = parseKnowledgeMarkdown(`# Install Guide

See [[EVO Omni|the Omni]] and ![[Pasted image.png]].

## Driver Setup
`)

    assert.deepEqual(parsed.headings, [
        {
            level: 1,
            text: "Install Guide",
            slug: "install-guide",
        },
        {
            level: 2,
            text: "Driver Setup",
            slug: "driver-setup",
        },
    ])

    assert.deepEqual(parsed.links, [
        {
            target: "EVO Omni",
            alias: "the Omni",
            embed: false,
        },
        {
            target: "Pasted image.png",
            alias: undefined,
            embed: true,
        },
    ])
})
