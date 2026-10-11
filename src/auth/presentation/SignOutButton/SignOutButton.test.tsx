import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SignOutButton } from "./SignOutButton";

vi.mock("next-auth/react", () => ({
  signOut: vi.fn(),
}));

describe("SignOutButton", () => {
  it("is labeled for assistive tech", () => {
    render(<SignOutButton />);
    expect(screen.getByRole("button", { name: "Sign out" })).toBeInTheDocument();
  });
});
