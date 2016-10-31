const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src/app');

const config = {
  entry: `${APP_DIR}/client/App.jsx`,
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /(node_modules|__tests__)/, loader: 'babel-loader', query: { presets: ['es2015'] } },
    ],
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.jsx', '.js'],
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'CKO Grid',
    template: `${APP_DIR}/client/index.html`,
  })],
  devtool: 'eval-cheap-module-source-map',
};

module.exports = config;
