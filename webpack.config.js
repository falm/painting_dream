
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require("webpack");
var path = require('path');

var isProd = (process.env.NODE_ENV === 'production');

// Conditionally return a list of plugins to use based on the current environment.
// Repeat this pattern for any other config key (ie: loaders, etc).
function getPlugins() {
    var plugins = [];

    // Always expose NODE_ENV to webpack, you can now use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }
    }));

    plugins.push(new CopyWebpackPlugin([
        { from: './src/index.html', to: 'index.html'}
    ]));

    // Conditionally add plugins for Production builds.
    if (isProd) {
        plugins.push(new webpack.optimize.UglifyJsPlugin());
    }

    // Conditionally add plugins for Development
    else {
        // ...
    }

    return plugins;
}

module.exports = {
    entry: './src/main.js',
    output: {
        path: './dist/',
        filename: 'bundle.js'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components|vendor|dist)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    plugins: getPlugins()
};
