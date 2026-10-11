"use client";

import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { EmptyState } from "@/core/ui/components/EmptyState";
import { ErrorState } from "@/core/ui/components/ErrorState";
import { MovieHero } from "@/core/ui/components/MovieHero";
import { MovieMeta } from "@/core/ui/components/MovieMeta";
import { Skeleton } from "@/core/ui/primitives/skeleton";
import { useMovie } from "../../../application/queries/use-movie";
import { tmdbImageUrl } from "../../../data/tmdb-image-url";
import { isNotFound } from "../../movie-query";

function BackLink() {
  return (
    <button
      className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground cursor-pointer"
      onClick={() => {
        window.history.back();
      }}
    >
      <ArrowLeft className="size-4" aria-hidden />
      Back
    </button>
  );
}

export function MovieDetailScreen({ movieId }: { movieId: string }) {
  const id = Number(movieId);
  const valid = Number.isInteger(id) && id > 0;
  const query = useMovie(valid ? id : 0);

  useEffect(() => {
    if (query.isError && !isNotFound(query.error)) toast.error("Could not load this movie.");
  }, [query.isError, query.error]);

  if (!valid || (query.isError && isNotFound(query.error))) {
    return (
      <div className="space-y-6">
        <BackLink />
        <EmptyState title="Movie not found" description="This title is not in the catalog." />
      </div>
    );
  }

  if (query.isLoading && !query.data) {
    return (
      <div className="space-y-6">
        <BackLink />
        <Skeleton className="aspect-21/9 w-full rounded-lg" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    );
  }

  if (query.isError || !query.data) {
    return (
      <div className="space-y-6">
        <BackLink />
        <ErrorState
          title="Could not load this movie"
          description="The request failed. Check the server token and try again."
          onRetry={() => void query.refetch()}
        />
      </div>
    );
  }

  const movie = query.data;
  return (
    <article className="space-y-6">
      <BackLink />
      <MovieHero
        title={movie.title}
        backdropUrl={tmdbImageUrl(movie.backdropPath, "w1280")}
        posterUrl={tmdbImageUrl(movie.posterPath, "w500")}
      />
      <h1 className="text-3xl font-semibold tracking-tight">{movie.title}</h1>
      <MovieMeta
        tagline={movie.tagline}
        overview={movie.overview}
        releaseDate={movie.releaseDate}
        runtimeMinutes={movie.runtime}
        genres={movie.genres}
        rating={movie.voteAverage}
      />
    </article>
  );
}
