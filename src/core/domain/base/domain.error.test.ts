import { describe, expect, it } from "vitest";
import { DomainError } from "./domain.error";

class SampleError extends DomainError<"SAMPLE"> {}

describe("DomainError", () => {
  it("identifies instances and serializes the code", () => {
    const error = new SampleError("SAMPLE", "nope");
    expect(DomainError.isInstance(error)).toBe(true);
    expect(DomainError.isInstance(new Error("nope"))).toBe(false);
    expect(error.toJSON()).toMatchObject({ name: "SampleError", code: "SAMPLE", message: "nope" });
  });
});
