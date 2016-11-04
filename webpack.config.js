var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./client/src/app.jsx'],
  output: { 
    path: __dirname + '/client', 
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        include: __dirname + '/client/src',
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
