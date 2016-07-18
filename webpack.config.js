var ExtractPlugin = require('extract-text-webpack-plugin');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var webpack = require('webpack');
var path = require('path');

var isProd = (process.env.NODE_ENV === 'production');
var plugins = [
    new ExtractPlugin('bundle.css'),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        },
        __DEV__: JSON.stringify(JSON.parse(isProd ? 'false' : 'true'))
    }),
    new webpack.IgnorePlugin(/^jquery$/)
];

var devtool = "sourcemap";

var babelPresets = ['es2015', 'react'];
if (isProd) {
    babelPresets.push("react-optimize");
    devtool = "";
    plugins.push(new LiveReloadPlugin({appendScriptTag: true}));
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
            warnings: false,
            drop_console: true
        }
    }));
}


module.exports = {
    entry: './src',
    output: {
        path: 'builds',
        filename: 'bundle.js',
    },
    devtool: devtool,
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
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                include: __dirname + '/src',
                query: {
                    presets: babelPresets,
                    plugins: ["transform-object-rest-spread"]
                }
            },
            {
                test: /\.scss/,
                loader: ExtractPlugin.extract('style', 'css!sass?includePaths[]=' + path.resolve(__dirname, "./node_modules/compass-mixins/lib"))//'style!css!sass'
            },
            {
                test: /\.css$/,
                loader: ExtractPlugin.extract("style-loader", "css-loader")
            },
            {
                test: /\.html/,
                loader: 'html',
            },
            {
                test: /\.(png|gif|jpe?g|svg)$/i,
                loader: 'url?limit=10000',
            },
            {test: /backbone\.js$/, loader: 'imports?define=>false'}
        ]
    }
};

