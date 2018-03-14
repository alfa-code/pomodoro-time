const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
//const CnameWebpackPlugin = require('cname-webpack-plugin');
//const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
//const ManifestPlugin = require('webpack-manifest-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
require("babel-polyfill");
//const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var devConfig = {
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
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /file-loader/, // foo.bar?file-loader
            use: 'file-loader',
          },
          {
            use: 'svg-sprite-loader'
          }
        ],
        // use: [
        //   {
        //     loader: 'svg-sprite-loader',
        //     options: { extract: true }
        //   },
        //   'svgo-loader'
        // ],
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
              ident: 'postcss', 
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%',
                    'last 4 versions',
                    'Firefox ESR',
                    'not ie < 9',
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
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      'src': path.resolve(__dirname, '../src'),
    }
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    historyApiFallback: true,
    compress: true,
    port: 9001
  },
  plugins: [
    //new SpriteLoaderPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: './template/index.html',
    }),
    //new BundleAnalyzerPlugin()
  ]
};

module.exports = devConfig;