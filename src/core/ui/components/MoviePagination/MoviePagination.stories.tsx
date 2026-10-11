import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MoviePagination } from "./MoviePagination";

const meta = {
  title: "UI/MoviePagination",
  component: MoviePagination,
  args: { hrefForPage: (page: number) => `?page=${page}` },
} satisfies Meta<typeof MoviePagination>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FirstPage: Story = { args: { page: 1, totalPages: 8 } };
export const MiddlePage: Story = { args: { page: 4, totalPages: 8 } };
export const LastPage: Story = { args: { page: 8, totalPages: 8 } };
export const SinglePageHidden: Story = { args: { page: 1, totalPages: 1 } };
