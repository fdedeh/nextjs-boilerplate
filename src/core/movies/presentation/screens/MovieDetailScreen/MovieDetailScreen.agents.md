# MovieDetailScreen — AI guide

One movie. **Client-rendered.**

- **Route:** `/movies/[movieId]` → `src/app/(app)/movies/[movieId]/page.tsx` awaits `params`, then `MovieDetailScreen`.
- **Component:** `src/core/movies/presentation/screens/MovieDetailScreen/MovieDetailScreen.tsx`.
- **Feature doc:** [`movies.md`](../../../movies.md). Read it first.

## Data hooks

| Hook | Repository call | Endpoint | Returns |
| --- | --- | --- | --- |
| `useMovie(id)` | `getMovie(id)` | `GET /api/tmdb/3/movie/{movie_id}` | `TMovieDetails` |

The hook is disabled unless `id` is a positive integer. `placeholderData: keepPreviousData` keeps the previous movie visible while the next one loads.

## Sections (top → bottom) & data source

| # | Section | Component | Source | Own gate? |
| --- | --- | --- | --- | --- |
| 1 | Back | link | same-origin referrer, otherwise `/now-playing` | — |
| 2 | Hero | `MovieHero` | backdrop, else poster | loading skeleton |
| 3 | Title and meta | `MovieMeta` | detail view model | 404 → "Movie not found"; other errors → retry |

## How to extend

Add the field to `TMovieDetails`, map it in `toMovieDetails`, and render it in `MovieMeta`. Update `MovieMeta.md` and this file.

## Gotchas / invariants

- HTTP 404 is not an empty movie. Show the not-found state.
- A missing server token is an error state, not an empty page.
- Poster URLs are built with `tmdbImageUrl` in `data/`. Do not hardcode the image host in the screen.

## Clean-arch layering

The page is a thin server component. All fetching happens in `useMovie`.

_Keep this file in sync when sections, data sources, or invariants change._
