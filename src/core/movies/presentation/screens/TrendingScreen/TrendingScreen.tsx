"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { useTrending } from "../../../application/queries/use-trending";
import { useListPage } from "../../use-list-page";
import { MovieListBody } from "../NowPlayingScreen/NowPlayingScreen";

export function TrendingScreen() {
  const page = useListPage();
  const query = useTrending(page);

  useEffect(() => {
    if (query.isError) toast.error("Could not load movies.");
  }, [query.isError]);

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">Trending</h1>
        <p className="text-sm text-muted-foreground">Movies trending today.</p>
      </header>
      <MovieListBody
        query={query}
        emptyTitle="No trending movies."
        hrefForPage={(next) => `/trending?page=${next}`}
      />
    </section>
  );
}
