import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EmptyState } from "./EmptyState";

describe("EmptyState", () => {
  it("renders the title and description", () => {
    render(<EmptyState title="Nothing here" description="Try another page." />);
    expect(screen.getByText("Nothing here")).toBeInTheDocument();
    expect(screen.getByText("Try another page.")).toBeInTheDocument();
  });
});
