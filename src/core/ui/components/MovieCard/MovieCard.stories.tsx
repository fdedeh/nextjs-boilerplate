import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MovieCard } from "./MovieCard";

const meta = { title: "UI/MovieCard", component: MovieCard } satisfies Meta<typeof MovieCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { id: 1, title: "Dune", href: "/movies/1", releaseDate: "Oct 22, 2021", rating: 8 },
};
export const NoPoster: Story = { args: { id: 2, title: "Untitled", href: "/movies/2", rating: 6 } };
export const LongTitle: Story = {
  args: { id: 3, title: "A Very Long Movie Title That Wraps Onto Two Lines", href: "/movies/3", rating: 7 },
};
export const NoRating: Story = { args: { id: 4, title: "Unrated", href: "/movies/4" } };
