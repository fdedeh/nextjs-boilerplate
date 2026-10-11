import { container } from "./container";
import { LOGGER } from "./tokens";

let registered = false;

/**
 * Composition root. Binds foundation services. Idempotent — safe to call from the
 * client `<Providers>` bootstrap. Feature `register()` functions are wired beside it.
 */
export function registerCore(): void {
  if (registered) return;
  registered = true;

  container.register(LOGGER, { useValue: console });
}
