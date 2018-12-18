var fs = require('fs');
var path = require('path');
var ExternalsPlugin = require('webpack2-externals-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'server/server.js'),

  output: {
    path: __dirname + '/dist/',
    filename: 'server.bundle.js',
  },

  target: 'node',

  node: {
    __filename: true,
    __dirname: true,
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
            ],
          },
        },
      },
    ],
  },

  plugins: [
    new ExternalsPlugin({
      type: 'commonjs',
      include: path.join(__dirname, 'node_modules'),
    }),
  ],
};
