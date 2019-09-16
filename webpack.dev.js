const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require('path');
const webpack = require('webpack');
module.exports = (env) => {
    return merge(common, {
        mode: 'development',
        devtool: 'inline-source-map',
        devServer: {
            contentBase: path.join(__dirname, 'dist'),
            compress: true,
            port: 1234,
            disableHostCheck: true
        },
        plugins: [
            new webpack.DefinePlugin({
                DEVMODE: JSON.stringify(env.DEVMODE)
            })
        ]
    });
};
