import path from 'path';
import shared from './shared.config.babel.js';

const base = path.resolve('.')

export default {
    ...shared,
    output: {
        filename: '[name].js',
        path: path.join(base, 'build'),
    },
}
