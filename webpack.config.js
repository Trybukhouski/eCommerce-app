const HtmlWebpackPlugin = require('html-webpack-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  mode: mode,
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
  ],
  module: {
    rules: [],
  },
}