var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: "dist",
    filename: "app.js"
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"}
    ]
  }
};
