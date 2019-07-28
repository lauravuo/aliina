const merge = require('webpack-merge');

const common = require('./common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: common.output.path,
    historyApiFallback: true
  },
  output: {
    publicPath: 'http://localhost:8080/',
    filename: 'bundle.js'
  }
});
