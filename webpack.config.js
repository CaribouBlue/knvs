const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('./client/style/index.css');

module.exports = [
  {
    entry: ['./src/client/index.jsx', './src/client/global.scss'],
    output: {
      path: path.resolve(__dirname, './static/dist'),
      filename: 'client-bundle.js',
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'index.css',
              },
            },
            {
              loader: 'extract-loader'
            },
            {
              loader: 'css-loader?-url'
            },
            {
              loader: 'sass-loader'
            }
          ],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: 'babel-loader',
        },
      ],
    },
  },
];
