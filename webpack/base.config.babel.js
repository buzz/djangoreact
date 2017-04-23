import path from 'path'
import webpack from 'webpack'
import BundleTracker from 'webpack-bundle-tracker'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export const basePath = path.resolve('.')
export const basePathClient = path.join(basePath, 'client')

// TODO: add purifycss-webpack?

// pass down configuration
const apiBasePath = process.env.npm_package_config_api_base_path
const apiPagesPath = process.env.npm_package_config_api_pages_path
const apiPagesUrl = `/${apiBasePath}${apiPagesPath}/`

export default {
  entry: {
    bundle: [
      // bootstrap 4
      'jquery/src/core',
      'tether/dist/js/tether',
      'bootstrap/scss/bootstrap',
      'bootstrap/dist/js/bootstrap',
      // app entry
      'sass/index',
      'js/index',
    ],
  },
  module: {
    rules: [
      {
        test: /jquery\/src\/core/,
        use: {
          loader: 'imports-loader',
          options: {
            jQuery: 'jquery',
          },
        },
      },
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
        use: 'babel-loader',
      },
      {
        test: /\.(gif|png|eot|svg|woff2?|ttf)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    // generate separate CSS file
    new ExtractTextPlugin('bundle.css'),
    // don't reload if there is an error
    new webpack.NoEmitOnErrorsPlugin(),
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
    // inject configuration: replace process.env.* strings
    new webpack.EnvironmentPlugin({
      api_pages_url: apiPagesUrl,
      is_browser: true,
    }),
  ],
  resolve: {
    modules: [
      basePathClient,
      path.join(basePath, 'node_modules'),
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
