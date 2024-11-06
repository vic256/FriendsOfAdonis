import next from "@foadonis/eslint-config/next.js";

export default [
  {
    ignores: [".source/*"],
  },
  ...next,
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.lint.json",
      },
    },
  },
];
