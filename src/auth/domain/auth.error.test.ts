import { describe, expect, it } from "vitest";
import { AuthError } from "./auth.error";

describe("AuthError", () => {
  it("carries the credential code", () => {
    const error = new AuthError("INVALID_CREDENTIALS", "Invalid username or password.");
    expect(error.code).toBe("INVALID_CREDENTIALS");
    expect(error.message).toBe("Invalid username or password.");
  });
});
