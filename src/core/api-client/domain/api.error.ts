import { DomainError } from "@/core/domain/base/domain.error";

/** Transport-level error. Thrown by the api-client middleware on any non-OK response. */
export class ApiError extends DomainError<"API_ERROR"> {
  constructor(
    public readonly status: number,
    message: string,
    context?: unknown,
  ) {
    super("API_ERROR", message, context);
  }

  isUnauthorized(): boolean {
    return this.status === 401;
  }

  isNotFound(): boolean {
    return this.status === 404;
  }
}
