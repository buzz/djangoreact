import path from 'path'
import shared from './shared.config.babel.js'

const base = path.resolve('.')
const djangoPort = process.env.npm_package_config_django_port

export default {
    ...shared,
    devtool: 'source-map',
    output: {
        filename: '[name].js',
        path: path.join(base, 'assets', 'dev-bundles'),
        publicPath: 'http://localhost:3000/webpack-bundle/',
    },
    devServer: {
        contentBase: path.join(base, 'assets'),
    },
}
