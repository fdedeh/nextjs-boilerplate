import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MovieGrid } from "./MovieGrid";

describe("MovieGrid", () => {
  it("renders its children", () => {
    render(
      <MovieGrid>
        <p>Card</p>
      </MovieGrid>,
    );
    expect(screen.getByText("Card")).toBeInTheDocument();
  });
});
