// import WriteFilePlugin from 'write-file-webpack-plugin';
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, "js", "index.js"),
  output: {
    filename: 'main.js',
    path: path.resolve(path.dirname(__dirname), "static", "js")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new WriteFilePlugin()
  ]
};