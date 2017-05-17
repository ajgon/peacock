const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const OfflinePlugin = require('offline-plugin')
const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const NODE_ENV = 'production'

const extractSass = new ExtractTextPlugin({
  filename: '[name]-[contenthash].css'
})

module.exports = {
  context: path.join(__dirname, '/../'),
  devtool: 'cheap-module-source-map',
  entry: {
    main: [
      './src/index'
    ],
    vendor: [
      'preact',
      'normalize.css/normalize.css'
    ]
  },
  module: {
    rules: [
      {
        test: /manifest\.json$/,
        loaders: [
          {
            loader: 'file-loader',
            query: {
              digest: 'hex',
              hash: 'sha256',
              name: '[name]-[hash].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(html|xml)$/,
        loaders: [
          {
            loader: 'html-loader',
            options: {
              attrs: ['img:src', 'link:href', 'square150x150logo:src']
            }
          }
        ]
      },
      {
        test: /\.s?css$/,
        use: extractSass.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1
              }
            }, {
              loader: 'postcss-loader'
            }, {
              loader: 'sass-loader'
            }
          ]
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader'
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          {
            loader: 'file-loader',
            query: {
              digest: 'hex',
              hash: 'sha256',
              name: '[name]-[hash].[ext]'
            }
          },
          {
            loader: 'image-webpack-loader',
            query: {
              progressive: true,
              gifsicle: {
                interlaced: false,
                optimizationLevel: 7
              },
              optipng: {
                interlaced: false,
                optimizationLevel: 7
              },
              pngquant: {
                quality: '65-90',
                speed: 4
              }
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name]-[hash].js',
    path: path.join(__dirname, '/../dist'),
    libraryTarget: 'umd'
  },
  plugins: [
    extractSass,
    new StaticSiteGeneratorPlugin({
      globals: {
        window: {},
        navigator: {}
      }
    }),
    new CopyWebpackPlugin([
      {
        from: 'src/browserconfig.xml',
        to: 'browserconfig.xml'
      },
      {
        from: 'src/favicon/mstile-150x150.png',
        to: 'mstile-150x150.png'
      }
    ]),
    new OfflinePlugin()
  ],
  resolve: {
    extensions: ['.js', '.json']
  },
  stats: {
    chunks: true,
    colors: true,
    reasons: true
  }
}
