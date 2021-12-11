const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLInlineCSSWebpackPlugin = require('html-inline-css-webpack-plugin').default;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, './src');
const PUBLIC_PATH = path.resolve(__dirname, '../public');
const UPLOAD_PATH = path.resolve(__dirname, '../upload');
const DIST_PATH = path.resolve(__dirname, '../dist');

/** @type {import('webpack').Configuration} */
const config = {
  mode: process.env.NODE_ENV || 'none',
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000',
    },
    static: [PUBLIC_PATH, UPLOAD_PATH],
  },
  devtool: process.env.NODE_ENV === 'development' ? 'eval-cheap-module-source-map' : false,
  entry: {
    main: [
      path.resolve(SRC_PATH, './index.css'),
      path.resolve(SRC_PATH, './buildinfo.js'),
      path.resolve(SRC_PATH, './index.jsx'),
    ],
    webfont: path.resolve(SRC_PATH, './styles/webfont.css'),
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.css$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader', options: { url: false } },
          { loader: 'postcss-loader' },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: [{ loader: '@svgr/webpack', options: { icon: true } }],
      },
    ],
  },
  output: {
    filename: 'scripts/[name].[contenthash].js',
    path: DIST_PATH,
    publicPath: '/'
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      BUILD_DATE: new Date().toISOString(),
      // Heroku では SOURCE_VERSION 環境変数から commit hash を参照できます
      COMMIT_HASH: process.env.SOURCE_VERSION || '',
      NODE_ENV: process.env.NODE_ENV || 'development',
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css'
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(SRC_PATH, './index.html'),
    }),
    new HTMLInlineCSSWebpackPlugin({
      filter: (fileName) => ['index.html', 'webfont'].some(name => fileName.includes(name)),
    }),
    new RemoveEmptyScriptsPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
      path: false,
    },
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
};

module.exports = config;
