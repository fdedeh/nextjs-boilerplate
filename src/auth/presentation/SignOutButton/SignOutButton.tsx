"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "@/core/ui/primitives/button";

export function SignOutButton() {
  return (
    <Button
      variant="ghost"
      aria-label="Sign out"
      onClick={() => void signOut({ callbackUrl: "/signin" })}
    >
      <LogOut />
      <span className="hidden md:inline">Sign out</span>
    </Button>
  );
}
