"use client";

import type { InjectionToken } from "tsyringe";
import { container } from "@/core/di/container";

/** Thin React-side bridge to the DI container. Resolves a token (repos are singletons). */
export function useResolve<T>(token: InjectionToken<T>): T {
  return container.resolve<T>(token);
}
