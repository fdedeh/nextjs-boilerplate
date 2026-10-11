import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { RatingBadge } from "./RatingBadge";

describe("RatingBadge", () => {
  it("formats one decimal place", () => {
    render(<RatingBadge value={7.4} />);
    expect(screen.getByText("7.4")).toBeInTheDocument();
  });
});
