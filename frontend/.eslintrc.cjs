module.exports = {module.exports = {

  root: true,  root: true,

  parser: '@typescript-eslint/parser',  env: { browser: true, es2020: true },

  plugins: ['@typescript-eslint'],  extends: [

  extends: ['next/core-web-vitals', 'plugin:@typescript-eslint/recommended'],    "eslint:recommended",

  rules: {    "@typescript-eslint/recommended",

    '@typescript-eslint/no-explicit-any': 'off'    "plugin:react-hooks/recommended",

  }  ],

};  ignorePatterns: ["dist", ".eslintrc.cjs"],

  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
