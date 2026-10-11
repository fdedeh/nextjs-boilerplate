import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppHeader } from "./AppHeader";

const meta = {
  title: "UI/AppHeader",
  component: AppHeader,
  args: {
    navItems: [
      { href: "/now-playing", label: "Now Playing" },
      { href: "/trending", label: "Trending" },
    ],
  },
} satisfies Meta<typeof AppHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const NowPlayingActive: Story = {};
export const TrendingActive: Story = {};
