import path from 'path'
import BundleTracker from 'webpack-bundle-tracker'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const base = path.resolve('.')

export default {
    entry: {
         bundle: path.join(base, 'assets', 'js', 'index'),
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                })
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.(gif|png|eot|svg|woff2?|ttf)$/,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new BundleTracker({
            filename: 'webpack-stats.json',
        }),
    ],
    resolve: {
        modules: [
            path.join(base, 'assets'),
            path.join(base, 'node_modules'),
        ],
        extensions: [
            '.js',
            '.jsx',
            '.html',
            '.css',
            '.gif',
        ]
    },
}
