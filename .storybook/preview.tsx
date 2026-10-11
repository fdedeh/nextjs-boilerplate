import type { Preview } from "@storybook/nextjs-vite";
import { ThemeProvider } from "next-themes";
import { Toaster } from "../src/core/ui/primitives/sonner";
import "../src/app/globals.css";

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        <div className="bg-background p-6 text-foreground">
          <Story />
        </div>
        <Toaster />
      </ThemeProvider>
    ),
  ],
};

export default preview;
