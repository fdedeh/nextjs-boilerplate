import { describe, expect, it } from "vitest";
import { tmdbImageUrl } from "./tmdb-image-url";

describe("tmdbImageUrl", () => {
  it("joins the image base, size, and file path", () => {
    expect(tmdbImageUrl("/abc.jpg", "w500")).toBe("https://image.tmdb.org/t/p/w500/abc.jpg");
  });

  it("returns undefined for a missing path", () => {
    expect(tmdbImageUrl(null, "w1280")).toBeUndefined();
  });
});
