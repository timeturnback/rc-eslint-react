module.exports = {
  // this line is required for pnpm
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  semi: true,
  useTabs: false,
  tabWidth: 2,
  printWidth: 120,
  singleQuote: false,
  trailingComma: "es5",
  bracketSameLine: false,
  endOfLine: "auto",
  quoteProps: "consistent",
  overrides: [
    {
      files: "*.yml",
      options: {
        tabWidth: 2,
      },
    },
    {
      files: "*.yaml",
      options: {
        tabWidth: 2,
      },
    },
  ],
  importOrder: [
    "<THIRD_PARTY_MODULES>", // 3rd-party
    // "^@rc/(.*)(?<!\\.(c|le|sc)ss)$", // @rc except css family
    "^@/(.+)?(?<!\\.(c|le|sc)ss)$", // relative imports except css family
    "\\.(c|le|sc)ss$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  importOrderSideEffects: false,
};
