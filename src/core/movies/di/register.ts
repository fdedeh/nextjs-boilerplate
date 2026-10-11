import { container } from "@/core/di/container";
import { MoviesApiRepository } from "../data/movie.api-repository";
import { MOVIES_REPOSITORY } from "./tokens";

export function registerMovies(): void {
  if (container.isRegistered(MOVIES_REPOSITORY)) return;
  container.register(MOVIES_REPOSITORY, { useClass: MoviesApiRepository });
}
