import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MovieMeta } from "./MovieMeta";

const meta = {
  title: "UI/MovieMeta",
  component: MovieMeta,
  args: { genres: [{ id: 1, name: "Drama" }] },
} satisfies Meta<typeof MovieMeta>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {
  args: {
    tagline: "A tagline",
    overview: "An overview of the film.",
    releaseDate: "2021-10-22",
    runtimeMinutes: 108,
    rating: 8,
  },
};
export const NoTagline: Story = { args: { overview: "An overview." } };
export const NoGenres: Story = { args: { genres: [], overview: "An overview." } };
