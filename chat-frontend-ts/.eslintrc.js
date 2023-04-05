module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "react-app",
    "react-app/jest",
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/order": [
      "error",
      {
        alphabetize: {
          caseInsensitive: false,
          order: "asc",
        },
        groups: [
          "object",
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "double"],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    semi: ["error", "always"],
    "@typescript-eslint/explicit-module-boundary-types": "off",
  },
};
