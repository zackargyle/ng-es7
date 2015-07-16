var path = require('path');
var webpack = require('webpack');

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
        test: /\.less$/,
        loader: "style!css!autoprefixer!less",
      },
    ]
  },
  devServer: {
    contentBase: "./"
  }
};
