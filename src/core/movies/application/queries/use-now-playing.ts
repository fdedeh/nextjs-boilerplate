"use client";

import { useQuery } from "@tanstack/react-query";
import { moviesKeys } from "@/core/query/keys";
import { useResolve } from "@/core/ui/hooks/use-resolve";
import type { IMoviesRepository } from "../../domain/movie.repository";
import { MOVIES_REPOSITORY } from "../../di/tokens";

/** Now-playing list. Reads bypass use-cases and call the repository port via DI. */
export function useNowPlaying(page: number) {
  const repo = useResolve<IMoviesRepository>(MOVIES_REPOSITORY);
  return useQuery({
    queryKey: moviesKeys.nowPlaying(page).queryKey,
    queryFn: () => repo.getNowPlaying(page),
  });
}
