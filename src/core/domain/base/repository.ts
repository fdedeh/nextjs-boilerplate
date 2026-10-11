import { container } from "@/core/di/container";
import { LOGGER } from "@/core/di/tokens";

/** Base repository. Resolves shared infrastructure (logger) lazily from the DI container. */
export abstract class Repository {
  protected get logger(): Console {
    return container.resolve<Console>(LOGGER);
  }
}
