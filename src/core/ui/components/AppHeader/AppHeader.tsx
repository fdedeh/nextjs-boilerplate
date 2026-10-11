"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button, buttonVariants } from "@/core/ui/primitives/button";
import { cn } from "@/core/ui/utils";
import { ThemeToggle } from "../ThemeToggle";

export type TNavItem = {
  href: string;
  label: string;
};

export function AppHeader({
  appName = "Movies",
  navItems,
  signOut,
  onSignOut,
}: {
  appName?: string;
  navItems: TNavItem[];
  signOut?: ReactNode;
  onSignOut?: () => void;
}) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-4">
        <Link href="/now-playing" className="text-lg font-semibold tracking-tight">
          {appName}
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} pathname={pathname} />
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <ThemeToggle />
          {signOut ?? (
            <Button variant="ghost" aria-label="Sign out" onClick={onSignOut}>
              <LogOut />
              <span className="hidden md:inline">Sign out</span>
            </Button>
          )}
        </div>
      </div>
      <nav className="flex gap-1 border-t px-4 py-2 md:hidden" aria-label="Primary">
        {navItems.map((item) => (
          <NavLink key={item.href} item={item} pathname={pathname} />
        ))}
      </nav>
    </header>
  );
}

function NavLink({ item, pathname }: { item: TNavItem; pathname: string }) {
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      className={cn(buttonVariants({ variant: active ? "secondary" : "ghost" }))}
      aria-current={active ? "page" : undefined}
    >
      {item.label}
    </Link>
  );
}
