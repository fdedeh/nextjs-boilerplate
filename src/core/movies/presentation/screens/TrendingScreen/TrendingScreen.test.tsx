import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { TrendingScreen } from "./TrendingScreen";

vi.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams("page=1"),
}));

vi.mock("sonner", () => ({ toast: { error: vi.fn() } }));

vi.mock("../../../application/queries/use-trending", () => ({
  useTrending: () => ({
    isLoading: false,
    isError: false,
    refetch: vi.fn(),
    data: { page: 1, totalPages: 1, totalResults: 0, results: [] },
  }),
}));

describe("TrendingScreen", () => {
  it("shows the empty state", () => {
    render(<TrendingScreen />);
    expect(screen.getByText("No trending movies.")).toBeInTheDocument();
  });
});
