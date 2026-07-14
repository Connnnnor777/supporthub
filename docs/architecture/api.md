# API

Current Endpoints

## GET /api/vault

Returns

- Note count
- Note metadata
- Recent vault information

## GET /api/search

Returns ranked search results from the parsed knowledge index.

## GET /api/graph

Returns knowledge graph nodes and edges.

## GET /api/graph/related?q=<path>

Returns related notes ranked by shared wiki links, tags, aliases, headings, and direct relationships.

## GET /api/graph/backlinks?q=<path>

Returns notes that link to the requested note.

Future Endpoints

GET /api/products

GET /api/customers

GET /api/rmas

POST /api/ai
