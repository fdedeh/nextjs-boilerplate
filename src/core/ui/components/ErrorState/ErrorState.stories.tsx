import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ErrorState } from "./ErrorState";

const meta = {
  title: "UI/ErrorState",
  component: ErrorState,
} satisfies Meta<typeof ErrorState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { title: "Could not load movies" } };
export const WithRetry: Story = {
  args: { title: "Could not load movies", description: "Try again.", onRetry: () => undefined },
};
