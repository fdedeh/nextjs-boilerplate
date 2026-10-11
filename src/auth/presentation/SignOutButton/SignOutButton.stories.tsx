import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SignOutButton } from "./SignOutButton";

const meta = { title: "UI/SignOutButton", component: SignOutButton } satisfies Meta<typeof SignOutButton>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Default: Story = {};
