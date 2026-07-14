# SupportHub Architecture

User

↓

Workspace

↓

Product Workspace

↓

Knowledge Engine

↓

Knowledge Graph

↓

Knowledge Index

↓

Vault

## Principles

- UI never reads files directly.
- Services own business logic.
- APIs expose services.
- The Obsidian vault is the source of truth.
- Product workspaces are generated from the knowledge engine rather than hardcoded registries.
- The workspace shell is the reusable application surface for all future entity workspaces.