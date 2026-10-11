# CLAUDE.md

This file guides AI agents working in this repository.

This is a Next.js 16 + React 19 starter. It is **client-rendered**: Next runs the Auth.js handlers, the auth proxy, and a same-origin movie proxy. Data fetching and dependency injection happen in the browser. See [README.md](README.md) for setup.

## Commands

Package manager / runner is **bun**.

```bash
bun run dev          # dev server → http://localhost:3000
bun run typecheck    # tsc --noEmit (strict)
bun run lint         # ESLint (layer / façade / no-version-suffix import rules)
bun run depcruise    # dependency-cruiser — Clean Architecture layer boundaries
bun run test         # Vitest (unit + Storybook interaction tests)
bun run test:e2e     # Playwright e2e (auto-starts dev server on :3000)
bun run storybook    # Storybook on :6006
bun run codegen      # regenerate core/api-client/generated/schema.ts from the official movie OpenAPI spec
```

Pre-merge gate: `bun run typecheck && bun run lint && bun run test`.
Single test: `bun run test -- <path>` or `bun x vitest run --project unit -t "<name>"`.

## Architecture

**Clean Architecture / DDD per feature**, dependencies point inward:
`app → presentation → application → domain ← data`, wired by **tsyringe** DI.

| Layer | Responsibility | Rules |
|---|---|---|
| `domain` | entities, repository **ports** (`I…Repository`), types, typed `DomainError` | zero framework deps (no React/Next/Query/fetch) |
| `data` | `@injectable` adapters implementing ports via `openapi-fetch` + DTO→VM mappers | the only place API paths live |
| `application` | TanStack Query **read hooks** + neverthrow **use-cases** (mutations) | depends on domain ports, never on `data` |
| `presentation` | React components/screens/hooks | calls application; renders domain VMs |
| `di` | `tokens.ts` (Symbols) + `register.ts` (port → adapter) | composed at the root container |

- **Reads bypass use-cases**: UI `useQuery` → repository (resolved via DI), no use-case. Use-cases are for mutations/orchestration and return `Result`.
- Repositories **throw** typed errors; use-cases catch and return neverthrow `Result`.
- **DI bootstrap**: [src/app/providers.tsx](src/app/providers.tsx) calls each module's `register()` on the client, including the API client. The browser client does not carry a user token.

### Where things live

- Feature modules are under **`src/core/`** (`movies`). `auth/` is the exception: `src/auth/`.
- Shared infra: `src/core/{di, domain/base, api-client, query, config, ui}`.
- `src/core/ui` = design system **only**: `primitives/` (shadcn), `components/`, `hooks/`, `utils/` (`cn`). It is presentational — dependency-cruiser forbids it from importing any feature's `domain/data/application`.
- Routing: `src/app/` (App Router, thin). Auth proxy / route protection: `src/proxy.ts`.
- Routes: `/signin`, `/now-playing`, `/trending`, `/movies/[movieId]`.

## Conventions (enforced by lint / depcruise — do not break)

- **Feature façade**: import a feature only through its `index.ts`. Deep imports (`@/core/movies/domain/…`, `@/auth/data/…`, etc.) are an ESLint error — **even within the same feature, use relative paths**, not the `@/core/<feature>/*` alias.
- **No version/dup suffixes** in import paths (`v1`, `v2`, `new`, `old`, `_old`, `-copy`). API versions belong inside `data/` mappers, never in module names.
- **Naming**: types `T`-prefixed, interfaces `I`-prefixed, enums `E`-prefixed; DI tokens `SCREAMING_SNAKE`. Files `kebab-case` with a suffix (`.repository.ts`, `.api-repository.ts`, `.usecase.ts`, `.mapper.ts`, `.keys.ts`, `.error.ts`, `.entity.ts`); components/screens `PascalCase.tsx`; hooks `camelCase.ts`. No product-prefix acronyms, no `React.FC`.
- **Feature doc:** every feature has `src/core/<feature>/<feature>.md` (auth is the exception: `src/auth/auth.md`) describing purpose, routes, layer files, and invariants — keep it in sync when the feature changes.
- **Component doc:** every component has a co-located `ComponentName.md` next to `ComponentName.tsx` (intent, props, usage) — update it in the same change that alters the component.
- **Screen agent guide:** every screen has a co-located `ScreenName.agents.md` next to `ScreenName.tsx` — the AI recipe for route, data hooks, section layout, and invariants. Read the feature `.md` first; this file is the agent recipe.
- **Tests:** every component has a colocated test file (`ComponentName.test.ts` or `ComponentName.test.tsx`).
- **Stories:** every UI component has a colocated Storybook file (`ComponentName.stories.tsx`).
- The generated client (`core/api-client/generated/*`) is committed and **machine-generated** — edit the spec source and run `bun run codegen`, never hand-edit.
- Authored components live in a folder with `index.ts` (`export { Name } from "./Name"`). Shadcn primitives stay flat files.

## API notes

- The movie API token is **server-only**. Never put it in `NEXT_PUBLIC_*` or ship it to the browser.
- Browser code calls **same-origin** `/api/tmdb`. Those handlers attach the token and forward upstream. Feature `data/` adapters talk to that same-origin client.
- Types come from **codegen against the official OpenAPI spec**. Run `bun run codegen`; never hand-edit `generated/`.
- **Fail loud on non-OK.** `openapi-fetch` does not throw on 4xx/5xx by itself — middleware throws a typed `ApiError`. Never default to `[]` / `{}` to hide a failure.
- Successful payloads are the resource body. There is **no `{ success, message, data }` envelope**.
- `NEXT_PUBLIC_*` values, when you add them, are read with `publicEnv()` from `src/core/config/env.ts` (`window.__ENV` via `<PublicEnvScript />`, otherwise `process.env`). Do not use that helper for the token.

## Project notes

- Server state via TanStack Query; no global client-state store (`presentation/*.store.ts` remains available for a later store).
- Auth is Auth.js **Credentials**: `admin` / `admin`. Wrong credentials show an inline error. No identity provider.
- A TMDB 401 means the server token is missing or rejected. Do not sign the user out for it.
