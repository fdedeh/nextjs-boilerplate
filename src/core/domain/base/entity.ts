/** Base class for domain entities — a typed wrapper over an immutable data object. */
export abstract class Entity<T> {
  constructor(protected readonly data: T) {}

  toJSON(): T {
    return this.data;
  }
}
