# SignInScreen — AI guide

Credential form for the demo user. **Client-rendered** for the form. The session itself is created by Auth.js on the server.

- **Route:** `/signin` → `src/app/(auth)/signin/page.tsx` → `SignInScreen`. No app shell.
- **Component:** `src/auth/presentation/screens/SignInScreen/SignInScreen.tsx`.
- **Feature doc:** [`auth.md`](../../../auth.md). Read it first.

## Data hooks

There is no repository read. The form calls `signIn("credentials", { redirect: false })` from `next-auth/react`.

| Step | Where | What |
| --- | --- | --- |
| Empty username or password | screen | inline "Invalid username or password." |
| `authorize` | `src/auth/data/auth.config.ts` | calls `authenticate()` and returns `null` on `err` |
| Success | screen | `router.push("/now-playing")` |

## Sections

A centered card: title "Sign in", short description, `SignInForm`.

## How to extend

Replace `authenticate()` when a real identity provider is added. Keep the Auth.js Credentials adapter as the boundary so `proxy.ts` and the session provider stay the same shape.

## Gotchas / invariants

- Do not put the demo password check in a client use-case. Auth.js `authorize` is the authority.
- Wrong credentials stay inline. Do not toast them.
- Guests hitting any other page are redirected to `/signin` by `src/proxy.ts`.

## Clean-arch layering

`authenticate` is a pure domain function returning `Result`. The data layer adapts that to Auth.js. Presentation only calls `signIn`.

_Keep this file in sync when sections, data sources, or invariants change._
