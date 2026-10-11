"use client";

import { useSession } from "next-auth/react";

export type TCurrentUser = {
  username: string;
};

/** Read the Auth.js session. Not a use-case — there is no repository call. */
export function useCurrentUser(): { user: TCurrentUser | null; status: "loading" | "authenticated" | "unauthenticated" } {
  const session = useSession();
  const username = session.data?.user?.name ?? null;
  return {
    status: session.status,
    user: username ? { username } : null,
  };
}
