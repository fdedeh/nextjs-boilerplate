import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MovieCardSkeleton } from "./MovieCardSkeleton";

const meta = {
  title: "UI/MovieCardSkeleton",
  component: MovieCardSkeleton,
} satisfies Meta<typeof MovieCardSkeleton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
