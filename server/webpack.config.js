const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const SRC_PATH = path.resolve(__dirname, './src');
const DIST_PATH = path.resolve(__dirname, '../dist/server');

/** @type {import('webpack').Configuration} */
const config = {
  target: 'node',
  mode: process.env.NODE_ENV || 'none',
  entry: path.resolve(SRC_PATH, './index.js'),
  output: {
    path: DIST_PATH,
    filename: 'index.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.jsx?$/,
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  resolve: {
    extensions: ['.js'],
  },
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /\.(css|html)$/,
    }),
  ],
  externals: [
    nodeExternals({
      modulesFromFile: true,
    }),
  ],
  optimization: {
    minimize: false,
  },
};

module.exports = config;
