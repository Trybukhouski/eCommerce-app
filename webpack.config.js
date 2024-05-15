const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  entry: './src/index.ts',
  mode: mode,
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@shared": path.resolve(__dirname, 'src/shared/'),
      "@core": path.resolve(__dirname, 'src/modules/core/'),
      "@assets": path.resolve(__dirname, 'src/assets/'),
      "@modules": path.resolve(__dirname, 'src/modules/'),
      "@interfaces": path.resolve(__dirname, 'src/interfaces/'),
      "@routes": path.resolve(__dirname, 'src/routes/'),
      '@root': path.resolve(__dirname, 'src/'),
    },
  },
  output: {
    assetModuleFilename: 'assets/[name][hash][ext][query]',
    clean: true,
    filename: 'bundle.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        oneOf: [
          {
            test: /\.module\.(sa|sc|c)ss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                  modules: {
                      localIdentName: '[name]__[local]___[hash:base64:5]'
                  }
                },
              },
              "sass-loader"
            ]
          },
          {
            use: [
              (mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  postcssOptions: {
                    plugins: [
                      [
                        'postcss-preset-env',
                        {
                          stage: 3, 
                          features: {
                            'custom-properties': false,
                          },
                          autoprefixer: { grid: true },
                        },
                      ],
                    ],
                  },
                },
              },
              'sass-loader',
            ],
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
          }
        ]
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}