"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { moviesKeys } from "@/core/query/keys";
import { useResolve } from "@/core/ui/hooks/use-resolve";
import type { IMoviesRepository } from "../../domain/movie.repository";
import { MOVIES_REPOSITORY } from "../../di/tokens";

/** Movie detail. `keepPreviousData` avoids blanking the page when the id changes. */
export function useMovie(id: number) {
  const repo = useResolve<IMoviesRepository>(MOVIES_REPOSITORY);
  return useQuery({
    queryKey: moviesKeys.detail(id).queryKey,
    queryFn: () => repo.getMovie(id),
    enabled: Number.isFinite(id) && id > 0,
    placeholderData: keepPreviousData,
  });
}
