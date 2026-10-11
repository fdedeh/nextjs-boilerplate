import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MovieCard } from "../MovieCard";
import { MovieCardSkeleton } from "../MovieCardSkeleton";
import { MovieGrid } from "./MovieGrid";

const meta = { title: "UI/MovieGrid", component: MovieGrid } satisfies Meta<typeof MovieGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: {
    children: (
      <>
        <MovieCard id={1} title="One" href="/movies/1" />
        <MovieCard id={2} title="Two" href="/movies/2" />
      </>
    ),
  },
};

export const Skeletons: Story = {
  args: {
    children: (
      <>
        <MovieCardSkeleton />
        <MovieCardSkeleton />
      </>
    ),
  },
};
