"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { EmptyState } from "@/core/ui/components/EmptyState";
import { ErrorState } from "@/core/ui/components/ErrorState";
import { MovieCard } from "@/core/ui/components/MovieCard";
import { MovieCardSkeleton } from "@/core/ui/components/MovieCardSkeleton";
import { MovieGrid } from "@/core/ui/components/MovieGrid";
import { MoviePagination } from "@/core/ui/components/MoviePagination";
import { formatReleaseDate } from "@/core/ui/components/MovieMeta";
import { useNowPlaying } from "../../../application/queries/use-now-playing";
import { tmdbImageUrl } from "../../../data/tmdb-image-url";
import { useListPage } from "../../use-list-page";

export function NowPlayingScreen() {
  const page = useListPage();
  const query = useNowPlaying(page);

  useEffect(() => {
    if (query.isError) toast.error("Could not load movies.");
  }, [query.isError]);

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Now Playing</h1>
        <p className="text-sm text-muted-foreground">Movies currently in theaters.</p>
      </header>
      <MovieListBody
        query={query}
        emptyTitle="No movies in theaters right now."
        hrefForPage={(next) => `/now-playing?page=${next}`}
      />
    </section>
  );
}

export function MovieListBody({
  query,
  emptyTitle,
  hrefForPage,
}: {
  query: {
    isLoading: boolean;
    isError: boolean;
    data?: {
      page: number;
      totalPages: number;
      results: {
        id: number;
        title: string;
        posterPath: string | null;
        releaseDate: string | null;
        voteAverage: number;
      }[];
    };
    refetch: () => void;
  };
  emptyTitle: string;
  hrefForPage: (page: number) => string;
}) {
  if (query.isLoading) {
    return (
      <MovieGrid>
        {Array.from({ length: 10 }, (_, index) => (
          <MovieCardSkeleton key={index} />
        ))}
      </MovieGrid>
    );
  }

  if (query.isError || !query.data) {
    return (
      <ErrorState
        title="Could not load movies"
        description="The request failed. Check the server token and try again."
        onRetry={() => query.refetch()}
      />
    );
  }

  if (query.data.results.length === 0) {
    return <EmptyState title={emptyTitle} />;
  }

  return (
    <>
      <MovieGrid>
        {query.data.results.map((movie) => (
          <MovieCard
            key={movie.id}
            id={movie.id}
            title={movie.title}
            href={`/movies/${movie.id}`}
            posterUrl={tmdbImageUrl(movie.posterPath, "w500")}
            releaseDate={movie.releaseDate ? formatReleaseDate(movie.releaseDate) : null}
            rating={movie.voteAverage}
          />
        ))}
      </MovieGrid>
      <MoviePagination page={query.data.page} totalPages={query.data.totalPages} hrefForPage={hrefForPage} />
    </>
  );
}
