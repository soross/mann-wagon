import webpack from 'webpack'
import Config from 'webpack-config'

// Plugins
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin'

export default new Config().extend({
  'webpack.dev.config.js': config => {
    delete config.debug
    delete config.output.pathinfo

    return config
  }
}).merge({
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /main.css$/,
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
})
