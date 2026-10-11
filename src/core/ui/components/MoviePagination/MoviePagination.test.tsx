import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MoviePagination } from "./MoviePagination";

describe("MoviePagination", () => {
  it("hides when there is a single page", () => {
    const { container } = render(
      <MoviePagination page={1} totalPages={1} hrefForPage={(page) => `/now-playing?page=${page}`} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("links to the next page", () => {
    render(<MoviePagination page={1} totalPages={3} hrefForPage={(page) => `/now-playing?page=${page}`} />);
    expect(screen.getByRole("button", { name: "Go to next page" })).toHaveAttribute(
      "href",
      "/now-playing?page=2",
    );
  });
});
