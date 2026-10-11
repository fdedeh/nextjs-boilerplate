import { MovieDetailScreen } from "@/core/movies";

export default async function MovieDetailPage({
  params,
}: {
  params: Promise<{ movieId: string }>;
}) {
  const { movieId } = await params;
  return <MovieDetailScreen movieId={movieId} />;
}
