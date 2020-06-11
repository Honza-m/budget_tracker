// import WriteFilePlugin from 'write-file-webpack-plugin';
const path = require('path');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = {
  entry: [
    path.resolve(__dirname, "js", "index.js"),
    path.resolve(__dirname, "css", "main.scss")
  ],
  output: {
    filename: 'js/main.js',
    path: path.resolve(path.dirname(__dirname), "static")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.(scss)$/,
        use: [
        {
          loader: 'file-loader',
          options: {
            name: 'css/[name].css',
          }
        },
        {
          loader: 'extract-loader'
        },
        // {
        //   loader: 'style-loader', // inject CSS to page
        // }, 
        {
          loader: 'css-loader', // translates CSS into CommonJS modules
        }, {
          loader: 'postcss-loader', // Run post css actions
          options: {
            plugins: function () { // post css plugins, can be exported to postcss.config.js
              return [
                require('precss'),
                require('autoprefixer')
              ];
            }
          }
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
    ]
  },
  plugins: [
    new WriteFilePlugin()
  ]
};