import path from 'path'
import webpack from 'webpack'
import BundleTracker from 'webpack-bundle-tracker'
import ExtractTextPlugin from 'extract-text-webpack-plugin'


const base = path.resolve('.')

export default {
    entry: {
        'bundle': [
            'jquery/src/core',
            'tether/dist/js/tether',
            'bootstrap/scss/bootstrap',
            'bootstrap/dist/js/bootstrap',
            'sass/index',
            'js/index',
        ]
    },
    module: {
        rules: [
            {
                test: /bootstrap\/dist\/js\//,
                use: {
                    loader: 'imports-loader',
                    options: {
                        jQuery: 'jquery',
                    },
                },
            },
            {
                test: /\.(scss|sass)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                importLoaders: 2,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: 'inline',
                            },
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: true,
                            },
                        },
                    ],
                }),
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ['react-hot-loader', 'babel-loader'],
            },
            {
                test: /\.(gif|png|eot|svg|woff2?|ttf)$/,
                use: 'file-loader',
            },
        ],
    },
    plugins: [
        new ExtractTextPlugin('bundle.css'),
        new webpack.NoEmitOnErrorsPlugin(), // don't reload if there is an error
        new webpack.NamedModulesPlugin(),
        // for django-webpack-loader
        new BundleTracker({
            filename: 'webpack-stats.json',
        }),
        // BS4 needs this
        new webpack.ProvidePlugin({
          Tether: 'tether',
          'window.Tether': 'tether',
          jQuery: 'jQuery',
          '$': 'jQuery',
          'window.jQuery': 'jQuery',
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
            '.scss',
            '.sass',
        ],
    },
}
