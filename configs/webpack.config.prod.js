const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const ManifestPlugin = require('webpack-manifest-plugin');

const prodConfig = {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    optimization: {
        minimizer: [new UglifyJsPlugin()],
    },
    module: {
        rules: [
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/, /\.svg$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/images/[name].[hash:8].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: false
                        }
                    }
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: './template/index.html',
            title: 'Pomodoro Time - time management method.'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        }),
        new FaviconsWebpackPlugin({
            logo: './static/images/favicon/tomat.png',
            emitStats: true,
            statsFilename: 'iconstats-[hash].json',
            persistentCache: true,
            inject: true,
            background: '#fff',
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: true,
                favicons: true,
                firefox: true,
                opengraph: true,
                twitter: true,
                yandex: true,
                windows: true
            }
        }),
        // new ManifestPlugin({
        //     fileName: 'manifest.json',
        //     basePath: '/',
        //     seed: {
        //         name: 'Pomodoro Time',
        //         short_name: 'Pomodoro',
        //         description: 'Pomodoro Time - Time management method',
        //         display: 'standalone',
        //         background_color: '#fff',
        //         prefer_related_applications: false
        //     }
        // }),
    ]
};

module.exports = prodConfig;
