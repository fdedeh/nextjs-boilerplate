import { describe, expect, it } from "vitest";
import { authenticate } from "./authenticate";

describe("authenticate", () => {
  it("accepts the demo user", () => {
    const result = authenticate({ username: "admin", password: "admin" });
    expect(result.isOk()).toBe(true);
    if (result.isOk()) expect(result.value.username).toBe("admin");
  });

  it("rejects a wrong password", () => {
    const result = authenticate({ username: "admin", password: "nope" });
    expect(result.isErr()).toBe(true);
    if (result.isErr()) expect(result.error.code).toBe("INVALID_CREDENTIALS");
  });

  it("rejects empty credentials", () => {
    const result = authenticate({ username: "  ", password: "" });
    expect(result.isErr()).toBe(true);
  });
});
