/**
 * Root of all typed domain errors. Each module subclasses this with its own code enum
 * (module isolation — never share error types across modules).
 */
export abstract class DomainError<TCode extends string = string, TContext = unknown> extends Error {
  constructor(
    public readonly code: TCode,
    message?: string,
    public readonly context?: TContext,
  ) {
    super(message ?? code);
    this.name = new.target.name;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  static isInstance(value: unknown): value is DomainError {
    return value instanceof DomainError;
  }

  toJSON() {
    return { name: this.name, code: this.code, message: this.message, context: this.context };
  }
}
