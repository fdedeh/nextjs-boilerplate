import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppShell } from "./AppShell";

const meta = {
  title: "UI/AppShell",
  component: AppShell,
  args: { signOut: <button type="button">Sign out</button>, children: <p>Page body</p> },
} satisfies Meta<typeof AppShell>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
