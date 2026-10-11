# Auth

Demo sign-in for a single user, `admin` / `admin`. Clean Architecture: the password check is a pure domain function; Auth.js is the adapter; the form is presentation.

Route: `/signin`. After a successful sign-in the app lands on `/now-playing`. Guests are sent to `/signin` by `src/proxy.ts`. A signed-in user who opens `/signin` is sent to `/now-playing`.

- `domain/authenticate.ts` — `authenticate(credentials): Result<TUser, AuthError>`.
- `domain/auth.error.ts` — `AuthError` with `INVALID_CREDENTIALS`, `UNAUTHENTICATED`, `SESSION_EXPIRED`.
- `domain/user.entity.ts` — `TUser` (`username`) and `User`.
- `application/resolve-auth-redirect.ts` — pure redirect decision used by the proxy. No roles.
- `application/use-current-user.ts` — reads the Auth.js session.
- `data/auth.config.ts` — Credentials provider. `authorize` maps a failed `Result` to `null`.
- `data/auth.ts` — Auth.js `handlers`, `auth`, `signIn`, `signOut`. Not re-exported from the feature façade, so the proxy can import it without pulling React into that bundle.
- `presentation/SignInForm` — fields and inline error.
- `presentation/screens/SignInScreen` — calls `signIn("credentials", { redirect: false })`. See `SignInScreen.agents.md`.
- `presentation/SignOutButton` — `signOut({ callbackUrl: "/signin" })`.
- `di/register.ts` — `registerAuth()` is intentionally empty. There is no client session repository.

## Invariants

- The demo check runs on the server inside `authorize`. Do not add a client `LoginUseCase`.
- Wrong or empty credentials show "Invalid username or password." Inline only.
- The façade `@/auth` does not export the Auth.js instance. `src/proxy.ts` and `src/app/api/auth/**` import `@/auth/data/auth` directly.
- There is no role gate and no unauthorized page.

## Gaps

Swap `authenticate()` for a real provider later. Keep the proxy, session provider, and façade in place.
