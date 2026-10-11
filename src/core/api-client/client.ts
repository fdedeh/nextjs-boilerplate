import createClient, { type Client } from "openapi-fetch";
import type { paths } from "./generated/schema";
import { errorMiddleware } from "./middleware/error.middleware";
import { loggerMiddleware } from "./middleware/logger.middleware";

export interface ApiClientDeps {
  /** Same-origin proxy base, e.g. `/api/tmdb`. Paths in the generated spec already include `/3`. */
  baseUrl: string;
}

export function createApiClient(deps: ApiClientDeps): Client<paths> {
  const client = createClient<paths>({ baseUrl: deps.baseUrl });
  client.use(errorMiddleware, loggerMiddleware);
  return client;
}
