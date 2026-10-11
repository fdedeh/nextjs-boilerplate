import { ApiError } from "@/core/api-client/domain/api.error";

export function isNotFound(error: unknown): boolean {
  return error instanceof ApiError && error.isNotFound();
}
