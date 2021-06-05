const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devConfig = {
    mode: 'development',
    // context: path.resolve(__dirname, '../src'),
    // entry: {
    //     app: ['./index.tsx']
    // },
    // output: {
    //     path: path.resolve(__dirname, '../dist'),
    //     filename: '[name].bundle.js'
    // },
    module: {
        rules: [
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
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/, /\.svg$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[ext]'
                }
            },
        ]
    },
    // module: {
    //     rules: [
    //         // {
    //         //     test: /\.worker\.ts$/,
    //         //     use: [
    //         //         {
    //         //             loader: 'worker-loader',
    //         //             options: {
    //         //                 name: '[name].js'
    //         //             }
    //         //         },
    //         //         {
    //         //             loader: 'ts-loader',
    //         //         },
    //         //     ]
    //         // },
    //         // {
    //         //     test: /(?=^(?!.*worker))(?=.*\.(js|jsx)$)/,
    //         //     exclude: path.resolve(__dirname, 'node_modules'),
    //         //     use: ['babel-loader']
    //         // },
    // },
    devServer: {
        contentBase: path.join(__dirname, '../dist'),
        historyApiFallback: true,
        compress: true,
        port: 9001
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './template/index.html',
            title: 'Pomodoro Time - time management method.'
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[name].js.map'
        })
    ]
};

module.exports = devConfig;
