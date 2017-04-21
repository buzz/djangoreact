import path from 'path'
import config from './shared.config.babel.js'

const base = path.resolve('.')
const djangoPort = process.env.npm_package_config_django_port

config.devtool = 'inline-source-map'
config.output = {
	filename: '[name].js',
	publicPath: 'http://localhost:3000/webpack-bundle/',
}
config.devServer = {
	contentBase: path.join(base, 'assets'),
}

export default config
