# NowPlayingScreen — AI guide

Movies currently in theaters. **Client-rendered** — the screen loads data through a DI-resolved repository.

- **Route:** `/now-playing` → `src/app/(app)/now-playing/page.tsx` → `NowPlayingScreen`. The page wraps the screen in `Suspense` because the page number comes from `useSearchParams`.
- **Component:** `src/core/movies/presentation/screens/NowPlayingScreen/NowPlayingScreen.tsx`.
- **Feature doc:** [`movies.md`](../../../movies.md). Read it first.

## Data hooks

Reads bypass use-cases: `useQuery` → `IMoviesRepository` via `useResolve`.

| Hook | Repository call | Endpoint | Returns |
| --- | --- | --- | --- |
| `useNowPlaying(page)` | `getNowPlaying(page)` | `GET /api/tmdb/3/movie/now_playing?page=` | `TMovieListPage` |

`page` is 1-based. A non-OK response throws `ApiError`. An empty `results` array is a successful empty list.

## Sections (top → bottom) & data source

| # | Section | Component | Source | Own gate? |
| --- | --- | --- | --- | --- |
| 1 | Title | heading in the screen | static | — |
| 2 | Grid or state | `MovieGrid` / `EmptyState` / `ErrorState` | `useNowPlaying` | yes — loading skeletons, empty, or retry |
| 3 | Pagination | `MoviePagination` | `data.page`, `data.totalPages` | hidden when one page |

## How to extend

1. Add a field on `TMovieListItem` in `domain/movie.types.ts`.
2. Map it in `data/movie.mapper.ts` (the only place TMDB field names live).
3. Return it from `getNowPlaying`.
4. Render it from the screen or a UI component, and update this file, the component `.md`, the test, and the story.

## Gotchas / invariants

- Do not call `api.themoviedb.org` from the browser. The client base URL is `/api/tmdb`.
- Do not default a failed request to `[]`.
- Import this feature from `@/core/movies` outside the feature. Inside it, use relative paths.

## Clean-arch layering

`NowPlayingScreen` calls `useNowPlaying`, which resolves `MOVIES_REPOSITORY`. The adapter is registered from `registerMovies()` in `src/app/providers.tsx`. Presentation may import domain types and the image helper in `data/`; it must not construct the HTTP client.

_Keep this file in sync when sections, data sources, or invariants change._
