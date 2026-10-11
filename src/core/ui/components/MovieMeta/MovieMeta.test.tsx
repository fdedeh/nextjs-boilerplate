import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { formatRuntime, MovieMeta } from "./MovieMeta";

describe("MovieMeta", () => {
  it("formats runtime and lists genres", () => {
    expect(formatRuntime(108)).toBe("1h 48m");
    render(
      <MovieMeta
        tagline="A tagline"
        overview="An overview"
        releaseDate="2021-10-22"
        runtimeMinutes={108}
        genres={[{ id: 1, name: "Drama" }]}
        rating={8}
      />,
    );
    expect(screen.getByText("A tagline")).toBeInTheDocument();
    expect(screen.getByText("Drama")).toBeInTheDocument();
    expect(screen.getByText("1h 48m")).toBeInTheDocument();
  });

  it("omits an empty tagline", () => {
    render(<MovieMeta genres={[]} />);
    expect(screen.queryByText("A tagline")).not.toBeInTheDocument();
  });
});
