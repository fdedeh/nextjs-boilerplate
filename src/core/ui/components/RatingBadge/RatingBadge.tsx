import { Star } from "lucide-react";
import { Badge } from "@/core/ui/primitives/badge";

export function RatingBadge({ value, size = "sm" }: { value: number; size?: "sm" | "md" }) {
  const label = value.toFixed(1);
  return (
    <Badge variant="secondary" className={size === "md" ? "h-6 text-sm" : undefined}>
      <Star aria-hidden />
      <span>{label}</span>
      <span className="sr-only">out of 10</span>
    </Badge>
  );
}
