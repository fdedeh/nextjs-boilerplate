import { Badge } from "@/core/ui/primitives/badge";
import { RatingBadge } from "../RatingBadge";

export function formatReleaseDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  if (!year || !month || !day) return iso;
  return new Intl.DateTimeFormat("en", { dateStyle: "medium" }).format(new Date(year, month - 1, day));
}

export function formatRuntime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours <= 0) return `${rest}m`;
  if (rest === 0) return `${hours}h`;
  return `${hours}h ${rest}m`;
}

export function MovieMeta({
  tagline,
  overview,
  releaseDate,
  runtimeMinutes,
  genres,
  rating,
}: {
  tagline?: string | null;
  overview?: string | null;
  releaseDate?: string | null;
  runtimeMinutes?: number | null;
  genres: { id: number; name: string }[];
  rating?: number;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      {tagline ? <p className="text-muted-foreground italic">{tagline}</p> : null}
      {overview ? <p className="text-sm md:text-base">{overview}</p> : null}
      <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        {releaseDate ? <span>{formatReleaseDate(releaseDate)}</span> : null}
        {typeof runtimeMinutes === "number" ? <span>{formatRuntime(runtimeMinutes)}</span> : null}
        {typeof rating === "number" ? <RatingBadge value={rating} size="md" /> : null}
        {genres.map((genre) => (
          <Badge key={genre.id} variant="outline">
            {genre.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
