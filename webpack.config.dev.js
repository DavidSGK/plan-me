const webpack = require('webpack');
const path = require('path');

const SRC_PATH = path.join(__dirname, 'src', 'app.js');
const BUILD_PATH = path.join(__dirname, 'build');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: SRC_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
    publicPath: '/',
  },

  resolve: {
    extensions: ['', '.js'],
    alias: {},
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel',
      },
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
