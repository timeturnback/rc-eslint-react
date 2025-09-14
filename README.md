## Install step

### Remove legacy file

- remove .eslintignore
- remove .eslintrc.json

### Add to .vscode/settings.json

```json
  "eslint.useFlatConfig": true,
  "eslint.workingDirectories": [],
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"]
```

### Add eslint.config.mjs

```
  import reactConfig from "rc-eslint-react/react.js";

  export default [
    {
      ignores: ["node_modules/**", "dist/**", "out/**", "public/**"],
    },
    ...reactConfig.map((config) => {
      // Ensure we use the correct tsconfig.json for this project
      if (config.languageOptions?.parserOptions?.project) {
        return {
          ...config,
          languageOptions: {
            ...config.languageOptions,
            parserOptions: {
              ...config.languageOptions.parserOptions,
              project: "./tsconfig.json",
            },
          },
        };
      }
      return config;
    }),
  ];
```

### Add .perttierrc.mjc

```js
import config from "rc-eslint-react/prettier.js";

export default config;
```

## Note

### Run script

```
# inspect config in localhost:7777
yarn eslint --inspect-config

# lint 1 file to check if lint is worked
yarn eslint ./src/index.tsx
```
