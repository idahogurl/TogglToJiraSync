// eslint-disable-next-line no-unused-vars
const webpack = require('webpack');
const path = require('path');
const Dotenv = require('dotenv-webpack');

const config = {
  entry: './src/electron.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'electron.js',
  },
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  devtool: 'inline-source-map',
  plugins: [
    new Dotenv({ path: process.env.NODE_ENV === 'development' ? '.env.local' : '.env.production' }),
  ],
};

module.exports = config;
