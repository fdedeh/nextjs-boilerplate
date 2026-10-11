import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { AppShell } from "./AppShell";

vi.mock("next/navigation", () => ({
  usePathname: () => "/now-playing",
}));

describe("AppShell", () => {
  it("renders the wordmark and page content", () => {
    render(
      <AppShell signOut={<button type="button">Sign out</button>}>
        <p>Page body</p>
      </AppShell>,
    );
    expect(screen.getByText("Movies")).toBeInTheDocument();
    expect(screen.getByText("Page body")).toBeInTheDocument();
  });
});
