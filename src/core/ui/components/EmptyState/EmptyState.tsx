import type { LucideIcon } from "lucide-react";
import { Film } from "lucide-react";

export function EmptyState({
  title,
  description,
  icon: Icon = Film,
}: {
  title: string;
  description?: string;
  icon?: LucideIcon;
}) {
  return (
    <div className="flex flex-col items-center gap-2 px-4 py-16 text-center text-muted-foreground">
      <Icon className="size-8" aria-hidden />
      <p className="text-base font-medium text-foreground">{title}</p>
      {description ? <p className="max-w-md text-sm">{description}</p> : null}
    </div>
  );
}
