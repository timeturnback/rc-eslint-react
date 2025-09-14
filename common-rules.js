const typescriptEslint = require("typescript-eslint");

const recommendedTypeCheckedName = "typescript-eslint/recommended-type-checked";
const recommendedTypeCheckedConfig = typescriptEslint.configs.recommendedTypeChecked.find(
  (config) => config.name === recommendedTypeCheckedName
);
if (!recommendedTypeCheckedConfig) {
  console.warn(`Config ${recommendedTypeCheckedName} not found in typescript-eslint`);
}

const stylisticTypeCheckedName = "typescript-eslint/stylistic-type-checked";
const stylisticTypeCheckedConfig = typescriptEslint.configs.stylisticTypeChecked.find(
  (config) => config.name === stylisticTypeCheckedName
);
if (!stylisticTypeCheckedConfig) {
  console.warn(`Config ${stylisticTypeCheckedName} not found in typescript-eslint`);
}

const commonRules = {
  ...recommendedTypeCheckedConfig?.rules,
  ...stylisticTypeCheckedConfig?.rules,

  // Must disable the base rule as it can report incorrect errors
  "no-unused-vars": "off",

  // Unused imports rules
  "unused-imports/no-unused-imports": "error",
  "unused-imports/no-unused-vars": "off", // this is handled by @typescript-eslint/no-unused-vars

  // TypeScript rules
  "@typescript-eslint/explicit-function-return-type": "off",
  "@typescript-eslint/ban-ts-comment": "off",
  "@typescript-eslint/ban-ts-ignore": "off",
  "@typescript-eslint/ban-types": "off",
  "@typescript-eslint/triple-slash-reference": "off",
  "@typescript-eslint/comma-dangle": "off", // Avoid conflict rule between Eslint and Prettier
  "@typescript-eslint/consistent-type-imports": [
    "error",
    {
      prefer: "type-imports",
      fixStyle: "separate-type-imports",
      disallowTypeAnnotations: false,
    },
  ], // Ensure `import type` is used when it's necessary
  "@typescript-eslint/no-use-before-define": "off",
  "@typescript-eslint/naming-convention": "off",
  "@typescript-eslint/return-await": "off",
  "@typescript-eslint/no-shadow": "off",
  "@typescript-eslint/no-empty-function": "off",
  "@typescript-eslint/indent": "off",
  "@typescript-eslint/no-explicit-any": "off",
  "@typescript-eslint/prefer-as-const": "off",
  "@typescript-eslint/no-unused-vars": [
    "error",
    { ignoreRestSiblings: true, argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" },
  ],
  "@typescript-eslint/prefer-nullish-coalescing": "off",

  // Import rules
  "import/prefer-default-export": "off", // Named export is easier to refactor automatically
  "import/extensions": "off",
  "import/no-extraneous-dependencies": "off",

  // General code quality rules
  "prefer-const": [
    "warn",
    {
      destructuring: "all",
      ignoreReadBeforeAssign: false,
    },
  ],
  "object-shorthand": "warn",
  "no-debugger": "warn",
  "array-callback-return": ["warn", { allowImplicit: true, checkForEach: true }],
  "no-useless-rename": [
    "error",
    {
      ignoreDestructuring: false,
      ignoreImport: false,
      ignoreExport: false,
    },
  ],
  "no-duplicate-imports": ["error", { allowSeparateTypeImports: true }],
  "no-nested-ternary": "off",
  "no-underscore-dangle": "off",
  "no-restricted-globals": "off",
};

module.exports = { commonRules };
