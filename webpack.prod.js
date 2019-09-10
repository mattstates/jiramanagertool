const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const webpack = require('webpack');
module.exports = (env) => {
    return merge(common, {
        mode: 'production',
        plugins: [
            new webpack.DefinePlugin({
                DEVMODE: JSON.stringify(Boolean(env && env.DEVMODE))
            })
        ]
    });
};
