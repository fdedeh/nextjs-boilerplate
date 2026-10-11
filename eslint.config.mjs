import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier";
import storybook from "eslint-plugin-storybook";

const versionSuffix = {
  group: ["**/v1/**", "**/v2/**", "**/new/**", "**/old/**", "**/*_old*", "**/*-copy*"],
  message: "No version/dup suffixes — API versions live in data/ mappers.",
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  prettier,
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            versionSuffix,
            {
              group: ["@/core/movies/*/**", "@/auth/*/**"],
              message: "Import features only via their index.ts façade (no deep imports).",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/proxy.ts", "src/app/api/auth/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [versionSuffix],
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
    "src/core/api-client/generated/**",
    "storybook-static/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    ".claude/**",
  ]),
  ...storybook.configs["flat/recommended"],
]);

export default eslintConfig;
