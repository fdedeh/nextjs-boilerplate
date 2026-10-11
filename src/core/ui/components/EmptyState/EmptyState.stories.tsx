import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { EmptyState } from "./EmptyState";

const meta = {
  title: "UI/EmptyState",
  component: EmptyState,
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { title: "No movies" } };
export const WithDescription: Story = {
  args: { title: "No movies", description: "Nothing matched this page." },
};
