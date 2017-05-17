const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const NODE_ENV = 'development'

module.exports = {
  context: path.join(__dirname, '/../'),
  devtool: 'eval',
  devServer: {
    contentBase: 'dist/',
    host: '0.0.0.0',
    publicPath: '/'
  },
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
        loaders: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
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
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
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
    //new OfflinePlugin()
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
