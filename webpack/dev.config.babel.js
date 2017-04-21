import baseConfig, { basePathClient } from './base.config.babel.js'

const webpackPort = process.env.npm_package_config_webpack_port

export default {
  ...baseConfig,
  devtool: 'inline-source-map',
  output: {
    filename: '[name].js',
    publicPath: `http://localhost:${webpackPort}/webpack-bundle/`,
  },
  devServer: {
    contentBase: basePathClient,
  },
}
