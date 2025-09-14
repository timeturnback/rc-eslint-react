const commonReactRules = {
  // React component rules
  "react/destructuring-assignment": "off", // Vscode doesn't support automatically destructuring, it's a pain to add a new variable
  "react/require-default-props": "off", // Allow non-defined react props as undefined
  "react/jsx-props-no-spreading": "off", // _app.tsx uses spread operator and also, react-hook-form
  "react/react-in-jsx-scope": "off",
  "react/prop-types": "off",
  "react-hooks/rules-of-hooks": "error",
  "react/self-closing-comp": [
    "error",
    {
      component: true,
      html: true,
    },
  ],
  "react/display-name": "off",
  "react/jsx-boolean-value": ["warn", "never"],
  "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
  "react/jsx-filename-extension": "off",
  "react/jsx-sort-props": [
    "error",
    {
      callbacksLast: true,
      shorthandFirst: false,
      shorthandLast: true,
      multiline: "last",
      ignoreCase: true,
      noSortAlphabetically: false,
      reservedFirst: false,
    },
  ],

  // React Hooks rules
  "react-hooks/exhaustive-deps": "warn",

  // JSX A11Y rules
  "jsx-a11y/no-static-element-interactions": "off",
  "jsx-a11y/click-events-have-key-events": "off",
};

module.exports = { commonReactRules };
