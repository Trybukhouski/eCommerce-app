module.exports = {
  extends: [
    "airbnb-typescript-prettier"
  ],
  parserOptions: {
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    warnOnUnsupportedTypeScriptVersion: false,
  },
  rules: {
    "max-lines-per-function": ["error", 40],
  }
}