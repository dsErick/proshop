const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const webpack = require('webpack')

module.exports = {
    lintOnSave: false,
    
    devServer: {
        proxy: 'http://localhost:5000'
    },
    configureWebpack: {
        plugins: [
            new BundleAnalyzerPlugin(),
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                Popper: ['popper.js', 'default']
            })
        ],
        optimization: {
            splitChunks: { minSize: 0 }
        }
    }
}
