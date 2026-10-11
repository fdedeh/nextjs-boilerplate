import Image from "next/image";
import { Film } from "lucide-react";

export function MovieHero({
  title,
  backdropUrl,
  posterUrl,
}: {
  title: string;
  backdropUrl?: string;
  posterUrl?: string;
}) {
  const src = backdropUrl ?? posterUrl;
  return (
    <div className="relative aspect-[21/9] overflow-hidden rounded-lg bg-muted">
      {src ? (
        <Image
          src={src}
          alt={title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 80rem"
          className="object-cover"
        />
      ) : (
        <div className="flex h-full items-center justify-center text-muted-foreground">
          <Film aria-hidden />
        </div>
      )}
    </div>
  );
}
