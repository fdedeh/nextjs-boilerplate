import { QueryClient } from "@tanstack/react-query";

/** App-wide QueryClient defaults: one error surfaces once (no retry), modest staleTime. */
export function createQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60_000, retry: false, refetchOnWindowFocus: false },
      mutations: { retry: false },
    },
  });
}
