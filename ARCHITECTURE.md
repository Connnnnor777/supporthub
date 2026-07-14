# SupportHub Architecture

User

↓

Dashboard

↓

API

↓

Services

↓

Vault

↓

Filesystem

## Principles

- UI never reads files directly.
- Services own business logic.
- APIs expose services.
- The Obsidian vault is the source of truth.