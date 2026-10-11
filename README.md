# Movies boilerplate

A cloneable Next.js 16 + React 19 starter. Screens are client-rendered. Each feature is split into `domain`, `data`, `application`, and `presentation`, wired with tsyringe. Two sample features ship with the repo: **auth** (a Credentials sign-in for `admin` / `admin`) and **movies** (lists and a detail page, loaded through a same-origin proxy).

Agent-oriented notes live in [CLAUDE.md](CLAUDE.md). A teaching walkthrough of the layers is in [architecture.html](architecture.html).

## Tech stack

| Area | Choice |
|---|---|
| Framework | Next.js 16 (App Router). The server runs Auth.js, the auth proxy, and `/api/tmdb`. Data fetching is in the browser. |
| UI runtime | React 19, TypeScript strict |
| Styling | Tailwind CSS v4, shadcn/ui (default theme), Geist |
| Server state | TanStack Query v5 + `@lukemorales/query-key-factory` |
| DI | tsyringe (Symbol tokens, `@injectable` adapters, per-module `register.ts`) |
| Errors | neverthrow `Result` for use-cases; repositories throw typed `DomainError` |
| API client | `openapi-typescript` (generated types) + `openapi-fetch` |
| Auth | Auth.js v5 Credentials |
| Tests | Vitest + Testing Library, Storybook, Playwright |
| Tooling | ESLint, Prettier, dependency-cruiser, Storybook 10 |
| Package manager | **bun** (`bun.lock` committed) |

## Prerequisites

- **bun** (the repo pins the package manager in `package.json`)
- **Node.js** ≥ 20
- A [TMDB](https://developer.themoviedb.org/docs/getting-started) **v4 read access token** for live lists. End-to-end tests stub `/api/tmdb` and do not need one.

## Setup

```bash
bun install
cp .env.example .env.local
```

Fill `.env.local`:

```bash
AUTH_SECRET=                 # bunx auth secret
TMDB_READ_ACCESS_TOKEN=      # server-only. Never prefix with NEXT_PUBLIC_
```

`.env.local` is gitignored. The demo sign-in is username `admin`, password `admin`.

## Running the app

```bash
bun run dev
```

Open <http://localhost:3000>. Guests are redirected to `/signin`. After sign-in the app opens **Now Playing**.

```bash
bun run build
bun run start
```

If the token is missing, lists show an error with Retry. They do not render an empty grid.

## Common commands

| Command | What it does |
|---|---|
| `bun run dev` | Dev server on <http://localhost:3000> |
| `bun run build` / `bun run start` | Production build / serve |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run lint` | ESLint, including façade and path-suffix rules |
| `bun run format` | Prettier |
| `bun run depcruise` | Clean Architecture layer check |
| `bun run test` | Vitest unit tests and Storybook tests |
| `bun run test:e2e` | Playwright (starts the dev server) |
| `bun run storybook` | Storybook on port 6006 |
| `bun run build-storybook` | Static Storybook build |
| `bun run codegen` | Regenerate `src/core/api-client/generated/schema.ts` from the official OpenAPI spec |

One test file: `bun run test -- src/auth/domain/authenticate.test.ts`.

## Project layout

```
src/app/                  # thin routes, providers, /api/auth, /api/tmdb
src/proxy.ts              # guest redirect
src/auth/                 # credentials feature (not under core)
src/core/di               # composition root helpers
src/core/domain/base      # Entity, DomainError, UseCase, Result
src/core/api-client       # openapi-fetch client + generated schema
src/core/query            # QueryClient, query keys
src/core/config           # publicEnv()
src/core/ui               # shadcn primitives and shell components
src/core/movies           # lists + detail
```

Features live under `src/core/`. `auth/` is the exception.

## Architecture

Dependencies point inward. `domain` has no React, Next, Query, or fetch imports. `data` maps upstream DTOs and is the only place request paths are written. `application` exposes read hooks (and, later, mutation use-cases) that depend on ports. `presentation` renders view models. tsyringe is bootstrapped in `src/app/providers.tsx`. Other features import a module only through its `index.ts`.

## Testing and docs

Colocate a Vitest file with every component. Colocate a Storybook file with every UI component. Colocate `ScreenName.agents.md` with every screen, and keep `src/core/<feature>/<feature>.md` (or `src/auth/auth.md`) up to date.

Gate: `bun run typecheck && bun run lint && bun run test`.

## What this starter does not include

Deployment manifests, a container build, a global client store, charts, and a data-grid. Add those in the product that clones this repo.

## Documentation map

1. [CLAUDE.md](CLAUDE.md) — rules for agents
2. This file — how to run the app
3. [architecture.html](architecture.html) — why the layers exist
4. Feature `.md`, then `Component.md`, then `Screen.agents.md`
