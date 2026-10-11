import Image from "next/image";
import Link from "next/link";
import { Film } from "lucide-react";
import { RatingBadge } from "../RatingBadge";

export function MovieCard({
  title,
  releaseDate,
  rating,
  posterUrl,
  href,
}: {
  id: number;
  title: string;
  releaseDate?: string | null;
  rating?: number;
  posterUrl?: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 hover:bg-muted/50"
    >
      <div className="relative aspect-[2/3] bg-muted">
        {posterUrl ? (
          <Image
            src={posterUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            <Film aria-hidden />
          </div>
        )}
        {typeof rating === "number" ? (
          <div className="absolute top-2 right-2">
            <RatingBadge value={rating} />
          </div>
        ) : null}
      </div>
      <div className="space-y-1 p-3">
        <p className="line-clamp-2 text-sm font-medium">{title}</p>
        {releaseDate ? <p className="text-sm text-muted-foreground">{releaseDate}</p> : null}
      </div>
    </Link>
  );
}
