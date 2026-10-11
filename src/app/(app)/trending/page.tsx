import { Suspense } from "react";
import { TrendingScreen } from "@/core/movies";

export default function TrendingPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
      <TrendingScreen />
    </Suspense>
  );
}
