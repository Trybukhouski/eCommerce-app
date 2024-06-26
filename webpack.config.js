const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const dotenv = require('dotenv');

dotenv.config({ path: path.resolve(__dirname, '.env') });

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  entry: './src/index.ts',
  mode,
  resolve: {
    fallback: {
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "crypto": require.resolve("crypto-browserify"),
      "vm": require.resolve("vm-browserify"),
      "buffer": require.resolve("buffer/"),
      "stream": require.resolve("stream-browserify"),
      process: require.resolve('process/browser'),
    },
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@shared": path.resolve(__dirname, 'src/shared/'),
      "@core": path.resolve(__dirname, 'src/modules/core/'),
      "@assets": path.resolve(__dirname, 'src/assets/'),
      "@modules": path.resolve(__dirname, 'src/modules/'),
      "@config": path.resolve(__dirname, 'src/'),
      "@services": path.resolve(__dirname, 'src/services/'),
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
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
      'process.env.CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET),
      'process.env.SCOPE': JSON.stringify(process.env.SCOPE),
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.AUTH_URL': JSON.stringify(process.env.AUTH_URL),
      'process.env.PROJECT_KEY': JSON.stringify(process.env.PROJECT_KEY),
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
        oneOf: [
          {
            test: /\.notsprite\.svg$/i,
            type: 'asset/resource',
          },
          {
            use: [
              {
                loader: 'svg-sprite-loader',
              }
            ],
          }
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
}
