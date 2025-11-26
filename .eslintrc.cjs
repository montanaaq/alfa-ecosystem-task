module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],

    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "warn",

    // Общие удобства
    "no-console": "warn",
    "no-debugger": "warn",

    // Prettier — autoformat
    "prettier/prettier": [
      "warn",
      {
        semi: true,
        singleQuote: false,
        jsxSingleQuote: true,
        trailingComma: "none",
        arrowParens: "always",
        endOfLine: "lf"
      }
    ]
  }
};
