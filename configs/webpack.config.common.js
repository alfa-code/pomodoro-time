const path = require('path');

const fileLoader = require.resolve('file-loader');
// const urlLoader = require.resolve('url-loader');

const defaultConfig = {
    context: path.resolve(__dirname, '../src'),
    entry: {
        app: ['./index.tsx']
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.worker\.ts$/,
                loader: 'worker-loader',
                options: { inline: 'no-fallback' }
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: [/\.module\.scss$/],
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: require.resolve('css-loader'),
                        options: {
                            modules: {
                                localIdentName: '[name]__[local]___[hash:base64:5]'
                            }
                        }
                    },
                    {
                        loader: require.resolve('sass-loader'),
                        options: {
                            sassOptions: {
                                includePaths: ['./src/styles']
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: fileLoader,
                options: {
                    name: 'assets/fonts/[name].[ext]'
                }
            },
            {
                test: /\.(mp3|aac)$/,
                loader: fileLoader,
                options: {
                    name: 'assets/sounds/[name].[ext]'
                }
            },
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.svg'],
        alias: {
            Src: path.resolve(__dirname, '../src')
        }
    },
};

module.exports = defaultConfig;
