const webpack = require('webpack');
const merge = require('webpack-merge');
const Jarvis = require('webpack-jarvis');
const path = require('path');

const common = require('./webpack.common');

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          { 
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    compress: true,
    hot: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    port: 8080,
    publicPath: '/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new Jarvis({
      port: 1337
    })
  ]
});