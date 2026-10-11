"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { createQueryClient } from "../query-client";
import { registerQueryClient } from "../di/register";

export function QueryProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => {
    const created = createQueryClient();
    registerQueryClient(created);
    return created;
  });
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
