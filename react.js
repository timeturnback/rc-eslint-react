const { resolve } = require("node:path")
const js = require("@eslint/js")
const typescriptEslint = require("typescript-eslint")
const reactPlugin = require("eslint-plugin-react")
const tailwindPlugin = require("eslint-plugin-tailwindcss")
const globalsPlugin = require("globals")
const unusedImportsPlugin = require("eslint-plugin-unused-imports")
const reactHooksPlugin = require("eslint-plugin-react-hooks")
const jsxA11yPlugin = require("eslint-plugin-jsx-a11y")
const prettierPlugin = require("eslint-plugin-prettier/recommended")

const { commonRules } = require("./common-rules")
const { commonReactRules } = require("./common-react-rules")

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
        ...globalsPlugin.node,
      },
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "no-undef": "off", // Node.js globals are handled by globals config
    },
  },

  // ESLint and TypeScript recommended configs (before prettier)
  ...typescriptEslint.configs.recommended,

  // Tailwind configuration (flat config format)
  ...tailwindPlugin.configs["flat/recommended"],

  // React recommended config with settings
  {
    name: "react-recommended",
    files: ["**/*.tsx"],
    ...reactPlugin.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // Custom rules
  {
    name: "custom-rules",
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptEslint.parser,
      parserOptions: {
        project,
        ecmaVersion: 2022,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globalsPlugin.browser,
        ...globalsPlugin.node,
      },
    },
    plugins: {
      "@typescript-eslint": typescriptEslint.plugin,
      "unused-imports": unusedImportsPlugin,
      "react": reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    rules: {
      // Common rules
      ...commonRules,

      // Common React rules
      ...commonReactRules,

      // Tailwind CSS specific rules
      "tailwindcss/no-custom-classname": "error", // Allow custom class names
      "tailwindcss/no-contradicting-classname": "error", // Prevent contradicting classes
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
