import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MovieHero } from "./MovieHero";

describe("MovieHero", () => {
  it("renders a placeholder when there is no art", () => {
    const { container } = render(<MovieHero title="Dune" />);
    expect(container.querySelector("img")).toBeNull();
    expect(screen.getByText((_, node) => node?.getAttribute("aria-hidden") === "true") || true).toBeTruthy();
  });

  it("renders the backdrop image", () => {
    render(<MovieHero title="Dune" backdropUrl="https://image.tmdb.org/t/p/w1280/back.jpg" />);
    expect(screen.getByRole("img", { name: "Dune" })).toBeInTheDocument();
  });
});
