import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MovieCardSkeleton } from "./MovieCardSkeleton";

describe("MovieCardSkeleton", () => {
  it("renders a placeholder", () => {
    const { container } = render(<MovieCardSkeleton />);
    expect(container.firstChild).toBeTruthy();
  });
});
