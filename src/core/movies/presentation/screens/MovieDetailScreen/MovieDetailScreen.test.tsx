import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { MovieDetailScreen } from "./MovieDetailScreen";

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

vi.mock("../../../application/queries/use-movie", () => ({
  useMovie: () => ({
    isLoading: false,
    isError: false,
    error: null,
    refetch: vi.fn(),
    data: {
      id: 1,
      title: "Dune",
      overview: "Desert politics.",
      posterPath: null,
      backdropPath: null,
      releaseDate: "2021-10-22",
      voteAverage: 8,
      runtime: 155,
      tagline: "It begins.",
      genres: [{ id: 1, name: "Science Fiction" }],
    },
  }),
}));

describe("MovieDetailScreen", () => {
  it("renders the overview and genre", () => {
    render(<MovieDetailScreen movieId="1" />);
    expect(screen.getByRole("heading", { name: "Dune" })).toBeInTheDocument();
    expect(screen.getByText("Desert politics.")).toBeInTheDocument();
    expect(screen.getByText("Science Fiction")).toBeInTheDocument();
  });

  it("treats a non-numeric id as not found", () => {
    render(<MovieDetailScreen movieId="nope" />);
    expect(screen.getByText("Movie not found")).toBeInTheDocument();
  });
});
