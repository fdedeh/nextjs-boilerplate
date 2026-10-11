import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RatingBadge } from "./RatingBadge";

const meta = { title: "UI/RatingBadge", component: RatingBadge } satisfies Meta<typeof RatingBadge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Low: Story = { args: { value: 2.1 } };
export const Mid: Story = { args: { value: 6.5 } };
export const High: Story = { args: { value: 8.8 } };
