"use client";

import "reflect-metadata";
import { useState, type ReactNode } from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { toast } from "sonner";
import { Toaster } from "@/core/ui/primitives/sonner";
import { container } from "@/core/di/container";
import { registerCore } from "@/core/di/register";
import { TOAST } from "@/core/di/tokens";
import { QueryProvider } from "@/core/query/presentation/QueryProvider";
import { registerApiClient } from "@/core/api-client/di/register";
import { clientEnv } from "@/core/config/env";
import { registerAuth } from "@/auth";
import { registerMovies } from "@/core/movies";

function bootstrapDi() {
  registerCore();
  if (!container.isRegistered(TOAST)) {
    container.register(TOAST, { useValue: toast });
  }
  registerAuth();
  registerMovies();
  registerApiClient({ baseUrl: clientEnv.tmdbProxyBase });
}

export function Providers({ children }: { children: ReactNode }) {
  useState(() => {
    bootstrapDi();
    return null;
  });

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <SessionProvider>
        <QueryProvider>
          {children}
          <Toaster position="bottom-right" richColors />
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
