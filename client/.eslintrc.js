module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "airbnb", // Use Airbnb's style guide for JavaScript and React
    "plugin:react/recommended", // Enable recommended rules from eslint-plugin-react
    "plugin:jsx-a11y/recommended", // Enable recommended rules from eslint-plugin-jsx-a11y
    "plugin:react-hooks/recommended", // Enable recommended rules from eslint-plugin-react-hooks
    "plugin:import/recommended", // Enable recommended rules from eslint-plugin-import
    "plugin:prettier/recommended", // Enable Prettier integration
  ],
  parserOptions: {
    ecmaVersion: 2022, // Use ECMAScript 2022 syntax
    sourceType: "module", // Use ECMAScript modules
  },
  plugins: ["react"], // Enable eslint-plugin-react
  settings: {
    "import/resolver": {
      alias: {
        map: [["@", "./src"]], // Set up aliases for paths starting with '@' to resolve to './src'
        extensions: [".js", ".jsx", ".ts", ".tsx"], // Specify allowed extensions for imports
      },
    },
  },
  rules: {
    "no-console": "error",
    "react-hooks/rules-of-hooks": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "no-use-before-define": [
      "error",
      {
        functions: true,
        classes: true,
        variables: false,
        allowNamedExports: false,
      },
    ],
  },
}
