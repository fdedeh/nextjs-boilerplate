import { DomainError } from "@/core/domain/base/domain.error";

export type AuthErrorCode = "INVALID_CREDENTIALS" | "UNAUTHENTICATED" | "SESSION_EXPIRED";

export class AuthError extends DomainError<AuthErrorCode> {}
