import { container } from "@/core/di/container";
import { createApiClient, type ApiClientDeps } from "../client";
import { API_CLIENT } from "./tokens";

/**
 * Registers the browser API client. Called from `<Providers>` at boot.
 * The client talks to the same-origin proxy; it does not carry a user token.
 */
export function registerApiClient(deps: ApiClientDeps): void {
  if (container.isRegistered(API_CLIENT)) return;
  container.register(API_CLIENT, { useValue: createApiClient(deps) });
}
