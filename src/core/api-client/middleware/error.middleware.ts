import type { Middleware } from "openapi-fetch";
import { ApiError } from "../domain/api.error";

/**
 * openapi-fetch's `onError` does NOT fire on 4xx/5xx — those must be handled in `onResponse`.
 * Throws a typed `ApiError` on any non-ok response. Successful payloads are the resource body
 * (there is no success/data envelope to unwrap).
 */
export const errorMiddleware: Middleware = {
  async onResponse({ response }) {
    if (!response.ok) {
      throw new ApiError(response.status, `${response.status} ${response.statusText}`);
    }
    return response;
  },
};
