var path = require('path');
var webpack = require('webpack');

var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    'babel/polyfill',
    './main',
    'webpack-dev-server/client?http://localhost:8080'
  ],
  output: {
      publicPath: '/',
      filename: 'main.js'
  },
  debug: true,
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.join(__dirname, './'),
        loader: 'babel-loader',
        query: {stage: 0},
      },
      { 
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css")
  ],
  devServer: {
    contentBase: "./"
  }
};
