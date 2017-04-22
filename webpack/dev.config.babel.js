import baseConfig, { basePathClient } from './base.config.babel.js'

const webpackPort = process.env.npm_package_config_webpack_port
const publicPath = `http://localhost:${webpackPort}/webpack-bundle/`

export default {
  ...baseConfig,
  output: {
    filename: '[name].js',
    publicPath: publicPath,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: basePathClient,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
}
