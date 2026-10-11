import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./ThemeToggle";

vi.mock("next-themes", () => ({
  useTheme: () => ({ setTheme: vi.fn(), theme: "light" }),
}));

describe("ThemeToggle", () => {
  it("exposes a theme button", () => {
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Toggle theme" })).toBeInTheDocument();
  });
});
