# SupportHub Development Guidelines

## Project Overview

SupportHub is an AI-powered internal support operations platform for Customer Support, Service, Engineering, and Operations.

The application centralizes product knowledge, troubleshooting guides, warranty information, RMAs, SAP workflows, Salesforce cases, documentation, and AI-assisted search into a single platform.

The overall experience should combine the strengths of:

- Notion
- Linear
- Confluence
- GitHub
- Obsidian
- Salesforce Service Console

The UI should feel modern, fast, and information-dense while remaining easy to navigate.

---

# Tech Stack

Use the following technologies unless explicitly instructed otherwise.

- Next.js 16 App Router
- React 19
- TypeScript (strict mode)
- Tailwind CSS v4
- shadcn/ui
- Lucide React
- TanStack Table
- React Hook Form
- Zod
- Framer Motion (subtle animations only)
- Fuse.js (search)
- React Query when client-side data caching is needed

---

# Architecture

Prefer clean architecture.

Separate concerns into:

app/
components/
features/
lib/
hooks/
services/
types/
utils/

Business logic should never live inside UI components.

Complex logic belongs in services or lib.

Pages should primarily compose components.

---

# Component Standards

Always:

- Use functional components
- Use Server Components by default
- Only use Client Components when necessary
- Keep components small and reusable
- Strongly type all props
- Export interfaces when appropriate
- Avoid duplicated logic
- Prefer composition over inheritance

---

# Styling Standards

Use:

- Tailwind CSS utilities
- shadcn/ui components whenever possible
- Design tokens instead of hardcoded values

Never:

- Use inline styles
- Hardcode colors
- Create unnecessary CSS files
- Duplicate utility classes repeatedly

Use `cn()` for conditional styling.

---

# UI Philosophy

Design for professional internal software.

Characteristics:

- Clean
- Dense
- Fast
- Minimal
- Keyboard-friendly
- Accessible
- Mobile responsive
- Dark mode ready

Every screen should prioritize usability over decoration.

---

# Code Standards

Always:

- Prefer async/await
- Use modern ES syntax
- Keep functions focused
- Return early
- Avoid deeply nested logic
- Write readable code
- Use descriptive names

Never:

- Use `any`
- Leave TODO comments
- Leave console.log statements
- Suppress TypeScript errors
- Duplicate code

---

# TypeScript

Always:

- Use strict typing
- Prefer interfaces for objects
- Prefer type inference when obvious
- Create shared types inside `/types`

Avoid:

- any
- unknown unless necessary
- type assertions unless unavoidable

---

# Data Fetching

Prefer:

Server Components

Server Actions

Route Handlers

Only fetch client-side when user interaction requires it.

---

# Forms

Use:

- React Hook Form
- Zod validation

Validation should exist both client-side and server-side.

---

# Icons

Use Lucide React exclusively.

Choose icons that clearly communicate intent.

---

# Tables

Use TanStack Table.

Support:

- Sorting
- Filtering
- Pagination
- Column visibility
- Row selection

---

# Search

SupportHub relies heavily on search.

Search components should be designed for:

- Instant results
- Keyboard navigation
- Fuzzy matching
- Highlighted matches
- Filters
- Large datasets

---

# AI Features

AI should always be grounded in indexed documentation.

Responses should:

- Reference source documents
- Avoid hallucinations
- Prefer existing knowledge over generated content

---

# Accessibility

Every feature should support:

- Keyboard navigation
- Focus indicators
- ARIA labels
- Screen readers
- High contrast

---

# Performance

Optimize for:

- Minimal client JavaScript
- Server rendering
- Lazy loading
- Code splitting
- Image optimization
- Virtualized large lists
- Memoization where appropriate

---

# Error Handling

Provide:

- Error boundaries
- Loading states
- Empty states
- Retry actions
- Helpful error messages

Never expose raw stack traces.

---

# Preferred Libraries

UI:
- shadcn/ui
- Lucide React

Validation:
- Zod

Forms:
- React Hook Form

Tables:
- TanStack Table

Animation:
- Framer Motion

Utilities:
- clsx
- tailwind-merge

---

# Documentation

Every exported function should be understandable from its name alone.

Complex business logic should include concise JSDoc comments.

---

# Goal

Every generated feature should be production-ready.

Prioritize:

1. Maintainability
2. Readability
3. Performance
4. Accessibility
5. Reusability
6. Strong typing
7. Consistent architecture

Generate code that could confidently ship to production without major refactoring.