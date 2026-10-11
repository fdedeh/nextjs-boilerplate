import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SignInScreen } from "./SignInScreen";

const signIn = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn(), refresh: vi.fn() }),
}));

vi.mock("next-auth/react", () => ({
  signIn: (...args: unknown[]) => signIn(...args),
}));

describe("SignInScreen", () => {
  it("shows an error for an empty submit", () => {
    render(<SignInScreen />);
    fireEvent.submit(screen.getByRole("button", { name: "Sign in" }).closest("form")!);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid username or password.");
    expect(signIn).not.toHaveBeenCalled();
  });
});
