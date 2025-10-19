const { resolve } = require("node:path")
const js = require("@eslint/js")
const typescriptEslint = require("typescript-eslint")
const globalsPlugin = require("globals")
const unusedImportsPlugin = require("eslint-plugin-unused-imports")
const jestPlugin = require("eslint-plugin-jest")
const jestFormattingPlugin = require("eslint-plugin-jest-formatting")
const testingLibraryPlugin = require("eslint-plugin-testing-library")
const jestDomPlugin = require("eslint-plugin-jest-dom")
const prettierPlugin = require("eslint-plugin-prettier/recommended")

const { commonRules } = require("./common-rules")

const project = resolve(process.cwd(), "tsconfig.json")

module.exports = [
  // Base JavaScript configuration
  js.configs.recommended,

  // Node.js configuration for .js files
  {
    name: "node",
    files: ["**/*.{cjs,mjs,js}"],
    languageOptions: {
      globals: {
        ...globalsPlugin.browser,
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off", // Node.js globals are handled by globals config
    },
  },

  // ESLint and TypeScript recommended configs (before prettier)
  ...typescriptEslint.configs.recommended,

  // Custom rules for TypeScript
  {
    name: "custom-typescript-rules",
    files: ["**/*.ts"],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project,
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: {
        ...globalsPlugin.browser,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint.plugin,
      "unused-imports": unusedImportsPlugin,
    },
    rules: {
      // Common rules
      ...commonRules,
    },
  },
  // Test files configuration
  {
    name: "test-files",
    files: ["**/*.test.ts", "**/*.test.tsx"],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project,
        ecmaVersion: 2022,
        sourceType: "module",
      },
      globals: {
        ...globalsPlugin.browser,
        ...globalsPlugin.node,
      },
    },
    plugins: {
      "jest": jestPlugin,
      "jest-formatting": jestFormattingPlugin,
      "testing-library": testingLibraryPlugin,
      "jest-dom": jestDomPlugin,
    },
    rules: {
      // more testing rules
    },
  },

  // Prettier configuration - MUST BE LAST to override formatting rules
  {
    ...prettierPlugin,
    rules: {
      ...prettierPlugin.rules, // Apply rules from eslint-config-prettier to disable conflicting rules
      "prettier/prettier": ["error", {}, { usePrettierrc: true }],
    },
  },
]
