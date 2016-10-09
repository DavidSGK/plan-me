const webpack = require('webpack');
const path = require('path');

const SRC_PATH = path.join(__dirname, 'src', 'app.js');
const BUILD_PATH = path.join(__dirname, 'docs');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: SRC_PATH,
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
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
    new webpack.optimize.OccurrenceOrderPlugin(),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),

    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
  ],
};
