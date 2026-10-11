/** Clean-architecture layer rules. Feature façade / deep-import ban is enforced by ESLint. */
module.exports = {
  forbidden: [
    {
      name: "domain-stays-pure",
      comment: "domain may not import data / application / presentation layers.",
      severity: "error",
      from: { path: "(^|/)domain/" },
      to: { path: "(^|/)(data|application|presentation)/" },
    },
    {
      name: "domain-no-frameworks",
      comment: "domain must not depend on React / Next / TanStack Query / openapi-fetch.",
      severity: "error",
      from: { path: "(^|/)domain/" },
      to: { path: "node_modules/(react|react-dom|next|@tanstack|openapi-fetch)(/|$)" },
    },
    {
      name: "application-not-data",
      comment: "application depends on domain ports, never on data adapters.",
      severity: "error",
      from: { path: "(^|/)application/" },
      to: { path: "(^|/)data/" },
    },
    {
      name: "core-ui-presentational-only",
      comment: "core/ui is presentational — no feature business layers.",
      severity: "error",
      from: { path: "^src/core/ui/" },
      to: { path: "^src/(core/movies|auth)/(domain|data|application)/" },
    },
  ],
  options: {
    tsConfig: { fileName: "tsconfig.json" },
    tsPreCompilationDeps: true,
    doNotFollow: { path: "node_modules" },
    exclude: { path: "(node_modules|\\.next|/generated/|\\.stories\\.|\\.test\\.)" },
  },
};
