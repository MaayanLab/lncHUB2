const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '..', './src/index.jsx'),
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [
        new CleanWebpackPlugin(),
        new ESLintPlugin({
            extensions: ["js", "jsx"]
        }),
        new HtmlWebpackPlugin({
            title: 'lncRNAfp',
            template: path.resolve(__dirname, '..', './src/index.html'),
        }),
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
