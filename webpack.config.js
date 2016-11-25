const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CssNext = require('postcss-cssnext');
// const CssLess = require('postcss-less');
const PreCss = require('precss');

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
      { test: /\.jsx$/, exclude: /(node_modules)/, loader: 'babel-loader', query: { presets: ['es2015'] } },
      { test: /\.css$/, include: path.resolve(__dirname, 'src/'), loader: ExtractTextPlugin.extract('css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?parser=postcss-less') },
    ],
  },
  postcss: () => [CssNext, PreCss],
};

if (TARGET === 'dev') {
  module.exports = merge.smart(common, {
    entry: [`${CLIENT_DIR}/app.js`, `${COMPONENT_DIR}/CkoGrid/CkoGrid.jsx`],
    module: {
      loaders: [
        { test: /\.js$/, exclude: /(node_modules)/, loader: 'babel-loader', query: { presets: ['es2015'] } },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'CKO Grid',
        template: `${CLIENT_DIR}/index.html`,
      }),
      new ExtractTextPlugin('styles.css'),
    ],
    resolve: {
      extensions: ['', '.webpack.js', '.web.js', '.jsx', '.js'],
    },
  });
}
