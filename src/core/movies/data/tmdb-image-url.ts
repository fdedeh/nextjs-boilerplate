import { clientEnv } from "@/core/config/env";

export type TmdbImageSize = "w185" | "w342" | "w500" | "w780" | "w1280" | "original";

/** Builds a CDN url for a TMDB file path. Returns undefined when the path is missing. */
export function tmdbImageUrl(path: string | null | undefined, size: TmdbImageSize): string | undefined {
  if (!path) return undefined;
  const base = clientEnv.tmdbImageBase.replace(/\/$/, "");
  const file = path.startsWith("/") ? path : `/${path}`;
  return `${base}/${size}${file}`;
}
