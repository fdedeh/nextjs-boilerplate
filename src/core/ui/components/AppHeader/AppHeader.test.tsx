import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppHeader } from "./AppHeader";

vi.mock("next/navigation", () => ({
  usePathname: () => "/now-playing",
}));

describe("AppHeader", () => {
  it("marks the active nav item", () => {
    render(
      <AppHeader
        navItems={[
          { href: "/now-playing", label: "Now Playing" },
          { href: "/trending", label: "Trending" },
        ]}
        onSignOut={() => undefined}
      />,
    );
    expect(screen.getAllByRole("link", { name: "Now Playing" })[0]).toHaveAttribute("aria-current", "page");
  });
});
