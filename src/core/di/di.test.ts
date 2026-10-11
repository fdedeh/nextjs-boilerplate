import "reflect-metadata";
import { container, inject, injectable } from "tsyringe";
import { expect, test } from "vitest";

// Regression guard: tsyringe constructor injection requires decorator metadata
// (design:paramtypes). Proven to work under both Vitest and the Next SWC build.
const DEP = Symbol("DEP");

@injectable()
class Dep {
  value() {
    return 42;
  }
}

@injectable()
class Consumer {
  constructor(@inject(DEP) public readonly dep: Dep) {}
  run() {
    return this.dep.value();
  }
}

test("tsyringe constructor injection resolves the dependency", () => {
  container.register(DEP, { useClass: Dep });
  const c = container.resolve(Consumer);
  expect(c.dep).toBeDefined();
  expect(c.run()).toBe(42);
});
