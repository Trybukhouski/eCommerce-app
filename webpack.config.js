const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

let mode = 'development';
if (process.env.NODE_ENV === 'production') {
  mode = 'production';
}

module.exports = {
  entry: './src/index.ts',
  mode: mode,
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
      "@service": path.resolve(__dirname, 'src/service/'),
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
      'process.env.CLIENT_ID': JSON.stringify(process.env.CLIENT_ID || 'P7AHNZvx7l7ATvqkj10zbEQa'),
      'process.env.CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET || 'z7kCZZoMPb5UmBBl_0g70ROn-vEmvGLn'),
      'process.env.SCOPE': JSON.stringify(process.env.SCOPE || 'introspect_oauth_tokens:ecommerce2024 manage_my_profile:ecommerce2024 manage_api_clients:ecommerce2024 manage_customers:ecommerce2024 create_anonymous_token:ecommerce2024'),
      'process.env.API_URL': JSON.stringify(process.env.API_URL || 'https://api.us-central1.gcp.commercetools.com'),
      'process.env.AUTH_URL': JSON.stringify(process.env.AUTH_URL || 'https://auth.us-central1.gcp.commercetools.com'),
      'process.env.PROJECT_KEY': JSON.stringify(process.env.PROJECT_KEY || 'ecommerce2024'),
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
