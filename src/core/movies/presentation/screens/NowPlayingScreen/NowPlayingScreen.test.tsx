import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { NowPlayingScreen } from "./NowPlayingScreen";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("page=1"),
}));

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

vi.mock("../../../application/queries/use-now-playing", () => ({
  useNowPlaying: () => ({
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
    data: {
      page: 1,
      totalPages: 1,
      totalResults: 1,
      results: [
        {
          id: 1,
          title: "Dune",
          overview: "",
          posterPath: null,
          backdropPath: null,
          releaseDate: "2021-10-22",
          voteAverage: 8,
        },
      ],
    },
  }),
}));

describe("NowPlayingScreen", () => {
  it("lists a movie", () => {
    render(<NowPlayingScreen />);
    expect(screen.getByRole("heading", { name: "Now Playing" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Dune/ })).toHaveAttribute("href", "/movies/1");
  });
});
