const webpack = require('webpack');

module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            // Add timers polyfill
            webpackConfig.resolve.fallback = {
                ...webpackConfig.resolve.fallback,
                timers: require.resolve('timers-browserify'),
            };

            // Add webpack's ProvidePlugin to provide global packages
            webpackConfig.plugins.push(
                new webpack.ProvidePlugin({
                    process: 'process/browser',
                })
            );

            return webpackConfig;
        },
    },
};
