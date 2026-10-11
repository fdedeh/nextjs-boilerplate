import type { ReactNode } from "react";
import { AppHeader } from "../AppHeader";

const NAV_ITEMS = [
  { href: "/now-playing", label: "Now Playing" },
  { href: "/trending", label: "Trending" },
];

export function AppShell({
  children,
  signOut,
}: {
  children: ReactNode;
  signOut: ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-col">
      <AppHeader appName="Movies" navItems={NAV_ITEMS} signOut={signOut} />
      <main id="main" className="mx-auto w-full max-w-7xl flex-1 px-4 py-6">
        {children}
      </main>
    </div>
  );
}
