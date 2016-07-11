var ExtractPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack=require('webpack');
var path = require('path');


var plugins = [
    new ExtractPlugin('bundle.css'),
    new LiveReloadPlugin({appendScriptTag: true}),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    })
];

module.exports = {
    entry: './src',
    output: {
        path: 'builds',
        filename: 'bundle.js',
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.jsx'],
    },
    module: {
        loaders: [
            {
                test: /\.js/,
                loader: 'babel',
                include: __dirname + '/src',
            },
            {
                test: /\.scss/,
                loader: ExtractPlugin.extract('style', 'css!sass?includePaths[]=' + path.resolve(__dirname, "./node_modules/compass-mixins/lib"))//'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: ExtractPlugin.extract("style-loader", "css-loader")},
            {
                test: /\.html/,
                loader: 'html',
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                loader: 'url?limit=10000',
            }
        ]
    }
};

