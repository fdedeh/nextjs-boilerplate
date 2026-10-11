# Movies

Now playing, trending, and movie detail. Clean Architecture: `domain` ← `data` → `application` → `presentation`.

Routes: `/now-playing`, `/trending`, `/movies/[movieId]`. Lists are poster grids. Detail shows a hero, overview, runtime, and genres. Clicking a card opens the detail route.

- `domain/movie.repository.ts` — `IMoviesRepository`: `getNowPlaying(page)`, `getTrending(page)`, `getMovie(id)`. `page` is 1-based.
- `domain/movie.types.ts` — `TMovieListItem`, `TMovieListPage`, `TMovieDetails`, `TMovieGenre`. List items do not include runtime, genres, or tagline.
- `data/movie.mapper.ts` — `toMovieListItem`, `toMovieListPage`, `toMovieDetails`. Throws `ApiError` when `id` or `results` is missing. An empty `results` array is valid.
- `data/movie.api-repository.ts` — `MoviesApiRepository`. Paths live only here: `/3/movie/now_playing`, `/3/trending/movie/{time_window}` (`day`), `/3/movie/{movie_id}`.
- `data/tmdb-image-url.ts` — `tmdbImageUrl(path, size)` builds a CDN url. Domain models keep the raw file path.
- `application/queries/use-now-playing.ts`, `use-trending.ts`, `use-movie.ts` — read hooks. They resolve `MOVIES_REPOSITORY` and do not call a use-case. `useMovie` keeps previous data while the id changes.
- `di/tokens.ts` / `di/register.ts` — `MOVIES_REPOSITORY` → `MoviesApiRepository`, composed from `src/app/providers.tsx`.
- `presentation/screens/NowPlayingScreen` — theaters list. See `NowPlayingScreen.agents.md`.
- `presentation/screens/TrendingScreen` — day window. See `TrendingScreen.agents.md`.
- `presentation/screens/MovieDetailScreen` — one movie. See `MovieDetailScreen.agents.md`.

## Invariants

- Browser code calls same-origin `/api/tmdb`. The read token stays on the server.
- Non-OK responses throw. Do not replace a failure with `[]`.
- Outside this feature, import from `@/core/movies` only.
- There is no `{ success, message, data }` envelope.

## Gaps

None for the three starter routes. A later client mutation (for example, a favorite) should be a `*.usecase.ts` that returns `Result`.
