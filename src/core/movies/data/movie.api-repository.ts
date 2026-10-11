import { inject, injectable } from "tsyringe";
import type { Client } from "openapi-fetch";
import { API_CLIENT } from "@/core/api-client/di/tokens";
import { ApiError } from "@/core/api-client/domain/api.error";
import type { paths } from "@/core/api-client/generated/schema";
import { Repository } from "@/core/domain/base/repository";
import type { IMoviesRepository } from "../domain/movie.repository";
import type { TMovieDetails, TMovieListPage } from "../domain/movie.types";
import { toMovieDetails, toMovieListPage, type TMovieDto, type TMovieListDto } from "./movie.mapper";

@injectable()
export class MoviesApiRepository extends Repository implements IMoviesRepository {
  constructor(@inject(API_CLIENT) private readonly client: Client<paths>) {
    super();
  }

  async getNowPlaying(page: number): Promise<TMovieListPage> {
    const { data } = await this.client.GET("/3/movie/now_playing", {
      params: { query: { page } },
    });
    if (data == null) throw new ApiError(200, "Empty response");
    return toMovieListPage(data as TMovieListDto);
  }

  async getTrending(page: number): Promise<TMovieListPage> {
    const { data } = await this.client.GET("/3/trending/movie/{time_window}", {
      params: {
        path: { time_window: "day" },
        // The published spec types `language` only; TMDB still accepts `page`.
        query: { page } as { language?: string; page?: number },
      },
    });
    if (data == null) throw new ApiError(200, "Empty response");
    return toMovieListPage(data as TMovieListDto);
  }

  async getMovie(id: number): Promise<TMovieDetails> {
    const { data } = await this.client.GET("/3/movie/{movie_id}", {
      params: { path: { movie_id: id } },
    });
    if (data == null) throw new ApiError(200, "Empty response");
    return toMovieDetails(data as TMovieDto);
  }
}
