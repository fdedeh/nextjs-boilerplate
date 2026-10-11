// Type-only import: pulls in the lib's `declare global { Window.__ENV }` declaration.
import type {} from "next-runtime-env";

/**
 * Reads a `NEXT_PUBLIC_*` var at runtime. In the browser the values come from `window.__ENV`,
 * injected per request by `<PublicEnvScript />` in the root layout. Outside the browser it falls
 * back to `process.env`.
 *
 * We read `window.__ENV` / `process.env` ourselves instead of the library `env()` helper: that
 * helper depends on a Next server API this version no longer provides, and it is unavailable in
 * Storybook.
 */
export function publicEnv(key: `NEXT_PUBLIC_${string}`): string | undefined {
  if (typeof window !== "undefined" && window.__ENV) return window.__ENV[key];
  return typeof process !== "undefined" ? process.env[key] : undefined;
}

/** Client-safe runtime config. Lazy getters — values resolve on access, never at module load. */
export const clientEnv = {
  get tmdbProxyBase(): string {
    return publicEnv("NEXT_PUBLIC_TMDB_PROXY_BASE") ?? "/api/tmdb";
  },
  get tmdbImageBase(): string {
    return publicEnv("NEXT_PUBLIC_TMDB_IMAGE_BASE") ?? "https://image.tmdb.org/t/p";
  },
} as const;
