const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
    mode: 'development',
    context: path.resolve(__dirname, '../src'),
    entry: {
        app: ['babel-polyfill', './index.jsx']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [{
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/, /\.svg$/],
            loader: require.resolve('url-loader'),
            options: {
                limit: 10000,
                name: 'static/media/[name].[ext]'
            }
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        modules: false
                    }
                }
            ]
        },
        {
            test: /\.worker\.js$/,
            use: {
                loader: 'worker-loader',
                options: {
                    name: '[name].js'
                }
            }
        },
        {
            test: /(?=^(?!.*worker))(?=.*\.(js|jsx)$)/,
            exclude: path.resolve(__dirname, 'node_modules'),
            // use: ['babel-loader', 'eslint-loader']
            use: ['babel-loader']
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
                    }
                },
                {
                    loader: require.resolve('sass-loader'),
                    options: {
                        includePaths: ['./src/styles']
                    }
                }
            ]
        },
        {
            test: /\.(ttf|eot|woff|woff2)$/,
            loader: require.resolve('file-loader'),
            options: {
                name: 'fonts/[name].[ext]'
            }
        },
        {
            test: /\.(mp3|aac)$/,
            loader: require.resolve('file-loader'),
            options: {
                name: 'sounds/[name].[ext]'
            }
        }]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', 'svg'],
        alias: {
            src: path.resolve(__dirname, '../src')
        }
    },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        historyApiFallback: true,
        compress: true,
        port: 9001
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './template/index.html'
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map'
        })
    ]
};

module.exports = devConfig;