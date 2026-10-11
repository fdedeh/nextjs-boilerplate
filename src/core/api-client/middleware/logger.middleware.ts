import type { Middleware } from "openapi-fetch";

/** Dev-only request logger. */
export const loggerMiddleware: Middleware = {
  async onRequest({ request }) {
    if (process.env.NODE_ENV !== "production") {
      console.debug(`[api] → ${request.method} ${request.url}`);
    }
    return request;
  },
};
