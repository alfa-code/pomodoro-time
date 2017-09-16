const path = require('path');
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const autoprefixer = require('autoprefixer');
require("babel-polyfill");

var NODE_ENV = process.env.NODE_ENV;

console.log(NODE_ENV)

var dev = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './index.jsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: false },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude:path.resolve(__dirname, "node_modules"),
        use: 'babel-loader'
      },
      {
        test: [/\.scss$/],
        use: [
          require.resolve('style-loader'),
          {
            loader: require.resolve('css-loader'),
            options: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
            },
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: require.resolve('sass-loader'),
            options: {
              includePaths: ['./src/styles']
            },
          },
        ],
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(mp3|aac)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'sounds/[name].[ext]',
        },
      },
      //
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './template/index.html',
    }),
  ]
};

var build = {
  context: path.resolve(__dirname, './src'),
  entry: {
    app: './index.jsx',
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: false },
          },
        ],
      },
      // prod
      {
        test: /\.(js|jsx)$/,
        exclude:path.resolve(__dirname, "node_modules"),
        use: 'babel-loader'
      },
      // prod
      {
        test: [/\.scss$/],
        use: ExtractTextPlugin.extract({
          fallback: require.resolve('style-loader'),
          use: [
            {
              loader: require.resolve('css-loader'),
              options: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                minimize: true,
                sourceMap: false,
              },
            },
            {
              loader: require.resolve('postcss-loader'),
              options: {
                ident: 'postcss', // https://webpack.js.org/guides/migrating/#complex-options
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009',
                  }),
                ],
              },
            },
            {
              loader: require.resolve('sass-loader'),
              options: {
                includePaths: ['./src/styles']
              },
            },
          ]
        })
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'fonts/[name].[ext]',
        },
      },
      {
        test: /\.(mp3|aac)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'sounds/[name].[ext]',
        },
      },
      //
    ]
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx'],
    alias: {
      '@src': path.resolve(__dirname, 'src'),
    },
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    port: 9000,
    bonjour: true,
    host: "192.168.0.24"
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './template/index.html',
    }),
    new ExtractTextPlugin("styles.css")
  ]
};

module.exports = (process.env.NODE_ENV === 'development') ? dev : build