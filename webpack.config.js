/* global __dirname: true */
/* eslint-disable no-var */
/* eslint-disable prefer-template */
var webpack = require('webpack');
var PROD = process.env.NODE_ENV === 'production';

// getEntrySources gets sources for webpack entry paths, by environment
function getEntrySources(sources) {
  if (process.env.NODE_ENV !== 'production') {
    sources.push('webpack-dev-server/client?http://localhost:8080');
    sources.push('webpack/hot/only-dev-server');
  }

  return sources;
}

module.exports = {
  mode: 'production', // 'production' | 'development' | 'none'
  entry: getEntrySources(['babel-polyfill', './src/js/index.js']),
  output: {
    publicPath: PROD ? './build/' : 'http://localhost:8080/build/',
    path: __dirname + '/build',
    filename: 'bundle.js',
  },
  devtool: PROD ? 'cheap-module-source-map' : 'eval',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|svg)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,

        use: [
          {
            loader: 'source-map-loader',
          },
        ],

        enforce: 'pre',
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
  ],
};
