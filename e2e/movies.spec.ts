import { expect, test } from "@playwright/test";

const nowPlaying = {
  page: 1,
  total_pages: 1,
  total_results: 1,
  results: [
    {
      id: 550,
      title: "Fight Club",
      overview: "Insomnia",
      poster_path: "/poster.jpg",
      backdrop_path: "/back.jpg",
      release_date: "1999-10-15",
      vote_average: 8.4,
    },
  ],
};

const detail = {
  id: 550,
  title: "Fight Club",
  overview: "An insomniac office worker",
  poster_path: "/poster.jpg",
  backdrop_path: "/back.jpg",
  release_date: "1999-10-15",
  vote_average: 8.4,
  runtime: 139,
  tagline: "Mischief. Mayhem. Soap.",
  genres: [{ id: 18, name: "Drama" }],
};

test.beforeEach(async ({ page }) => {
  await page.route("**/api/tmdb/**", async (route) => {
    const url = route.request().url();
    if (url.includes("/movie/550")) {
      await route.fulfill({ json: detail });
      return;
    }
    await route.fulfill({ json: nowPlaying });
  });
});

test("rejects a wrong password", async ({ page }) => {
  await page.goto("/signin");
  await page.getByLabel("Username").fill("admin");
  await page.getByLabel("Password").fill("wrong");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.locator("#signin-error")).toHaveText("Invalid username or password.");
  await expect(page).toHaveURL(/\/signin$/);
});

test("signs in and opens a movie", async ({ page }) => {
  await page.goto("/signin");
  await page.getByLabel("Username").fill("admin");
  await page.getByLabel("Password").fill("admin");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Now Playing" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Fight Club" })).toBeVisible();
  await page.getByRole("link", { name: "Fight Club" }).click();
  await expect(page).toHaveURL(/\/movies\/550$/);
  await expect(page.getByText("An insomniac office worker")).toBeVisible();
  await expect(page.getByText("Drama")).toBeVisible();
  await page.getByRole("button", { name: "Sign out" }).click();
  await expect(page).toHaveURL(/\/signin$/);
});

test("sends a guest from a list route to sign in", async ({ page }) => {
  await page.goto("/trending");
  await expect(page).toHaveURL(/\/signin$/);
});
