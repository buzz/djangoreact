import path from 'path'
import config from './shared.config.babel.js'


const base = path.resolve('.')

config.output = {
    filename: '[name].js',
    path: path.join(base, 'build'),
}

export default config
