module.exports = {
  extends: [
    "airbnb-typescript-prettier"
  ],
  parserOptions: {
    sourceType: "module",
    project: "tsconfig.json",
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
  },
  settings: {
  }
}