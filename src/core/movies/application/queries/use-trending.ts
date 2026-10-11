"use client";

import { useQuery } from "@tanstack/react-query";
import { moviesKeys } from "@/core/query/keys";
import { useResolve } from "@/core/ui/hooks/use-resolve";
import type { IMoviesRepository } from "../../domain/movie.repository";
import { MOVIES_REPOSITORY } from "../../di/tokens";

/** Trending movies for the day window. */
export function useTrending(page: number) {
  const repo = useResolve<IMoviesRepository>(MOVIES_REPOSITORY);
  return useQuery({
    queryKey: moviesKeys.trending(page).queryKey,
    queryFn: () => repo.getTrending(page),
  });
}
