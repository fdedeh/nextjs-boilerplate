import { describe, expect, it } from "vitest";
import { ApiError } from "@/core/api-client/domain/api.error";
import { toMovieDetails, toMovieListPage } from "./movie.mapper";

describe("toMovieListPage", () => {
  it("maps a list payload to camelCase view models", () => {
    const page = toMovieListPage({
      page: 2,
      total_pages: 4,
      total_results: 40,
      results: [
        {
          id: 7,
          title: "Inception",
          overview: "A dream",
          poster_path: "/poster.jpg",
          backdrop_path: null,
          release_date: "2010-07-16",
          vote_average: 8.4,
        },
      ],
    });

    expect(page).toEqual({
      page: 2,
      totalPages: 4,
      totalResults: 40,
      results: [
        {
          id: 7,
          title: "Inception",
          overview: "A dream",
          posterPath: "/poster.jpg",
          backdropPath: null,
          releaseDate: "2010-07-16",
          voteAverage: 8.4,
        },
      ],
    });
  });

  it("throws when results is missing", () => {
    expect(() => toMovieListPage({ page: 1 })).toThrow(ApiError);
  });

  it("accepts an empty results array", () => {
    expect(toMovieListPage({ page: 1, results: [], total_pages: 0, total_results: 0 }).results).toEqual(
      [],
    );
  });
});

describe("toMovieDetails", () => {
  it("keeps genres, runtime, and tagline off the list item shape", () => {
    const movie = toMovieDetails({
      id: 7,
      title: "Inception",
      runtime: 148,
      tagline: "Your mind is the scene of the crime",
      genres: [
        { id: 1, name: "Action" },
        { id: 2, name: "" },
      ],
    });
    expect(movie.runtime).toBe(148);
    expect(movie.tagline).toBe("Your mind is the scene of the crime");
    expect(movie.genres).toEqual([
      { id: 1, name: "Action" },
      { id: 2, name: "" },
    ]);
  });
});
