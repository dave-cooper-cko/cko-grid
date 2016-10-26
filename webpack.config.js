const path = require('path');

const BUILD_DIR = path.resolve(__dirname, 'build');
const APP_DIR = path.resolve(__dirname, 'src/app');

const config = {
  entry: `${APP_DIR}/components/CkoGrid.jsx`,
  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /(node_modules|__tests__)/, loader: 'babel' },
    ],
  },
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.jsx', '.js'],
  },
  devtool: 'eval-cheap-module-source-map',
};

module.exports = config;
