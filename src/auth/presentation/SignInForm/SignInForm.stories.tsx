import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SignInForm } from "./SignInForm";

const meta = {
  title: "UI/SignInForm",
  component: SignInForm,
  args: { onSubmit: () => undefined },
} satisfies Meta<typeof SignInForm>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const InvalidCredentials: Story = { args: { error: "Invalid username or password." } };
export const Submitting: Story = { args: { isSubmitting: true } };
