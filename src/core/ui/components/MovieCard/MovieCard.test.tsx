import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MovieCard } from "./MovieCard";

describe("MovieCard", () => {
  it("links the title to the movie", () => {
    render(<MovieCard id={1} title="Dune" href="/movies/1" releaseDate="Oct 22, 2021" rating={8} />);
    expect(screen.getByRole("link", { name: /Dune/ })).toHaveAttribute("href", "/movies/1");
  });

  it("renders without a poster", () => {
    render(<MovieCard id={2} title="Untitled" href="/movies/2" />);
    expect(screen.getByRole("link", { name: /Untitled/ })).toBeInTheDocument();
  });
});
