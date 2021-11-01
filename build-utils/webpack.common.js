const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.js'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'lncRNAfp',
            template: path.resolve(__dirname, '..', './src/index.html'),
        }),
        new webpack.HotModuleReplacementPlugin(),
    ],
    output: {
        path: path.resolve(__dirname, '..', './dist'),
        filename: 'bundle.js'
    },
    devServer: {
        static: path.resolve(__dirname, '..', './dist'),
        hot: true,
    },
};
