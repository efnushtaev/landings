'use strict';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: "scripts/build.js",
    library: "home"
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: "file-loader",
        options: {
          name: '[name].[ext]',
          outputPath: './../dist/img/',
        },
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('./styles/style.css')
  ],
  
  devtool: "source-map"
};


