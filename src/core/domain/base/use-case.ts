/**
 * Base use-case. Used for mutations / orchestration that return a neverthrow `Result`.
 * Reads bypass use-cases (UI `useQuery` calls a repository directly).
 */
export abstract class UseCase<TOutput = void, TInput = void> {
  abstract execute(input: TInput): Promise<TOutput>;
}
