# TrendingScreen — AI guide

Movies trending today. **Client-rendered.**

- **Route:** `/trending` → `src/app/(app)/trending/page.tsx` → `TrendingScreen` inside `Suspense`.
- **Component:** `src/core/movies/presentation/screens/TrendingScreen/TrendingScreen.tsx`.
- **Feature doc:** [`movies.md`](../../../movies.md). Read it first.

## Data hooks

| Hook | Repository call | Endpoint | Returns |
| --- | --- | --- | --- |
| `useTrending(page)` | `getTrending(page)` | `GET /api/tmdb/3/trending/movie/day?page=` | `TMovieListPage` |

The time window is fixed to `day`. There is no day/week control.

## Sections (top → bottom) & data source

Same grid, empty, error, and pagination behavior as Now Playing. The empty title is "No trending movies." Pagination links use `/trending?page=`.

## How to extend

Follow the steps in `NowPlayingScreen.agents.md`. Keep the day window in `data/movie.api-repository.ts`, not in the screen.

## Gotchas / invariants

- The published OpenAPI query type for this path lists `language` only. The adapter still sends `page` because TMDB accepts it. Do not drop the page parameter.
- Fail loud on non-OK. Do not sign the user out on a TMDB 401.

## Clean-arch layering

The screen calls `useTrending` only. `registerMovies()` binds the port in the client composition root.

_Keep this file in sync when sections, data sources, or invariants change._
