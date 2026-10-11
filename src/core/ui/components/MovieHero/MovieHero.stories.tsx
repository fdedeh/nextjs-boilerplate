import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MovieHero } from "./MovieHero";

const meta = { title: "UI/MovieHero", component: MovieHero, args: { title: "Dune" } } satisfies Meta<typeof MovieHero>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Backdrop: Story = { args: { backdropUrl: "https://image.tmdb.org/t/p/w1280/back.jpg" } };
export const PosterOnly: Story = { args: { posterUrl: "https://image.tmdb.org/t/p/w500/poster.jpg" } };
export const NoArt: Story = {};
