import { describe, expect, it } from "vitest";
import { resolveAuthRedirect } from "./resolve-auth-redirect";

describe("resolveAuthRedirect", () => {
  it("sends guests to the sign-in page", () => {
    expect(resolveAuthRedirect({ pathname: "/trending", isAuthenticated: false })).toBe("/signin");
    expect(resolveAuthRedirect({ pathname: "/", isAuthenticated: false })).toBe("/signin");
  });

  it("leaves guests on the sign-in page", () => {
    expect(resolveAuthRedirect({ pathname: "/signin", isAuthenticated: false })).toBeNull();
  });

  it("sends a signed-in user away from the sign-in page", () => {
    expect(resolveAuthRedirect({ pathname: "/signin", isAuthenticated: true })).toBe("/now-playing");
  });

  it("leaves a signed-in user on app routes", () => {
    expect(resolveAuthRedirect({ pathname: "/movies/7", isAuthenticated: true })).toBeNull();
  });
});
