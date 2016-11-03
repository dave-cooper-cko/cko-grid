const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const BUILD_DIR = path.resolve(__dirname, 'build');
const CLIENT_DIR = path.resolve(__dirname, 'client');
const COMPONENT_DIR = path.resolve(__dirname, 'src', 'app', 'components');
const TARGET = process.env.npm_lifecycle_event;

const common = {
  module: {
    output: {
      path: BUILD_DIR,
      filename: 'bundle.js',
    },
    loaders: [
      { test: /\.jsx$/, exclude: /(node_modules|__tests__)/, loader: 'babel-loader', query: { presets: ['es2015'] } },
    ],
  },
};

if (TARGET === 'dev') {
  module.exports = merge.smart(common, {
    entry: [`${CLIENT_DIR}/app.js`, `${COMPONENT_DIR}/CkoGrid/CkoGrid.jsx`],
    module: {
      loaders: [
        { test: /\.js$/, exclude: /(node_modules|__tests__)/, loader: 'babel-loader', query: { presets: ['es2015'] } },
      ],
    },
    plugins: [new HtmlWebpackPlugin({
      title: 'CKO Grid',
      template: `${CLIENT_DIR}/index.html`,
    })],
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.jsx', '.js'],
    },
  });
}
