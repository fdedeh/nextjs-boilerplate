import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SignInForm } from "./SignInForm";

describe("SignInForm", () => {
  it("shows an error and submits the fields", () => {
    const onSubmit = vi.fn();
    render(<SignInForm onSubmit={onSubmit} error="Invalid username or password." />);
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid username or password.");
    fireEvent.change(screen.getByLabelText("Username"), { target: { value: "admin" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "admin" } });
    fireEvent.submit(screen.getByRole("button", { name: "Sign in" }).closest("form")!);
    expect(onSubmit).toHaveBeenCalledWith({ username: "admin", password: "admin" });
  });
});
