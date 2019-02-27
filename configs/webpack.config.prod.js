const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
const CnameWebpackPlugin = require('cname-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
require("babel-polyfill");
//const WebpackClearConsole = require("webpack-clear-console").WebpackClearConsole;

var prodConfig = {
  mode: "production",
  context: path.resolve(__dirname, '../src'),
  entry: {
    app: './index.jsx',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/images/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /svg-sprite-loader/, // foo.bar?svg-sprite-loader
            use: 'svg-sprite-loader'
          },
          {
            use:  [
              {
                loader: 'file-loader',
                options: {
                  name: 'static/svg/[name].[hash:8].[ext]',
                }
              }
            ],
          },
        ],
        exclude: /node_modules/,
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
        test: /\.worker\.js$/,
        use: { 
          loader: 'worker-loader',
          options: { 
            name: '[name].js'
          }
        },
        exclude:path.resolve(__dirname, "../node_modules"),
      },
      {
        test: /(?=^(?!.*worker))(?=.*\.(js|jsx)$)/,
        exclude:path.resolve(__dirname, "../node_modules"),
        use: 'babel-loader',
        exclude: /node_modules/
      },
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
          name: 'static/fonts/[name].[ext]',
        },
      },
      {
        test: /\.(mp3|aac)$/,
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/sounds/[name].[ext]',
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', 'svg'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
    }
  },
  plugins: [
    //new SpriteLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './template/index.html',
    }),
    // new FaviconsWebpackPlugin({
    //   logo: './static/images/favicon/tomat.png',
    //   emitStats: true,
    //   statsFilename: 'iconstats-[hash].json',
    //   persistentCache: true,
    //   inject: true,
    //   background: '#fff',
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: true,
    //     coast: true,
    //     favicons: true,
    //     firefox: true,
    //     opengraph: true,
    //     twitter: true,
    //     yandex: true,
    //     windows: true
    //   }
    // }),
    //new SpriteLoaderPlugin(),
    new ExtractTextPlugin("styles.css"),
    new CnameWebpackPlugin({
      domain: 'pomodoro-time.com',
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      basePath: '/',
      seed: {
        name: 'Pomodoro Time',
        short_name: "Pomodoro",
        description: 'Pomodoro Time - Time management method',
        display: "standalone",
        background_color: "#fff",
        prefer_related_applications: false,
      }
    }),
    //new BundleAnalyzerPlugin()
  ],
};

module.exports = prodConfig;
