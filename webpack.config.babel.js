import path from 'path'
import webpack from 'webpack'
import BundleTracker from 'webpack-bundle-tracker'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export const basePath = path.resolve('.')
export const basePathClient = path.join(basePath, 'client')

// TODO: add purifycss/other optim webpack plugins?

// pass down configuration
const API_BASE_PATH = process.env.npm_package_config_api_base_path
const API_PAGES_PATH = process.env.npm_package_config_api_pages_path
const API_PAGES_URL = `/${API_BASE_PATH}${API_PAGES_PATH}/`
const STATS_FILE = process.env.npm_package_config_webpack_stats_file

const baseConfig = {
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
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: [
              'transform-class-properties',
              'transform-es2015-destructuring',
            ],
          },
        },
      },
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
      filename: STATS_FILE,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
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
      api_pages_url: API_PAGES_URL,
      is_browser: true,
      NODE_ENV: 'production',
    }),
  ],
  resolve: {
    modules: [
      basePathClient,
      'node_modules',
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

// production/development specific
const getConfig = (NODE_ENV) => {
  console.log('NODE_ENV', NODE_ENV)
  if (NODE_ENV === 'production') {
    // production
    const staticRoot = process.env.npm_package_config_static_root
    const outPutPath = path.join(basePath, staticRoot)

    return {
      ...baseConfig,
      output: {
        ...baseConfig.output,
        path: outPutPath,
      },
    }
  } else {
    // development
    const webpackPort = process.env.npm_package_config_webpack_port
    const publicPath = `http://localhost:${webpackPort}/webpack-bundle/`

    return {
      ...baseConfig,
      output: {
        ...baseConfig.output,
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
  }
}

export default getConfig(process.env.NODE_ENV)
