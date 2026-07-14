# Architecture Overview

SupportHub is a knowledge platform built around an Obsidian vault.

The application reads Markdown files from the vault and exposes them through services and APIs.

## Architecture

User

↓

Dashboard / Search / AI

↓

API Routes

↓

Services

↓

Vault Engine

↓

Obsidian Vault

## Design Goals

- Single source of truth
- Modular services
- Reusable APIs
- Strong separation of UI and business logic