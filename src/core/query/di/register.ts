import type { QueryClient } from "@tanstack/react-query";
import { container } from "@/core/di/container";
import { QUERY_CLIENT } from "./tokens";

/** Registers the QueryClient so future use-cases can invalidate caches via DI. */
export function registerQueryClient(client: QueryClient): void {
  if (container.isRegistered(QUERY_CLIENT)) return;
  container.register(QUERY_CLIENT, { useValue: client });
}
