export { registerMovies } from "./di/register";
export { NowPlayingScreen } from "./presentation/screens/NowPlayingScreen";
export { TrendingScreen } from "./presentation/screens/TrendingScreen";
export { MovieDetailScreen } from "./presentation/screens/MovieDetailScreen";
export { useNowPlaying } from "./application/queries/use-now-playing";
export { useTrending } from "./application/queries/use-trending";
export { useMovie } from "./application/queries/use-movie";
export type { IMoviesRepository } from "./domain/movie.repository";
export type { TMovieDetails, TMovieListItem, TMovieListPage } from "./domain/movie.types";
