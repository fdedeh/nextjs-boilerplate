"use client";

import { useSearchParams } from "next/navigation";

/** 1-based page from `?page=`. Invalid values fall back to 1. */
export function useListPage(): number {
  const params = useSearchParams();
  const raw = Number(params.get("page") ?? "1");
  if (!Number.isFinite(raw) || raw < 1) return 1;
  return Math.floor(raw);
}
