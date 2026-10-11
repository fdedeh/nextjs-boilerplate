export type TMovieListItem = {
  id: number;
  title: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  releaseDate: string | null;
  voteAverage: number;
};

export type TMovieListPage = {
  page: number;
  totalPages: number;
  totalResults: number;
  results: TMovieListItem[];
};

export type TMovieGenre = {
  id: number;
  name: string;
};

export type TMovieDetails = TMovieListItem & {
  runtime: number | null;
  genres: TMovieGenre[];
  tagline: string | null;
};
