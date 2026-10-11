import { Suspense } from "react";
import { NowPlayingScreen } from "@/core/movies";

export default function NowPlayingPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted-foreground">Loading…</p>}>
      <NowPlayingScreen />
    </Suspense>
  );
}
