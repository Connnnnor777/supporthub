# Services

Services contain business logic.

UI components never interact directly with the filesystem.

## Current Services

### Vault Service

Responsibilities

- Load notes
- Count notes
- Return recent notes

### Search Service

Responsibilities

- Score notes
- Rank results
- Keep API responses lean
- Optionally accept graph context for additive boosts

### Knowledge Graph Service

Responsibilities

- Build graph nodes and edges from parsed knowledge documents
- Resolve wiki links
- Return backlinks
- Return outgoing links
- Rank related notes
- Cache graph data in memory

Future Services

- AI Service
- Customer Service
- Product Service
- RMA Service
