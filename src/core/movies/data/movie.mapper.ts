import { ApiError } from "@/core/api-client/domain/api.error";
import type { TMovieDetails, TMovieGenre, TMovieListItem, TMovieListPage } from "../domain/movie.types";

/** Structural slice of a TMDB list or detail payload. Fields are optional because the spec marks them so. */
export type TMovieDto = {
  id?: number;
  title?: string;
  overview?: string;
  poster_path?: string | null;
  backdrop_path?: string | null;
  release_date?: string | null;
  vote_average?: number;
  runtime?: number | null;
  tagline?: string | null;
  genres?: { id?: number; name?: string }[] | null;
};

export type TMovieListDto = {
  page?: number;
  total_pages?: number;
  total_results?: number;
  results?: TMovieDto[] | null;
};

function requireId(dto: TMovieDto): number {
  if (typeof dto.id !== "number") {
    throw new ApiError(200, "Movie payload is missing id", dto);
  }
  return dto.id;
}

export function toMovieListItem(dto: TMovieDto): TMovieListItem {
  return {
    id: requireId(dto),
    title: dto.title ?? "",
    overview: dto.overview ?? "",
    posterPath: dto.poster_path ?? null,
    backdropPath: dto.backdrop_path ?? null,
    releaseDate: dto.release_date ? dto.release_date : null,
    voteAverage: dto.vote_average ?? 0,
  };
}

export function toMovieListPage(dto: TMovieListDto): TMovieListPage {
  if (!Array.isArray(dto.results)) {
    throw new ApiError(200, "Movie list payload is missing results", dto);
  }
  return {
    page: dto.page ?? 1,
    totalPages: dto.total_pages ?? 1,
    totalResults: dto.total_results ?? dto.results.length,
    results: dto.results.map(toMovieListItem),
  };
}

export function toMovieDetails(dto: TMovieDto): TMovieDetails {
  const genres: TMovieGenre[] = (dto.genres ?? [])
    .filter((genre): genre is { id: number; name: string } => {
      return typeof genre.id === "number" && typeof genre.name === "string";
    })
    .map((genre) => ({ id: genre.id, name: genre.name }));

  return {
    ...toMovieListItem(dto),
    runtime: dto.runtime ?? null,
    tagline: dto.tagline ? dto.tagline : null,
    genres,
  };
}
