import { createQueryKeys } from "@lukemorales/query-key-factory";

/** Movie lists (page is 1-based) and detail, keyed for TanStack Query. */
export const moviesKeys = createQueryKeys("movies", {
  nowPlaying: (page: number) => ({
    queryKey: ["now-playing", { page }] as const,
  }),
  trending: (page: number) => ({
    queryKey: ["trending", { page }] as const,
  }),
  detail: (id: number) => ({
    queryKey: ["detail", id] as const,
  }),
});
