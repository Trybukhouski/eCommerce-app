module.exports = {
  extends: [
    "airbnb-typescript-prettier"
  ],
  parserOptions: {
    sourceType: "module",
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
  },
  plugins: [
    "prettier"
  ],
  rules: {
    "max-lines-per-function": ["error", 40],
    "import/no-unresolved": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-empty-function": "off",
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "dot-notation": "off",
    "prefer-destructuring": ["error", {"object": true, "array": false}]
  },
  overrides: [
    {
      // Настройки для JavaScript файлов
      files: ["*.js"],
      parser: "espree",
      env: {
        node: true
      },
      rules: {
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      files: ["*.ts", "*.tsx"],
      rules: {
      }
    }
  ],
  settings: {
  }
}
