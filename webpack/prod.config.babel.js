import path from 'path'
import baseConfig, { basePath } from './base.config.babel.js'

const staticRoot = process.env.npm_package_config_django_static_root

export default {
  ...baseConfig,
  output: {
    filename: '[name].js',
    path: path.join(basePath, staticRoot),
  },
}
