import type { ReactNode } from "react";
import { SignOutButton } from "@/auth";
import { AppShell } from "@/core/ui/components/AppShell";

export default function AppLayout({ children }: { children: ReactNode }) {
  return <AppShell signOut={<SignOutButton />}>{children}</AppShell>;
}
