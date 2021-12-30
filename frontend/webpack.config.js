const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    context: __dirname,
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    devServer: {
        historyApiFallback: true,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.css?$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|j?g|svg|gif)?$/,
                use: 'file-loader?name=./images/[name].[ext]',
            },
        ]
    }
    ,
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            filename: 'index.html',
        }),
        new CopyPlugin({
            patterns: [
                { from: "./src/favicon.ico", to: "" },
                { from: "./src/manifest.json", to: "" },
                { from: "./src/logo192.png", to: "" },
                { from: "./src/logo512.png", to: "" },
            ]
        }),
        new InjectManifest({
            swSrc: './src/service-worker.js',
            swDest: 'sw.js',
        })
    ],
};




