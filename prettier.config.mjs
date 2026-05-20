/**
 * @see https://prettier.io/docs/en/configuration.html
 * @type {import("prettier").Config}
 */
const config = {
  arrowParens: "always",
  bracketSpacing: true,
  plugins: ["prettier-plugin-tailwindcss"],
  endOfLine: "auto",
  jsxSingleQuote: false,
  printWidth: 80,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
};

export default config;
