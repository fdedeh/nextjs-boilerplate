import type { TMovieDetails, TMovieListPage } from "./movie.types";

export interface IMoviesRepository {
  /** Movies currently in theaters. `page` is 1-based. */
  getNowPlaying(page: number): Promise<TMovieListPage>;

  /** Trending movies for the day window. `page` is 1-based. */
  getTrending(page: number): Promise<TMovieListPage>;

  /** Movie detail by numeric id. */
  getMovie(id: number): Promise<TMovieDetails>;
}
