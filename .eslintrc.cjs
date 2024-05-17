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
  },
  overrides: [
    {
      // Настройки для JavaScript файлов
      files: ["*.js"],  // Вы можете добавить 'webpack.config.js' если хотите явно указать только этот файл
      parser: "espree",  // Используйте ESLint стандартный парсер для JavaScript
      env: {
        node: true  // Укажите, что это Node.js среда для JavaScript файлов
      },
      rules: {
        // Отключите или переопределите TypeScript-специфичные правила, которые не применимы к JavaScript
        "@typescript-eslint/no-var-requires": "off"
      }
    },
    {
      // Настройки для TypeScript файлов
      files: ["*.ts", "*.tsx"],
      rules: {
        // TypeScript-специфичные правила
      }
    }
  ],
  settings: {
  }
}
