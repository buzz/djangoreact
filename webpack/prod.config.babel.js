import path from 'path'
import baseConfig, { basePath } from './base.config.babel.js'

const staticRoot = process.env.npm_package_config_static_root
const outPutPath = path.join(basePath, staticRoot)

export default {
  ...baseConfig,
  output: {
    filename: '[name].js',
    path: outPutPath,
  },
}
